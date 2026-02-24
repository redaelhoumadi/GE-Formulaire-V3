import { ReactNode } from 'react';

interface ButtonPictoProps {
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
    style?: "fill" | "selected" | "default" | undefined;
}


export default function ButtonPicto(props: ButtonPictoProps) {
    const { children, fullWidth, onClick, className, form, style } = props;

    let styleProp = 'text-ge-gray-1 bg-transparent border-1 hover:border-ge-yellow border border-ge-gray-3 focus:ring-4 focus:outline-none focus:ring-gray-100 font-bold text-xs md:text-sm px-5 py-3 items-center mr-2 mb-2 rounded-md';
    styleProp = style == "fill" ? '' : styleProp
    styleProp = style == "selected" ? 'text-ge-gray-1 border-1 bg-ge-yellow hover:border-ge-yellow border border-ge-yellow focus:ring-4 focus:outline-none focus:ring-gray-100 font-bold text-xs md:text-sm px-5 py-3 items-center mr-2 mb-2 rounded-md' : styleProp

    return (
        <button
            onClick={onClick}
            type={form ? "submit" : "button"}
            form={form}
            className={`${fullWidth ? 'w-full' : ''} 
            ${className || ''} ${styleProp}`}>
            {children}
        </button>
    )
}