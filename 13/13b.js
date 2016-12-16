fs = require('fs');
fs.readFile('input', 'UTF-8', (err, input) => {
    console.log(solve(input));
});

function solve(input) {
  let q = [{ x: 1, y: 1, moves: 0}];
  let tiles = {};
  tiles['1 1'] = true;
  
  while (q.length) {
    let u = q.shift();
    if (u.moves == 50) break;
    
    neighbours(u, +input).forEach(n => {
      if (tiles[n.x + ' ' + n.y]) return;

      tiles[n.x + ' ' + n.y] = true;
      q.push(n);
    });
  }
  
  return Object.keys(tiles).length;
}

function neighbours(u, offset) {
  let ret = [];
  
  [-1, 1].forEach(d => {
    ['x', 'y'].forEach(e => {
      let s = { x: u.x, y: u.y, moves: u.moves + 1 };
      s[e] += d;
      
      if (s.x >= 0 && s.y >= 0 && f(offset, s.x, s.y))
        ret.push(s);
    });
  });
  
  return ret;
}

let calculated = {};

function f(offset, x, y) {
  if (calculated[x + ' ' + y] !== undefined) return calculated[x + ' ' + y];
  
  let a = x * x + 3 * x + 2 * x * y + y + y * y + offset;
  return calculated[x + ' ' + y] = a.toString(2).split('').filter(c => c == '1').length % 2 === 0;
}