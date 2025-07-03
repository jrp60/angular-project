import { Component } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import {
  selectCurrentStep,
  selectCurrentStepIndex,
  selectProgress,
  selectSteps,
  selectTransitioning,
} from "src/app/state/ngrx-sim/ngrx-sim.selectors";
import { startStepTransition } from "src/app/state/ngrx-sim/ngrx-sim.actions";

@Component({
  selector: "app-ngrx-simulator",
  templateUrl: "./ngrx-simulator.component.html",
  styleUrls: ["./ngrx-simulator.component.css"],
})
export class NgrxSimulatorComponent {
  currentStep$: Observable<string> = this.store.select(selectCurrentStep);
  progress$: Observable<number> = this.store.select(selectProgress);
  steps$: Observable<string[]> = this.store.select(selectSteps);
  currentStepIndex$: Observable<number> = this.store.select(
    selectCurrentStepIndex
  ); //USAR ESTE

  //new
  transitioning$: Observable<boolean> = this.store.select(selectTransitioning);

  stepPointer: number = 0;

  // Visual flow highlights
  progressMap: { [key: string]: number } = {};
  isActive: { [key: string]: boolean } = {};
  shouldSkipTransition: { [key: string]: boolean } = {};
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

  animate = false;

  currentReduxCycleStep: string = "TEST";

  //NEW
  currentActiveBar: string | null = null;

  constructor(private store: Store) {}

  ngOnInit() {
    this.currentStep$.subscribe((step) => {
      this.currentReduxCycleStep = step;
    });

    this.progress$.subscribe((progress) => {
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

    // this.currentStepIndex$.subscribe((index) => {
    //   this.stepPointer = index;
    // });
  }

  advance() {
    let currentIndex: number | undefined;

    this.currentStepIndex$
      .subscribe((index) => {
        currentIndex = index;
      })
      .unsubscribe(); // obtener valor sin mantener suscripción

    if (
      currentIndex === undefined ||
      currentIndex >= this.stepsSequence.length
    ) {
      // Reiniciar visual si hace falta
      this.progressMap = {};
      this.highlightStep = null;
      return;
    }

    const { from } = this.stepsSequence[currentIndex];

    if (this.previousFrom && this.previousFrom !== from) {
      this.progressMap[this.previousFrom] = 0;
    }

    this.currentActiveBar = from;
    this.highlightStep = null;
    this.previousFrom = from;

    this.store.dispatch(startStepTransition());
  }

  advance2() {
    if (this.stepPointer >= this.stepsSequence.length) {
      this.progressMap = {};
      this.highlightStep = null;
      // this.stepPointer = 0;
      return;
    }

    const { from } = this.stepsSequence[this.stepPointer];

    if (this.previousFrom && this.previousFrom !== from) {
      this.progressMap[this.previousFrom] = 0;
    }

    this.currentActiveBar = from;
    this.highlightStep = null;
    this.previousFrom = from;

    this.store.dispatch(startStepTransition());

    // this.stepPointer++;
  }
}
