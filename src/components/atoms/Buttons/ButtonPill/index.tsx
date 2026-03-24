import { ReactNode } from 'react';

interface ButtonPillProps {
    className?: string;
    size?: 'small' | 'medium' | 'large';
    fullWidth?: boolean;
    onClick?: () => void;
    children: ReactNode;
    form?: string;
    type?: "button" | "submit" | "reset" | undefined;
    style?: "success" | "disabled" | undefined;
    padding?: string;
    hover?: boolean;
}

export default function ButtonPill(props: ButtonPillProps) {
    const { children, padding, fullWidth, onClick, className = '', form, hover, style } = props;

    let styleProp = '';

    if (style === 'success') {
        styleProp = `
            bg-ge-green text-white
            shadow-[0_4px_14px_rgba(78,173,57,0.35)]
            hover:shadow-[0_6px_20px_rgba(78,173,57,0.50)]
            hover:bg-[#44a032]
            active:scale-[0.97]
            transition-all duration-200
        `;
    } else if (style === 'disabled') {
        styleProp = `
            bg-ge-gray-2 text-white
            cursor-not-allowed
            opacity-70
        `;
    } else {
        // ghost / back button
        styleProp = `
            text-ge-gray-3
            hover:text-ge-gray-1
            transition-colors duration-150
        `;
        if (hover) {
            styleProp += ' hover:bg-ge-green-2';
        }
    }

    const paddingProp = padding ?? 'py-3';

    return (
        <button
            onClick={onClick}
            type={form ? "submit" : "button"}
            form={form}
            disabled={style === "disabled"}
            className={`
                ${fullWidth ? 'w-full' : ''}
                ${className}
                ${styleProp}
                font-bold
                focus:outline-none
                rounded-full
                ${paddingProp}
                text-center
                select-none
            `}
        >
            {children}
        </button>
    );
}
