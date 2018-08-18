import * as React from 'react';
import SearchBar from './searchbar/SearchBar';
import SearchResult from './searchresult/SearchResult';
import TunnelDisplay from './tunneldisplay/TunnelDisplay';
import './App.scss';

export interface ITunnel {
    name: string;
    type: string;
    length: number;
    lengthUnit: string;
    imageUrl: string;
    openingYear: string;
}

interface IAppState {
    allTunnels: ITunnel[];
    currentSearch?: ITunnel[];
    selectedTunnel: ITunnel;
    tunnelNames: string[];
    tunnelsWithImage: string[];
    currentSearchString: string;
}

class App extends React.Component<{}, IAppState> {

    public componentDidMount() {
        const tunnelData = require('./Assets/tunnels.json');
        const tunnelsWithImage = require('./Assets/tunnelswithimage.json');
        this.setState({
            allTunnels: tunnelData,
            tunnelsWithImage: tunnelsWithImage,
            currentSearchString: ""
        });
    }

    public render() {
        if(!this.state){ return null }

        let currentTunnelSearch = this.state && this.state.currentSearch ? this.state.currentSearch : []
        let resultPane;
        if(currentTunnelSearch.length === 1) {
            resultPane = <TunnelDisplay
                            tunnel={currentTunnelSearch[0]}
                            tunnelsWithImages={this.state.tunnelsWithImage}/>;
        } else {
            resultPane = this.state && this.state.currentSearch ?
                <SearchResult 
                    items={currentTunnelSearch}
                    tunnelsWithImages={this.state.tunnelsWithImage}
                    updateSearchFunction={(newSearchVal) => this.handleSearch(newSearchVal)}/> :   
            <div/>;
        }
        return (
            <div className="appContainer">
                <div className='banner'>
                    <h1>Tuneller</h1>
                    <SearchBar tunnelNames={this.state.allTunnels.map(tunnel => {return { label: tunnel.name} }) }       
                            onSearch={(newSearchVal) => this.handleSearch(newSearchVal)}
                            currentSearch={this.state.currentSearchString}/>
                </div>
                {resultPane}
            </div>
        );
    }

    public handleSearch(newSearchVal: string) {
        console.log(newSearchVal);
        let newSearchResults;
        if(newSearchVal.length < 3) {
            newSearchResults = [];
        } else {
            newSearchResults = this.state.allTunnels.filter( tunnel => tunnel.name.toLocaleLowerCase().indexOf(newSearchVal.toLocaleLowerCase()) !== -1 );
        }
        this.setState({
            currentSearch: newSearchResults,
            currentSearchString: newSearchVal,
        });
    }
}

export default App;