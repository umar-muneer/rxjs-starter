import { fromEvent, timer, merge } from "rxjs";
import { map, scan, switchMapTo, takeUntil } from "rxjs/operators";
const startButton = document.getElementById("start");
const endButton = document.getElementById("end");
const resetButton = document.getElementById("reset");
const multiplyBy2Button = document.getElementById("multiplyBy2");
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
const multiplyBy2Click$ = fromEvent(multiplyBy2Button, "click").pipe(
  map(() => {
    return {
      type: "x2",
      transform: (number) => number * 2,
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
const actions$ = merge(go$, resetClick$, multiplyBy2Click$);
const engine$ = startClick$.pipe(
  switchMapTo(actions$),
  scan(
    (state: any, action: any) => {
      if (action.type === "reset") {
        return { ...state, ...action, value: 1 };
      }
      return { ...state, ...action, value: state.transform(state.value + 1) };
    },
    { type: "none", value: 0, transform: (number) => number }
  ),
  map((action: any) => action.value)
);
engine$.subscribe((value: number) => {
  document.getElementById("numbers").textContent = value.toString();
});
