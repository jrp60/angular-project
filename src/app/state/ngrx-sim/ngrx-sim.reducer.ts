// src/app/state/ngrx-simulation/ngrx-simulation.reducer.ts
import { createReducer, on } from "@ngrx/store";
import * as SimulationActions from "./ngrx-sim.actions";
import { setRunning } from "./ngrx-sim.actions";

export interface SimulationState {
  currentStepIndex: number;
  steps: string[];
  progress: number; // 0-100
  running: boolean;
}

export const initialState: SimulationState = {
  currentStepIndex: 0,
  steps: [
    "Component Dispatches Action",
    "Effect Triggered",
    "API Request",
    "API Response",
    "Effect Dispatches New Action",
    "Reducer Updates State",
    "Store Emits New State",
    "Selector Emits Change",
    "Component Reacts to State Changes",
  ],
  progress: 0,
  running: false,
};

export const simulationReducer = createReducer(
  initialState,
  on(SimulationActions.nextStep, (state) => {
    const lastIndex = state.steps.length - 1;
    const nextIndex =
      state.currentStepIndex >= lastIndex ? 0 : state.currentStepIndex + 1;

    return {
      ...state,
      currentStepIndex: nextIndex,
      progress: 0,
    };
  }),

  on(SimulationActions.setProgress, (state, { progress }) => ({
    ...state,
    progress,
  })),
  on(setRunning, (state, { running }) => ({
    ...state,
    running: running,
  }))
);
