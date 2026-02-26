"use client";

import { create } from "zustand";

type LiveStep = 1 | 2 | 3 | 4;

type DraftState = {
  step: LiveStep | null;
  stepDiagnostic?: any;
  stepVehicule?: any;
  stepRendezVous?: any;
  stepCoordonnees?: any;
  setDraft: (step: LiveStep, data: any) => void;
  resetDraft: () => void;
};

const initialState = {
  step: null,
  stepDiagnostic: undefined,
  stepVehicule: undefined,
  stepRendezVous: undefined,
  stepCoordonnees: undefined,
};

export const useRecapLiveStore = create<DraftState>((set) => ({
  ...initialState,

  setDraft: (step, data) =>
    set((state) => ({
      ...state,
      step,
      ...(step === 1 && { stepDiagnostic: data }),
      ...(step === 2 && { stepVehicule: data }),
      ...(step === 3 && { stepRendezVous: data }),
      ...(step === 4 && { stepCoordonnees: data }),
    })),

  resetDraft: () => set(initialState),
}));