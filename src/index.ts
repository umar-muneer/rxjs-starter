import { fromEvent, timer, merge } from "rxjs";
import { switchMapTo, takeUntil } from "rxjs/operators";
const startClick$ = fromEvent(document.getElementById("start"), "click");
const endClick$ = fromEvent(document.getElementById("end"), "click");
const oneMinute$ = timer(60000);
const end$ = merge(oneMinute$, endClick$);
const go$ = timer(200, 1000).pipe(takeUntil(end$));
const engine$ = startClick$.pipe(switchMapTo(go$));

engine$.subscribe((value: number) => {
  document.getElementById("numbers").textContent = value.toString();
});
