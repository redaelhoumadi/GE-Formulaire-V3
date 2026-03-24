import Image from 'next/image';
import Link from 'next/link';
import Telephone from '@public/images/components/TelephoneWhite.svg';
import TelephonePC from '@public/images/components/TelephonePC.svg';
import { useState } from 'react';
import CallbackInput from '../Forms/CallbackInput';
import ButtonPill from '../Buttons/ButtonPill';

interface NavBarProps {
    step?: string;
    stepNo?: number;
    stepPercent?: string;
    title?: string;
}

const steps = [
    { label: 'Diagnostic', no: 1 },
    { label: 'Véhicule', no: 2 },
    { label: 'Rendez-vous', no: 3 },
    { label: 'Coordonnées', no: 4 },
];

export default function NavBar(props: NavBarProps) {
    const { step, stepPercent, title, stepNo } = props;
    const [viewPhone, setViewPhone] = useState(false);
    const switchViewPhone = () => setViewPhone(!viewPhone);

    return (
        <>
            {/* ── MOBILE NAV ── */}
            <nav className="block xl:hidden bg-white fixed w-full z-20 top-0 left-0 shadow-sm">
                <div className="flex items-center justify-between px-4 py-3">
                    {/* Step info */}
                    <div className="flex-1 text-center pl-24">
                        <p className="text-[10px] text-ge-gray-3 font-medium tracking-widest uppercase">
                            Étape {step}
                        </p>
                        <h1 className="font-extrabold text-ge-gray-1 text-sm leading-tight">{title}</h1>
                    </div>
                    {/* Phone CTA */}
                    <ButtonPill padding="py-1.5 px-3" className="cursor-pointer shrink-0" style="success">
                        <Link href="tel:0800100244" className="flex items-center gap-1.5">
                            <Image className="w-4 h-4" priority src={Telephone} alt="Téléphone" />
                            <span className="text-xs font-bold text-white">Appeler</span>
                        </Link>
                    </ButtonPill>
                </div>

                {/* Progress bar */}
                <div className="px-4 pb-2">
                    <div className="bg-ge-gray-4 rounded-full h-1.5 overflow-hidden">
                        <div
                            className="bg-ge-green h-full rounded-full percentBar transition-all duration-700"
                            style={{ width: stepPercent }}
                        />
                    </div>
                </div>
            </nav>

            {/* ── DESKTOP NAV ── */}
            <nav className="hidden xl:block bg-white fixed w-full z-20 top-0 left-0 border-b border-ge-gray-4">
                <div className="max-w-7xl mx-auto px-2 flex items-center justify-between py-4">

                    {/* Stepper — pill container unique */}
                    <div className="flex items-center bg-ge-gray-5 rounded-full gap-0">
                        {steps.map((s, index) => {
                            const isCompleted = stepNo !== undefined && stepNo > s.no;
                            const isActive = stepNo === s.no;
                            const isPending = stepNo !== undefined && stepNo < s.no;

                            return (
                                <div key={s.no} className="flex items-center">
                                    {/* Pill item */}
                                    <div className={`
                                        flex items-center gap-1.5 px-20 py-2 rounded-full
                                        text-sm font-semibold whitespace-nowrap
                                        transition-all duration-300
                                        ${isActive ? 'bg-ge-green text-white shadow-[0_2px_10px_rgba(78,173,57,0.35)]' : ''}
                                        ${isCompleted ? 'bg-transparent text-ge-green' : ''}
                                        ${isPending ? 'bg-transparent text-ge-gray-3' : ''}
                                    `}>
                                       
                                        {s.label}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Phone CTA */}
                    <div className="flex items-center gap-3">
                        <CallbackInput onClick={switchViewPhone} open={viewPhone} />
                    </div>
                </div>

                {/* Desktop progress bar (thin, at the very bottom of nav)
                <div className="h-0.5 bg-ge-gray-4">
                    <div
                        className="h-full bg-ge-green percentBar transition-all duration-700"
                        style={{ width: stepPercent }}
                    />
                </div> */}
            </nav>

            <style jsx>{`
                .percentBar {
                    width: ${stepPercent};
                }
            `}</style>
        </>
    );
}
