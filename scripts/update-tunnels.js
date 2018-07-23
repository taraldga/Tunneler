const fetch = require('node-fetch');
const util = require('util');
const fs = require('fs');

async function FetchTunnels() {
    let rawtunnels = [];
    let next;
    let response = await fetch('https://www.vegvesen.no/nvdb/api/v2/vegobjekter/67.json');
    let data = await response.json();
    rawtunnels.push(...data.objekter);
    next = data.metadata.neste.href;
    while(next !== undefined) {
        let response = await fetch(next);
        let data = await response.json();
        rawtunnels.push(...data.objekter);
        if(data.objekter.length === 0) {
            break;
        }
        next = data.metadata.neste.href;
    }
    let tunnelPromises = rawtunnels.map(FindTunnelData);
    let tunnels = await Promise.all(tunnelPromises);
    let parsedTunnels = tunnels.map(ParseTunnel);
    WriteTunnelsToJson(parsedTunnels);
    return true;
}

async function FindTunnelData(tunnel) {
    let jsonString = `${tunnel.href}.json`
        
    let response = await fetch(jsonString);
    let data = await response.json();

    return data
}

function ParseTunnel(tunnel) {
    const properties = tunnel.egenskaper;
    if (!properties) {return {}}
    let name = properties.find( o => {return o.navn === 'Navn'} );
    let type = properties.find( o => {return o.navn === 'Type tunnelløp'} );
    let length = properties.find( o => {return o.navn === 'Lengde'} );
    let openingYear = properties.find( o => {return o.navn === 'Åpningsår'} );
    
    name = name ? CleanTunnelName(name.verdi) : '';
    type = type ? type.verdi : '';
    lengthUnit = length ? length.enhet.kortnavn : '';
    length = length ? length.verdi : '';
    lengthUnit = lengthUnit ? lengthUnit.verdi : '';
    openingYear = openingYear ? openingYear.verdi : '';

    const imageUrl = `https://res.cloudinary.com/dasmjlipc/image/upload/v1532269669/Anderstunneler/${name}.jpg`

    return {
        name: name,
        type: type,
        length: length,
        imageUrl: imageUrl,
        lengthUnit: lengthUnit,
        openingYear: openingYear,
    }

}

function CleanTunnelName(tunnelName) {
    let cleanName = tunnelName.replace(' hovedløp', '');
    return cleanName;
}

function WriteTunnelsToJson(tunnels) {
    fs.writeFile(`${__dirname}/../src/Assets/tunnels.json`, JSON.stringify(tunnels));
}


FetchTunnels();