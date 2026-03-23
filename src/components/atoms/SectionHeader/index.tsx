import { ReactNode } from 'react';

interface SectionHeaderProps {
    children: ReactNode;
    type?: "primary" | "secondary";
    className?: string;
    id?: string;
}

export default function SectionHeader(props: SectionHeaderProps) {
    const { children, className = '', id, type = "primary" } = props;

    const accentColor = type === "primary"
        ? "border-ge-yellow"
        : "border-ge-gray-3";

    return (
        <header
            id={id}
            className={`
                ${className}
                ${accentColor}
                relative
                border-l-[5px] pl-3
                font-extrabold text-ge-gray-1
                text-base md:text-xl
                leading-snug
                tracking-tight
            `}
        >
            {children}
        </header>
    );
}
