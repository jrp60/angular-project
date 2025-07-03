import { createAction, props } from "@ngrx/store";

export const nextStep = createAction("[Simulation] Next Step");
export const startStepTransition = createAction(
  "[Simulation] Transition to next step"
);

export const setProgress = createAction(
  "[Simulation] Set Progress",
  props<{ progress: number }>()
);

// actions.ts
export const setTransitioning = createAction(
  "[Simulation] Set Transitioning",
  props<{ inProgress: boolean }>()
);
