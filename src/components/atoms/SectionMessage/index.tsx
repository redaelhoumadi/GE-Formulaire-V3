import { ReactNode } from 'react';
import { bool } from 'yup';

interface SectionMessageProps {
    /*
    * Inside the header
    */
    children: ReactNode;
    /**
     * Header type
     */
    type?: 'primary' | 'secondary' | undefined;
    /**
     * Adding styles
     */
    className?: string;
    /**
     * Justify content
     */
    justify?: boolean;
}


export default function SectionMessage(props: SectionMessageProps) {
    const { children, type, className = '', justify = true } = props;
    let typeProp = 'font-bold text-xl';
    typeProp = type == 'secondary' ? '' : typeProp;
    const justifyProp = justify ? 'justify-center' : '';

    return (
        <header className={`${typeProp} text-ge-gray-1`}>
            <div className={`${className} items-center flex ${justifyProp}`}>
                {children}
            </div>
        </header>
    )
}