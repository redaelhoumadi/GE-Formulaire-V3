import { ReactNode } from 'react';

interface TextareaProps {
    className?: string;
    placeholder?: string;
    size?: 'small' | 'medium' | 'large';
    type: 'text' | 'numeric' | 'email';
    fullWidth?: boolean;
    label?: ReactNode;
    onClick?: () => void;
    required?: boolean;
    name?: string;
    register?: any;
    maxLength?: number;
}

export default function Textarea(props: TextareaProps) {
    const { maxLength, register = (() => {}), label, fullWidth, name, placeholder = '' } = props;
    const fullWidthProp = fullWidth ? 'w-full' : '';

    return (
        <div className="relative mb-5 w-full group">
            {label && (
                <label
                    htmlFor={name}
                    className="block ml-1 mb-2 text-xs font-medium text-ge-gray-3"
                >
                    {label}
                </label>
            )}
            <textarea
                maxLength={maxLength}
                {...register(name)}
                id={name}
                rows={4}
                className={`
                    ${fullWidthProp}
                    bg-white
                    border border-ge-gray-3 rounded-md
                    text-ge-gray-1 text-sm
                    px-4 py-3
                    transition-all duration-200
                    focus:border-ge-green  focus:ring-ge-green/10 focus:outline-none
                    placeholder:text-ge-gray-3
                    resize-none
                `}
                placeholder={placeholder || 'Votre message (facultatif)'}
            />
            {maxLength && (
                <p className="text-[10px] text-ge-gray-3 text-right mt-1">
                    {maxLength} caractères max.
                </p>
            )}
        </div>
    );
}
