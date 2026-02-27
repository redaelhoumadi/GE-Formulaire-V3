import Image from 'next/image';
import { ReactNode } from 'react';

interface ImageHeaderProps {
    /**
     * Header type
     */
    srcMobile: string | undefined;
    /**
     * Header type
     */
    srcDesktop: string | undefined;
}


export default function ImageHeader(props: ImageHeaderProps) {
    const { srcMobile, srcDesktop } = props;
    return (
        <>
            <Image
                className="object-cover block xl:hidden"
                priority
                src={srcMobile || ''}
                alt="Header rouge"
                width={1700}
                height={400}
            />
            <Image
                className="hidden xl:block w-30 rounded-md"
                priority
                src={srcDesktop || ''}
                alt="Header rouge"
                width={1700}
                height={400}
            />
        </>
    )
}