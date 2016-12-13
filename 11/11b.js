// names of the input elements have to start with different letters
// omgomomomgomgogmogmogmgomgomg

fs = require('fs');
fs.readFile('input', 'UTF-8', (err, input) => {
    console.log(solve(input));
});

function solve(input) {
    let floors = interpretInput(input);
    floors[0].push('dg', 'dm', 'eg', 'em');

    let q = [{ e: 0, floors, moves: 0 }];
    let ret = null;

    let visited = {};
    visited[stateToString(q[0])] = true;

    while (!ret && q.length) {
        let state = q.shift();
        let possibilities = allValidPossibilities(state);

        possibilities.forEach(state => {
            if (visited[stateToString(state)]) return;
            visited[stateToString(state)] = true;

            if (state.floors.every((floor, i) => i == 3 || floor.length === 0))
                ret = state;

            q.push(state);
        });
    }

    return ret.moves;
}

function interpretInput(input) {
    let floors = [];

    input.split('\r\n').forEach(line => {
        let floor = [];

        let words = line.split(' ');
        words.forEach((word, i) => {
            if (word.includes('microchip')) floor.push(words[i - 1][0] + 'm');
            else if (word.includes('generator')) floor.push(words[i - 1][0] + 'g');
        });

        floors.push(floor);
    });

    return floors;
}

function allValidPossibilities(state) {
    let possibilities = [];

    let generate = (elevator) => {
        let floor = state.floors[state.e];

        // take one item
        floor.forEach((item, i) => {
            let newFloors = JSON.parse(JSON.stringify(state.floors));
            newFloors[elevator].push(item);
            newFloors[state.e].splice(i, 1);

            let s = { e: elevator, floors: newFloors, moves: state.moves + 1 };
            if (validState(s)) possibilities.push(s);
        });

        // take two items
        for (let diff = 1; diff < floor.length; diff++) {
            for (let i = 0; i + diff < floor.length; i++) {
                let newFloors = JSON.parse(JSON.stringify(state.floors));
                newFloors[elevator].push(floor[i], floor[i + diff]);
                newFloors[state.e].splice(i, 1);
                newFloors[state.e].splice(i + diff - 1, 1);

                let s = { e: elevator, floors: newFloors, moves: state.moves + 1 };
                if (validState(s)) possibilities.push(s);
            }
        }
    }

    if (state.e < 3) generate(state.e + 1);
    if (state.e > 0) generate(state.e - 1);

    return possibilities;
}

function validState(state) {
    let result = true;

    state.floors.forEach(floor => {
        let microchips = floor.filter(item => item[1] == 'm');
        let generators = floor.filter(item => item[1] == 'g');

        if (generators.length > 0 && microchips.some(microchip => !generators.includes(microchip[0] + 'g')))
            result = false;
    });

    return result;
}

function stateToString(state) {
    let positions = {};

    state.floors.forEach((floor, i) => 
        floor.forEach(item => {
            positions[item[0]] = positions[item[0]] || {};
            positions[item[0]][item[1]] = i;
        }
    ));

    return valuesOfObject(positions).map(e => `(${e.m}, ${e.g})`).sort().join(' ') + ` e: ${state.e}`;
}

function valuesOfObject(o) {
    let values = [];

    for (let key in o)
        if (o.hasOwnProperty(key))
            values.push(o[key]);

    return values;
}