import { createAction, props } from "@ngrx/store";

export const nextStep = createAction("[Simulation] Next Step");
export const startStepTransition = createAction(
  "[Simulation] Transition to next step"
);

export const setProgress = createAction(
  "[Simulation] Set Progress",
  props<{ progress: number }>()
);

export const setRunning = createAction(
  "[Simulation] Set Running",
  props<{ running: boolean }>()
);
