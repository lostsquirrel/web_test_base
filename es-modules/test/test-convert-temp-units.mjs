import test from "ava";
import { cToF, fToC } from "../src/convert-temp-units.mjs";

test("celsius to fahrenheit", t => {
    t.is(cToF(10), 50);
});

test("fahrenheit to celsius", t => {
    t.is(fToC(95), 35);
});

test("same °F as °C", t => {
    t.is(cToF(-40), fToC(-40));
});