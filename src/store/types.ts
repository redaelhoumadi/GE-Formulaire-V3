/**
 * Données récupérées à travers le formulaire de prise de RDV
 */
export type StepDiagnostic = {
    vitrage: string; // type de vitre
    dommage?: string; // type de dommage

};

export type StepVehicule = {
    assurance: string; // nom de l'assurance
    immatriculation: string; // numéro d'immatriculation
    marque_modele_vehicule: string; // marque et modèle du véhicule 
};

export type StepRendezVous = {
    type: string; // type d'intervention (agence ou domicile/travail)
    adresse: string;
    indication_complementaire: string;
    // pour l'intervention à domicile/travail uniquement <
    ville: string;
    date_souhaitee: Date;
    creneau: string;
};

export type StepCoordonnees = {
    nom_prenom: string;
    telephone: string;
    email: string;
    ville: string;
    // informations facultatives
    photo_vitrage: any;
    photo_assurance: any;
    message: string;
};

export type StepParams = {
    client_url?: string;
    gclid?: string;
    vendeur?: string;
}

export type FormData = StepDiagnostic
    & StepVehicule
    & StepRendezVous
    & StepCoordonnees
    & StepParams;