import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import {
  nextStep,
  setProgress,
  setTransitioning,
  startStepTransition,
} from "./ngrx-sim.actions";
import {
  delay,
  map,
  mergeMap,
  of,
  switchMap,
  interval,
  takeUntil,
  timer,
  merge,
} from "rxjs";
import { Store } from "@ngrx/store";
import { SimulationState } from "./ngrx-sim.reducer";

@Injectable()
export class SimEffects {
  constructor(
    private actions$: Actions,
    private store: Store<{ simulation: SimulationState }>
  ) {}
  transition$ = createEffect(() =>
    this.actions$.pipe(
      ofType(startStepTransition),

      mergeMap(() => {
        const delayMs = 1000 + Math.random() * 1000;
        const progressSteps = 10;
        const interval = delayMs / progressSteps;

        const start$ = of(setTransitioning({ inProgress: true }));
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
              // ⏸️ Pausa de 300ms antes de finalizar
              mergeMap(() => [
                nextStep(), //set progress in 0, set currentStepIndex
                setTransitioning({ inProgress: false }), // 👈 Transition done
              ])
            )
          )
        );

        return merge(start$, ...progress$, complete$);
      })

      // mergeMap(() => {
      //   const delayMs = 1200;
      //   const progressSteps = 32;
      //   const interval = delayMs / progressSteps;

      //   const progress$ = Array.from({ length: progressSteps }, (_, i) =>
      //     timer(interval * i).pipe(
      //       map(() =>
      //         setProgress({
      //           progress: Math.min(100, (i + 1) * (100 / progressSteps)),
      //         })
      //       )
      //     )
      //   );

      //   const complete$ = timer(delayMs).pipe(map(() => nextStep()));

      //   return merge(...progress$, complete$);
      // })
    )
  );
}
