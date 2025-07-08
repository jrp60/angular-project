import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import {
  nextStep,
  setProgress,
  setRunning,
  startStepTransition,
} from "./ngrx-sim.actions";
import { map, mergeMap, of, timer, merge, withLatestFrom, filter } from "rxjs";
import { Store } from "@ngrx/store";
import { SimulationState } from "./ngrx-sim.reducer";
import { selectRunning } from "./ngrx-sim.selectors";

@Injectable()
export class SimEffects {
  constructor(
    private actions$: Actions,
    private store: Store<{ simulation: SimulationState }>
  ) {}
  transition$ = createEffect(() =>
    this.actions$.pipe(
      ofType(startStepTransition),
      withLatestFrom(this.store.select(selectRunning)),
      filter(([_, running]) => !running), // solo continuar si no está running

      mergeMap(() => {
        const delayMs = 1000 + Math.random() * 1000;
        const progressSteps = 10;
        const interval = delayMs / progressSteps;

        const start$ = of(setRunning({ running: true }));
        // Create an array with 10 steps (progressSteps) and fill it along time using the timer, from 0 to 100
        //  creating then an observable array of secuencial progress along time.
        const progress$ = Array.from({ length: progressSteps }, (_, i) =>
          timer(interval * i).pipe(
            map(() =>
              setProgress({
                progress: Math.min(100, (i + 1) * (100 / progressSteps)),
              })
            )
          )
        );
        const complete$ = timer(delayMs).pipe(
          mergeMap(() =>
            timer(300).pipe(
              // Pausa de 300ms antes de finalizar
              mergeMap(() => [
                nextStep(), //set progress in 0, set currentStepIndex
                setRunning({ running: false }), // Transition done
              ])
            )
          )
        );

        return merge(start$, ...progress$, complete$);
      })
    )
  );
}
