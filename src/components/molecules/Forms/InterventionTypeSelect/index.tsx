import Image from 'next/image';
import { Control } from "react-hook-form";

// SVGs
import Agence from "@public/images/components/intervention/Agence.svg";
import Truck from "@public/images/components/intervention/Truck.svg";

// Internal components
import ButtonSelectionInput, { ButtonSelectionOption } from "@/components/atoms/Forms/ButtonSelectionInput";

export interface InterventionTypeSelectProps {
    /**
     * React-hook-form control
     */
    control: Control<any>;
}

// liste des types d'intervention possibles 
export const interventions: ButtonSelectionOption[] = [
    {
        label: <div className='grid grid-cols-3 items-center gap-4'>
            <div className='md:col-span-3 flex justify-center'>
                <Image
                    className="w-10 h-10"
                    priority
                    src={Agence}
                    alt="Agence"
                />
            </div>
            <div className='col-span-2 md:col-span-3'>
                <div className='w-full'>
                    <h3 className='text-center font-bold'>En agence</h3>
                </div>
            </div>
        </div>,
        value: "En agence",
    },
    {
        label: <div className='grid grid-cols-3 items-center gap-4'>
            <div className='md:col-span-3 flex justify-center'>
                <Image
                    className="w-10 h-10"
                    priority
                    src={Truck}
                    alt="Truck"
                />
            </div>
            <div className='col-span-2 md:col-span-3'>
                <div className='w-full'>
                    <h3 className='text-center font-bold'>À domicile / Lieu de travail</h3>
                </div>
            </div>
        </div>,
        value: "À domicile",
    }
];


export default function InterventionTypeSelect(props: InterventionTypeSelectProps) {
    const { control } = props;
    return (
        <ButtonSelectionInput
            options={interventions}
            name="type"
            style="stretch"
            control={control}
        />
    )
}