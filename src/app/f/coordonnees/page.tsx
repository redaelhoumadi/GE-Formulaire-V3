"use client";
import ButtonPill from '@/components/atoms/Buttons/ButtonPill';
// SVGs
import ChevronDeplie from "@public/images/components/chevrons/ChevronDeplie.svg";
import Star from "@public/images/components/star.svg";
import SectionHeader from '@/components/atoms/SectionHeader';

// Forms
import TextInput from '@/components/atoms/Forms/TextInput';
import Textarea from '@/components/atoms/Forms/Textarea';
import FileInput from '@/components/atoms/Forms/FileInput';
import Card from '@/components/atoms/Card';
import Link from 'next/link';
import Image from "next/image";
import axios from 'axios';

// Handling form
import { useForm } from "react-hook-form";

// Form validation
import { StepCoordonneesSchema } from '@/helpers/validation';
import { yupResolver } from "@hookform/resolvers/yup";

// store
import useFormStore, { FormState } from '@/store/form';
import { useRouter } from 'next/navigation';
import PhoneInput from '@/components/atoms/Forms/PhoneInput';
import { useState } from 'react';
import SectionMessage from '@/components/atoms/SectionMessage';
import handleScroll from '@/helpers/scroll-into';
import { useEffect } from "react";
import { useRecapLiveStore } from "@/store/recap-live";

