import Image from 'next/image';
import Link from 'next/link';
import Telephone from '@public/images/components/TelephoneWhite.svg';
import { useState } from 'react';
import CallbackInput from '../Forms/CallbackInput';
import ButtonPill from '../Buttons/ButtonPill';

interface NavBarProps {
    step?: string;
    stepNo?: number;
    stepPercent?: string;
    title?: string;
}

export default function NavBar(props: NavBarProps) {
    const { step, stepPercent, title, stepNo } = props;
    const [viewPhone, setViewPhone] = useState(false);
    const switchViewPhone = () => setViewPhone(!viewPhone);

    return (
        <>
            <nav className="block xl:hidden bg-white fixed w-full z-20 top-0 left-0">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-center mx-auto xl:container p-3 xl:px-52">
                    <div className="w-full font-medium text-ge-gray-3" id="navbar-sticky">
                        <div className="grid grid-cols-8 gap-4">
                            <div className='col-start-3 col-span-4 xl:col-start-4 xl:col-span-2'>
                                <h3 className="text-center text-[10px] xl:text-md p-0">Étape {step}</h3>
                                <h1 className="text-center font-bold text-sm xl:text-xl leading-3">{title}</h1>
                            </div>
                            <div className="col-span-2 xl:col-span-3 flex justify-end">
                                <div className="self-center">
                                    <ButtonPill padding="py-1 px-4" className="cursor-pointer" style="success">
                                        <Link href="tel:0800100244">
                                            <Image
                                                className="w-6 h-5 xl:hidden"
                                                priority
                                                src={Telephone}
                                                alt="Telephone"
                                            />
                                        </Link>
                                    </ButtonPill>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full z-10 xl:container xl:px-52 xl:mx-auto">
                    <div className='bg-ge-gray-4 rounded-r-full rounded-l-full'>
                        <div className={`bg-ge-green h-1 rounded-r-full rounded-l-full percentBar`}></div>
                    </div>
                </div>
            </nav>

            <nav className="hidden xl:block bg-white fixed w-full z-20 top-0 left-0">
                <div className="max-w-screen-xl flex font-light flex-wrap items-center justify-center mx-auto xl:container p-4 xl:px-52">
                    
                    <div className="grid grid-cols-4 gap-2 text-ge-gray-3">
                        <div className={` ${stepNo && stepNo > 0 ? (stepNo && stepNo == 1 ? 'text-ge-green font-bold' :'opacity-50 text-ge-green') : 'text-ge-gray-1'}`}>
                            <h1 className="text-center text-md mx-12 my-2">Diagnostic</h1>
                            <span className={`py-1 w-full flex bg-ge-gray-4 rounded-xl ${stepNo && stepNo > 0 ? (stepNo && stepNo == 1 ? 'bg-ge-green text-ge-green font-bold' :'opacity-50 bg-ge-green') : 'bg-ge-gray-4'}`}></span>
                        </div>
                        <div className={`${stepNo && stepNo > 1 ? (stepNo && stepNo == 2 ? 'text-ge-green font-bold' :'opacity-50 text-ge-green') : 'text-ge-gray-3'}`}>
                            <h1 className="text-center text-md mx-12 my-2">Véhicule</h1>
                            <span className={`py-1 w-full flex bg-ge-gray-4 rounded-xl ${stepNo && stepNo > 1 ? (stepNo && stepNo == 2 ? 'bg-ge-green text-ge-green font-bold' :'opacity-50 bg-ge-green') : 'bg-ge-gray-4'}`}></span>
                        </div>
                        <div className={` ${stepNo && stepNo > 2 ? (stepNo && stepNo == 3 ? 'border-ge-green text-ge-green font-bold' :'border-ge-green opacity-50 text-ge-green') : 'border-ge-gray-4'}`}>
                            <h1 className="text-center text-md mx-12 my-2">Rendez-vous</h1>
                            <span className={`py-1 w-full flex bg-ge-gray-4 rounded-xl ${stepNo && stepNo > 2 ? (stepNo && stepNo == 3 ? 'bg-ge-green text-ge-green font-bold' :'opacity-50 bg-ge-green') : 'bg-ge-gray-4'}`}></span>
                        </div>
                        <div className={`${stepNo && stepNo > 3 ? (stepNo && stepNo == 4 ? 'border-ge-green text-ge-green font-bold' :'border-ge-green opacity-50 text-ge-green') : 'border-ge-gray-4'}`}>
                            <h1 className="text-center text-md mx-12 my-2">Coordonnées</h1>
                            <span className={`py-1 w-full flex bg-ge-gray-4 rounded-xl ${stepNo && stepNo > 3 ? (stepNo && stepNo == 4 ? 'bg-ge-green text-ge-green font-bold' :'opacity-50 bg-ge-green') : 'bg-ge-gray-4'}`}></span>
                        </div>
                    </div>
                    <div className="fixed right-12">
                        <div className="float-right">
                            <div className="self-center">
                                <Link href="tel:0800100244">
                                    <Image
                                        className="w-6 h-5 mr-3 xl:hidden"
                                        priority
                                        src={Telephone}
                                        alt="Telephone"
                                    />
                                </Link>
                            </div>
                            <CallbackInput
                                onClick={switchViewPhone}
                                open={viewPhone}
                            />
                        </div>
                    </div>
                </div>
            </nav>


            <style jsx>{`
                .percentBar {
                width: ${stepPercent}; 
                }
            `}</style>
        </>
    );
}