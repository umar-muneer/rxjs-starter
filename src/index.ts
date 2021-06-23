import { fromEvent, Observable, timer } from "rxjs";
import { concatAll, map, takeUntil } from "rxjs/operators";
const startClick$ = fromEvent(document.getElementById("start"), "click");
const go$ = timer(200, 3000);
const engine$ = startClick$.pipe(
  map(() => {
    return go$;
  }),
)
/**
 * problems
 * we are getting an observable in the subscribe block instead of a value
 * on each click we are generating a new observable which is creating multiple observables (we need to cancel the previous one)
 * we need to have an internal map to 
 */
engine$.subscribe((value: Observable<number>) => {
  value.subscribe((number) => {
    document.getElementById("numbers").textContent = number.toString();
  });
});