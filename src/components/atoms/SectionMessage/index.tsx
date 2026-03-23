import { ReactNode } from 'react';

interface SectionMessageProps {
    children: ReactNode;
    type?: 'primary' | 'secondary' | undefined;
    className?: string;
    justify?: boolean;
}

export default function SectionMessage(props: SectionMessageProps) {
    const { children, type, className = '', justify = true } = props;

    const typeStyles = type === 'secondary'
        ? 'px-4 py-8'
        : 'px-4 py-8';

    const justifyClass = justify ? 'justify-center' : '';

    return (
        <div className={`${typeStyles} ${className}`}>
            <div className={`items-center justify-center flex ${justifyClass} gap-2`}>
                {children}
            </div>
        </div>
    );
}
