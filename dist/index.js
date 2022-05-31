"use strict";
const randomBool = () => {
    return Math.random() > 0.5;
};
const pickEnvelope = () => {
    const rand = Math.floor(Math.random() * 2);
    return rand;
};
const generateEnvelopes = () => {
    const envelopeA = Math.floor(Math.random() * 1000);
    const envBIsBigger = randomBool();
    const envelopeB = envBIsBigger ? envelopeA * 2 : envelopeA / 2;
    return [envelopeA, envelopeB];
};
const runRandomScenario = () => {
    const envs = generateEnvelopes();
    const pickedEnvelope = pickEnvelope();
    const notPickedEnvelope = pickedEnvelope === 1 ? 0 : 1;
    if (envs[pickedEnvelope] > envs[notPickedEnvelope]) {
        return {
            betterOpt: "keep",
            envelopes: envs
        };
    }
    else {
        return {
            betterOpt: "switch",
            envelopes: envs
        };
    }
};
const run = () => {
    const args = process.argv.slice(2);
    if (args.length === 0) {
        console.log("Please include an argument for length");
        return 1;
    }
    else if (args.length > 1) {
        console.log("You included too many arguments. Please onlude only one, an integer specifying the number of experiments to run");
        return 1;
    }
    const lengthArg = parseInt(args[0]);
    if (isNaN(lengthArg)) {
        console.log("Please make sure your argument is an integer.");
        return 1;
    }
    let keepIsBetter = 0;
    let switchIsBetter = 0;
    for (let i = 0; i < lengthArg; i++) {
        const { betterOpt, envelopes: [e1, e2] } = runRandomScenario();
        console.log(`Envelopes: [${Math.floor(e1).toString().padStart(5, "0")}, ${Math.floor(e2).toString().padStart(5, "0")}]. Correct Solution: ${betterOpt.padStart(6, " ")}`);
        if (betterOpt === "keep") {
            keepIsBetter++;
        }
        else {
            switchIsBetter++;
        }
    }
    const equal = ((Math.abs(keepIsBetter - switchIsBetter) / lengthArg) * 100) <= 5;
    const solution = keepIsBetter - switchIsBetter > 0 ? "keep you envelope" : "switch envelopes";
    console.log(`Based on ${lengthArg} trials, ${equal ? `neither is superior: \nkeep: ${keepIsBetter}, switch: ${switchIsBetter}` : `it is better to ${solution}: \nkeep: ${keepIsBetter}, switch: ${switchIsBetter}`}`);
};
run();
