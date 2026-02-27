import { Control, Controller, FieldError } from 'react-hook-form';
import { ReactNode } from "react";
import ButtonPicto from '../../Buttons/ButtonPicto';


export interface ButtonSelectionOption {
    label: ReactNode;
    value: string;
}

interface ButtonSelectionInputProps {
    /**
     * Options (buttons to display)
     */
    options: ButtonSelectionOption[];
    /**
     * React-hook-form control
     */
    control: Control<any>;
    /**
     * Name of the field
     */
    name: string;
    /**
     * Label of the input
     */
    label?: string;
    /**
     * Button invalid
     */
    invalid?: boolean;
    /**
     * React-hook-form errors
     */
    errors?: FieldError | null;
    /**
     * Style
     */
    style?: 'stretch' | 'default' | 'stretch-2';
    /**
     * onClick
     */
    onClick?: () => void;
};

const gridColsVariants = [
    '',
    'md:grid-cols-1',
    'md:grid-cols-2',
    'md:grid-cols-3',
    'md:grid-cols-4',
]

export default function   ButtonSelectionInput(props: ButtonSelectionInputProps) {
    const { options, control, name, label, onClick = () => { }, style = 'default' } = props;

    let styleProps = style == 'stretch' ? `md:grid ${gridColsVariants[options.length]} md:gap-8` : '';
    styleProps = style == 'stretch-2' ? 'grid grid-cols-2 gap-x-4 gap-y-2' : styleProps;

    return (
        <div>
            {label && <p className="block ml-4 mb-2 text-xs md:text-base font-bold text-ge-gray-1">{label}</p>}
            <Controller
                control={control}
                name={name}
                render={({ field: { value, onChange } }) => (
                    <div className={styleProps}>
                        {options.map((option) => (
                            <ButtonPicto
                                key={`formInput${name}_${option.value}`}
                                onClick={() => {
                                    onChange(option.value);
                                    onClick();
                                }}
                                style={value == option.value ? "selected" : "default"}
                                className=''
                                fullWidth>
                                {option.label}
                            </ButtonPicto>
                        ))}
                    </div>
                )}
            />
        </div>
    );
}