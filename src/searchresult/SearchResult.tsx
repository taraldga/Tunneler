import * as React from 'react';
import { Card } from 'antd';

import './searchresult.scss';
const { Meta } = Card;

interface ISearchResultProps {
    items: any[];
    tunnelsWithImages: string[];
}

export default class SearchBar extends React.Component<ISearchResultProps, {}> {
    constructor(props) {
        super(props);
    }

    public render() {
        let cards = this.props.items.map(tunnel => {
            let image = this.imageExists(tunnel.name) ? <img src={tunnel.imageUrl} alt={tunnel.name}/> : <div dangerouslySetInnerHTML={{__html:this.getTempTunnel()} } />;
            return (
                <Card
                    hoverable={true}
                    className={'cardContainer'}
                    cover={image}
                >
                    <Meta 
                        title={tunnel.name}
                        description={`${tunnel.length}m`}
                    />
                </Card>
            )
        });
        return (
            <div className={'searchResultContainer'}>
                {cards}
            </div>
        );
    }

    private imageExists(tunnelName: string){
        console.log(this.props.tunnelsWithImages);
        console.log(tunnelName)
        return this.props.tunnelsWithImages.indexOf(tunnelName.toLocaleLowerCase()) > -1;
    }

    private getTempTunnel() {
        return (
            `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:serif="http://www.serif.com/" width="100%" height="100%" viewBox="0 0 1280 800" version="1.1" xml:space="preserve" style="margin-top: 5px;fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:1.41421;">
                <g id="ic_subway_24px" transform="matrix(39.9118,0,0,39.9118,161.059,-79.2353)">
                    <rect x="7.01" y="9" width="10" height="5" style="fill:rgb(51,51,51);"/>
                    <path d="M17.8,2.8C16,2.09 13.86,2 12,2C10.14,2 8,2.09 6.2,2.8C3.53,3.84 2,6.05 2,8.86L2,22L22,22L22,8.86C22,6.05 20.47,3.84 17.8,2.8Z" style="fill:rgb(51,51,51);"/>
                    <path d="M18,15.88C18,17.33 16.82,18.5 15.37,18.5L16.5,19.62L16.5,20L15,20L13.5,18.5L10.67,18.5L9.17,20L7.5,20L7.5,19.62L8.62,18.5C7.185,18.495 6.005,17.315 6,15.88L6,9C6,6.37 9,6 12,6C15.32,6 18,6.38 18,9L18,15.88Z" style="fill:rgb(51,51,51);"/>
                </g>
                <g id="ic_directions_car_24px" transform="matrix(23.6144,0,0,25.6324,356.627,110.25)">
                    <path d="M18.92,6.01C18.72,5.42 18.16,5 17.5,5L6.5,5C5.84,5 5.29,5.42 5.08,6.01L3,12L3,20C3,20.55 3.45,21 4,21L5,21C5.55,21 6,20.55 6,20L6,19L18,19L18,20C18,20.55 18.45,21 19,21L20,21C20.55,21 21,20.55 21,20L21,12L18.92,6.01ZM6.5,16C5.67,16 5,15.33 5,14.5C5,13.67 5.67,13 6.5,13C7.33,13 8,13.67 8,14.5C8,15.33 7.33,16 6.5,16ZM17.5,16C16.67,16 16,15.33 16,14.5C16,13.67 16.67,13 17.5,13C18.33,13 19,13.67 19,14.5C19,15.33 18.33,16 17.5,16ZM5,11L6.5,6.5L17.5,6.5L19,11L5,11Z" style="fill:white;fill-rule:nonzero;"/>
                </g>
            </svg>`
        )
    }
}