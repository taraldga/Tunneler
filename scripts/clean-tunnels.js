const fs = require('fs');
let tunnels = require('../src/Assets/tunnels.json');


const uniqFilterAccordingToProp = function (prop) {
    if (prop)
        return (ele, i, arr) => arr.map(ele => ele[prop]).indexOf(ele[prop]) === i
    else
        return (ele, i, arr) => arr.indexOf(ele) === i
}

console.log(tunnels.length);


let filteredTunnels = tunnels.filter(tunnel => tunnel.name && tunnel.name !== 'Skjæringen Mariero');
let nonMultiple = filteredTunnels.filter(uniqFilterAccordingToProp('name'));
console.log(nonMultiple.length);
fs.writeFile(`${__dirname}/../src/Assets/tunnels.json`, JSON.stringify(nonMultiple));