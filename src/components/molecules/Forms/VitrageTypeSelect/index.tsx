import { Control, FieldError } from "react-hook-form";
// Internal components
import ButtonSelectionInput, { ButtonSelectionOption } from "@/components/atoms/Forms/ButtonSelectionInput";


export interface VitrageTypeSelectProps {
    /**
     * Field name
     */
    name: string;
    /**
     * React-hook-form control
     */
    control: Control<any>;
    /**
     * React-hook-form errors
     */
    errors?: any; // FieldError;
}

// liste des vitrages possibles
export const vitrages: ButtonSelectionOption[] = [
    {
        label: <p className='w-full'>Pare-brise</p>,
        value: "Pare-Brise",
    },
    {
        label: <p className='w-full'>Lunette arrière</p>,
        value: "Lunette arrière",
    },
    {
        label: <p className='w-full'>
            Autres<br />
            <span className='text-xs text-ge-gray-3'>(Vitre latérale, toit panoramique, plusieurs vitres)</span>
        </p>,
        value: "Autres (Vitre latérale, toit panoramique, plusieurs vitres)",
    }
];

export default function VitrageTypeSelect(props: VitrageTypeSelectProps) {
    const { name, control, errors } = props;
    return (
        <ButtonSelectionInput
            options={vitrages}
            name={name}
            control={control}
            errors={errors}
        />
    );
}