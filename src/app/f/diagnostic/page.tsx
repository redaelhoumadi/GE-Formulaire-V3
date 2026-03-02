"use client";
import ButtonPill from '@/components/atoms/Buttons/ButtonPill';
import Image from 'next/image';
import handleScroll from '@/helpers/scroll-into';

// SVGs
import GreenCheck from "@public/images/components/GreenCheck.svg";
import { CheckCircle2 } from "lucide-react";

import SectionHeader from '@/components/atoms/SectionHeader';
import SectionMessage from '@/components/atoms/SectionMessage';

// Forms
import Card from '@/components/atoms/Card';

// Handling form
import { useForm } from "react-hook-form";
import DommageTypeSelect from '@/components/molecules/Forms/DommageTypeSelect';
import VitrageTypeSelect from '@/components/molecules/Forms/VitrageTypeSelect';

// Form validation
import { StepDiagnosticSchema } from '@/helpers/validation';
import { yupResolver } from "@hookform/resolvers/yup";

// store
import useFormStore, { FormState } from '@/store/form';
import { useRouter } from 'next/navigation';
import ClickableCarInput from '@/components/atoms/Forms/ClickableCarInput';
import useStore from '@/store/useStore';
import { useEffect } from 'react';
import ClickableCarPcInput from '@/components/atoms/Forms/ClickableCarPcInput';
import { useRecapLiveStore } from "@/store/recap-live";


export default function DiagnosticPage() {

  const router = useRouter();
  const stepDiagnostic = useStore(useFormStore, (state: FormState) => state.stepDiagnostic);
  const setData = useFormStore((state: FormState) => state.setData);

  const { control, reset, watch, formState: { errors, isValid, isValidating }, formState, handleSubmit } = useForm({
    defaultValues: stepDiagnostic || {},
    resolver: yupResolver(StepDiagnosticSchema),
    mode: "onChange"
  })
  const data = watch();


  const setDraft = useRecapLiveStore((s) => s.setDraft);

useEffect(() => {
  setDraft(1, {
    vitrage: data?.vitrage || "",
    ...(data?.vitrage === "Pare-Brise" ? { dommage: data?.dommage || "" } : {}),
  });
}, [data?.vitrage, data?.dommage]);

  // effect runs when user state is updated
  useEffect(() => {
    // reset form with user data
    stepDiagnostic && reset(stepDiagnostic, {
      keepDirty: true
    });
  }, [stepDiagnostic]);

  // // effect runs when user state is updated
  // useEffect(() => {
  //   if(data.vitrage) onSelectedVitrage()
  // }, [data.vitrage]);

  const onSubmit = (data: any) => {
    const formData = {
      vitrage: data.vitrage,
      ...(data.vitrage == 'Pare-Brise' && { dommage: data.dommage })
    }
    setData({ step: 1, data: formData });
    router.push("/f/vehicule", { scroll: true });
  }

  const onSelectedVitrage = () => {
    handleScroll('formDiagnosticDommage')()
  }


  return (<>
    <form id="diagnostic-form" onSubmit={handleSubmit(onSubmit)}>

      <Card>

        <SectionHeader className='mt-5'>
          Quel vitrage est endommagé ?
        </SectionHeader>

        {/* Présentation du véhicule */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
          <div>
            <div className="scale-[1.10]">
              <div className='block md:hidden' onClick={handleScroll('formDiagnosticDommage')}>
                <ClickableCarInput
                  onClick={onSelectedVitrage}
                  control={control}
                  name="vitrage"
                />
              </div>
            </div>
            <div className="justify-center my-10 hidden md:flex" onClick={handleScroll('formDiagnosticDommage')}>
              <ClickableCarPcInput
                onClick={onSelectedVitrage}
                control={control}
                name="vitrage"
              />
            </div>
          </div>
          {/* Choix du vitrage */}
          <div onClick={onSelectedVitrage}>
            <VitrageTypeSelect
              control={control}
              name="vitrage"
              errors={errors["vitrage"]}
            />
          </div>
        </div>

      </Card>


      {/* DOMMAGES PRESENTS */}
      {
        data.vitrage == "Pare-Brise" && <Card className='mt-5 xl:mt-12'>

          <SectionHeader className='mt-5 mb-12'>
            Quel dommage voyez-vous ?
          </SectionHeader>

          {/* CHOIX TYPE FISSURE */}
          <div>
            <DommageTypeSelect
              control={control}
              name="dommage"
              errors={errors["dommage"]}
            />
          </div>

          {/* MESSAGE A LA FIN */}
          <SectionMessage type='secondary' justify={false} className='xl:mx-20 gap-1 my-8 justify-center py-2 rounded-md'>
        
            <CheckCircle2 className="h-4 w-4 text-ge-green shrink-0" />
            <p className='xl:text-sm text-xs font-light'>Temps moyen d&apos;intervention : <span className='font-black'>1 heure</span></p>
          </SectionMessage>
        </Card>
      }
      <div id="formDiagnosticDommage"></div>
      <div className='flex justify-center'>
        <div className='m-8'>
          <ButtonPill form="diagnostic-form" style={isValid ? "success" : "disabled"} className="text-sm md:text-base px-28 mb-2">Continuer</ButtonPill>
        </div>
      </div>
      <div id="formDiagnosticSubmit"></div>
    </form>
  </>
  )
}
