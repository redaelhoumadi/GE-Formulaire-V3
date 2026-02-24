import { NextRequest, NextResponse } from "next/server";
import { sendPhoneEmail } from "../helpers/NodeMailer";
import { FormData as FormDataType } from '@/store/types';

export async function POST(request: NextRequest) {

    // récupération des données du formulaire
    const submittedData: FormData = await request.formData();

    // mapping de l'objet
    const formattedSubmittedData = Object.fromEntries(submittedData);

    console.log("Données envoyées par l'utilisateur:", formattedSubmittedData)

    const formData = {
        phoneNumber: formattedSubmittedData['phoneNumber']?.toString(),
        gclid: formattedSubmittedData['GCLID']?.toString(),
        client_url: formattedSubmittedData['clientUrl']?.toString(),
    }

    // envoi de l'email
    await sendPhoneEmail(formData.phoneNumber, formData.gclid, formData.client_url);

    // réponse à l'utilisateur
    return new NextResponse(JSON.stringify({
        message: "sent"
    }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
    });
}