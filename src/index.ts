import { fromEvent, timer, merge, pipe } from "rxjs";
import {
  filter,
  map,
  scan,
  share,
  switchMapTo,
  takeUntil,
} from "rxjs/operators";
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
const toggleEven$ = fromEvent(document.getElementById("toggle-even"), "click");
const evenChecked$ = toggleEven$.pipe(
  filter((event: any) => event.currentTarget.checked)
);
const toggleOdd$ = fromEvent(document.getElementById("toggle-odd"), "click");
const oddChecked$ = toggleOdd$.pipe(
  filter((event: any) => event.currentTarget.checked)
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
const mapActionToValue = pipe(map((action: any) => action.value));
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
  share()
);
const allNumbers$ = engine$.pipe(mapActionToValue);
const evenNumbers$ = evenChecked$.pipe(
  switchMapTo(engine$),
  filter((action: any) => action.value % 2 === 0),
  mapActionToValue
);
const oddNumbers$ = oddChecked$.pipe(
  switchMapTo(engine$),
  filter((action: any) => action.value % 2 !== 0),
  mapActionToValue
);
toggleEven$.subscribe((evt: any) => {
  if (evt.currentTarget.checked) {
    document.getElementById("even-numbers").classList.remove("hide");
  } else {
    document.getElementById("even-numbers").classList.add("hide");
  }
});
toggleOdd$.subscribe((evt: any) => {
  if (evt.currentTarget.checked) {
    document.getElementById("odd-numbers").classList.remove("hide");
  } else {
    document.getElementById("odd-numbers").classList.add("hide");
  }
});
allNumbers$.subscribe((value: number) => {
  document.getElementById("numbers").textContent = value.toString();
});
evenNumbers$.subscribe((value: number) => {
  document.getElementById("even-numbers").textContent = value.toString();
});
oddNumbers$.subscribe((value: number) => {
  document.getElementById("odd-numbers").textContent = value.toString();
});
