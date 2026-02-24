import { ReactNode } from 'react';
import Image from 'next/image'
import GreenCheck from "@public/images/components/GreenCheck.svg";
import { Control, Controller } from 'react-hook-form';

interface PhoneInputProps {
    /**
     * Add particular classes
     */
    className?: string;
    /**
     * Input placeholder
     */
    placeholder?: string;
    /**
     * How large should the button be?
     */
    size?: 'small' | 'medium' | 'large';
    /**
     * Button contents
     */
    fullWidth?: boolean;
    /*
    * Inside the button
    */
    label?: ReactNode;
    /**
     * Optional click handler
     */
    onClick?: () => void;
    /**
     * Optional onchange handler
     */
    onChange?: () => void;
    /**
     * Validate a form
     */
    required?: boolean;
    /**
     * Button type
     */
    name: string;
    /**
     * Button validated
     */
    validated?: boolean;
    /**
     * Button invalid
     */
    invalid?: boolean;
    /**
     * React-hook-form control
     */
    control: Control<any>;
}


export default function PhoneInput(props: PhoneInputProps) {
    const { required = false, control, onChange = () => { }, invalid, label, fullWidth, className = '', name, placeholder = '', validated = false } = props;
    const fullWidthProp = fullWidth ? 'w-full' : '';
    let classNameProps = 'border border-ge-gray-3 text-ge-gray-1 text-sm md:text-base focus:ring-ge-gray-1 focus:border-ge-gray-1 rounded-md';
    classNameProps = invalid ? 'border border-ge-red text-ge-gray-1 text-sm md:text-base focus:ring-ge-gray-1 focus:border-ge-gray-1 rounded-md' : classNameProps;

    const onInputChange = (onChangeController: any) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        let sanitazedValue: string = value.replace(/\D/g, '');
        sanitazedValue = sanitazedValue.match(/.{1,2}/g)?.join(' ') || '';
        onChangeController(sanitazedValue);
        onChange();
    };

    return (
        <div className="relative z-0 mb-6 w-full group mb-6">
            {validated && <div className="absolute inset-y-0 right-0 flex items-center pr-3.5 pointer-events-none">
                <Image
                    className="w-4 h-4 text-gray-500"
                    priority
                    src={GreenCheck}
                    alt="Champ valide"
                />
            </div>
            }
            <Controller
                control={control}
                name={name}
                render={({ field: { value, onChange } }) => (
                    <input
                        type="tel"
                        maxLength={14}
                        minLength={14}
                        value={value}
                        id={name}
                        className={`pr-10 pt-4 pb-1 block py-2.5 appearance-none bg-transparent peer p-2.5 ${classNameProps} ${fullWidthProp}`}
                        placeholder=" "
                        onChange={onInputChange(onChange)}
                        required={required} />
                )}
            />
            <label htmlFor={name} className="cursor-text absolute ml-3 text-sm text-ge-gray-1 duration-300 transform -translate-y-3 scale-75 top-3 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3">
                {label}
                {invalid && <span className="ml-2 text-xs text-ge-red font-medium">Champ invalide</span>}
            </label>
        </div>
    )
}