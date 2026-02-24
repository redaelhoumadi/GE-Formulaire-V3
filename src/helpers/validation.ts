import { object, string, mixed, date } from 'yup';

/**
 * Données récupérées à travers le formulaire de prise de RDV
 */
export const StepDiagnosticSchema = object({
    vitrage: mixed().oneOf([
        "Pare-Brise",
        "Lunette arrière",
        "Autres (Vitre latérale, toit panoramique, plusieurs vitres)"
    ]).defined(),         // type de vitre
    dommage: mixed().oneOf([
        "Fissure",
        "Impact",
        "Plusieurs impacts"
    ]).when('vitrage', {
        is: 'Pare-Brise',
        then: (schema) => schema.defined()
    })
});

export const StepVehiculeSchema = object({
    assurance: string().required(),       // nom de l'assurance
    immatriculation: string(),          // numéro d'immatriculation
    marque_modele_vehicule: string().required(),   // marque et modèle du véhicule 
});

export const StepRendezVousSchema = object({
    // type d'intervention
    type: mixed().oneOf([
        "En agence",
        "À domicile"
    ]).defined(),
    // pour l'intervention à domicile/travail uniquement <
    adresse: string().when('type', {
        is: 'À domicile',
        then: (schema) => schema.required()
    }),
    ville: string().when('type', {
        is: 'En agence',
        then: (schema) => schema.required()
    }),
    date_souhaitee: date().nullable(),
    creneau: string().when('date_souhaitee', {
        is: (date: any) => date != null,
        then: (schema) => schema.required()
    }),
    indication_complementaire: string(),
});

export const StepCoordonneesSchema = object({
    nom_prenom: string().min(3).required(),
    // nous voulons 10 exactement pour le numéro de téléphone => soit 14 avec les espaces 
    telephone: string().min(14).max(14).required(),
    email: string().email(),
    ville: string(),
    // informations facultatives
    photo_vitrage: mixed(),
    photo_assurance: mixed(),
    message: string()
}).required()

export const PhoneCallbackSchema = object({
    phoneNumber: string().min(14).max(14).required(),
}).required()