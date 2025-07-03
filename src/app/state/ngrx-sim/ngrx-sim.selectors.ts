import { createFeatureSelector, createSelector } from "@ngrx/store";
import { SimulationState } from "./ngrx-sim.reducer";

export const selectSimState =
  createFeatureSelector<SimulationState>("simulation");

export const selectCurrentStepIndex = createSelector(
  selectSimState,
  (state) => state.currentStepIndex
);

export const selectCurrentStep = createSelector(
  selectSimState,
  (state) => state.steps[state.currentStepIndex]
);

export const selectSteps = createSelector(
  selectSimState,
  (state) => state.steps
);

export const selectProgress = createSelector(
  selectSimState,
  (state) => state.progress
);

export const selectTransitioning = createSelector(
  selectSimState,
  (state) => state.running
);

// export const selectIsRunning = createSelector(
//   selectSimState,
//   (state) => state.running
// );
