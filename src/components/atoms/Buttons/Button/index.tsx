import { ReactNode } from 'react';

interface ButtonProps {
    /**
     * Add particular classes
     */
    className?: string;
    /**
     * How large should the button be?
     */
    size?: 'small' | 'medium' | 'large';
    /**
     * Button contents
     */
    fullWidth?: boolean;
    /**
     * Optional click handler
     */
    onClick?: () => void;
    /*
    * Inside the button
    */
    children: ReactNode;
    /**
     * Validate a form
     */
    form?: string;
    /**
     * Button type
     */
    type?: "button" | "submit" | "reset" | undefined;
    /**
     * Button style
     */
    style?: "yellow" | undefined;
}


export default function Button(props: ButtonProps) {
    const { children, fullWidth, onClick, className, form, style } = props;

    return (
        <button
            onClick={onClick}
            type={form ? "submit" : "button"}
            form={form}
            className={`${fullWidth ? 'w-full' : ''} 
            ${className || ''} ${style || 'font-bold text-ge-gray-1 bg-ge-yellow hover:bg-gray-900'} font-gilroy inline-flex items-center justify-center h-12 px-6 tracking-wide transition duration-200 focus:shadow-outline focus:outline-none`}>
            {children}
        </button>
    )
}