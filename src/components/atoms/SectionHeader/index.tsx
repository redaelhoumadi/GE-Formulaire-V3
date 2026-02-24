import { ReactNode } from 'react';

interface SectionHeaderProps {
    /*
    * Inside the header
    */
    children: ReactNode;
    /**
     * Header type
     */
    type?: "primary" | "secondary";
    /**
     * ClassName
     */
    className?: string;
    /**
     * Identifier
     */
    id?: string;
}


export default function SectionHeader(props: SectionHeaderProps) {
    const { children, className, id, type = "primary" } = props;
    const typeProp = type == "primary" ? "border-ge-yellow" : "border-ge-gray-3";
    return (
        <header id={id} className={`${className} ${typeProp} border-l-8 pl-2 font-extrabold text-ge-gray-1 text-base md:text-xl`}>
            {children}
        </header>
    )
}