import { Control } from "react-hook-form";
// Internal components
import ButtonSelectionInput, { ButtonSelectionOption } from "@/components/atoms/Forms/ButtonSelectionInput";


export interface HoraireSelectProps {
    /**
     * React-hook-form control
     */
    control: Control<any>;
}

// liste des horaires possibles
export const horaires: ButtonSelectionOption[] = [
    {
        label: <p className='w-full'>Matinée</p>,
        value: "Matinée",
    },
    {
        label: <p className='w-full'>Mi-journée</p>,
        value: "Mi-journée",
    },
    {
        label: <p className='w-full'>Après-midi</p>,
        value: "Après-midi",
    },
    {
        label: <p className='w-full'>Fin d&apos;après-midi</p>,
        value: "Fin d'après-midi",
    }
];

export default function HoraireSelect(props: HoraireSelectProps) {
    const { control } = props;
    return (
        <ButtonSelectionInput
            options={horaires}
            name="creneau"
            control={control}
            style="stretch-2"
        />
    );
}