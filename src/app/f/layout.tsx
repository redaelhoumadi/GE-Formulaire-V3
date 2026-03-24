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
import RecapInterventionCard from "@/components/atoms/RecapitulatifLive";



const mapPaths = new Map([
    ["/f/diagnostic", {
        title: 'Diagnostic',
        stepNo: 1,
        step: '1/4',
        stepPercent: '25%',
        headerImgMobileSrc: '/images/reusable/image-header-mobile-1.jpg',
        headerImgDesktopSrc: '/images/reusable/image-header-pc-1.jpg'
    }],
    ["/f/vehicule", {
        title: 'Véhicule',
        stepNo: 2,
        step: '2/4',
        stepPercent: '50%',
        headerImgMobileSrc: '/images/reusable/image-header-mobile-2.jpg',
        headerImgDesktopSrc: '/images/reusable/image-header-pc-2.jpg'
    }],
    ["/f/rendez-vous", {
        title: 'Rendez-vous',
        stepNo: 3,
        step: '3/4',
        stepPercent: '75%',
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

    const stepDiagnostic = useStore(useFormStore, (state) => state.stepDiagnostic);

    // show aside seulement si l'utilisateur a fait le choix du début
    const showAside =
        Boolean(stepDiagnostic) && activeStep?.stepNo !== 5;


    if ((activeStep && activeStep.stepNo != 1) && (maxStep == -1 || (activeStep && activeStep.stepNo > maxStep + 1))) {
        redirect('/f/diagnostic');
    }

    return (
        <main className="min-h-screen bg-ge-gray-5">
            <ScrollUp />

            <div className="z-10 bg-ge-gray-5">
                {activeStep?.stepNo != 5 && (
                    <NavBar
                        stepNo={activeStep?.stepNo}
                        step={activeStep?.step}
                        stepPercent={activeStep?.stepPercent}
                        title={activeStep?.title}
                    />
                )}

                {/* ── Page content ── */}
                <div className="xl:px-52 pt-[72px] xl:pt-28">
                    <div className="xl:mx-auto xl:max-w-7xl">
                        <div className="flex xl:flex-row xl:gap-5 flex-col-reverse">

                            {/* MAIN CONTENT — pleine largeur si aside masqué */}
                            <div className={`${showAside ? 'xl:flex-1 xl:min-w-0' : 'w-full'} step-enter`}>
                                <div className="mx-4 xl:mx-auto xl:container pb-8">
                                    {children}
                                </div>
                            </div>

                            {/* ASIDE — largeur fixe, ne rétrécit jamais */}
                            <aside className="xl:mt-4 xl:mx-2 xl:w-[280px] xl:shrink-0 xl:px-1">
                                <div className="sticky top-[7rem] flex flex-col gap-4">
                                    {showAside && (
                                        <RecapInterventionCard />
                                    )}
                                    <div>
                                        <ImageHeader
                                            srcMobile={activeStep?.headerImgMobileSrc}
                                            srcDesktop={activeStep?.headerImgDesktopSrc}
                                        />
                                    </div>
                                </div>
                            </aside>

                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
