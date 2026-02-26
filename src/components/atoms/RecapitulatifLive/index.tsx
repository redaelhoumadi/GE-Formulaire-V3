"use client";

import useFormStore, { FormState } from "@/store/form";
import { useRecapLiveStore } from "@/store/recap-live";

function formatDate(date: any) {
  if (!date) return "";
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return "";
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yyyy = d.getFullYear();
  return `${dd}/${mm}/${yyyy}`;
}

function formatPhone(phone?: string) {
  if (!phone) return "";
  return phone.replace(/^0/, "+33");
}

function Row({ label, value }: { label: string; value?: string }) {
  return (
    <div className="flex items-start justify-between gap-3 py-1">
      <span className="text-xs text-ge-gray-3">{label}</span>
      <span className="text-xs text-ge-gray-1 font-bold text-right">
        {value && value.trim() !== "" ? value : "—"}
      </span>
    </div>
  );
}

export default function RecapitulatifLive() {
  // Données “validées” (quand on clique Continuer)
  const store = useFormStore() as FormState;

  // Données “live” (pendant la saisie)
  const live = useRecapLiveStore();

  // Priorité au live si présent, sinon store
  const stepDiagnostic = live.stepDiagnostic ?? store.stepDiagnostic ?? {};
  const stepVehicule = live.stepVehicule ?? store.stepVehicule ?? {};
  const stepRendezVous = live.stepRendezVous ?? store.stepRendezVous ?? {};
  const stepCoordonnees = live.stepCoordonnees ?? store.stepCoordonnees ?? {};

  const rdvLine = [
    stepRendezVous?.type ? stepRendezVous.type : "",
    stepRendezVous?.adresse ? stepRendezVous.adresse : "",
    stepRendezVous?.ville ? stepRendezVous.ville : "",
  ]
    .filter(Boolean)
    .join(" • ");

  const dateLine = [
    formatDate(stepRendezVous?.date_souhaitee),
    stepRendezVous?.creneau ? String(stepRendezVous.creneau).toLowerCase() : "",
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <div className="bg-white rounded-md px-4 py-4">
      <div className="border-l-8 border-ge-yellow pl-2 font-extrabold text-ge-gray-1 text-base mb-3">
        Récapitulatif
      </div>

      <div className="divide-y divide-ge-gray-4">
        <div className="py-2">
          <div className="text-sm font-extrabold text-ge-gray-2 mb-1">Diagnostic</div>
          <Row label="Vitrage" value={stepDiagnostic?.vitrage} />
          <Row label="Dommage" value={stepDiagnostic?.dommage} />
        </div>

        <div className="py-2">
          <div className="text-sm font-extrabold text-ge-gray-2 mb-1">Véhicule</div>
          <Row label="Assurance" value={stepVehicule?.assurance} />
          <Row label="Immatriculation" value={stepVehicule?.immatriculation} />
          <Row label="Modèle" value={stepVehicule?.marque_modele_vehicule} />
        </div>

        <div className="py-2">
          <div className="text-sm font-extrabold text-ge-gray-2 mb-1">Rendez-vous</div>
          <Row label="Infos" value={rdvLine} />
          <Row label="Date" value={dateLine} />
        </div>

        <div className="py-2">
          <div className="text-sm font-extrabold text-ge-gray-2 mb-1">Coordonnées</div>
          <Row label="Nom" value={stepCoordonnees?.nom_prenom} />
          <Row label="Téléphone" value={formatPhone(stepCoordonnees?.telephone)} />
          <Row label="Email" value={stepCoordonnees?.email} />
        </div>
      </div>
    </div>
  );
}