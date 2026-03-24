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
                {activeStep?.stepNo !== 5 && (
                    <NavBar
                        stepNo={activeStep?.stepNo}
                        step={activeStep?.step}
                        stepPercent={activeStep?.stepPercent}
                        title={activeStep?.title}
                    />
                )}

                {/* ── Nav Récapitulatif ── */}
                {activeStep?.stepNo === 5 && (
                    <nav className="bg-white fixed w-full z-20 top-0 left-0 border-b border-ge-gray-4 shadow-sm">
                        <div className="flex items-center justify-center py-4 px-6">
                            <div className="flex items-center gap-2">
                                <div className="w-7 h-7 rounded-full bg-ge-green flex items-center justify-center">
                                    <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <h1 className="font-bold text-ge-gray-1 text-lg">Récapitulatif de votre RDV</h1>
                            </div>
                        </div>
                        <div className="h-1 bg-ge-green w-full" />
                    </nav>
                )}

                {/* ── Page content ── */}
                <div className="xl:px-52 pt-[72px] xl:pt-28">
                    <div className="xl:mx-auto xl:max-w-7xl">
                        <div className="flex xl:flex-row xl:gap-8">

                            {/* MAIN CONTENT — pleine largeur si aside masqué */}
                            <div className={`${showAside ? 'xl:flex-1 xl:min-w-0' : 'w-full'} step-enter`}>
                                <div className="mx-4 xl:mx-auto xl:container pb-8">
                                    {children}
                                </div>
                            </div>

                            {/* ASIDE — largeur fixe, ne rétrécit jamais */}
                            <aside className="xl:mt-4 xl:mx-2 xl:w-[280px] xl:shrink-0 xl:px-1">
                                <div className="sticky top-[7rem] flex flex-col gap-6">
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
