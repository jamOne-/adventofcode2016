fs = require('fs');
fs.readFile('input', 'UTF-8', (err, input) => {
    console.log(solve(input));
});

function solve(input) {
    let lines = input.split('\r\n');
    let bots = [];
    let outputs = [];
    let chips = [];

    lines.forEach(instruction => {
        let match;

        if (match = instruction.match(/value (\d+) goes to bot (\d+)/))
            chips.push({ value: +match[1], id: +match[2] });

        else { 
            match = instruction.match(/bot (\d+) gives low to (.*) and high to (.*)/);
            let id = +match[1];

            bots[id] = bots[id] || new Bot(id);
            bots[id].lower = match[2].split(' ');
            bots[id].higher = match[3].split(' ');
        }
    });

    chips.forEach(chip => {
        bots[chip.id].chips.push(chip.value);
        giveChips(bots, outputs, chip.id); 
    });

    return outputs[0] * outputs[1] * outputs[2];
}

function giveChips(bots, outputs, id) {
    let bot = bots[id];

    if (bot.chips.length < 2) return;

    bot.chips.sort((a, b) => a - b);

    if (bot.lower[0] == 'bot') bots[bot.lower[1]].chips.push(bot.chips[0]);
    else outputs[bot.lower[1]] = bot.chips[0];

    if (bot.higher[0] == 'bot') bots[bot.higher[1]].chips.push(bot.chips[1]);
    else outputs[bot.higher[1]] = bot.chips[1];

    bot.chips = [];

    if (bot.lower[0] == 'bot') giveChips(bots, outputs, bot.lower[1]);
    if (bot.higher[0] == 'bot') giveChips(bots, outputs, bot.higher[1]);
}

function Bot(id) {
    this.id = id;
    this.chips = [];
    this.lower = '';
    this.higher = '';
}