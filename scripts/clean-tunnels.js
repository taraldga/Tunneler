const fs = require('fs');
let tunnels = require('../src/Assets/tunnels.json');


const uniqFilterAccordingToProp = function (prop) {
    if (prop)
        return (ele, i, arr) => arr.map(ele => ele[prop]).indexOf(ele[prop]) === i
    else
        return (ele, i, arr) => arr.indexOf(ele) === i
}



console.log(tunnels.length);
let filteredByLength = tunnels.filter(tunnel => tunnel.length > 100);
console.log(filteredByLength.length);

let filteredByName = filteredByLength.map(tunnel => {
     if(tunnel.name.toLocaleLowerCase().indexOf('svartdal') !== -1) {
        tunnel.name = 'Svartdalstunnelen'
        return tunnel
    } else if(tunnel.name.toLocaleLowerCase().indexOf('bjørvika') !== -1) {
        tunnel.name = 'Bjørvikatunnelen'
        return tunnel;
    } else if(tunnel.name.toLocaleLowerCase().indexOf('løp mot') !== -1) {
        let tunnelarray = tunnel.name.split(' ');
        let cleantunnelName = tunnelarray.slice(0, tunnelarray.indexOf('løp')).join(' ');
        tunnel.name = cleantunnelName;
        return tunnel;
    } else if(tunnel.name.toLocaleLowerCase().indexOf('løp') !== -1) {
        tunnel.name = tunnel.name.split(' ')[0].replace(',','');
    }
    return tunnel;
});

let onlyTheLongestMaySurvive = filteredByName.filter(tunnel => {
    let dupe = filteredByName.filter(anotherTunnel => anotherTunnel.name === tunnel.name)[0];
    if(dupe) {
        return tunnel.length >= dupe.length
    }
    else return tunnel
});

let nonMultiple = onlyTheLongestMaySurvive.filter(uniqFilterAccordingToProp('name'));


// let filteredTunnels = tunnels.filter(tunnel => tunnel.name && tunnel.name !== 'Skjæringen Mariero');
// console.log(nonMultiple.length)
// let filterMissingType = nonMultiple.filter(tunnel => tunnel.type !== undefined);
fs.writeFile(`${__dirname}/../src/Assets/tunnels.json`, JSON.stringify(nonMultiple));