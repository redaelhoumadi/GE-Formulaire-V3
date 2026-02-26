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

function isFilled(v?: string) {
  return !!v && v.trim() !== "";
}

function Row({
  label,
  value,
  /*showCheck = true,*/
}: {
  label: string;
  value?: string;
  showCheck?: boolean;
}) {
  if (!isFilled(value)) return null;

  return (
    <div className="flex items-center justify-between gap-3 py-1">
      <span className="text-xs text-ge-gray-3">{label}</span>

      <div className="text-right">
        <span className="text-xs text-ge-gray-1 font-bold">{value}</span>

        {/*{showCheck && (
          <div className="mt-1 inline-flex items-center gap-1 text-[11px] font-bold text-ge-green">
            <span>✅</span>
          </div>
        )}*/}
      </div>
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

  // ---- Diagnostic
  const showDiagnostic =
    isFilled(stepDiagnostic?.vitrage) ||
    (stepDiagnostic?.vitrage === "Pare-Brise" && isFilled(stepDiagnostic?.dommage));

  // ---- Véhicule
  const showVehicule =
    isFilled(stepVehicule?.assurance) ||
    isFilled(stepVehicule?.immatriculation) ||
    isFilled(stepVehicule?.marque_modele_vehicule);

  // ---- RDV
  const rdvType = stepRendezVous?.type ? String(stepRendezVous.type) : "";
  const rdvAdresse = stepRendezVous?.adresse ? String(stepRendezVous.adresse) : "";
  const rdvVille = stepRendezVous?.ville ? String(stepRendezVous.ville) : "";
  const rdvDate = formatDate(stepRendezVous?.date_souhaitee);
  const rdvCreneau = stepRendezVous?.creneau ? String(stepRendezVous.creneau) : "";

  const showRdv =
    isFilled(rdvType) || isFilled(rdvAdresse) || isFilled(rdvVille) || isFilled(rdvDate) || isFilled(rdvCreneau);

  // ---- Coordonnées
  const coordNom = stepCoordonnees?.nom_prenom ? String(stepCoordonnees.nom_prenom) : "";
  const coordTel = formatPhone(stepCoordonnees?.telephone);
  const coordEmail = stepCoordonnees?.email ? String(stepCoordonnees.email) : "";

  const showCoord = isFilled(coordNom) || isFilled(coordTel) || isFilled(coordEmail);

  // Si rien n’est encore rempli
  const showAnything = showDiagnostic || showVehicule || showRdv || showCoord;

  return (
    <div className="bg-white rounded-md px-6 py-6">
      <div className=" text-xl border-l-8 border-ge-yellow pl-2 font-extrabold text-ge-gray-1 text-base mb-3">
        Récapitulatif de votre rendez-vous
      </div>

      {!showAnything && (
        <p className="text-sm text-ge-gray-3">
          Vos choix s’afficheront ici au fur et à mesure
        </p>
      )}

      {showAnything && (
        <div className="divide-y divide-ge-gray-4">
          {/* DIAGNOSTIC */}
          {showDiagnostic && (
            <div className="py-2">
              <div className="text-sm font-extrabold text-ge-gray-2 mb-1">Diagnostic</div>
              <Row label="Vitrage" value={stepDiagnostic?.vitrage} />
              {stepDiagnostic?.vitrage === "Pare-Brise" && (
                <Row label="Dommage" value={stepDiagnostic?.dommage} />
              )}
            </div>
          )}

          {/* VEHICULE */}
          {showVehicule && (
            <div className="py-2">
              <div className="text-sm font-extrabold text-ge-gray-2 mb-1">Véhicule</div>
              <Row label="Assurance" value={stepVehicule?.assurance} />
              <Row label="Immatriculation" value={stepVehicule?.immatriculation} />
              <Row label="Modèle" value={stepVehicule?.marque_modele_vehicule} />
            </div>
          )}

          {/* RENDEZ-VOUS */}
          {showRdv && (
            <div className="py-2">
              <div className="text-sm font-extrabold text-ge-gray-2 mb-1">Rendez-vous</div>
              <Row label="Intervention" value={rdvType} />
              {/* On affiche l’adresse OU la ville selon le type (si renseigné) */}
              <Row label="Adresse" value={rdvAdresse} />
              <Row label="Ville" value={rdvVille} />
              <Row label="Date" value={rdvDate} />
              <Row label="Créneau" value={rdvCreneau ? rdvCreneau.toLowerCase() : ""} />
            </div>
          )}

          {/* COORDONNEES */}
          {showCoord && (
            <div className="py-2">
              <div className="text-sm font-extrabold text-ge-gray-2 mb-1">Coordonnées</div>
              <Row label="Nom" value={coordNom} />
              <Row label="Téléphone" value={coordTel} />
              <Row label="Email" value={coordEmail} showCheck={!!coordEmail} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}