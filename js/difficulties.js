// WARNING: DO NOT TOUCH THESE UNLESS YOU REALLY KNOW WHAT YOU ARE TRULY DOING!!
const DIFFICULTIES = {
    /* The chars must have unique String and length as a square number
       The charValSpacings must have Number being coprime with chars.length
       No 2 charValSpacing in charValSpacings should sum up as chars.length */
    relaxed: {
        chars: ["0", "1", "2", "3"],
        charValSpacings: [1]
    },
    easy: {
        chars: ["0", "1", "2", "3", "4", "5", "6", "7", "8"],
        charValSpacings: [1, 2, 4]
    },
    normal: {
        chars: [
            "0",
            "1",
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "9",
            "A",
            "B",
            "C",
            "D",
            "E",
            "F"
        ],
        charValSpacings: [1, 3, 5, 7]
    },
    hard: {
        chars: [
            "0",
            "1",
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "9",
            "A",
            "B",
            "C",
            "D",
            "E",
            "F",
            "G",
            "H",
            "I",
            "J",
            "K",
            "L",
            "M",
            "N",
            "O"
        ],
        charValSpacings: [1, 2, 3, 4, 6, 7, 8, 9, 11, 12]
    },
    insane: {
        chars: [
            "0",
            "1",
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "9",
            "A",
            "B",
            "C",
            "D",
            "E",
            "F",
            "G",
            "H",
            "I",
            "J",
            "K",
            "L",
            "M",
            "N",
            "O",
            "P",
            "Q",
            "R",
            "S",
            "T",
            "U",
            "V",
            "W",
            "X",
            "Y",
            "Z"
        ],
        charValSpacings: [1, 5, 7, 11, 13, 17]
    }
    //
};
Object.entries(DIFFICULTIES).forEach(([difficulty, cfg]) => {
    const chars = cfg.chars;
    // Using FMLAS would need loading it before this which is temporal coupling
    if (!Number.isInteger(Math.sqrt(chars.length))) {
        console.warn("The length of the character list " +
                `${JSON.stringify(chars)} of the ${difficulty} difficulty ` +
                "isn't a square number!");
    }
    //
    chars.forEach((char, i) => {
        chars.forEach((otherChar, j) => {
            if (char !== otherChar || i === j) return;
            console.warn(`The ${i} and ${j}th character of the character ` +
                    `list ${JSON.stringify(chars)} of the ${difficulty}` +
                    " difficulty are the same!");
        });
    });
    const l = chars.length, charValSpacings = cfg.charValSpacings;
    const gcd = (no1, no2) => no2 === 0 ? no1 : gcd(no2, no1 % no2);
    // The multiplicity of an element's its unintended weight on its probability
    charValSpacings.forEach((charValSpacing, i) => {
        const complementIndex = charValSpacings.findIndex(complement => {
            return charValSpacing + complement === l;
        });
        if (complementIndex >= 0) {
            console.warn(`The sum of charValSpacing with indices ${i} and ` +
                    `${complementIndex} for difficulty ${difficulty} are ` +
                    `chars.length which is invalid!`);
        }
        const result = gcd(l, charValSpacing);
        if (result === 1) return;
        console.warn(`The gcd between chars.length, ${l}, and charValSpacing` +
                ` ${charValSpacing} for difficulty ${difficulty} should be 1` +
                ` but is instead ${result}!`);
    });
    //
});
//
