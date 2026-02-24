import { ReactNode } from "react";


interface CardProps {
    children: ReactNode;
    className?: string;
    type?: "primary" | "secondary";
    id?: string;
}


export default function Card(props: CardProps) {
    const { children, className, type = 'primary', id } = props;
    const typeProp = type == "primary" ? 'bg-white' : '';
    return (
        <div id={id} className={`${className} ${typeProp} w-full px-6 lg:px-22 py-3 my-4 rounded-xl`}>
            <div className="xl:mx-20">
                {children}
            </div>
        </div>
    )
}