import { ReactNode } from 'react';

interface TextInputProps {
    className?: string;
    placeholder?: string;
    size?: 'small' | 'medium' | 'large';
    type: 'text' | 'numeric' | 'email';
    fullWidth?: boolean;
    label?: ReactNode;
    onClick?: () => void;
    onBlur?: () => void;
    required?: boolean;
    name: string;
    validated?: boolean;
    invalid?: boolean;
    register?: any;
    maxLength?: number;
}

export default function TextInput(props: TextInputProps) {
    const {
        onBlur,
        required = false,
        maxLength,
        register = (() => {}),
        invalid,
        label,
        type,
        fullWidth,
        className = '',
        name,
        placeholder = '',
        validated = false,
    } = props;

    const fullWidthProp = fullWidth ? 'w-full' : '';

    const borderClass = invalid
        ? 'border-ge-red focus:border-ge-red focus:ring-ge-red/15'
        : validated
        ? 'border-ge-green focus:border-ge-green focus:ring-ge-green/15'
        : 'border-ge-gray-3 focus:border-ge-green focus:ring-ge-green/15';

    return (
        <div className={`relative mb-5 w-full group ${className}`}>
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

            {/* Invalid icon */}
            {invalid && !validated && (
                <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none z-10">
                    <div className="w-5 h-5 rounded-full bg-ge-red/10 flex items-center justify-center">
                        <svg className="w-3 h-3 text-ge-red" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                    </div>
                </div>
            )}

            <input
                maxLength={maxLength}
                type={type}
                id={name}
                className={`
                    ${borderClass}
                    ${fullWidthProp}
                    peer
                    pt-5 pb-2 px-4
                    bg-white
                    border rounded-md
                    text-ge-gray-1 text-sm
                    transition-all duration-200
                     focus:outline-none
                    placeholder-transparent
                    ${validated ? 'pr-10' : ''}
                `}
                placeholder=" "
                {...register(name, { onBlur })}
                required={required}
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
                    <span className="ml-1.5 text-xs text-ge-red font-semibold">— Champ invalide</span>
                )}
            </label>
        </div>
    );
}
