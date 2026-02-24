import axios from "axios";
import prisma from "@/helpers/prisma";
// TODO

const AUTOPASS_BASE_URL = process.env.AUTOPASS_BASE_URL!;
const AUTOPASS_API_KEY = process.env.AUTOPASS_API_KEY!;

export interface AutoPassRequest {
    /**
     * This parameter provides the identity of the vehicle. 
     * This should be either a VIN, a registration plate or both. 
     * reg_or_vin takes priority.
     */
    reg_or_vin: string;
    /**
     * This parameter provides the identity of the vehicle. 
     * This should be either a VIN, a registration plate or both. 
     * reg_or_vin takes priority.
     */
    vin?: string;
    /**
     * This parameter provides the identity of the vehicle. 
     * This should be either a VIN, a registration plate or both. 
     * reg_or_vin takes priority.
     */
    reg_plate?: string;
    /**
     * This parameter specifies the country where the car has been registered. 
     * This could be different from the country from which the request is made. 
     * For instance when repairing a car registered in Italy in a workshop in France. 
     * This is an ISO 3166-1 alpha-2 code. 
     * If not specified, the value used is the same as the parameter country.
     */
    reg_country: string;
    /**
     * Default: "FR"
     * This parameter specifies the country in which the response is calculated. 
     * This influence some AM references selection and more generally triggers country specific offers in terms of brands. 
     * country must be ISO 3166-1 alpha-2. 
     * Note that this is not the language but the country.
     */
    country?: string;
    /**
     * User company. 
     * Could be used to specify the company or one of its department calling the API. 
     * This is typically the highest level of the hierarchy. 
     * This parameter is returned but has no influence on the result.
     */
    company?: string;
    /**
     * User entity. Could be used to identify a specific workshop or an agent calling the API. 
     * This is usually the lowest level in the hierarchy. 
     * Using it is recommended to identify uniquely the caller. 
     * This parameter is returned but has no influence on the result.
     */
    entity?: string;
    /**
     * User activities. 
     * Could be used in a transversal way to identify qualities / specific characteristics of the caller. 
     * For instance the type of activities covered by the workshop. 
     * This parameter is returned but has no influence on the result.
     */
    activities?: string;
    /**
     * This parameter specifies the token that will used to identify user and give him access to this service.
     */
    apikey: string;
};

export interface RequestedVehicule {
    immatriculation: string;
};

export interface AutoPassResult {
    mask: string;
    reg_country: string;
    company: string;
    entity: string;
    activities: string;
    reg_or_vin: string;
    reg_plate: string;
    vin: string;
    code: string;
    error_code: number;
    // car_identification
    // processing_info
    // registration_info
    car_identification: {
        vt_id?: number;
        ktypnr?: number;
        ktypnr_list?: number[];
        reg_plate?: string;
        vin?: string;
        brand?: string;
        model?: string;
        version?: string;
    },
    registration_info: {
        manufacturer_id?: number;
        manufacturer_name?: string;
        model_id?: number;
        model_name?: string;
        model_base?: string;
        version?: string;
        generation_code?: string;
        generation_code_cg?: string;
        body_id?: number;
        body_name?: string;
        reg_body?: string;
        energy_id?: number;
        energy_name?: string;
        gearbox_id?: string;
        co2?: number;
        depollution?: string;
        date_ct?: string;
        date_pme?: string; // première date de mise en service
        reg_date?: string;
        vin?: string;
        reg_plate?: string;
        type_mine?: string;
        type_version?: string;
        type_vin?: string;
        manufactoring_date?: string;
        product_key?: string;
        vehicule_color?: string;
        // ...and more
    }
};

async function getVehiculeFromDB(plaque: string) {
    return prisma.plaque.findFirst({
        where: {
            reg_or_vin: plaque
        }
    })
}

async function saveVehiculeToDB(autoPassData: any) {
    const dataToStore = {
        mask: autoPassData?.mask,
        reg_country: autoPassData?.reg_country,
        company: autoPassData?.company,
        entity: autoPassData?.entity,
        activities: autoPassData?.activities,
        reg_or_vin: autoPassData?.reg_or_vin,
        reg_plate: autoPassData?.reg_plate,
        vin: autoPassData?.vin,
        code: autoPassData?.code,
        error_code: autoPassData?.error_code,
        car_identification: autoPassData?.car_identification,
        processing_info: autoPassData?.processing_info,
        registration_info: autoPassData?.registration_info,
        completed: autoPassData?.completed,
        createdAt: autoPassData?.createdAt,
    };
    return prisma.plaque.create({
        data: dataToStore
    })
}

// Chercher en local si la plaque existe ou fais une requête vers AutoPass
export async function getVehiculeData(props: RequestedVehicule): Promise<AutoPassResult | false> {
    const formattedImmatriculation = props.immatriculation.replaceAll('-', '').toUpperCase();
    const requestParams: AutoPassRequest = {
        reg_or_vin: formattedImmatriculation,
        reg_country: "fr",
        country: "fr",
        apikey: AUTOPASS_API_KEY
    };
    const plaqueFromDb = await getVehiculeFromDB(formattedImmatriculation);
    if (plaqueFromDb) return plaqueFromDb as AutoPassResult;
    return axios.get(`${AUTOPASS_BASE_URL}`, {
        params: requestParams
    })
        .then(function (response) {
            if (response?.data?.error)
                throw Error(response?.data?.error?.description);
            return saveVehiculeToDB(response.data)
                .then(res => response.data as AutoPassResult)
        })
        .catch(function (error) {
            console.log(error);
            return false;
        });
}

// AQ-145-TR