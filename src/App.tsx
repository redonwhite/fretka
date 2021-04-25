import "./App.module.scss";
import { SvgFretboard } from "./components/fretboard/svg-fretboard";
import { LayerStackEditor } from "./components/layer-editors/layer-stack-editor";

import "./vars.scss";
import styles from "./App.module.scss";

import { SvgPatterns } from "./components/svg-patterns/svg-patterns";
import { AppStateStore } from "./store/app-state";
import {
  autorun,
  computed,
  makeAutoObservable,
  makeObservable,
  observable,
  observe,
} from "mobx";

export const appState = new AppStateStore();

appState.layerStore.addShapeLayer();
appState.layerStore.addNoteSelectionLayer();
appState.layerStore.addShapeLayer();
appState.layerStore.addShapeLayer();

// const narr = ["a", "b", "c"];
// let lay1: any = {};
// let lay2: any = {};
// let lay3: any = {};
// narr.forEach(n => (lay1[n] = lay2[n] = lay3[n] = true));
// const larr = [lay1];
// console.log({ larr });

// let sel = [];

// const larro = observable(larr);
// const sels: any = {};

// narr.forEach(n => (sels[n] = computed(() => larro.map(l => l[n]))));

// autorun(() => console.log("a: " + sels["a"] + ""));
// autorun(() => console.log("b: " + sels["b"] + ""));
// autorun(() => console.log("c: " + sels["c"] + ""));

// larro[0]["a"] = false;
// larro.push(lay2);
// larro[1]["a"] = false;
// larro.push(lay3);
// larro[2]["a"] = false;
// console.log({ sels });

const narr = ["a", "b", "c"];
const lay1 : Set<any> = new Set([]);
const lay2 = new Set([]);
const lay3 = new Set([]);

narr.forEach(n => (lay1.add(n)));
const larr = [lay1];
console.log({ larr });
const larro = observable(larr);

const sels: any = {};

narr.forEach(n => (sels[n] = computed(() => larro.map(l => l.has(n)))));

autorun(() => console.log("a: " + sels["a"] + ""));
autorun(() => console.log("b: " + sels["b"] + ""));
autorun(() => console.log("c: " + sels["c"] + ""));

larro.push(lay2);
larro.push(lay3);
larro[0].add('a');
larro[1].add('a');
larro[1].delete('a');


function App() {
  return (
    <>
      {/* <SvgPatterns />
      <div className={styles.appContainer}>
        <div className={styles.fretboardArea}>
          <SvgFretboard fretboardDefinition={appState.fretboardDefinition} />
        </div>
        <div className={styles.noteSelectorArea}>
          <LayerStackEditor layerStore={appState.layerStore} />
        </div>
      </div> */}
    </>
  );
}

export default App;
