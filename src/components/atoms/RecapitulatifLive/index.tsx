"use client";

import React, { useEffect, useMemo, useState } from "react";
import useFormStore, { FormState } from "@/store/form";
import { useRecapLiveStore } from "@/store/recap-live";
import { CheckCircle } from "lucide-react";
import SectionHeader from "@/components/atoms/SectionHeader";

type RecapItem = {
  id: string;
  textParts: Array<{ text: string; bold?: boolean }>;
};

function toText(v: unknown): string {
  if (v === null || v === undefined) return "";
  return String(v).trim();
}

function isFilled(v: unknown): boolean {
  return toText(v) !== "";
}

/**
 * Format date FR sans dépendre du timezone (évite mismatch SSR/CSR).
 * - Si "YYYY-MM-DD" ou commence par ça, on parse en "DD/MM".
 * - Sinon on tente Date(), mais on reste prudent.
 */
function formatDateFR(date: unknown) {
  const raw = toText(date);
  if (!raw) return "";

  const m = raw.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (m) {
    const dd = m[3];
    const mm = m[2];
    return `${dd}/${mm}`;
  }

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

function InterventionLine({ parts }: { parts: RecapItem["textParts"] }) {
  return (
    <div className="flex items-start gap-2 py-1.5">
      <CheckCircle className="mt-[1px] h-4 w-4 text-ge-green shrink-0" />
      <div className="text-sm text-ge-gray-1 font-light leading-snug break-words">
        {parts.map((p, i) => (
          <span key={i} className={p.bold ? "font-extrabold text-ge-gray-1" : ""}>
            {p.text}
          </span>
        ))}
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

    const out: RecapItem[] = [];

    // Intervention
    if (isFilled(vitrage)) {
      out.push({
        id: "intervention",
        textParts: [
          { text: "Remplacement de " },
          { text: vitrage.toLowerCase(), bold: true },
        ],
      });

      if (vitrage === "Pare-Brise" && isFilled(dommage)) {
        out.push({
          id: "dommage",
          textParts: [{ text: "Dommage : " }, { text: dommage, bold: true }],
        });
      }
    }

    // Véhicule
    if (isFilled(marqueModele)) {
      out.push({
        id: "vehicule",
        textParts: [{ text: "Véhicule " }, { text: marqueModele, bold: true }],
      });
    }

    // Assurance
    if (isFilled(assurance)) {
      out.push({
        id: "assurance",
        textParts: [{ text: "Assuré par " }, { text: assurance, bold: true }],
      });
    }

    // RDV
    if (isFilled(rdvDate) || isFilled(rdvCreneau) || isFilled(lieu)) {
      const dateCreneau = [rdvDate, rdvCreneau].filter(Boolean).join(" - ");

      out.push({
        id: "rdv",
        textParts: [
          { text: "Votre rendez-vous le " },
          { text: dateCreneau || "—", bold: true },
          { text: " dans " },
          { text: isCentre ? "le centre de " : "" },
          { text: lieu || "—", bold: true },
        ],
      });
    }

    // Coordonnées (✅ + téléphone)
    const nom = toText((stepCoordonnees as any)?.nom_prenom);

    const email = toText((stepCoordonnees as any)?.email);

    const telephone =
      toText((stepCoordonnees as any)?.telephone) ||
      toText((stepCoordonnees as any)?.tel) ||
      toText((stepCoordonnees as any)?.phone) ||
      toText((stepCoordonnees as any)?.mobile);

    const contactParts = [nom, email, telephone].filter(Boolean);

    if (contactParts.length > 0) {
      out.push({
        id: "coord",
        textParts: [{ text: "Contact : " }, { text: contactParts.join(" — "), bold: true }],
      });
    }

    return out;
  }, [stepDiagnostic, stepVehicule, stepRendezVous, stepCoordonnees]);

  return (
    <div className="bg-white rounded-md px-6 py-5 hidden xl:block">
      <SectionHeader className="mb-2 !text-lg">{title}</SectionHeader>

      <div className="mt-3">
        {!mounted ? (
          <p className="text-sm text-ge-gray-3">Vos choix s’afficheront ici au fur et à mesure</p>
        ) : items.length === 0 ? (
          <p className="text-sm text-ge-gray-3">Vos choix s’afficheront ici au fur et à mesure</p>
        ) : (
          items.map((it) => <InterventionLine key={it.id} parts={it.textParts} />)
        )}
      </div>
    </div>
  );
}