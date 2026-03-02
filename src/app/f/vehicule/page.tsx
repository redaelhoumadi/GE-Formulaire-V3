"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import ButtonPill from "@/components/atoms/Buttons/ButtonPill";
import handleScroll from "@/helpers/scroll-into";

// SVGs
import GreenCheck from "@public/images/components/GreenCheck.svg";
import ChevronReplie from "@public/images/components/chevrons/ChevronReplie.svg";

import SectionHeader from "@/components/atoms/SectionHeader";
import SectionMessage from "@/components/atoms/SectionMessage";
import SelectInput from "@/components/atoms/Forms/Select";
import SIVPlaqueInput from "@/components/atoms/Forms/SIVPlaqueInput";
import Card from "@/components/atoms/Card";
import ModeleVehiculeCard from "@/components/atoms/ModeleVehiculeCard";
import ImmatriculationVehiculeCard from "@/components/atoms/ImmatriculationVehiculeCard";
//import FullScreenSpinner from "@/components/atoms/FullScreenSpinner";
import { CheckCircle2 } from "lucide-react";


import { StepVehiculeSchema } from "@/helpers/validation";
import useFormStore, { FormState } from "@/store/form";
import { getVehiculeData } from "@/helpers/vehicule-data";
import { useEffect } from "react";
import { useRecapLiveStore } from "@/store/recap-live";

/**
 * Mapping assurance -> logo (public/)
 */
