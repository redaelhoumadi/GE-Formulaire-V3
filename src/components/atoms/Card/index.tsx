import { ReactNode } from "react";

interface CardProps {
    children: ReactNode;
    className?: string;
    type?: "primary" | "secondary";
    id?: string;
    hoverable?: boolean;
}

export default function Card(props: CardProps) {
    const { children, className = '', type = 'primary', id, hoverable = false } = props;

    const typeStyles = type === 'primary'
        ? 'bg-white shadow-[0_1px_4px_rgba(0,0,0,0.02),0_1px_4px_rgba(0,0,0,0.02)]'
        : 'bg-ge-gray-5';

    const hoverStyles = hoverable
        ? 'transition-all duration-250 hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(0,0,0,0.10),0_2px_8px_rgba(0,0,0,0.06)]'
        : '';

    return (
        <div
            id={id}
            className={`
                ${className}
                ${typeStyles}
                ${hoverStyles}
                w-full px-6 lg:px-10 py-5 my-4 rounded-2xl
            `}
        >
            <div className="xl:mx-10">
                {children}
            </div>
        </div>
    );
}
