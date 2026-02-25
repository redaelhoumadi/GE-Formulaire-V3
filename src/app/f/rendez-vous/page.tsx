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
import Card from '@/components/atoms/Card';
import Link from 'next/link';

// store
import useFormStore, { FormState } from '@/store/form';
import { useRouter } from 'next/navigation';

// Handling form
import { useForm } from "react-hook-form";
import InterventionTypeSelect from '@/components/molecules/Forms/InterventionTypeSelect';
import HoraireSelect from '@/components/molecules/Forms/HoraireSelect';

// Form validation
import { StepRendezVousSchema } from '@/helpers/validation';
import { yupResolver } from "@hookform/resolvers/yup";
import DateInput from '@/components/atoms/Forms/DateInput';
import AutoCompleteInput from '@/components/atoms/Forms/AutoCompleteInput';
import { useState } from 'react';

export default function RendezVousPage() {

  const router = useRouter();
  const stepRendezVous = useFormStore((state: FormState) => state.stepRendezVous);
  const setData = useFormStore((state: FormState) => state.setData);
  const [unknownCalendar, setUnknownCalendar] = useState(false);

  const { control, register, watch, formState: { errors, dirtyFields, isValid }, handleSubmit } = useForm({
    defaultValues: stepRendezVous || {},
    resolver: yupResolver(StepRendezVousSchema),
    mode: "onChange",
    reValidateMode: 'onSubmit'
  });
  const watchData = watch();
  const onSubmit = (data: any) => {
    setData({ step: 3, data });
    router.push("/f/coordonnees", { scroll: true });

  }
  const unknownCalendarClick = () => {
    setUnknownCalendar(true);
  };
  const formIsValid = isValid && (watchData.date_souhaitee || unknownCalendar);

  return (
    <form id="rendez-vous-form" onSubmit={handleSubmit(onSubmit)}>
      {/* TYPE D'INTERVENTION SOUHAITEE */}
      <Card>
        <SectionHeader className='my-8'>
          Où souhaitez-vous effectuer votre intervention ?
        </SectionHeader>

        <div id="formRdvIntervention"></div>

        <div onClick={handleScroll('formRdvIntervention')} className='px-[7.5rem]'>
          <InterventionTypeSelect
            control={control}
          />
        </div>

        <div id="formRdvDateIntervention"></div>
        {
          watchData.type == "À domicile" && <>
            <div className="grid grid-cols-1 gap-x-8 xl:max-w-md container mx-auto mt-2">
              <AutoCompleteInput
                label="Adresse de l'intervention *"
                name='adresse'
                researchType='address'
                control={control}
                invalid={errors["adresse"] ? true : false}
                validated={(dirtyFields["adresse"] && !errors["adresse"])}
                placeholder='Votre adresse'
                fullWidth
                onClick={handleScroll('formRdvDateIntervention')}
              />
            </div>
            <SectionMessage type='secondary' className='mx-4 my-4 justify-center' justify={false}>
              <Image
                className="w-6 h-5 mr-2 -ml-1 bg-ge-green-2 rounded-md p-0.5"
                priority
                src={GreenCheck}
                alt="Green check"
              />
              <p className='text-sm font-light'><span className='font-black'>Service gratuit</span> où vous le souhaitez</p>
            </SectionMessage>
          </>
        }
        {
          watchData.type == "En agence" && <>
            <div className="grid grid-cols-1 gap-x-8 xl:max-w-md container mx-auto mt-2">
              <AutoCompleteInput
                label="Ville ou code postal *"
                name='ville'
                control={control}
                invalid={errors["ville"] ? true : false}
                validated={(dirtyFields["ville"] && !errors["ville"])}
                placeholder='Votre ville'
                onClick={handleScroll('formRdvDateIntervention')}
                fullWidth
              />
            </div>
            <SectionMessage type='secondary' className='mx-4 my-4 justify-center' justify={false}>
              <Image
                className="w-6 h-5 mr-2 -ml-1 bg-ge-green-2 rounded-md p-0.5"
                priority
                src={GreenCheck}
                alt="Green check"
              />
              <p className='text-sm font-light'><span className='font-black'>Un véhicule de prêt</span> vous sera proposé <span className='font-black'>gratuitement</span></p>
            </SectionMessage>
          </>
        }

      </Card>



      {/* INFORMATIONS POUR L'INTERVENTION */}
      {(watchData.ville || watchData.adresse) && <Card className='xl:mt-12'>
        <SectionHeader className='my-8'>
          Renseignez vos disponibilités
        </SectionHeader>

        <div className="grid grid-cols-1 gap-x-8 xl:max-w-md container mx-auto">
          <DateInput
            type='text'
            name='date_souhaitee'
            invalid={errors["date_souhaitee"] ? true : false}
            validated={(dirtyFields["date_souhaitee"] && !errors["date_souhaitee"])}
            control={control}
            placeholder='jj/mm/aaaa'
            fullWidth
          />
        </div>

        {/* Choix de l'horaire */}
        {
          watchData.date_souhaitee && <div className="grid grid-cols-1 gap-x-8 xl:max-w-md container mx-auto">
            <div onClick={handleScroll('formRdvSubmit')}>
              <HoraireSelect
                control={control}
              />
            </div>
          </div>
        }

        <p onClick={unknownCalendarClick} className={`${unknownCalendar ? 'text-ge-gray-1' : 'text-ge-gray-3'} text-sm text-center underline cursor-pointer mb-6`}>
          Je ne connais pas mon emploi du temps
          <Image
            className="w-3 h-3 my-1 ml-1 inline"
            priority
            src={ChevronReplie}
            alt="ChevronReplie"
          />
        </p>

        {watchData.creneau && <SectionMessage type='secondary' className='justify-center py-2' justify={false}>
          <Image
            className="w-6 h-5 mr-2 -ml-1 bg-ge-green-2 rounded-md p-0.5"
            priority
            src={GreenCheck}
            alt="Green check"
          />
          <p className='text-sm font-light'>Un horaire précis vous sera communiqué par <span className='font-black'>téléphone</span></p>
        </SectionMessage>
        }

      </Card>
      }


      {/* NAVIGATION BUTTONS */}
      <div className='flex justify-center'>
        <div className='mt-8'>
          {<ButtonPill form="rendez-vous-form" style={formIsValid ? "success" : "disabled"} className="text-sm md:text-base px-28 mb-2">Continuer</ButtonPill>}
        </div>
      </div>
      <div className='flex justify-center' id="formRdvSubmit">
        <Link scroll={true} href="/f/vehicule" className='mb-3'>
          <ButtonPill className="text-xs md:text-sm px-28 mb-2 hover:underline">&lt; Retour</ButtonPill>
        </Link>
      </div>

    </form>
  )
}
