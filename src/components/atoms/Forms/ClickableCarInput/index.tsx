import ClickableCar from "../ClickableCar"
import { Control, Controller } from 'react-hook-form';

interface ClickableCarPcInputProps {
    /**
     * Button name
     */
    name: string;
    /**
     * React-hook-form control
     */
    control: Control<any>;
    /**
     * Optional click handler
     */
    onClick?: () => void;
}


export default function ClickableCarPcInput(props: ClickableCarPcInputProps) {
    const { name, control, onClick } = props;
    return (
        <Controller
            control={control}
            name={name}
            render={({ field: { value, onChange } }) => (
                <ClickableCar
                    value={value}
                    onChange={(e: any) => { onChange(e); onClick?.(); }}
                />
            )}
        />
    )
}