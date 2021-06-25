import { fromEvent, timer } from "rxjs";
import { concatAll, map, takeUntil } from "rxjs/operators";
const startClick$ = fromEvent(document.getElementById("start"), "click");
const endClick$ = fromEvent(document.getElementById("end"), "click");

const go$ = timer(200, 1000).pipe(takeUntil(endClick$));
const engine$ = startClick$.pipe(switchMapTo(go$));

engine$.subscribe((value: number) => {
  document.getElementById("numbers").textContent = value.toString();
});
