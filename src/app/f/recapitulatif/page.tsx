"use client";
import ButtonPill from '@/components/atoms/Buttons/ButtonPill';
import Image from 'next/image';
import TelephoneWhite from '@public/images/components/TelephoneWhite.svg';
import SectionHeader from '@/components/atoms/SectionHeader';
import Card from '@/components/atoms/Card';
import Link from 'next/link';
import { CheckCircle2, Car, Shield, MapPin, CalendarDays, User, Phone } from 'lucide-react';

// clickable car
import ClickableCar from '@/components/atoms/Forms/ClickableCar';
import ClickableCarPc from '@/components/atoms/Forms/ClickableCarPc';

// store
import useFormStore, { FormState } from '@/store/form';
import { useEffect } from 'react';


const formatDate = (date: Date | undefined) => {
    if (!date) return "";
    const dateObj = new Date(date);
    return `${String(dateObj.getDate()).padStart(2, '0')}/${String(dateObj.getMonth() + 1).padStart(2, '0')}/${dateObj.getFullYear()}`;
};

const RecapSection = ({
    icon,
    title,
    items,
}: {
    icon: React.ReactNode;
    title: string;
    items: (string | undefined | null)[];
}) => {
    const filtered = items.filter(Boolean) as string[];
    if (filtered.length === 0) return null;

    return (
        <div className="flex gap-3 py-3 border-b border-ge-gray-4 last:border-0">
            <div className="w-8 h-8 rounded-full bg-ge-green/10 flex items-center justify-center shrink-0 mt-0.5">
                {icon}
            </div>
            <div>
                <p className="text-[10px] font-bold text-ge-gray-3 uppercase tracking-wider mb-1">{title}</p>
                {filtered.map((item, i) => (
                    <p key={i} className="text-sm text-ge-gray-1 font-medium leading-snug">{item}</p>
                ))}
            </div>
        </div>
    );
};

const Advantage = ({ text }: { text: string }) => (
    <div className="flex items-center gap-2 rounded-xl px-3 py-2.5">
        <CheckCircle2 className="w-4 h-4 text-ge-green shrink-0" />
        <p className="text-sm text-ge-gray-1 font-medium">{text}</p>
    </div>
);

export default function RecapitulatifPage() {
    const submittedData: FormState = useFormStore();

    useEffect(() => {
        if (typeof window !== 'undefined' && window.localStorage) {
            localStorage.removeItem('glass-express-rdv-storage');
        }
    }, []);

    const prenom = submittedData.stepCoordonnees?.nom_prenom?.split(' ')[0] || '';
    const isAgence = submittedData.stepRendezVous?.type === "En agence";

    return (
        <>
            <div className="pt-4">

                {/* ── Hero confirmation ── */}
                <div className="bg-ge-green/5 border border-ge-green/20 rounded-2xl mx-0 xl:mx-0 px-6 py-6 flex flex-col xl:flex-row items-center gap-4">
                    {/* Big check */}
                    <div className="w-14 h-14 rounded-full bg-ge-green flex items-center justify-center shrink-0 shadow-[0_4px_14px_rgba(78,173,57,0.35)]">
                        <CheckCircle2 className="w-7 h-7 text-white" />
                    </div>
                    <div className="text-center xl:text-left">
                        <h2 className="font-extrabold text-ge-gray-1 text-xl md:text-2xl leading-tight">
                            {prenom ? `Merci ${prenom} !` : "Merci !"}
                        </h2>
                        <p className="text-ge-gray-1 text-sm mt-1">
                            Votre demande a bien été enregistrée. Un conseiller va vous appeler pour confirmer votre rendez-vous.
                        </p>
                    </div>
                </div>

                {/* ── Main card : car + recap ── */}
                <Card className="mt-4">
                    <div className="xl:grid xl:grid-cols-2 xl:gap-6 items-center">

                        {/* Car visual */}
                        <div className="flex justify-center xl:mb-0">
                            <div className="scale-110 block xl:hidden">
                                <ClickableCar value={submittedData.stepDiagnostic?.vitrage} disabled={true} />
                            </div>
                            <div className="scale-150 justify-center w-full hidden xl:flex items-center">
                                <ClickableCarPc value={submittedData.stepDiagnostic?.vitrage} disabled={true} />
                            </div>
                        </div>

                        {/* Recap details */}
                        <div className="divide-y divide-ge-gray-4">
                            <RecapSection
                                icon={<Car className="w-4 h-4 text-ge-green" />}
                                title="Diagnostic"
                                items={[
                                    submittedData.stepDiagnostic?.vitrage,
                                    submittedData.stepDiagnostic?.dommage,
                                ]}
                            />
                            <RecapSection
                                icon={<Shield className="w-4 h-4 text-ge-green" />}
                                title="Véhicule & Assurance"
                                items={[
                                    submittedData.stepVehicule?.marque_modele_vehicule
                                        ? `${submittedData.stepVehicule.marque_modele_vehicule}${submittedData.stepVehicule.immatriculation ? ` — ${submittedData.stepVehicule.immatriculation}` : ''}`
                                        : submittedData.stepVehicule?.immatriculation,
                                    submittedData.stepVehicule?.assurance,
                                ]}
                            />
                            <RecapSection
                                icon={<MapPin className="w-4 h-4 text-ge-green" />}
                                title="Lieu d'intervention"
                                items={[
                                    submittedData.stepRendezVous?.type,
                                    submittedData.stepRendezVous?.adresse || submittedData.stepRendezVous?.ville,
                                ]}
                            />
                            <RecapSection
                                icon={<CalendarDays className="w-4 h-4 text-ge-green" />}
                                title="Date & Créneau"
                                items={[
                                    [
                                        formatDate(submittedData.stepRendezVous?.date_souhaitee),
                                        submittedData.stepRendezVous?.creneau?.toLowerCase()
                                    ].filter(Boolean).join(', ') || null,
                                ]}
                            />
                            <RecapSection
                                icon={<User className="w-4 h-4 text-ge-green" />}
                                title="Vos coordonnées"
                                items={[
                                    submittedData.stepCoordonnees?.nom_prenom,
                                    submittedData.stepCoordonnees?.telephone?.replace(/^0/, '+33 '),
                                    submittedData.stepCoordonnees?.email,
                                ]}
                            />
                        </div>
                    </div>
                </Card>

                {/* ── Avantages ── */}
                <Card>
                    <SectionHeader className="mb-4">Vos avantages inclus</SectionHeader>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-2">
                        <Advantage text="Aucun frais ni démarches" />
                        <Advantage text={isAgence ? "Véhicule de prêt gratuit" : "Déplacement gratuit"} />
                        <Advantage text="Données non partagées" />
                    </div>
                </Card>

                {/* ── Contact ── */}
                <Card>
                    <SectionHeader className="mb-4">Une question ? Nous sommes là</SectionHeader>
                    <div className="flex justify-center mt-2">
                        <Link href="tel:0800100244">
                            <ButtonPill style="success" className="px-10">
                                <div className="flex items-center gap-2">
                                    <Image className="w-4 h-4" priority src={TelephoneWhite} alt="Téléphone" />
                                    <span>Nous appeler</span>
                                </div>
                            </ButtonPill>
                        </Link>
                    </div>
                </Card>

                {/* ── Back ── */}
                <div className="flex justify-center mb-8 mt-2">
                    <div onClick={submittedData.reset}>
                        <ButtonPill className="text-sm px-8">
                            ← Retour à l&apos;accueil du site
                        </ButtonPill>
                    </div>
                </div>

            </div>
        </>
    );
}