const assuranceLogos: Record<string, string> = {
  AXA: "/images/components/assurances/Axa.png",
  MACIF: "/images/components/assurances/MAcif.png",
  MATMUT: "/images/components/assurances/MAtmut.png",
  ACM: "/images/components/assurances/ACM.png",
  "ACTIV ASSURANCE" : "/images/components/assurances/Activ-Assurances.png",
  AGPM: "/images/components/assurances/AGPM.png",
  "AIR ALPHA":"/images/components/assurances/Air-Alpha.png",
  ALLIANZ: "/images/components/assurances/Allianz.png",
  ALLSECUR: "/images/components/assurances/All-Secure.png",
  ALTIMA: "/images/components/assurances/Altima.png",
  "AMALINE/AMAGUIZ" : "/images/components/assurances/Amaline--Amaguiz.png",
  AMV: "/images/components/assurances/AMV.png",
  ANGELUS: "/images/components/assurances/Angelus.png",
  AON: "/images/components/assurances/AON.png",
  "APRIL MON ASSURANCE": "/images/components/assurances/April.png",
  "APRIL PARTENAIRE": "/images/components/assurances/April.png",
  "AREAS ASSURANCES": "/images/components/assurances/Areas.png",
  ARIAM: "/images/components/assurances/Ariam.png",
  "ARISA ASSURANCES": "/images/components/assurances/Arisa.png",
  ARVAL: "/images/components/assurances/Arval.png",
  "ASSU 2000": "/images/components/assurances/Assu2000.png",
  "ASSURANCE UNIE": "/images/components/assurances/Assurance-unie.png",
  ASSUREO: "/images/components/assurances/Assuréo.png",
  ASSURONLINE: "/images/components/assurances/Assuroline.png",
  ASSURPEOPLE: "/images/components/assurances/Assurpeople.png",
  "ATHLON CAR LEASE - XL INSURRANCE": "/images/components/assurances/Athlon.png",
  AUTOFIRST: "/images/components/assurances/Autofirst.png",
  AVANSSUR: "/images/components/assurances/Avanssur.png",
  AVIVA: "/images/components/assurances/Aviva.png",
  "AVIVA/ABEILLE ASSU": "/images/components/assurances/Abeille-assurance.png",
  "AXA PARTENAIRE": "/images/components/assurances/Axa-Partennaire.png",
  "BANQUE POPULAIRE": "/images/components/assurances/Banque-populaire.png",
  BLABLASUR: "/images/components/assurances/Blablasure.png",
  "BONUS 50": "/images/components/assurances/Bonus-50.png",
  "BPCE ASSURANCE": "/images/components/assurances/Bpce.png",
  "BPCE IARD": "/images/components/assurances/Bpce.png",
  CALYPSO: "/images/components/assurances/Calipso.png",
  CAMCA: "/images/components/assurances/Camca.png",
  CIC: "/images/components/assurances/CIC.png",
  "CITROEN ASSURANCE": "/images/components/assurances/Citroen-Assurances.png",
  "COVEA FLEET": "/images/components/assurances/Covea-Fleet.png",
  "COVEA RISK": "/images/components/assurances/Covea-Risks.png",
  "DACIA ASSURANCE": "/images/components/assurances/Dacia-assurances.png",
  "DIRECT ASSURANCE": "/images/components/assurances/Avanssur.png",
  "EUR ALPHA ASSURANCE": "/images/components/assurances/EurAlpha.png",
  "EURO ASSURANCE": "/images/components/assurances/Euro-Assurance.png",
  "EURO DOMMAGES": "/images/components/assurances/Euro-Dommages.png",
  EUROFIL: "/images/components/assurances/Eurofil.png",
  FMA: "/images/components/assurances/FMA.png",
  "FRANCOIS BERNARD ASSURANCES": "/images/components/assurances/Francois-bernard-assurances.png",
  GAN: "/images/components/assurances/Gan-assurances.png",
  GENERALI: "/images/components/assurances/Generali.png",
  GMF: "/images/components/assurances/GMF.png",
  "GRAS SAVOYE": "/images/components/assurances/Gras-savoye.png",
  GROUPAMA: "/images/components/assurances/Groupama.png",
  "ILS ASSUR": "/images/components/assurances/ILS-Assur.png",
  "IPAC 64": "/images/components/assurances/IPAC-64.png",
  "JP LABALETTE": "/images/components/assurances/JP-labalette.png",
  "L'EQUITE": "/images/components/assurances/L'equite-assurance.png",
  "L'OLIVIER ASSURANCE": "/images/components/assurances/L'olivier-assurances.png",
  "LA BANQUE POSTALE": "/images/components/assurances/La-banque-postale.png",
  LCL: "/images/components/assurances/LCL.png",
  "LEADER ASSURANCE": "/images/components/assurances/Groupe-leader.png",
  LEOCARE: "/images/components/assurances/Leocare.png",
  "LIBEA ASSURANCE": "/images/components/assurances/MASCF.png",
  "LSA COURTAGE": "/images/components/assurances/LSA-courtage.png",
  MAAF: "/images/components/assurances/Maaf.png",
  "MACIF FILIA":"/images/components/assurances/MAcif.png",
  MACSF:"/images/components/assurances/MASCF.png",
  MAIF:"/images/components/assurances/MAIF.png",
  MAPA:"/images/components/assurances/MAPA-assurances.png",
  MARSH:"/images/components/assurances/Marsh.png",
MAXANCE:"/images/components/assurances/Maxance.png",
"MEDICALE DE France":"/images/components/assurances/Medicale-de-france.png",
MFA:"/images/components/assurances/MFA.png",
MMA:"/images/components/assurances/MMA.png",
"MONCEAU ASSURANCE":"/images/components/assurances/Monceau.png",
"MUTUELLE DE POITIERS ASSURANCE":"/images/components/assurances/Mutuelle-de-poitiers-assurances.png",
"MUTUELLE DES MOTARDS":"/images/components/assurances/Mutuelle-de-motards.png",
"NETVOX INTERNET":"/images/components/assurances/Netvox-internet.png",
"OPEL ASSURANCE":"/images/components/assurances/Opel.png",
ORNIKAR:"/images/components/assurances/Ornikar.png",
"OYAT ASSURANCE":"/images/components/assurances/Oyat-assurances.png",
PACIFICA:"/images/components/assurances/Pacifica.png",
"PARTENAIRE PLUS":"/images/components/assurances/PArtenaire-plus.png",
"PEUGEOT ASSURANCE":"/images/components/assurances/Peugeot.png",
"PROTEC BTP":"/images/components/assurances/Protec-BTP.png",
"RENAULT ASSURANCE":"/images/components/assurances/Renault.png",
"SERENIS ASSURANCE":"/images/components/assurances/Seneris-assurances.png",
"SMA BTP":"/images/components/assurances/SMA-BTP.png",
"SMACL ASSURANCE":"/images/components/assurances/SMACL-asurances.png",
SOGESSUR:"/images/components/assurances/Sogessur.png",
"SOLLY AZARD":"/images/components/assurances/Solly-azar.png",
"SOS MALUS":"/images/components/assurances/SOS-Malus.png",
 "SPRING ASSUR":"/images/components/assurances/Spring-assur.png",
SURAVENIR:"/images/components/assurances/Suravenir.png",
SWISSLIFE:"/images/components/assurances/Swisslife.png",
THELEM:"/images/components/assurances/Thelem-assurances.png",
"TOYOTA ASSURANCE":"/images/components/assurances/Toyota.png",
VERLINGUE:"/images/components/assurances/Verlingue.png",
VERSPIEREN:"/images/components/assurances/Verspieren.png",
XENASSUR:"/images/components/assurances/Xenassur.png",
ZEPHIR:"/images/components/assurances/Zephir.png",
};

