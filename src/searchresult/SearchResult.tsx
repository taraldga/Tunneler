import * as React from "react";

import './searchresult.scss';

interface ISearchResultProps {
    items: any[];
    tunnelsWithImages: string[];
}

export default class SearchResult extends React.Component<ISearchResultProps, {}> {
    constructor(props) {
        super(props);
    }

    public render() {
        let cards = this.props.items.map((tunnel, idx) => {
            // let image = this.imageExists(tunnel.name) ? <img src={tunnel.imageUrl} alt={tunnel.name}/> : <div dangerouslySetInnerHTML={{__html:this.getTempTunnel()} } />;
            return (
                <div
                    className={'cardContainer'}
                    key={`${tunnel.name}-${idx}`}
                >
                {tunnel.name}
                </div>
            )
        });
        return (
            <div className={'searchResultContainer'}>
                {cards}
            </div>
        );
    }

    private imageExists(tunnelName: string){
        return this.props.tunnelsWithImages.indexOf(tunnelName.toLocaleLowerCase()) > -1;
    }
}