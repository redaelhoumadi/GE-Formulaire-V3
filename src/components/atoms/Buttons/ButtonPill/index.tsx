import { ReactNode } from 'react';

interface ButtonPillProps {
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
    style?: "success" | "disabled" | undefined;
    /**
     * Button style
     */
    padding?: string;
    /**
     * Hover style
     */
    hover?: boolean;
}


export default function ButtonPill(props: ButtonPillProps) {
    const { children, padding, fullWidth, onClick, className = '', form, hover, style } = props;
    // styles
    let styleProp = 'text-ge-gray-3';
    styleProp = style == "success" ? 'text-white bg-ge-green' : styleProp;
    styleProp = style == "disabled" ? 'disabled text-white bg-ge-gray-2' : styleProp;
    styleProp = hover ? styleProp + ' hover:bg-ge-green-2' : styleProp;
    const paddingProp = padding ?? 'py-2.5';

    return (
        <button
            onClick={onClick}
            type={form ? "submit" : "button"}
            form={form}
            disabled={style == "disabled"}
            className={`${fullWidth ? 'w-full' : ''} ${className}
            ${styleProp} font-bold focus:outline-none rounded-full ${paddingProp} text-center mr-2`}>
            {children}
        </button>
    )
}