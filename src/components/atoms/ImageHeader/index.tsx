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
                className="hidden mb-4 xl:block w-30 rounded-2xl border-ge-gray-4 shadow-[0_2px_16px_rgba(0,0,0,0.06),0_1px_4px_rgba(0,0,0,0.04)]"
                priority
                src={srcDesktop || ''}
                alt="Header rouge"
                width={1700}
                height={400}
            />
        </>
    )
}