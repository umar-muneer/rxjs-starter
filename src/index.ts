import { fromEvent, timer, merge } from "rxjs";
import { map, scan, switchMapTo, takeUntil } from "rxjs/operators";
const startButton = document.getElementById("start");
const endButton = document.getElementById("end");
const resetButton = document.getElementById("reset");
const startClick$ = fromEvent(startButton, "click");
const endClick$ = fromEvent(endButton, "click");
const resetClick$ = fromEvent(resetButton, "click").pipe(
  map(() => {
    return {
      type: "reset",
      value: 0,
    };
  })
);
const oneMinute$ = timer(60000);
const end$ = merge(oneMinute$, endClick$);
const go$ = timer(200, 500).pipe(
  map(() => {
    return {
      type: "data",
    };
  }),
  takeUntil(end$)
);
const actions$ = merge(go$, resetClick$);
const engine$ = startClick$.pipe(
  switchMapTo(actions$),
  scan(
    (state: any, action: any) => {
      if (action.type === "reset") {
        return { ...action, value: 1 };
      }
      return { ...action, value: state.value + 1 };
    },
    { type: "none", value: 0 }
  ),
  map((action: any) => action.value)
);
engine$.subscribe((value: number) => {
  document.getElementById("numbers").textContent = value.toString();
});
