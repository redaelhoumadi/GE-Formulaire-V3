import { NextRequest, NextResponse } from "next/server";
import { ApiFactorSMSProps, sendSMS } from "../helpers/ApiFactor";
import { sendEmail } from "../helpers/NodeMailer";
import { FormData as FormDataType } from '@/store/types';


function formatDate(stringDate: string) {
  return new Date(stringDate);
}

export async function POST(request: NextRequest) {

  // récupération des données du formulaire
  const submittedData: FormData = await request.formData();

  // mapping de l'objet
  const formattedSubmittedData = Object.fromEntries(submittedData);

  console.log("Données envoyées par l'utilisateur:", formattedSubmittedData)

  const apiFactorSMS: ApiFactorSMSProps = {
    date: formattedSubmittedData['stepRendezVous[date_souhaitee]']?.toString(),
    creneau_horaire: formattedSubmittedData['stepRendezVous[creneau]']?.toString(),
    numero: formattedSubmittedData['stepCoordonnees[telephone]'].toString().replaceAll(' ', ''),
    nom_prenom: formattedSubmittedData['stepCoordonnees[nom_prenom]'].toString(),
  };

  const formData = {
    // StepParams
    url: request.url,
    client_url: formattedSubmittedData['stepParams[client_url]']?.toString(),
    gclid: formattedSubmittedData['stepParams[gclid]']?.toString(),
    vendeur: formattedSubmittedData['stepParams[vendeur]']?.toString(),

    // StepDiagnostic
    vitrage: formattedSubmittedData['stepDiagnostic[vitrage]']?.toString(), // type de vitre
    dommage: formattedSubmittedData['stepDiagnostic[dommage]']?.toString(), // type de dommage

    // StepVehicule
    assurance: formattedSubmittedData['stepVehicule[assurance]']?.toString(), // nom de l'assurance
    immatriculation: formattedSubmittedData['stepVehicule[immatriculation]']?.toString(), // numéro d'immatriculation
    marque_modele_vehicule: formattedSubmittedData['stepVehicule[marque_modele_vehicule]']?.toString(), // marque et modèle du véhicule

    // StepRendezVous
    type: formattedSubmittedData['stepRendezVous[type]']?.toString(), // type d'intervention (agence ou domicile/travail)
    adresse: formattedSubmittedData['stepRendezVous[adresse]']?.toString(),
    indication_complementaire: formattedSubmittedData['stepRendezVous[indication_complementaire]']?.toString(),
    villeRendezVous: formattedSubmittedData['stepRendezVous[ville]']?.toString(),
    date_souhaitee: formatDate(formattedSubmittedData['stepRendezVous[date_souhaitee]']?.toString()),
    creneau: formattedSubmittedData['stepRendezVous[creneau]']?.toString(),

    // StepCoordonnees
    nom_prenom: formattedSubmittedData['stepCoordonnees[nom_prenom]']?.toString(),
    telephone: formattedSubmittedData['stepCoordonnees[telephone]']?.toString()?.replaceAll(' ', ''),
    email: formattedSubmittedData['stepCoordonnees[email]']?.toString(),
    villeCoordonnees: formattedSubmittedData['stepCoordonnees[ville]']?.toString(),
    // informations facultatives
    photo_vitrage: formattedSubmittedData['stepCoordonnees[photo_vitrage]'],
    photo_assurance: formattedSubmittedData['stepCoordonnees[photo_assurance]'],
    message: formattedSubmittedData['stepCoordonnees[message]']?.toString(),
  }

  // envoi du SMS à l'utilisateur
  await sendSMS(apiFactorSMS);

  // envoi de l'email
  await sendEmail(formData);

  // réponse à l'utilisateur
  return new NextResponse(JSON.stringify({
    message: "sent"
  }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}