import Image from "next/image";
import PetiteVoiture from "@public/images/components/PetiteVoiture.svg";
import TextInput from "../Forms/TextInput";
import SectionMessage from "../SectionMessage";
import GreenCheck from "@public/images/components/GreenCheck.svg";
import { FieldError, FieldValues, UseFormRegister } from "react-hook-form";
import { useState } from "react";

interface ModeleVehiculeCardProps {
    /**
     * React-hook-form errors
     */
    errors?: FieldError;
    /**
     * React-hook-form errors
     */
    dirty?: any;
    /**
     * Modele de véhicule
     */
    vehicule?: string;
}


export default function ModeleVehiculeCard(props: ModeleVehiculeCardProps) {
    const { vehicule } = props;
    return (
        <div className="grid grid-cols-2 items-center">
            <div className="mx-auto">
                <Image
                    className="w-20 h-20"
                    src={PetiteVoiture}
                    alt="Modele de voiture"
                />
            </div>
            {vehicule ? <p className="text-sm text-center font-bold text-ge-gray-1">{vehicule}</p> :
                <p className="text-sm text-center text-ge-gray-3">Votre véhicule</p>
            }
        </div>
    )
}