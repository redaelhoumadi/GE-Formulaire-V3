import nodemailer from 'nodemailer';


const EMAIL_COMMERCIAL = process.env.EMAIL_COMMERCIAL!;
const SMTPDetails = {
    SMTP_HOST: process.env.SMTP_HOST,
    SMTP_PORT: parseInt(process.env.SMTP_PORT!),
    SMTP_USERNAME: process.env.SMTP_USERNAME,
    SMTP_PASSWORD: process.env.SMTP_PASSWORD
}

const transporter = nodemailer.createTransport({
    host: SMTPDetails.SMTP_HOST,
    port: SMTPDetails.SMTP_PORT,
    secure: false,
    auth: {
        user: SMTPDetails.SMTP_USERNAME,
        pass: SMTPDetails.SMTP_PASSWORD
    }
});


interface EmailProps {
    // StepParams
    url: string;
    client_url?: string;
    gclid?: string;
    vendeur?: string;
    // StepDiagnostic
    vitrage: string;
    dommage: string;
    // StepVehicule
    assurance: string;
    immatriculation?: string;
    marque_modele_vehicule?: string;
    // StepRendezVous
    type: string;
    adresse: string;
    indication_complementaire?: string;
    villeRendezVous: string;
    date_souhaitee: Date;
    creneau: string;
    // StepCoordonnees
    nom_prenom: string;
    telephone: string;
    email?: string;
    villeCoordonnees?: string;
    photo_vitrage?: any;
    photo_assurance?: any;
    message?: string;
};

function formatDate(date: Date) {
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
}

async function getFileAttachment(photo: any) {
    const arrayBuffer = await photo.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const extension = photo.name.split('.').pop();
    return {
        filename: `photo_assurance.${extension}`,
        content: buffer
    };
}

function getCompletedTrame(props: EmailProps) {
    const address = props.type == "En agence" ? props.villeRendezVous : `${props.adresse}, ${props.villeRendezVous}`;
    return `LIEN URL : ${props.client_url || 'n.c'}<br/><br/>
            VENDEUR : ${props.vendeur || 'n.c'}<br/>
            GCLID : ${props.gclid || 'n.c'}<br/><br/>
            NOM ET PRENOM : ${props.nom_prenom}<br/>
            VILLE : ${props.villeCoordonnees}<br/>
            TELEPHONE : ${props.telephone}<br/>
            EMAIL : ${props.email}<br/><br/>
            MODE D’INTERVENTION : ${props.type}<br/>
            ADRESSE : ${address}<br/>
            INDICATION COMPLEMENTAIRE : ${props.indication_complementaire || '/'}<br/>
            VITRE ENDOMMAGEE : ${props.vitrage} / ${props.dommage}<br/>
            MODELE DU VEHICULE : ${props.marque_modele_vehicule || 'n.c'} / ${props.immatriculation || 'n.c'}<br/>
            ASSURANCE : ${props.assurance}<br/><br/>
            DATE DU RENDEZ-VOUS SOUHAITE ET CRENEAU HORAIRE : ${formatDate(props.date_souhaitee)} / ${props.creneau}<br/>
            INFOS COMPLEMENTAIRES : ${props.message}`;
}

export async function sendEmail(props: EmailProps) {
    const trameComplete = getCompletedTrame(props);
    const attachments = [];
    if (props.photo_assurance && props.photo_assurance instanceof Blob && (props.photo_assurance.size < 10000000)) {
        const attachment = await getFileAttachment(props.photo_assurance);
        attachments.push(attachment);
    }
    if (props.photo_vitrage && props.photo_vitrage instanceof Blob && (props.photo_vitrage.size < 10000000)) {
        const attachment = await getFileAttachment(props.photo_vitrage);
        attachments.push(attachment);
    }

    // // send mail with defined transport object
    const info = await transporter.sendMail({
        from: '"Glass express" <nepasrepondre@glass-express.fr>', // sender address
        // to: "bar@example.com, baz@example.com", // list of receivers
        to: EMAIL_COMMERCIAL, // list of receivers
        subject: "[Rendez-vous] - Glass express", // Subject line
        html: trameComplete, // html body
        attachments: attachments
    });

    console.log("Message sent: %s", info.messageId);
}

export async function sendPhoneEmail(phoneNumber: string, gclid: string, clientUrl: string) {
    const trameComplete = `Un nouvel utilisateur demande à être rappelé<br/><br/>
            NUMERO : ${phoneNumber}<br/>
            GCLID : ${gclid || 'n.c'}<br/>
            LIEN URL : ${clientUrl || 'n.c'}<br/><br/>
            `;

    // // send mail with defined transport object
    const info = await transporter.sendMail({
        from: '"Glass express" <nepasrepondre@glass-express.fr>',
        to: EMAIL_COMMERCIAL,
        subject: "[Rappel] - Glass express",
        html: trameComplete
    });

    console.log("Message sent: %s", info.messageId);
}