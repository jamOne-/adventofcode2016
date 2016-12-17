md5 = require('md5');
fs = require('fs');
fs.readFile('input', 'UTF-8', (err, input) => {
    console.log(solve(input));
});

function solve(input) {
    return dfs(input, { x: 0, y: 0, moves: 0, path: '' });
}

function dfs(input, state) {
    if (state.x == 3 && state.y == 3) return state.moves;
    return neighbours(input, state).reduce((max, n) => Math.max(max, dfs(input, n)), -1);
}

function neighbours(input, state) {
    const open = ['b', 'c', 'd', 'e', 'f'];
    let possibilities = [];
    let hash = md5(input + state.path);

    if (state.y > 0 && open.includes(hash[0])) possibilities.push(['y', -1, 'U']);
    if (state.y < 3 && open.includes(hash[1])) possibilities.push(['y', 1, 'D']);
    if (state.x > 0 && open.includes(hash[2])) possibilities.push(['x', -1, 'L']);
    if (state.x < 3 && open.includes(hash[3])) possibilities.push(['x', 1, 'R']);

    return possibilities.map(([k, delta, d]) => {
        let s = { x: state.x, y: state.y, moves: state.moves + 1, path: state.path };
        s[k] += delta;
        s.path += d;

        return s;
    });
}