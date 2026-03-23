"use client";

import React, { useEffect, useMemo, useState } from "react";
import useFormStore, { FormState } from "@/store/form";
import { useRecapLiveStore } from "@/store/recap-live";
import { CheckCircle, Clock, Car, Shield, MapPin, User, Settings } from "lucide-react";
import SectionHeader from "@/components/atoms/SectionHeader";

type RecapItem = {
    id: string;
    icon: React.ReactNode;
    label: string;
    value: string;
};

function toText(v: unknown): string {
    if (v === null || v === undefined) return "";
    return String(v).trim();
}

function isFilled(v: unknown): boolean {
    return toText(v) !== "";
}

function formatDateFR(date: unknown) {
    const raw = toText(date);
    if (!raw) return "";
    const m = raw.match(/^(\d{4})-(\d{2})-(\d{2})/);
    if (m) return `${m[3]}/${m[2]}`;
    const d = new Date(raw);
    if (Number.isNaN(d.getTime())) return "";
    const dd = String(d.getDate()).padStart(2, "0");
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    return `${dd}/${mm}`;
}

function formatTimeFR(time: unknown) {
    const t = toText(time);
    if (!t) return "";
    if (/^\d{1,2}h\d{2}$/.test(t)) return t;
    if (/^\d{1,2}:\d{2}$/.test(t)) return t.replace(":", "h");
    return t;
}

const iconMap: Record<string, React.ReactNode> = {
    intervention: <Clock className="w-3.5 h-3.5 text-ge-green" />,
    dommage: <Settings className="w-3.5 h-3.5 text-ge-green" />,
    vehicule: <Car className="w-3.5 h-3.5 text-ge-green" />,
    assurance: <Shield className="w-3.5 h-3.5 text-ge-green" />,
    rdv: <MapPin className="w-3.5 h-3.5 text-ge-green" />,
    coord: <User className="w-3.5 h-3.5 text-ge-green" />,
};

function RecapRow({ item }: { item: RecapItem }) {
    return (
        <div className="flex items-start gap-3 py-2.5 border-b border-ge-gray-4 last:border-0 group">
            <div className="mt-0.5 w-6 h-6 rounded-full bg-ge-green/10 flex items-center justify-center shrink-0 group-hover:bg-ge-green/20 transition-colors">
                {item.icon}
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-[10px] font-semibold text-ge-gray-3 uppercase tracking-wider leading-none mb-0.5">
                    {item.label}
                </p>
                <p className="text-sm font-bold text-ge-gray-1 leading-snug">
                    {item.value}
                </p>
            </div>
        </div>
    );
}

export default function RecapInterventionCard({
    title = "Votre rendez-vous",
}: {
    title?: string;
}) {
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    const store = useFormStore() as FormState;
    const live = useRecapLiveStore();

    const stepDiagnostic = live.stepDiagnostic ?? store.stepDiagnostic ?? {};
    const stepVehicule = live.stepVehicule ?? store.stepVehicule ?? {};
    const stepRendezVous = live.stepRendezVous ?? store.stepRendezVous ?? {};
    const stepCoordonnees = live.stepCoordonnees ?? store.stepCoordonnees ?? {};

    const items = useMemo<RecapItem[]>(() => {
        const vitrage = toText((stepDiagnostic as any)?.vitrage);
        const dommage = toText((stepDiagnostic as any)?.dommage);
        const marqueModele = toText((stepVehicule as any)?.marque_modele_vehicule);
        const assurance = toText((stepVehicule as any)?.assurance);
        const rdvType = toText((stepRendezVous as any)?.type);
        const rdvVille = toText((stepRendezVous as any)?.ville);
        const rdvAdresse = toText((stepRendezVous as any)?.adresse);
        const rdvDate = formatDateFR((stepRendezVous as any)?.date_souhaitee);
        const rdvCreneau = formatTimeFR((stepRendezVous as any)?.creneau);
        const isCentre = rdvType.toLowerCase().includes("centre");
        const lieu = isCentre ? rdvVille : isFilled(rdvAdresse) ? rdvAdresse : rdvVille;
        const nom = toText((stepCoordonnees as any)?.nom_prenom);
        const email = toText((stepCoordonnees as any)?.email);
        const telephone = toText((stepCoordonnees as any)?.telephone) ||
            toText((stepCoordonnees as any)?.tel) ||
            toText((stepCoordonnees as any)?.phone) ||
            toText((stepCoordonnees as any)?.mobile);

        const out: RecapItem[] = [];

        if (isFilled(vitrage)) {
            out.push({
                id: "intervention",
                icon: iconMap.intervention,
                label: "Intervention",
                value: `Remplacement ${vitrage.toLowerCase()}`,
            });
            if (vitrage === "Pare-Brise" && isFilled(dommage)) {
                out.push({
                    id: "dommage",
                    icon: iconMap.dommage,
                    label: "Dommage",
                    value: dommage,
                });
            }
        }

        if (isFilled(marqueModele)) {
            out.push({ id: "vehicule", icon: iconMap.vehicule, label: "Véhicule", value: marqueModele });
        }

        if (isFilled(assurance)) {
            out.push({ id: "assurance", icon: iconMap.assurance, label: "Assurance", value: assurance });
        }

        if (isFilled(rdvDate) || isFilled(rdvCreneau) || isFilled(lieu)) {
            const dateCreneau = [rdvDate, rdvCreneau].filter(Boolean).join(" · ");
            const lieuLabel = lieu
                ? `${isCentre ? "Centre " : ""}${lieu}`
                : "—";
            out.push({
                id: "rdv",
                icon: iconMap.rdv,
                label: "Rendez-vous",
                value: `${lieuLabel}${dateCreneau ? ` — ${dateCreneau}` : ""}`,
            });
        }

        const contactParts = [nom, email, telephone].filter(Boolean);
        if (contactParts.length > 0) {
            out.push({ id: "coord", icon: iconMap.coord, label: "Contact", value: contactParts.join(" — ") });
        }

        return out;
    }, [stepDiagnostic, stepVehicule, stepRendezVous, stepCoordonnees]);

    return (
        <div className="bg-white border border-ge-gray-4 shadow-[0_2px_16px_rgba(0,0,0,0.06)] rounded-2xl px-5 py-5 hidden xl:block">
            {/* Header */}
            <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-full bg-ge-green flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-white" />
                </div>
                <h3 className="font-extrabold text-ge-gray-1 text-base">{title}</h3>
            </div>

            {/* Items */}
            <div>
                {!mounted || items.length === 0 ? (
                    <div className="space-y-2.5">
                        <p className="text-xs text-ge-gray-3 text-center py-3">
                            Vos choix s'afficheront ici au fur et à mesure
                        </p>
                        {/* Skeleton lines */}
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex items-center gap-3">
                                <div className="skeleton w-6 h-6 rounded-full shrink-0" />
                                <div className="flex-1 space-y-1">
                                    <div className="skeleton h-2 w-16 rounded" />
                                    <div className="skeleton h-3 w-32 rounded" />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    items.map((item) => <RecapRow key={item.id} item={item} />)
                )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
                <div className="mt-4 pt-3 border-t border-ge-gray-4">
                    <div className="flex items-center gap-1.5 text-[11px] text-ge-gray-3 font-light">
                        <div className="w-2 h-2 rounded-full bg-ge-green animate-pulse" />
                        Résumé en temps réel
                    </div>
                </div>
            )}
        </div>
    );
}
