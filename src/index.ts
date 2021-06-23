import { fromEvent, Observable, timer } from "rxjs";
import { concatAll, map, take, takeUntil } from "rxjs/operators";
const startClick$ = fromEvent(document.getElementById("start"), "click");
const go$ = timer(200, 1000);
const engine$ = startClick$.pipe(
  map(() => {
    return go$
  }),
  concatAll()
)

engine$.subscribe((value) => {
  document.getElementById("numbers").textContent = value.toString();
});