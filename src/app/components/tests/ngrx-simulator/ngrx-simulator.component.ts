import { Component } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable, Subject, take, takeUntil } from "rxjs";
import {
  selectCurrentStepIndex,
  selectProgress,
  selectRunning,
  selectSteps,
} from "src/app/state/ngrx-sim/ngrx-sim.selectors";
import { startStepTransition } from "src/app/state/ngrx-sim/ngrx-sim.actions";
import { trigger, transition, style, animate } from "@angular/animations";

@Component({
  selector: "app-ngrx-simulator",
  templateUrl: "./ngrx-simulator.component.html",
  styleUrls: ["./ngrx-simulator.component.css"],
  animations: [
    trigger("slideVertical", [
      transition(":enter", [
        style({ transform: "translateY(100%)", opacity: 0 }),
        animate(
          "500ms ease-out",
          style({ transform: "translateY(0)", opacity: 1 })
        ),
      ]),
      transition(":leave", [
        animate(
          "500ms ease-in",
          style({ transform: "translateY(-100%)", opacity: 0 })
        ),
      ]),
    ]),
  ],
})
export class NgrxSimulatorComponent {
  progress$: Observable<number> = this.store.select(selectProgress);
  steps$: Observable<string[]> = this.store.select(selectSteps);
  running$: Observable<boolean> = this.store.select(selectRunning);
  currentStepIndex$: Observable<number> = this.store.select(
    selectCurrentStepIndex
  );
  private destroy$ = new Subject<void>();

  // Visual flow highlights
  progressMap: { [key: string]: number } = {};
  previousFrom: string | null = null;
  highlightStep: string | null = null;

  stepsSequence = [
    { from: "component-to-action", to: "ACTION" },
    { from: "action-to-effects", to: "EFFECTS" },
    { from: "effects-to-service", to: "SERVICE" },
    { from: "service-to-effects", to: "EFFECTS" },
    { from: "effects-to-action", to: "ACTION" },
    { from: "action-to-reducer", to: "REDUCER" },
    { from: "reducer-to-store", to: "STORE" },
    { from: "store-to-selector", to: "SELECTOR" },
    { from: "selector-to-component", to: "COMPONENT" },
  ];

  currentStepText: string = "Waiting to start cycle...";
  fadeOut = false;
  currentActiveBar: string | null = null;

  constructor(private store: Store) {}

  ngOnInit() {
    // .pipe(takeUntil(this.destroy$)) to unsuscribe when destroy component
    this.progress$.pipe(takeUntil(this.destroy$)).subscribe((progress) => {
      if (this.currentActiveBar) {
        this.progressMap[this.currentActiveBar] = progress;

        if (progress >= 100) {
          const step = this.stepsSequence.find(
            (s) => s.from === this.currentActiveBar
          );
          this.highlightStep = step?.to || null;
        }
      }
    });
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  advance() {
    this.currentStepIndex$.pipe(take(1)).subscribe((currentIndex) => {
      if (
        currentIndex >= this.stepsSequence.length ||
        currentIndex == undefined
      ) {
        this.resetVisuals();
        return;
      }

      const { from } = this.stepsSequence[currentIndex];

      if (this.previousFrom && this.previousFrom !== from) {
        this.progressMap[this.previousFrom] = 0;
      }

      this.currentActiveBar = from;
      this.highlightStep = null;
      this.previousFrom = from;
      // Paso 1: Desactiva texto (empieza fade out o slide up)
      this.fadeOut = true;
      // Paso 2: Espera a que termine el fade (match con CSS)
      setTimeout(() => {
        // Paso 3: Avanza el ciclo visual
        this.store.dispatch(startStepTransition());
        // Paso 4: Actualiza texto del paso explicativo
        this.steps$.pipe(take(1)).subscribe((stepsArray) => {
          // Paso 5: Muestra de nuevo el texto con efecto de entrada
          this.currentStepText = stepsArray[currentIndex] || "";
          this.fadeOut = false;
        });
      }, 300);
    });
  }

  private resetVisuals() {
    this.progressMap = {};
    this.highlightStep = null;
    this.currentStepText = "Waiting to start cycle...";
  }
}
