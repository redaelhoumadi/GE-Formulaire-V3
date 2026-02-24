import ClickableCar from "../ClickableCar"
import { Control, Controller } from 'react-hook-form';
import ClickableCarPc from "../ClickableCarPc";

interface ClickableCarInputProps {
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


export default function ClickableCarInput(props: ClickableCarInputProps) {
    const { name, control, onClick } = props;
    return (
        <Controller
            control={control}
            name={name}
            render={({ field: { value, onChange } }) => (
                <ClickableCarPc
                    value={value}
                    onChange={(e: any) => { onChange(e); onClick?.(); }}
                />
            )}
        />
    )
}