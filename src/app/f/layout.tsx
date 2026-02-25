"use client";
import React from "react";

// internal components
import NavBar from '@/components/atoms/NavBar';
import { usePathname } from "next/navigation";
import { useEffect } from 'react';
import useFormStore from "@/store/form";
import { redirect } from 'next/navigation'
import useStore from "@/store/useStore";
import ScrollUp from "@/components/atoms/ScrollUp";
import ImageHeader from "@/components/atoms/ImageHeader";
import Card from "@/components/atoms/Card";
import SectionHeader from "@/components/atoms/SectionHeader";
import Image from "next/image";

const mapPaths = new Map([
    ["/f/diagnostic", {
        title: 'Diagnostic',
        stepNo: 1,
        step: '1/4',
        stepPercent: '40%',
        headerImgMobileSrc: '/images/reusable/image-header-mobile-1.jpg',
        headerImgDesktopSrc: '/images/reusable/image-header-pc-1.jpg'
    }],
    ["/f/vehicule", {
        title: 'Véhicule',
        stepNo: 2,
        step: '2/4',
        stepPercent: '70%',
        headerImgMobileSrc: '/images/reusable/image-header-mobile-2.jpg',
        headerImgDesktopSrc: '/images/reusable/image-header-pc-2.jpg'
    }],
    ["/f/rendez-vous", {
        title: 'Rendez-vous',
        stepNo: 3,
        step: '3/4',
        stepPercent: '80%',
        headerImgMobileSrc: '/images/reusable/image-header-mobile-3.jpg',
        headerImgDesktopSrc: '/images/reusable/image-header-pc-3.jpg'
    }],
    ["/f/coordonnees", {
        title: 'Coordonnées',
        stepNo: 4,
        step: '4/4',
        stepPercent: '100%',
        headerImgMobileSrc: '/images/reusable/image-header-mobile-4.jpg',
        headerImgDesktopSrc: '/images/reusable/image-header-pc-4.jpg'
    }],
    ["/f/recapitulatif", {
        stepNo: 5,
        stepPercent: '100%',
        headerImgMobileSrc: '/images/reusable/image-header-mobile-5.jpg',
        headerImgDesktopSrc: '/images/reusable/image-header-pc-5.jpg'
    }],
    ["", {
        title: '',
        step: '',
        stepNo: 1,
        headerImgMobileSrc: '',
        headerImgDesktopSrc: ''
    }]
]);


export default function Layout({ children }: any) {
    const pathname: string = usePathname() || "";
    const activeStep = mapPaths.get(pathname);
    const maxStep = useStore(useFormStore, (state) => state.maxStep) || -1;

    /* useEffect(() => {
        const disableRightClick = (e: any) => {
            e.preventDefault();
        };
        document.addEventListener('contextmenu', disableRightClick);

        return () => {
            document.removeEventListener('contextmenu', disableRightClick);
        };
    }, []);

    useEffect(() => {
        const disableCopyCutPaste = (e: any) => {
            e.preventDefault();
            console.log('Cette action est désactivée sur ce site.');
        };

        document.addEventListener('copy', disableCopyCutPaste);
        document.addEventListener('cut', disableCopyCutPaste);
        document.addEventListener('paste', disableCopyCutPaste);

        return () => {
            document.removeEventListener('copy', disableCopyCutPaste);
            document.removeEventListener('cut', disableCopyCutPaste);
            document.removeEventListener('paste', disableCopyCutPaste);
        };
    }, []); */


    if ((activeStep && activeStep.stepNo != 1) && (maxStep == -1 || (activeStep && activeStep.stepNo > maxStep + 1))) {
        redirect('/f/diagnostic');
    }

    return (
        <main className="min-h-screen xl:items-center xl:pt-28 bg-white xl:bg-ge-gray-5">
            <ScrollUp />
            <div className="z-10 xl:px-52 bg-ge-gray-5">
                {activeStep?.stepNo != 5 && <NavBar
                    stepNo={activeStep?.stepNo}
                    step={activeStep?.step}
                    stepPercent={activeStep?.stepPercent}
                    title={activeStep?.title}
                />
                }
                <div className="xl:mx-auto xl:max-w-7xl">
                    {/* <div className="xl:mx-24"> */}
                    <div className="mt-14 xl:mt-0 xl:flex xl:flex-row xl:gap-3 flex-col-reverse flex xl:block">
                        
                        <div className="xl:basis-3/4">
                            <div className="xl:container mx-5 xl:mx-auto">
                                {children}
                            </div>
                        </div>

                        <div className="xl:mt-4 xl:mx-4 xl:top-0 xl:basis-1/4 flex-col gap-2 flex">
                        <Card className="sticky top-[8rem] my-0 mb-4">
                            <SectionHeader className='mt-5 mb-12'>
                                      Récapitulatif
                                    </SectionHeader>
                        </Card>
                            {/*<ImageHeader
                                srcMobile={activeStep?.headerImgMobileSrc}
                                srcDesktop={activeStep?.headerImgDesktopSrc}
                            />*/}
                            <div className="sticky top-[18rem] my-0">
                                <Image 
                            src="/images/reusable/Google-Ratings.png"
                            alt="Description de l'image"
                            width={500}
                            height={300}
                            priority
                            /></div>
                            
                        </div>
                    </div>
                </div>
            </div>

        </main>)
}