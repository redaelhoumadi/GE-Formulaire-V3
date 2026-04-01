"use client";

import React, { useMemo } from "react";
import { useRouter } from "next/navigation";
import useFormStore from "@/store/form";
import { useRecapLiveStore } from "@/store/recap-live";
import {
  Clock,
  Car,
  Shield,
  MapPin,
  User,
  Settings,
  Pencil,
} from "lucide-react";

type Step = 1 | 2 | 3 | 4;

type RecapItem = {
  id: string;
  icon: React.ReactNode;
  label: string;
  value: string;
  step: Step;
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
  return d.toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
  });
}

function formatTimeFR(time: unknown) {
  const t = toText(time);
  if (!t) return "";
  return t.replace(":", "h");
}

const iconMap = {
  intervention: <Clock className="w-3.5 h-3.5" />,
  dommage: <Settings className="w-3.5 h-3.5" />,
  vehicule: <Car className="w-3.5 h-3.5" />,
  assurance: <Shield className="w-3.5 h-3.5" />,
  rdv: <MapPin className="w-3.5 h-3.5" />,
  coord: <User className="w-3.5 h-3.5" />,
};

function RecapRow({
  item,
  onEdit,
}: {
  item: RecapItem;
  onEdit: (step: Step) => void;
}) {
  return (
    <div className="flex items-start gap-3 py-2.5 border-b border-ge-gray-5 last:border-0 group">
      <div className="mt-0.5 w-6 h-6 rounded-full bg-ge-gray-4 flex items-center justify-center shrink-0">
        {item.icon}
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-[10px] font-semibold text-ge-gray-3 uppercase mb-0.5">
          {item.label}
        </p>
        <p className="text-sm font-bold text-ge-gray-1">
          {item.value}
        </p>
      </div>

      {/* ✅ Edit button */}
      <button
        onClick={() => onEdit(item.step)}
        className="group-hover:opacity-100 transition text-ge-gray-3 hover:text-ge-green"
      >
        <Pencil className="w-4 h-4" />
      </button>
    </div>
  );
}

export default function RecapInterventionCard({
  title = "Votre rendez-vous",
}: {
  title?: string;
}) {
  const router = useRouter();

  // ✅ Zustand selectors (perf)
  const stepDiagnostic = useFormStore((s) => s.stepDiagnostic);
  const stepVehicule = useFormStore((s) => s.stepVehicule);
  const stepRdv = useFormStore((s) => s.stepRendezVous);
  const stepCoord = useFormStore((s) => s.stepCoordonnees);

  const liveDiagnostic = useRecapLiveStore((s) => s.stepDiagnostic);
  const liveVehicule = useRecapLiveStore((s) => s.stepVehicule);
  const liveRdv = useRecapLiveStore((s) => s.stepRendezVous);
  const liveCoord = useRecapLiveStore((s) => s.stepCoordonnees);

  // ✅ merge live + persisted
  const diagnostic = liveDiagnostic ?? stepDiagnostic;
  const vehicule = liveVehicule ?? stepVehicule;
  const rdv = liveRdv ?? stepRdv;
  const coord = liveCoord ?? stepCoord;

  const items = useMemo<RecapItem[]>(() => {
    const out: RecapItem[] = [];

    if (diagnostic?.vitrage) {
      out.push({
        id: "intervention",
        icon: iconMap.intervention,
        label: "Intervention",
        value: `Remplacement ${diagnostic.vitrage.toLowerCase()}`,
        step: 1,
      });

      if (
        diagnostic.vitrage === "Pare-Brise" &&
        diagnostic.dommage
      ) {
        out.push({
          id: "dommage",
          icon: iconMap.dommage,
          label: "Dommage",
          value: diagnostic.dommage,
          step: 1,
        });
      }
    }

    if (vehicule?.marque_modele_vehicule) {
      out.push({
        id: "vehicule",
        icon: iconMap.vehicule,
        label: "Véhicule",
        value: vehicule.marque_modele_vehicule,
        step: 2,
      });
    }

    if (vehicule?.assurance) {
      out.push({
        id: "assurance",
        icon: iconMap.assurance,
        label: "Assurance",
        value: vehicule.assurance,
        step: 2,
      });
    }

    if (rdv) {
      const date = formatDateFR(rdv.date_souhaitee);
      const time = formatTimeFR(rdv.creneau);

      const lieu =
        rdv.type === "En agence"
          ? rdv.ville
          : rdv.adresse || rdv.ville;

      if (isFilled(date) || isFilled(time) || isFilled(lieu)) {
        out.push({
          id: "rdv",
          icon: iconMap.rdv,
          label: "Rendez-vous",
          value: `${lieu ?? ""}${date || time ? ` — ${date} ${time}` : ""}`,
          step: 3,
        });
      }
    }

    if (coord) {
      const parts = [
        coord.nom_prenom,
        coord.email,
        coord.telephone,
      ].filter(Boolean);

      if (parts.length) {
        out.push({
          id: "coord",
          icon: iconMap.coord,
          label: "Contact",
          value: parts.join(" — "),
          step: 4,
        });
      }
    }

    return out;
  }, [diagnostic, vehicule, rdv, coord]);

  const stepRoutes: Record<Step, string> = {
  1: "/f/diagnostic",
  2: "/f/vehicule",
  3: "/f/rendez-vous",
  4: "/f/coordonnees",
};

const maxStep = useFormStore((s) => s.maxStep);

const handleEdit = (step: Step) => {
  // 🔒 empêche d'aller sur des étapes non atteintes
  if (maxStep && step > maxStep) return;

  router.push(stepRoutes[step]);
};

  return (
    <div className="bg-white rounded-2xl px-2 py-5 hidden xl:block">
      <div className="flex items-center gap-2 mb-4 border-ge-yellow border-l-[5px]">
        <h3 className="font-extrabold text-ge-gray-1 text-lg pl-2">
          {title}
        </h3>
      </div>

      <div>
        {items.length === 0 ? (
          <p className="text-xs text-ge-gray-3 text-center py-3">
            Vos choix s'afficheront ici au fur et à mesure
          </p>
        ) : (
          items.map((item) => (
            <RecapRow key={item.id} item={item} onEdit={handleEdit} />
          ))
        )}
      </div>
    </div>
  );
}