"use client";
import ButtonPill from '@/components/atoms/Buttons/ButtonPill';
import Image from 'next/image';

// SVGs
import GreenCheck from "@public/images/components/GreenCheck.svg";
import TelephoneWhite from '@public/images/components/TelephoneWhite.svg';
import SectionHeader from '@/components/atoms/SectionHeader';
import SectionMessage from '@/components/atoms/SectionMessage';

// Forms
import ClickableCar from '@/components/atoms/Forms/ClickableCar';
import ClickableCarPc from '@/components/atoms/Forms/ClickableCarPc';
import Card from '@/components/atoms/Card';
import Link from 'next/link';

// store
import useFormStore, { FormState } from '@/store/form';
import { useEffect } from 'react';


const formatDate = (date: Date | undefined) => {
  if (!date)
    return "";
  const dateObj = new Date(date);
  return `${dateObj.getDate()}/${dateObj.getMonth() + 1}/${dateObj.getFullYear()}`;
}

export default function RecapitulatifPage() {
  const submittedData: FormState = useFormStore();

  // supprimer les données du formulaire déjà présent
  useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem('glass-express-rdv-storage');
    }
  }, []);



  return (<>
    <nav className="bg-white fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-center mx-auto p-4">
        <div className="font-bold text-ge-gray-3 items-center w-auto" id="navbar-sticky">
          <h1 className="text-center text-xl">Récapitulatif de votre RDV</h1>
        </div>
      </div>
      <div className="w-full z-10 xl:container xl:px-52 xl:mx-auto">
        <div className='bg-ge-gray-4 rounded-r-full rounded-l-full'>
          <div className={`bg-ge-green h-1 rounded-r-full rounded-l-full w-full`}></div>
        </div>
      </div>
    </nav>

    {/* CONFIRMATION */}
    <Card>
      <SectionMessage className='block xl:hidden my-6 font-extrabold' type='primary'>
        <Image
          className="w-10 h-10 mr-2 -ml-1"
          priority
          src={GreenCheck}
          alt="Green check"
        />
        Merci {submittedData.stepCoordonnees?.nom_prenom}, nous avons bien reçu votre demande
      </SectionMessage>

      <div className='hidden xl:block my-8'>
        <SectionHeader>
          Un conseiller va vous appeler pour organiser votre rendez-vous
        </SectionHeader>
      </div>



      <div className="xl:grid xl:grid-cols-3 xl:gap-x-4">
        <div>
          <div className="scale-[1.10]">
            <div className='block xl:hidden'>
              <ClickableCar
                value={submittedData.stepDiagnostic?.vitrage}
                disabled={true}
              />
            </div>
          </div>
          <div className="scale-[1.30] justify-center my-10 hidden xl:flex">
            <ClickableCarPc
              value={submittedData.stepDiagnostic?.vitrage}
              disabled={true}
            />
          </div>
        </div>


        <div className='xl:hidden'>
          <SectionHeader className='my-8'>
            Un conseiller va vous appeler pour organiser votre rendez-vous
          </SectionHeader>
        </div>

        {/* RECAPITULATIF */}

        <div className="col-span-2 grid grid-cols-1 xl:grid-cols-2">

          <div className='col-span-2 hidden xl:block '>
            <SectionMessage className='mt-6 mb-2 font-extrabold' type='primary'>
              <Image
                className="w-6 h-6 mr-6"
                priority
                src={GreenCheck}
                alt="Green check"
              />
              Merci {submittedData.stepCoordonnees?.nom_prenom}, <span className=''>nous avons bien reçu votre demande</span>
            </SectionMessage>
          </div>

          <div className="mx-auto col-span-2 grid grid-cols-2 gap-4 mb-6">
            <div className='flex'>
              <div className=''>
                <header className={`pl-2 font-bold text-ge-gray-3 text-md mb-1`}>
                  Diagnostic
                </header>
                <ul className="pl-2 text-ge-gray-2 list-none">
                  <li>{submittedData.stepDiagnostic?.vitrage}</li>
                  {submittedData.stepDiagnostic?.dommage && <li>{submittedData.stepDiagnostic.dommage}</li>}
                </ul>
              </div>
            </div>

            <div className='flex'>
              <div>
                <header className={`pl-2 font-bold text-ge-gray-3 text-md mb-1`}>
                  Véhicule
                </header>
                <ul className="pl-2 text-ge-gray-2 list-none">
                  {(submittedData.stepVehicule?.marque_modele_vehicule && submittedData.stepVehicule?.immatriculation) && <li>{submittedData.stepVehicule?.marque_modele_vehicule}, {submittedData.stepVehicule?.immatriculation}</li>}
                  {(!submittedData.stepVehicule?.marque_modele_vehicule && submittedData.stepVehicule?.immatriculation) && <li>{submittedData.stepVehicule?.immatriculation}</li>}
                  {submittedData.stepVehicule?.assurance && <li>{submittedData.stepVehicule?.assurance}</li>}
                </ul>
              </div>
            </div>

            <div className='flex'>
              <div>
                <header className={`pl-2 font-bold text-ge-gray-3 text-md mb-1`}>
                  Rendez-vous
                </header>
                <ul className="pl-2 text-ge-gray-2 list-none">
                  <li>{submittedData.stepRendezVous?.type}</li>
                  {submittedData.stepRendezVous?.adresse && <li>{submittedData.stepRendezVous.adresse}</li>}
                  <li>{submittedData.stepRendezVous?.ville}</li>
                  <li>{formatDate(submittedData.stepRendezVous?.date_souhaitee)}{submittedData.stepRendezVous?.creneau && `, ${submittedData.stepRendezVous?.creneau?.toLowerCase()}`}</li>
                </ul>
              </div>
            </div>

            <div className='flex'>
              <div>
                <header className={`pl-2 font-bold text-ge-gray-3 text-md mb-1`}>
                  Coordonnées
                </header>
                <ul className="pl-2 text-ge-gray-2 list-none">
                  <li>{submittedData.stepCoordonnees?.nom_prenom}</li>
                  <li>{submittedData.stepCoordonnees?.telephone?.replace(/^0/, '+33')}</li>
                  <li>{submittedData.stepCoordonnees?.email}</li>
                  <li>{submittedData.stepCoordonnees?.ville}</li>
                </ul>
              </div>
            </div>
          </div>

        </div>
      </div>

    </Card>

    <div className='flex'>
    {/* AVANTAGES */}
    <Card>
      <SectionHeader>
        Vos avantages
      </SectionHeader>
      <div className="grid grid-cols-3 gap-x-6 gap-y-2 my-6">
        <div className="flex items-center space-x-1">
          <Image
            className="w-5 h-4 mr-1"
            priority
            src={GreenCheck}
            alt="Green check"
          />
          <p className='xl:text-xs text-ge-gray-3 text-[9px]'>Aucun frais ni démarches</p>
        </div>
        <div className="flex items-center space-x-1">
          <Image
            className="w-5 h-4 mr-1"
            priority
            src={GreenCheck}
            alt="Green check"
          />
          <p className='xl:text-xs text-ge-gray-3 text-[10px]'>
            {submittedData.stepRendezVous?.type == "En agence" ? "Véhicule de prêt gratuit" : "Déplacement gratuit"}
          </p>
        </div>
        <div className="flex items-center space-x-1">
          <Image
            className="w-5 h-4 mr-1"
            priority
            src={GreenCheck}
            alt="Green check"
          />
          <p className='xl:text-xs text-ge-gray-3 text-[10px]'>Données non partagées</p>
        </div>
      </div>
    </Card>

    {/* INFORMATIONS COMPLEMENTAIRES */}
    <Card>
      <SectionHeader>
        Des questions ? nos conseillers sont là pour vous
      </SectionHeader>

      {/* NAVIGATION BUTTONS */}
      <div className='flex justify-center'>
        <Link href="tel:0800100244" className='mt-8'>
          <ButtonPill style="success" className="text-xs xl:text-base mb-2">
            <div className='px-5 flex items-center space-x-12 w-full justify-center xl:block xl:space-x-0'>
              <p className='align-middle xl:hidden'>
                Nous appeler
                <Image
                  className="w-5 h-5 ml-3 float-right"
                  priority
                  src={TelephoneWhite}
                  alt="TelephoneWhite"
                />
              </p>
              <p className='align-middle hidden xl:block'>
                Nous appeler
                <Image
                  className="w-5 h-5 mr-3 float-left"
                  priority
                  src={TelephoneWhite}
                  alt="TelephoneWhite"
                />
              </p>
            </div>

          </ButtonPill>
        </Link>
      </div>

    </Card>
    </div>

    <div className='flex justify-center'>
      {/* TODO : remove OnClick (for development purpose) */}
      {/* <Link href="/" className='mb-3' onClick={submittedData.reset}> */}
      <div className='mb-3' onClick={submittedData.reset}>
        <ButtonPill className="text-sm xl:text-base mb-2">&lt; Retour à l&apos;accueil du site</ButtonPill>
      </div>
      {/* </Link> */}
    </div>

  </>
  )
}
