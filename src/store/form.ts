"use client";
// Zustand
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import {
    StepDiagnostic,
    StepVehicule,
    StepRendezVous,
    StepCoordonnees,
    StepParams
} from '@/store/types';

const stepVariant = {
    1: 'stepDiagnostic',
    2: 'stepVehicule',
    3: 'stepRendezVous',
    4: 'stepCoordonnees',
};

type setDataType =
    | { step: 1; data: StepDiagnostic }
    | { step: 2; data: StepVehicule }
    | { step: 3; data: StepRendezVous }
    | { step: 4; data: StepCoordonnees };


export interface FormState {
    maxStep: number | null;
    stepParams: StepParams | null;
    stepDiagnostic: StepDiagnostic | null;
    stepVehicule: StepVehicule | null;
    stepRendezVous: StepRendezVous | null;
    stepCoordonnees: StepCoordonnees | null;
    setData: ({ step, data }: setDataType) => void;
    setParams: (data: StepParams) => void;
    reset: () => void;
}

const initialState: Partial<FormState> = {
    maxStep: null,
    stepParams: null,
    stepDiagnostic: null,
    stepVehicule: null,
    stepRendezVous: null,
    stepCoordonnees: {
        nom_prenom: '',
        telephone: '',
        email: '',
        ville: '',
        message: '',
        photo_assurance: {},
        photo_vitrage: {}
    }
}

const useFormStore = create<FormState>()(
    persist<FormState>(
        (set) => ({
            maxStep: null,
            stepParams: null,
            stepDiagnostic: null,
            stepVehicule: null,
            stepRendezVous: {
                type: '',
                adresse: '',
                indication_complementaire: '',
                ville: '',
                date_souhaitee: null!,
                creneau: ''
            },
            stepCoordonnees: {
                nom_prenom: '',
                telephone: '',
                email: '',
                ville: '',
                message: '',
                photo_assurance: {},
                photo_vitrage: {}
            },
            setData: ({ step, data }) => {
                if (step == 3) {
                    if (data.type == "À domicile") data.ville = '';
                    if (data.type == "En agence") data.adresse = '';
                }
                set((state) => ({
                    ...state,
                    [stepVariant[step]]: data,
                    maxStep: step
                }))
            },
            setParams: (data) => {
                set((state) => ({
                    ...state,
                    stepParams: {
                        ...state.stepParams,
                        ...data
                    }
                }))
            },
            reset: () => {
                set(initialState)
            },
        }),
        {
            name: 'glass-express-rdv-storage'
        }
    )
);
// export default usePlainStore;
export default useFormStore;