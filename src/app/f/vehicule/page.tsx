"use client";
import ButtonPill from '@/components/atoms/Buttons/ButtonPill';
import Image from 'next/image';
import handleScroll from '@/helpers/scroll-into';

// SVGs
import GreenCheck from "@public/images/components/GreenCheck.svg";
import ChevronReplie from "@public/images/components/chevrons/ChevronReplie.svg";

import SectionHeader from '@/components/atoms/SectionHeader';
import SectionMessage from '@/components/atoms/SectionMessage';

// Forms
import SelectInput from '@/components/atoms/Forms/Select';
import SIVPlaqueInput from '@/components/atoms/Forms/SIVPlaqueInput';
import Card from '@/components/atoms/Card';
import Link from 'next/link';
import ModeleVehiculeCard from '@/components/atoms/ModeleVehiculeCard';

// Handling form
import { useForm } from "react-hook-form";

// Form validation
import { StepVehiculeSchema } from '@/helpers/validation';
import { yupResolver } from "@hookform/resolvers/yup";

// store
import useFormStore, { FormState } from '@/store/form';
import { useRouter } from 'next/navigation';
import ImmatriculationVehiculeCard from '@/components/atoms/ImmatriculationVehiculeCard';
import { useState } from 'react';
import { getVehiculeData } from '@/helpers/vehicule-data';


export default function VehiculePage() {

  const router = useRouter();
  const stepVehicule = useFormStore((state: FormState) => state.stepVehicule);
  const setData = useFormStore((state: FormState) => state.setData);
  const [vehicule, setVehicule] = useState<string>();
  const [vehiculeLoading, setVehiculeLoading] = useState<boolean>(false);

  const { register, control, trigger, watch, setValue, getValues, formState: { errors, isValid, dirtyFields, touchedFields }, handleSubmit } = useForm({
    defaultValues: stepVehicule || {},
    resolver: yupResolver(StepVehiculeSchema),
    mode: "onSubmit"
  });
  const data = watch();

  const getVehicule = async () => {
    const immatriculation = getValues('immatriculation');
    setVehiculeLoading(true);
    getVehiculeData(immatriculation)
      .then((infos) => {
        setVehicule(infos);
        setValue("marque_modele_vehicule", infos);
        trigger();
        handleScroll('formVehiculeSubmit')();
      })
      .catch((e) => console.log('Error. Please retry again.'))
      .finally(() => setVehiculeLoading(false));
  }

  const setDefaultAssurance = () => {
    setValue("assurance", "Autre / Je ne sais pas");
    setTimeout(handleScroll('formVehiculeSIV'), 200)
  }

  const onSubmit = (data: any) => {
    setData({ step: 2, data });
    router.push("/f/rendez-vous", { scroll: true });
  }

  return (<>
    <form id="vehicule-form" onSubmit={handleSubmit(onSubmit)}>

      {/* SELECTION DE L'ASSURANCE */}
      <Card>

        <SectionHeader className='mt-5 mb-12'>
          Sélectionnez votre assurance
        </SectionHeader>

        <div className='mt-8 grid grid-cols-1 gap-x-8 xl:max-w-md container mx-auto'>

          <SelectInput
            name='assurance'
            control={control}
            onClick={() => setTimeout(handleScroll('formVehiculeSIV'), 200)}
            fullWidth
            defaultValue='Assurance*'
            values={[
              {
                label: "Autre / Je ne sais pas",
                value: "Autre / Je ne sais pas"
              },
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
              { label: "AVIVA/ABEILLE ASSU", value: "AVIVA/ABEILLE ASSU" },
              { label: "AXA", value: "AXA" },
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
              { label: "MACIF", value: "MACIF" },
              { label: "MACIF FILIA", value: "MACIF FILIA" },
              { label: "MACSF", value: "MACSF" },
              { label: "MAIF", value: "MAIF" },
              { label: "MAPA", value: "MAPA" },
              { label: "MARSH", value: "MARSH" },
              { label: "MATMUT", value: "MATMUT" },
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
              { label: "ZEPHIR", value: "ZEPHIR" }
            ]}

          />

        </div>

        <p 
          onClick={setDefaultAssurance}
          className={`${data.assurance == "Autre / Je ne sais pas" ? 'text-ge-gray-1' : 'text-ge-gray-3'} text-sm text-center underline cursor-pointer mb-6`}>
        Je ne connais pas mon assurance
          <Image
            className="w-3 h-3 my-1 ml-1 inline"
            priority
            src={ChevronReplie}
            alt="ChevronReplie"
          />
        </p>

        {/* MESSAGE ASSURANCES  */}
        {(data.assurance) &&
          <div className=''>
            <div className=''>
              <SectionMessage type='secondary' className='mx-[8.3rem] my-8 justify-center py-2 rounded-md'>
                <Image
                  className="w-6 h-5 mr-2 -ml-1"
                  priority
                  src={GreenCheck}
                  alt="Green check"
                />
                <p className='text-s font-light'>Rien à payer{data.assurance != "Autre / Je ne sais pas" && ", franchise offerte"} *</p>
              </SectionMessage>
            </div>
          </div>
        }

      </Card>

      {/* AJOUT PLAQUE IMMATRICULATION */}
      {(data.assurance) && <Card>

        <SectionHeader className='mt-5 xl:mt-12 mb-8' id="formVehiculeSIV">
          Renseignez votre immatriculation
        </SectionHeader>


        <div className="grid grid-cols-1 gap-x-8 xl:max-w-md container mx-auto">

          <SIVPlaqueInput
            loading={vehiculeLoading}
            onClick={getVehicule}
            control={control}
            name='immatriculation'
            fullWidth
          />

          {
            vehicule && <div className="mt-2">
              <ModeleVehiculeCard vehicule={vehicule} />
            </div>
          }
        </div>
        <div className="mt-4 grid grid-cols-1 gap-x-8 xl:max-w-md container mx-auto">
          <ImmatriculationVehiculeCard
            errors={errors["marque_modele_vehicule"]}
            dirty={dirtyFields["marque_modele_vehicule"]}
            touched={touchedFields["marque_modele_vehicule"]}
            value={data.marque_modele_vehicule}
            register={register}
            name='marque_modele_vehicule'
          />

          {/* MESSAGE INFOS VEHICULE  */}
          {vehicule && <div className='flex mb-3 xl:mb-6'>
            <div>
              <div className='flex'>
                <SectionMessage type='secondary' justify={false}>
                  <Image
                    className="w-6 h-5 mr-2 -ml-1"
                    priority
                    src={GreenCheck}
                    alt="Green Check"
                  />
                  <p className='text-xs'>Pare-brise en stock</p>
                </SectionMessage>
              </div>
            </div>
          </div>
          }
        </div>
      </Card>}

      {/* NAVIGATION BUTTONS */}
      <div className='flex justify-center'>
        <div className='mt-8' id="formVehiculeSubmit">
          {<ButtonPill form="vehicule-form" style="success" className="text-sm md:text-base px-28 mb-2">Continuer</ButtonPill>}
          {/* {<ButtonPill form="vehicule-form" style={isValid ? "success" : "disabled"} className="text-sm md:text-base px-28 mb-2">Continuer</ButtonPill>} */}
        </div>
      </div>
      <div className='flex justify-center'>
        <Link scroll={true} href="/f/diagnostic" className="mb-3">
          <ButtonPill className="text-xs md:text-sm px-28 mb-2 hover:underline">&lt; Retour</ButtonPill>
        </Link>
      </div>

    </form>
  </>
  )
}