export default function CoordonneesPage() {

  const router = useRouter();
  const { stepDiagnostic, stepVehicule, stepRendezVous, stepParams } = useFormStore();
  const stepCoordonnees = useFormStore((state: FormState) => state.stepCoordonnees);
  const setData = useFormStore((state: FormState) => state.setData);
  const [submittingForm, setSubmittingForm] = useState(false);
  const [toggle, setToggle] = useState(false);


  const { control, register, watch, trigger, formState: { errors, touchedFields, isValid, dirtyFields }, handleSubmit } = useForm({
    defaultValues: stepCoordonnees || {},
    resolver: yupResolver(StepCoordonneesSchema),
    mode: 'onBlur'
    // reValidateMode: 'onSubmit'
  });

  const data = watch();

  const onSubmit = (data: any) => {
    /**
     * 
     *  SUBMITTING THE FORM HERE ! 
     * 
     */
    setData({ step: 4, data });
    const dataToSubmit = {
      stepParams,
      stepDiagnostic,
      stepVehicule,
      stepRendezVous,
      stepCoordonnees: data
    };
    localStorage.setItem("glass-express-submitted", JSON.stringify(dataToSubmit));

    setSubmittingForm(true);
    axios.postForm('/api/reservation', dataToSubmit).then((response) => {
      console.log('Request sent. ', response.data);
    })
      .catch((e) => console.log('Error submitting form..please retry'))
      .finally(() => router.push("/f/recapitulatif", { scroll: true }))
  }

  const switchToggle = () => {
    if (!toggle) setTimeout(handleScroll('informationsFacultatives'), 200);
    setToggle(!toggle);
  }

  const setDraft = useRecapLiveStore((s) => s.setDraft);

useEffect(() => {
  setDraft(4, {
    nom_prenom: data?.nom_prenom || "",
    telephone: data?.telephone || "",
    email: data?.email || "",
    ville: data?.ville || "",
  });
}, [data?.nom_prenom, data?.telephone, data?.email, data?.ville]);

  return (
    <form id="coordonnees-form" onSubmit={(e) => { e.preventDefault(); handleSubmit(onSubmit)(e) }}>

      {/* RECUPERATION DES COORDONNEES DU CLIENT */}
      <Card>

        <SectionHeader className='my-8'>
          Précisez vos coordonnées
        </SectionHeader>

        <div className="grid grid-cols-1 gap-x-8 xl:max-w-md container mx-auto">
          <TextInput
            maxLength={30}
            type='text'
            label='Nom et Prénom *'
            name='nom_prenom'
            invalid={errors["nom_prenom"] ? true : false}
            validated={(touchedFields["nom_prenom"] && !errors["nom_prenom"]) ? true : false}
            register={register}
            placeholder='Nom et Prénom *'
            fullWidth
          />
          <PhoneInput
            label='N° de téléphone *'
            name='telephone'
            invalid={errors["telephone"] ? true : false}
            validated={(dirtyFields["telephone"] && !errors["telephone"]) ? true : false}
            control={control}
            onChange={() => trigger("telephone")}
            placeholder='Votre n° de téléphone'
            fullWidth
          />
          <TextInput
            maxLength={50}
            type='email'
            label='Adresse e-mail'
            name='email'
            invalid={errors["email"] ? true : false}
            // validated={(touchedFields["email"] && !errors["email"]) ? true : false}
            register={register}
            placeholder='Votre adresse e-mail'
            fullWidth
          />
          <Textarea
            maxLength={150}
            type='text'
            label='Message'
            name='message'
            register={register}
            fullWidth
          />
        </div>



        <p
          id="informationsFacultatives"
          onClick={switchToggle}
          className="text-sm text-center text-ge-gray-3 underline cursor-pointer mb-6">
          Informations facultatives
          {toggle ? <Image
            className="w-3 h-3 mb-1 ml-2 inline rotate-180"
            priority
            src={ChevronDeplie}
            alt="ChevronDeplie"
          /> :
            <Image
              className="w-3 h-3 mb-1 ml-2 inline"
              priority
              src={ChevronDeplie}
              alt="ChevronDeplie"
            />
          }
        </p>

        {/* RECUPERATION D'INFORMATIONS FACULTATIVES */}
        {toggle && <div>
          <div className="grid grid-cols-1 gap-x-8 md:max-w-md container mx-auto">
            <FileInput
              type='text'
              name='photo_vitrage'
              register={register}
              control={control}
              placeholder='Photo du vitrage en entier'
              fullWidth
            />

            <FileInput
              type='text'
              name='photo_assurance'
              register={register}
              control={control}
              placeholder="Photo de votre carte verte d'assurance"
              fullWidth
            />
          </div>
        </div>
        }
      </Card>

      {/* NAVIGATION BUTTONS */}
      <div className='flex justify-center'>
        <div className='mt-8'>
          {!submittingForm && <ButtonPill form="coordonnees-form" style={isValid ? "success" : "disabled"} className="text-sm md:text-base px-28">J&apos;accepte et finalise</ButtonPill>}
          {submittingForm && <ButtonPill style="success" className="text-sm md:text-base px-28">
            Envoi en cours
            <svg aria-hidden="true" role="status" className="inline w-4 h-4 ml-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
            </svg>
          </ButtonPill>}
        </div>
      </div>
      <div className='flex justify-center'>
        <Link scroll={true} href="/f/rendez-vous" className="mb-3">
          <ButtonPill className="text-xs md:text-sm px-28 mb-2 hover:underline">&lt; Retour</ButtonPill>
        </Link>
      </div>
      {/* AVIS CLIENTS */}
      <SectionMessage type='secondary' className='mx-5 lg:px-28 '>
        <div className="xl:mx-20 my-2">
          <h3 className='text-ge-gray-1 font-extrabold text-center md:text-left'>Avis clients</h3>
          <h4 className='text-ge-gray-1 text-center md:text-left'>
            <Image
              className="w-24 mb-1 -ml-2 inline"
              priority
              src={Star}
              alt="avis"
            />
            {/* </div> */}
            4.9/5 - Excellent
          </h4>

          <p className='text-xs text-ge-gray-3 font-thin text-center md:text-left'>En validant ce formulaire, j&apos;accepte la collecte et le traitement de mes
            données à caractère personnel et des données de fréquentation relatives à l&apos;utilisation du service régis par <a className='underline' href="https://www.cnil.fr/fr/reglement-europeen-protection-donnees" target="_blank">le RGPD</a></p>
        </div>
      </SectionMessage>

    </form>
  )
}
