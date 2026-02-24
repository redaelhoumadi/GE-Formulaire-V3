import Image from "next/image";
import TextInput from "../Forms/TextInput";
import ChevronDeplie from "@public/images/components/chevrons/ChevronDeplie.svg";
import ChevronReplie from "@public/images/components/chevrons/ChevronReplie.svg";
import { FieldError, FieldValues, UseFormRegister } from "react-hook-form";
import { useEffect, useState } from "react";

interface ImmatriculationVehiculeCardProps {
    /**
     * input name
     */
    name: string;
    /**
     * value
     */
    value?: string;
    /**
     * react-hook-form registration
     */
    register: any;
    /**
     * React-hook-form errors
     */
    errors?: FieldError;
    /**
     * React-hook-form errors
     */
    dirty?: any;
    /**
     * React-hook-form errors
     */
    touched?: any;
}


export default function ImmatriculationVehiculeCard(props: ImmatriculationVehiculeCardProps) {
    const { register = (() => { }), name, value, errors, dirty, touched } = props;
    const [blurAndNotNull, setValidatedField] = useState(false);
    const [unknownVehiculeClicked, setUnknownVehiculeClicked] = useState(false);
    const switchUnknownVehiculeClick = () => setUnknownVehiculeClicked(!unknownVehiculeClicked);

    // effect runs when user state is updated
    useEffect(() => {
        if (errors) setUnknownVehiculeClicked(true);
    }, [errors]);

    return (
        <div>
            <p
                onClick={switchUnknownVehiculeClick}
                className={`${!unknownVehiculeClicked ? 'text-ge-gray-3' : 'text-ge-gray-1'} text-sm text-center underline cursor-pointer mb-6`}>
                Je ne connais pas mon immatriculation
                {
                    !unknownVehiculeClicked ? <Image
                        className="w-3 h-3 my-1 ml-1 inline rotate-90"
                        priority
                        src={ChevronReplie}
                        alt="ChevronReplie"
                    /> :
                        <Image
                            className="w-3 h-3 my-1 ml-1 inline rotate-180"
                            priority
                            src={ChevronDeplie}
                            alt="ChevronDeplie"
                        />
                }
            </p>

            {/* DONNEES SUPPLEMENTAIRES REQUISES */}
            {
                unknownVehiculeClicked && <TextInput
                    type='text'
                    label='Marque et modèle du véhicule'
                    onBlur={() => setValidatedField(value != '')}
                    name={name}
                    invalid={errors ? true : false}
                    validated={blurAndNotNull}
                    register={register}
                    placeholder='Marque et modèle du véhicule'
                    className="mt-6"
                    fullWidth />
            }
        </div>
    )
}