export default function VehiculePage() {
  const router = useRouter();
  const stepVehicule = useFormStore((state: FormState) => state.stepVehicule);
  const setData = useFormStore((state: FormState) => state.setData);

  const [vehicule, setVehicule] = useState<any>();
  const [vehiculeLoading, setVehiculeLoading] = useState<boolean>(false);

  const {
    register,
    control,
    trigger,
    watch,
    setValue,
    getValues,
    formState: { errors, dirtyFields, touchedFields },
    handleSubmit,
  } = useForm({
    defaultValues: stepVehicule || {},
    resolver: yupResolver(StepVehiculeSchema),
    mode: "onSubmit",
  });

  const data = watch();

  const getVehicule = async () => {
    const immatriculation = getValues("immatriculation");
    setVehiculeLoading(true);

    getVehiculeData(immatriculation)
      .then((infos) => {
        setVehicule(infos);
        setValue("marque_modele_vehicule", infos);
        trigger();
        handleScroll("formVehiculeSubmit")();
      })
      .catch(() => console.log("Error. Please retry again."))
      .finally(() => setVehiculeLoading(false));
  };

  const setDefaultAssurance = () => {
    setValue("assurance", "Autre / Je ne sais pas");
    setTimeout(() => handleScroll("formVehiculeSIV")(), 200);
  };

  const onSubmit = (data: any) => {
    setData({ step: 2, data });
    router.push("/f/rendez-vous", { scroll: true });
  };

  const setDraft = useRecapLiveStore((s) => s.setDraft);

useEffect(() => {
  setDraft(2, {
    assurance: data?.assurance || "",
    immatriculation: data?.immatriculation || "",
    marque_modele_vehicule: data?.marque_modele_vehicule || vehicule || "",
  });
}, [data?.assurance, data?.immatriculation, data?.marque_modele_vehicule, vehicule]);

  // Logo (avec fallback si pas trouvé dans le mapping)
  const assuranceLogoSrc =
    (data.assurance && assuranceLogos[data.assurance]) ||
    (data.assurance ? assuranceLogos["Autre / Je ne sais pas"] : null);

  return (
    <>
    {vehiculeLoading}
      <form id="vehicule-form" onSubmit={handleSubmit(onSubmit)}>
        {/* SELECTION DE L'ASSURANCE */}
        <Card>
          <SectionHeader className="mt-5 mb-12">Sélectionnez votre assurance</SectionHeader>

          <div className="mt-8 grid grid-cols-1 gap-x-8 xl:max-w-md container mx-auto">
            <SelectInput
  name="assurance"
  control={control}
  onClick={() => setTimeout(() => handleScroll("formVehiculeSIV")(), 200)}
  fullWidth
  defaultValue="Assurance*"
  values={[
    {
      label: "Assurances phares",
      options: [
        { label: "AXA", value: "AXA" },
        { label: "MACIF", value: "MACIF" },
        { label: "MATMUT", value: "MATMUT" },
      ],
    },
    {
      label: "Autres assurances",
      options: [
        { label: "Autre / Je ne sais pas", value: "Autre / Je ne sais pas" },
                { label: "ACM", value: "ACM" },
                { label: "ACTIV ASSURANCE", value: "ACTIV ASSURANCE" },
                { label: "AGPM", value: "AGPM" },
                { label: "AIR ALPHA", value: "AIR ALPHA" },
                { label: "ALLIANZ", value: "ALLIANZ" },
                { label: "ALLSECUR", value: "ALLSECUR" },
                { label: "ALTIMA", value: "ALTIMA" },
                { label: "AMALINE/AMAGUIZ", value: "AMALINE/AMAGUIZ" },
                { label: "AMV", value: "AMV" },
                { label: "ANGELUS", value: "ANGELUS" },
                { label: "AON", value: "AON" },
                { label: "APRIL MON ASSURANCE", value: "APRIL MON ASSURANCE" },
                { label: "APRIL PARTENAIRE", value: "APRIL PARTENAIRE" },
                { label: "AREAS ASSURANCES", value: "AREAS ASSURANCES" },
                { label: "ARIAM", value: "ARIAM" },
                { label: "ARISA ASSURANCES", value: "ARISA ASSURANCES" },
                { label: "ARVAL", value: "ARVAL" },
                { label: "ASSU 2000", value: "ASSU 2000" },
                { label: "ASSURANCE UNIE", value: "ASSURANCE UNIE" },
                { label: "ASSUREO", value: "ASSUREO" },
                { label: "ASSURONLINE", value: "ASSURONLINE" },
                { label: "ASSURPEOPLE", value: "ASSURPEOPLE" },
                { label: "ATHLON CAR LEASE - XL INSURRANCE", value: "ATHLON CAR LEASE - XL INSURRANCE" },
                { label: "AUTOFIRST", value: "AUTOFIRST" },
                { label: "AVANSSUR", value: "AVANSSUR" },
                { label: "AVIVA", value: "AVIVA" },
                { label: "ABEILLE ASSU", value: "AVIVA/ABEILLE ASSU" },
                { label: "AXA PARTENAIRE", value: "AXA PARTENAIRE" },
                { label: "BANQUE POPULAIRE", value: "BANQUE POPULAIRE" },
                { label: "BLABLASUR", value: "BLABLASUR" },
                { label: "BONUS 50", value: "BONUS 50" },
                { label: "BPCE ASSURANCE", value: "BPCE ASSURANCE" },
                { label: "BPCE IARD", value: "BPCE IARD" },
                { label: "CALYPSO", value: "CALYPSO" },
                { label: "CAMCA", value: "CAMCA" },
                { label: "CAPFI", value: "CAPFI" },
                { label: "CARDIF", value: "CARDIF" },
                { label: "CARENE ASSURANCE", value: "CARENE ASSURANCE" },
                { label: "CARMA", value: "CARMA" },
                { label: "CIC", value: "CIC" },
                { label: "CITROEN ASSURANCE", value: "CITROEN ASSURANCE" },
                { label: "COVEA FLEET", value: "COVEA FLEET" },
                { label: "COVEA RISK", value: "COVEA RISK" },
                { label: "DACIA ASSURANCE", value: "DACIA ASSURANCE" },
                { label: "DIRECT ASSURANCE", value: "DIRECT ASSURANCE" },
                { label: "EUR ALPHA ASSURANCE", value: "EUR ALPHA ASSURANCE" },
                { label: "EURO ASSURANCE", value: "EURO ASSURANCE" },
                { label: "EURO DOMMAGES", value: "EURO DOMMAGES" },
                { label: "EUROFIL", value: "EUROFIL" },
                { label: "FMA", value: "FMA" },
                { label: "FRANCOIS BERNARD ASSURANCES", value: "FRANCOIS BERNARD ASSURANCES" },
                { label: "GAN", value: "GAN" },
                { label: "GENERALI", value: "GENERALI" },
                { label: "GMF", value: "GMF" },
                { label: "GRAS SAVOYE", value: "GRAS SAVOYE" },
                { label: "GROUPAMA", value: "GROUPAMA" },
                { label: "ID MACIF", value: "ID MACIF" },
                { label: "ILS ASSUR", value: "ILS ASSUR" },
                { label: "IPAC 64", value: "IPAC 64" },
                { label: "JP LABALETTE", value: "JP LABALETTE" },
                { label: "L'EQUITE", value: "L'EQUITE" },
                { label: "L'OLIVIER ASSURANCE", value: "L'OLIVIER ASSURANCE" },
                { label: "LA BANQUE POSTALE", value: "LA BANQUE POSTALE" },
                { label: "LCL", value: "LCL" },
                { label: "LEADER ASSURANCE", value: "LEADER ASSURANCE" },
                { label: "LEOCARE", value: "LEOCARE" },
                { label: "LIBEA ASSURANCE", value: "LIBEA ASSURANCE" },
                { label: "LSA COURTAGE", value: "LSA COURTAGE" },
                { label: "MAAF", value: "MAAF" },
                { label: "MACIF FILIA", value: "MACIF FILIA" },
                { label: "MACSF", value: "MACSF" },
                { label: "MAIF", value: "MAIF" },
                { label: "MAPA", value: "MAPA" },
                { label: "MARSH", value: "MARSH" },
                { label: "MAXANCE", value: "MAXANCE" },
                { label: "MEDICALE DE France", value: "MEDICALE DE France" },
                { label: "MFA", value: "MFA" },
                { label: "MMA", value: "MMA" },
                { label: "MONCEAU ASSURANCE", value: "MONCEAU ASSURANCE" },
                { label: "MUTUELLE DE POITIERS ASSURANCE", value: "MUTUELLE DE POITIERS ASSURANCE" },
                { label: "MUTUELLE DES MOTARDS", value: "MUTUELLE DES MOTARDS" },
                { label: "NETVOX INTERNET", value: "NETVOX INTERNET" },
                { label: "OPEL ASSURANCE", value: "OPEL ASSURANCE" },
                { label: "ORNIKAR", value: "ORNIKAR" },
                { label: "OYAT ASSURANCE", value: "OYAT ASSURANCE" },
                { label: "PACIFICA", value: "PACIFICA" },
                { label: "PARTENAIRE PLUS", value: "PARTENAIRE PLUS" },
                { label: "PEUGEOT ASSURANCE", value: "PEUGEOT ASSURANCE" },
                { label: "PROTEC BTP", value: "PROTEC BTP" },
                { label: "RENAULT ASSURANCE", value: "RENAULT ASSURANCE" },
                { label: "SERENIS ASSURANCE", value: "SERENIS ASSURANCE" },
                { label: "SMA BTP", value: "SMA BTP" },
                { label: "SMACL ASSURANCE", value: "SMACL ASSURANCE" },
                { label: "SOGESSUR", value: "SOGESSUR" },
                { label: "SOLLY AZARD", value: "SOLLY AZARD" },
                { label: "SOS MALUS", value: "SOS MALUS" },
                { label: "SPRING ASSUR", value: "SPRING ASSUR" },
                { label: "SURAVENIR", value: "SURAVENIR" },
                { label: "SWISSLIFE", value: "SWISSLIFE" },
                { label: "THELEM", value: "THELEM" },
                { label: "TOYOTA ASSURANCE", value: "TOYOTA ASSURANCE" },
                { label: "VERLINGUE", value: "VERLINGUE" },
                { label: "VERSPIEREN", value: "VERSPIEREN" },
                { label: "XENASSUR", value: "XENASSUR" },
                { label: "ZEPHIR", value: "ZEPHIR" },
      ],
    },
  ]}
/>

            {/* ✅ LOGO ASSURANCE (juste après le SelectInput) */}
            {assuranceLogoSrc && (
              <div className="flex justify-center">
                <Image
                  src={assuranceLogoSrc}
                  alt={data.assurance ? `Logo ${data.assurance}` : "Logo assurance"}
                  width={160}
                  height={64}
                  className="h-10 w-auto object-contain"
                  priority
                />
              </div>
            )}
          </div>

          <p
            onClick={setDefaultAssurance}
            className={`${
              data.assurance == "Autre / Je ne sais pas" ? "text-ge-gray-1" : "text-ge-gray-3"
            } text-sm text-center underline cursor-pointer mb-6`}
          >
            Je ne connais pas mon assurance
            <Image className="w-3 h-3 my-1 ml-1 inline" priority src={ChevronReplie} alt="ChevronReplie" />
          </p>

          {/* MESSAGE ASSURANCES */}
          {data.assurance && (
            <div className="">
              <div className="">
                <SectionMessage type="secondary" className="xl:mx-[8.3rem] my-8 gap-1 justify-center py-2 rounded-md">
                  
                  <CheckCircle2 className="h-4 w-4 text-ge-green shrink-0" />
                  <p className="xl:text-sm text-xs font-light">
                    <span className="font-black">Rien à payer</span>
                    {data.assurance != "Autre / Je ne sais pas" && ". Assurance compatible, franchise offerte"} *
                  </p>
                </SectionMessage>
              </div>
            </div>
          )}
        </Card>

        {/* AJOUT PLAQUE IMMATRICULATION */}
        {data.assurance && (
          <Card>
            <SectionHeader className="mt-5 xl:mt-12 mb-8" id="formVehiculeSIV">
              Renseignez votre immatriculation
            </SectionHeader>

            <div className="grid grid-cols-1 gap-x-8 xl:max-w-md container mx-auto">
              <SIVPlaqueInput
                loading={vehiculeLoading}
                onClick={getVehicule}
                control={control}
                name="immatriculation"
                fullWidth
              />

              {vehicule && (
                <div className="mt-2">
                  <ModeleVehiculeCard vehicule={vehicule} />
                </div>
              )}
            </div>

            <div className="mt-4 grid grid-cols-1 gap-x-8 xl:max-w-md container mx-auto">
              <ImmatriculationVehiculeCard
                errors={errors["marque_modele_vehicule"]}
                dirty={dirtyFields["marque_modele_vehicule"]}
                touched={touchedFields["marque_modele_vehicule"]}
                value={data.marque_modele_vehicule}
                register={register}
                name="marque_modele_vehicule"
              />

              {/* MESSAGE INFOS VEHICULE */}
              {vehicule && (
                <div className="flex mb-3 xl:mb-6 justify-center">
                  <div>
                    <div className="flex">
                      <SectionMessage type="secondary" className="gap-1" justify={false}>
                        
                        <CheckCircle2 className="h-4 w-4 text-ge-green shrink-0" />
                        <p className="xl:text-sm text-xs font-light">
                          Votre vitrage est <span className="font-black">disponible en stock</span>
                        </p>
                      </SectionMessage>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </Card>
        )}

        {/* NAVIGATION BUTTONS */}
        <div className="flex justify-center">
          <div className="mt-8" id="formVehiculeSubmit">
            <ButtonPill form="vehicule-form" style="success" className="text-sm md:text-base px-28 mb-2">
              Continuer
            </ButtonPill>
          </div>
        </div>

        <div className="flex justify-center">
          <Link scroll={true} href="/f/diagnostic" className="mb-3">
            <ButtonPill className="text-xs md:text-sm px-28 mb-2 hover:underline">&lt; Retour</ButtonPill>
          </Link>
        </div>
      </form>
    </>
  );
}