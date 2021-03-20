"use strict";
const a = {
    id: "a",
    isNatural: true,
    sharpOf: "gsharp",
    flatOf: "asharp",
};
const asharp = {
    id: "asharp",
    isNatural: false,
    sharpOf: "a",
    flatOf: "b",
};
const b = {
    id: "b",
    isNatural: true,
    sharpOf: "asharp",
    flatOf: "c",
};
const c = {
    id: "c",
    isNatural: true,
    sharpOf: "b",
    flatOf: "csharp",
};
const csharp = {
    id: "csharp",
    isNatural: true,
    sharpOf: "c",
    flatOf: "d",
};
const d = {
    id: "d",
    isNatural: true,
    sharpOf: "csharp",
    flatOf: "dsharp",
};
const dsharp = {
    id: "dsharp",
    isNatural: true,
    sharpOf: "d",
    flatOf: "e",
};
const e = {
    id: "e",
    isNatural: true,
    sharpOf: "dsharp",
    flatOf: "f",
};
const f = {
    id: "f",
    isNatural: true,
    sharpOf: "e",
    flatOf: "fsharp",
};
const fsharp = {
    id: "fsharp",
    isNatural: true,
    sharpOf: "f",
    flatOf: "g",
};
const g = {
    id: "g",
    isNatural: true,
    sharpOf: "fsharp",
    flatOf: "gsharp",
};
const gsharp = {
    id: "gsharp",
    isNatural: true,
    sharpOf: "g",
    flatOf: "a",
};
const notes = {
    a: {},
    "a#": {},
    b: {},
    c: {},
    "c#": {},
};
