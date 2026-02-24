import axios from "axios";

const API_FACTOR_BASE_URL = 'https://api.smsfactor.com';
const API_FACTOR_TOKEN_API = process.env.SMS_FACTOR_API_KEY!;

interface SMSTrame {
  date: string;
  creneau_horaire: string;
}

interface SMSFactorSend {
  token?: string;
  text: string;
  to: string;
  pushtype: "alert" | "marketing";
  delay?: string;
  sender?: string;
  gmsmsid?: string;
}

function getCompletedTrame(props: SMSTrame, nom_prenom: string) {
  const { date, creneau_horaire } = props;
  const creneau_horaire_formatted = creneau_horaire.replaceAll('00', '');
  return `Bonjour ${nom_prenom},\n\nNous avons bien reçu votre demande.\n\nUn conseiller va vous appeler pour organiser votre rendez-vous.\n\nTel 0800100244`;
}

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return `${date.getDate()}/${date.getMonth() + 1}`;
}

function capitalizeFirstLetter(word: string): string {
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

export interface ApiFactorSMSProps {
  date: string;
  creneau_horaire: string;
  numero: string;
  nom_prenom: string;
}

export function sendSMS(props: ApiFactorSMSProps): Promise<Object> {
  const { date, creneau_horaire, numero, nom_prenom } = props;
  const nomPrenomCapitalized = capitalizeFirstLetter(nom_prenom);
  const trameComplete = getCompletedTrame({ date, creneau_horaire }, nomPrenomCapitalized);
  let numeroFormat = numero.substring(1);
  if (numeroFormat.length != 9 || !['6', '7'].includes(numeroFormat[0]))
    return Promise.resolve({ message: false });

  const params: SMSFactorSend = {
    // token: "", // non requis si bearer authentication
    text: trameComplete,
    to: "33" + numeroFormat, // numéro destinataire
    pushtype: "alert",
    // delay: "",
    // sender: "Glass express",
    // gmsmsid: ""
  };

  return axios.get(`${API_FACTOR_BASE_URL}/send`, {
    params: params,
    headers: {
      Authorization: `Bearer ${API_FACTOR_TOKEN_API}`,
      'content-type': 'application/json;charset=UTF-8',
    }
  })
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
      return { message: false };
    });

}
