import { ReactNode } from 'react';

interface ButtonPictoProps {
    className?: string;
    size?: 'small' | 'medium' | 'large';
    fullWidth?: boolean;
    onClick?: () => void;
    children: ReactNode;
    form?: string;
    type?: "button" | "submit" | "reset" | undefined;
    style?: "fill" | "selected" | "default" | undefined;
}

export default function ButtonPicto(props: ButtonPictoProps) {
    const { children, fullWidth, onClick, className = '', form, style } = props;

    let styleProp = '';

    if (style === 'selected') {
        styleProp = `
            bg-yellow-400
            border border-ge-yellow
            text-ge-gray-1
            shadow-[0_2px_12px_rgba(252,205,34,0.25)]
            scale-[1.02]
        `;
    } else if (style === 'fill') {
        styleProp = '';
    } else {
        // default
        styleProp = `
            bg-white
            border border-ge-gray-3
            text-ge-gray-1
            hover:border-ge-yellow/60
            hover:bg-ge-yellow/5
        `;
    }

    return (
        <button
            onClick={onClick}
            type={form ? "submit" : "button"}
            form={form}
            className={`
                ${fullWidth ? 'w-full' : ''}
                ${className}
                ${styleProp}
                font-semibold
                text-xs md:text-sm
                py-4
                px-3
                items-center
                mr-2 mb-3
                rounded-md
                transition-all duration-200
                focus:outline-none
                focus:ring-2 focus:ring-ge-yellow/40
                cursor-pointer
                select-none
            `}
        >
            {children}
        </button>
    );
}
