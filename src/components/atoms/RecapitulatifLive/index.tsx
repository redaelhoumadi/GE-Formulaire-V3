"use client";

import React, { useMemo } from "react";
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

function formatDateFR(date: unknown) {
  const raw = toText(date);
  if (!raw) return "";
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

function InterventionLine({
  parts,
}: {
  parts: RecapItem["textParts"];
}) {
  return (
    <div className="flex items-start gap-2 py-2">
      <CheckCircle className="mt-[1px] h-4 w-4 text-ge-green shrink-0" />
      <div className="text-sm text-ge-gray-1 leading-snug break-words">
        {parts.map((p, i) => (
          <span
            key={i}
            className={p.bold ? "font-extrabold text-ge-gray-1" : ""}
          >
            {p.text}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function RecapInterventionCard({
  title = "Récapitulatif de votre rendez-vous",
}: {
  title?: string;
}) {
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
    const lieu = isCentre
      ? rdvVille
      : isFilled(rdvAdresse)
      ? rdvAdresse
      : rdvVille;

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
          textParts: [
            { text: "Dommage : " },
            { text: dommage, bold: true },
          ],
        });
      }
    }

    // Véhicule
    if (isFilled(marqueModele)) {
      out.push({
        id: "vehicule",
        textParts: [
          { text: "Véhicule " },
          { text: marqueModele, bold: true },
        ],
      });
    }

    // Assurance
    if (isFilled(assurance)) {
      out.push({
        id: "assurance",
        textParts: [
          { text: "Assuré par " },
          { text: assurance, bold: true },
        ],
      });
    }

    // RDV
    if (isFilled(rdvDate) || isFilled(rdvCreneau) || isFilled(lieu)) {
      const dateCreneau = [rdvDate, rdvCreneau]
        .filter(Boolean)
        .join(" - ");

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

    // Coordonnées
    const nom = toText((stepCoordonnees as any)?.nom_prenom);
    const email = toText((stepCoordonnees as any)?.email);

    if (isFilled(nom) || isFilled(email)) {
      out.push({
        id: "coord",
        textParts: [
          { text: "Contact : " },
          { text: [nom, email].filter(Boolean).join(" — "), bold: true },
        ],
      });
    }

    return out;
  }, [stepDiagnostic, stepVehicule, stepRendezVous, stepCoordonnees]);

  return (
    <div className="bg-white rounded-md px-6 py-5">
      <SectionHeader className="mb-2" id="formVehiculeSIV">
                    {title}
                  </SectionHeader>

      <div className="mt-3">
        {items.length === 0 ? (
          <p className="text-sm text-ge-gray-3">
            Vos choix s’afficheront ici au fur et à mesure
          </p>
        ) : (
          items.map((it) => (
            <InterventionLine key={it.id} parts={it.textParts} />
          ))
        )}
      </div>
    </div>
  );
}