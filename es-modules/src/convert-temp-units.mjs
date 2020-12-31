// src/convert-temp-units.mjs
export const cToF = celsius =>
    celsius * 9/5 + 32;

export const fToC = fahrenheit =>
    (fahrenheit - 32) * 5/9;