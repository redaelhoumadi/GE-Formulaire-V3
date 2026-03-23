import { ReactNode } from 'react';
import { Control, Controller } from 'react-hook-form';
import { Phone } from 'lucide-react';

interface PhoneInputProps {
    className?: string;
    placeholder?: string;
    size?: 'small' | 'medium' | 'large';
    fullWidth?: boolean;
    label?: ReactNode;
    onClick?: () => void;
    onChange?: () => void;
    required?: boolean;
    name: string;
    validated?: boolean;
    invalid?: boolean;
    control: Control<any>;
}

export default function PhoneInput(props: PhoneInputProps) {
    const {
        required = false,
        control,
        onChange = () => {},
        invalid,
        label,
        fullWidth,
        className = '',
        name,
        validated = false,
    } = props;

    const fullWidthProp = fullWidth ? 'w-full' : '';

    const borderClass = invalid
        ? 'border-ge-red focus:border-ge-red focus:ring-ge-red/15'
        : validated
        ? 'border-ge-green focus:border-ge-green focus:ring-ge-green/15'
        : 'border-ge-gray-3 focus:border-ge-green focus:ring-ge-green/15';

    const onInputChange = (onChangeController: any) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        let sanitizedValue: string = value.replace(/\D/g, '');
        sanitizedValue = sanitizedValue.match(/.{1,2}/g)?.join(' ') || '';
        onChangeController(sanitizedValue);
        onChange();
    };

    return (
        <div className={`relative mb-5 w-full group ${className}`}>
            {/* Phone icon */}
            {/* Validated check */}
            {validated && (
                <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none z-10">
                    <div className="check-pop w-5 h-5 rounded-full bg-ge-green flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                </div>
            )}
            <Controller
                control={control}
                name={name}
                render={({ field: { value, onChange: onChangeCtrl } }) => (
                    <input
                        type="tel"
                        maxLength={14}
                        minLength={14}
                        value={value || ''}
                        id={name}
                        className={`
                            ${borderClass}
                            ${fullWidthProp}
                            peer
                            pl-4 pr-10 pt-5 pb-2
                            bg-white
                            border rounded-md
                            text-ge-gray-1 text-sm
                            transition-all duration-200
                             focus:outline-none
                            placeholder-transparent
                        `}
                        placeholder=" "
                        onChange={onInputChange(onChangeCtrl)}
                        required={required}
                    />
                )}
            />

            <label
                htmlFor={name}
                className={`
                    cursor-text absolute left-4 top-3.5
                    text-xs font-medium
                    transition-all duration-200
                    peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-placeholder-shown:font-normal
                    peer-[&:not(:placeholder-shown)]:top-1.5 peer-[&:not(:placeholder-shown)]:text-xs peer-[&:not(:placeholder-shown)]:font-medium
                    peer-focus:top-1.5 peer-focus:text-xs peer-focus:font-medium peer-focus:text-ge-green
                    ${invalid ? 'text-ge-red' : validated ? 'text-ge-green' : 'text-ge-gray-3'}
                    pointer-events-none
                `}
            >
                {label}
                {invalid && (
                    <span className="ml-1.5 text-xs text-ge-red font-semibold">— Invalide</span>
                )}
            </label>
        </div>
    );
}
