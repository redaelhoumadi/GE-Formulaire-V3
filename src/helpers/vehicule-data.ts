import axios from "axios";

export function getVehiculeData(immatriculation: string | undefined): Promise<string> {
    return new Promise((resolve, reject) => {
        if (!immatriculation) return resolve('');
        const formattedImmatriculation = immatriculation.replaceAll('-', '');
        const request = {
            immatriculation: formattedImmatriculation
        };
        axios.post('/api/vehicule', request).then((response) => {
            const { brand, model, pme }: any = response.data.vehicule;
            return resolve(`${brand} ${model} (${pme})`);

        }).catch(error => {
            return reject(error);
        })
    })
}