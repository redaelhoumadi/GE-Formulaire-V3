import { ReactNode } from 'react';

interface TextareaProps {
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
     * Type of the button
     */
    type: 'text' | 'numeric' | 'email';
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
     * Validate a form
     */
    required?: boolean;
    /**
     * Button type
     */
    name?: string;
    /**
     * React-hook-form registration
     */
    register?: any;
    /**
     * max length
     */
    maxLength?: number;
}


export default function Textarea(props: TextareaProps) {
    const { maxLength, register = (() => { }), label, fullWidth, name, placeholder = '' } = props;
    const fullWidthProp = fullWidth ? 'w-full' : '';
    const classNameProps = 'border border-ge-gray-3 text-ge-gray-1 text-xs:text-base focus:ring-ge-gray-1 focus:border-ge-gray-1 rounded-md';
    return (
        <div className={`relative z-0 mb-6 w-full group mb-6`}>
<textarea
                    maxLength={maxLength}
                    {...register(name)}
                    rows={4}
                    className={`block ${fullWidthProp} block py-2.5 appearance-none bg-transparent ${classNameProps} peer p-2.5`}
                    placeholder={placeholder}>
                </textarea>
        <label
            htmlFor={name}
            className="absolute ml-3 text-sm text-ge-gray-1 duration-300 transform -translate-y-3 scale-75 top-3  origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0">
            {label}
        </label>

    </div>
    )
}