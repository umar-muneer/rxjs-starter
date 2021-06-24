import { fromEvent, timer } from "rxjs";
import { concatAll, map, takeUntil } from "rxjs/operators";
const startClick$ = fromEvent(document.getElementById("start"), "click");
const go$ = timer(200, 1000).pipe(takeUntil(startClick$));
const engine$ = startClick$.pipe(
  map(() => {
    return go$;
  }),
  concatAll()
);

engine$.subscribe((value) => {
  document.getElementById("numbers").textContent = value.toString();
});
