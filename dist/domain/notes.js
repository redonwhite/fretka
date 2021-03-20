const step1 = 0;
const step2 = 1;
const step3 = 2;
const step4 = 3;
const step5 = 4;
const step6 = 5;
const step7 = 6;
const step8 = 7;
const step9 = 8;
const step10 = 9;
const step11 = 10;
const step12 = 11;
const root = {
    name: "root",
    step: 1,
    quality: "perfect",
    span: 0,
};
const min2 = {
    name: "minor second",
    step: 2,
    quality: "minor",
    span: 1,
};
const maj2 = {
    name: "major second",
    step: 2,
    quality: "major",
    span: 2,
};
const min3 = {
    name: "minor third",
    step: 3,
    quality: "minor",
    span: 3,
};
const maj3 = {
    name: "major third",
    step: 3,
    quality: "major",
    span: 4,
};
const perf4 = {
    name: "perfect fourth",
    step: 4,
    quality: "perfect",
    span: 5,
};
const aug4 = {
    name: "augmented fourth",
    step: 4,
    quality: "augmented",
    span: 6,
};
const dim5 = {
    name: "diminished fifth",
    step: 5,
    quality: "diminished",
    span: 6,
};
const perf5 = {
    name: "perfect fifth",
    step: 5,
    quality: "perfect",
    span: 7,
};
const min6 = {
    name: "minor sixth",
    step: 6,
    quality: "minor",
    span: 8,
};
const maj6 = {
    name: "major sixth",
    step: 6,
    quality: "major",
    span: 9,
};
const min7 = {
    name: "minor seventh",
    step: 7,
    quality: "minor",
    span: 10,
};
const maj7 = {
    name: "major seventh",
    step: 7,
    quality: "major",
    span: 11,
};
const a = {
    id: "a",
    isNatural: true,
    sharpOf: "gsharp",
    flatOf: "asharp",
    idx: 0,
};
const asharp = {
    id: "asharp",
    isNatural: false,
    sharpOf: "a",
    flatOf: "b",
    idx: 1,
};
const b = {
    id: "b",
    isNatural: true,
    sharpOf: "asharp",
    flatOf: "c",
    idx: 2,
};
const c = {
    id: "c",
    isNatural: true,
    sharpOf: "b",
    flatOf: "csharp",
    idx: 3,
};
const csharp = {
    id: "csharp",
    isNatural: true,
    sharpOf: "c",
    flatOf: "d",
    idx: 4,
};
const d = {
    id: "d",
    isNatural: true,
    sharpOf: "csharp",
    flatOf: "dsharp",
    idx: 5,
};
const dsharp = {
    id: "dsharp",
    isNatural: true,
    sharpOf: "d",
    flatOf: "e",
    idx: 6,
};
const e = {
    id: "e",
    isNatural: true,
    sharpOf: "dsharp",
    flatOf: "f",
    idx: 7,
};
const f = {
    id: "f",
    isNatural: true,
    sharpOf: "e",
    flatOf: "fsharp",
    idx: 8,
};
const fsharp = {
    id: "fsharp",
    isNatural: true,
    sharpOf: "f",
    flatOf: "g",
    idx: 9,
};
const g = {
    id: "g",
    isNatural: true,
    sharpOf: "fsharp",
    flatOf: "gsharp",
    idx: 10,
};
const gsharp = {
    id: "gsharp",
    isNatural: true,
    sharpOf: "g",
    flatOf: "a",
    idx: 11,
};
const basicNotes = {
    a: a,
    asharp: asharp,
    b: b,
    c: c,
    csharp: csharp,
    d: d,
    dsharp: dsharp,
    e: e,
    f: f,
    fsharp: fsharp,
    g: g,
    gsharp: gsharp,
};
const basicNotesArray = [
    a,
    asharp,
    b,
    c,
    csharp,
    d,
    dsharp,
    e,
    f,
    fsharp,
    g,
    gsharp,
];
const major = {
    intervals: [root, maj2, maj3, perf4, perf5, maj6, maj7],
};
const ionian = {
    name: "Ionian",
    modeOf: major,
    startOn: step1,
    intervals: [root, maj2, maj3, perf4, perf5, maj6, maj7],
};
const dorian = {
    name: "Dorian",
    modeOf: major,
    startOn: step2,
    intervals: [root, maj2, min3, perf4, perf5, maj6, min7],
};
const phrygian = {
    name: "Phrygian",
    modeOf: major,
    startOn: step3,
    intervals: [root, min2, min3, perf4, perf5, min6, min7],
};
const lydian = {
    name: "Lydian",
    modeOf: major,
    startOn: step4,
    intervals: [root, maj2, maj3, aug4, perf5, maj6, maj7],
};
const mixolydian = {
    name: "Myxolydian",
    modeOf: major,
    startOn: step5,
    intervals: [root, maj2, maj3, perf4, perf5, maj6, min7],
};
const aeolian = {
    name: "Aeolian",
    modeOf: major,
    startOn: step6,
    intervals: [root, min2, min3, perf4, perf5, min6, min7],
};
const minor = aeolian;
const locrian = {
    name: "Locrian",
    modeOf: major,
    startOn: step7,
    intervals: [root, min2, min3, perf4, dim5, min6, min7],
};
export function makeRootedScale(movableScale, root) {
    const baseIdx = root.idx;
    const notes = Object.fromEntries(movableScale.intervals
        .map(interval => (interval.span + baseIdx) % 12)
        .map(idx => [basicNotesArray[idx].id, basicNotesArray[idx]]));
    return {
        root: root,
        notes,
        movableVersion: movableScale,
    };
}
export const notes = { basicNotes, basicNotesArray };
export const scales = { major, minor };
export const modesOfMajor = {
    ionian,
    dorian,
    phrygian,
    lydian,
    mixolydian,
    aeolian,
    locrian,
};
