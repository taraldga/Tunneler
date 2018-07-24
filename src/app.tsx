import * as React from 'react';
import SearchBar from './searchbar/SearchBar';
import SearchResult from './searchresult/searchresult';
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
}

class App extends React.Component<{}, IAppState> {

    public componentDidMount() {
        const tunnelData = require('./Assets/tunnels.json');
        const tunnelsWithImage = require('./Assets/tunnelswithimage.json');
        this.setState({
            allTunnels: tunnelData,
            tunnelsWithImage: tunnelsWithImage
        });
    }

    public render() {
        if(!this.state){ return null }
        console.log(this.state)
        let currentTunnelNames = this.state && this.state.currentSearch ? this.state.currentSearch.map(tunnel => tunnel.name) : []; 
        let currentTunnelSearch = this.state && this.state.currentSearch ? this.state.currentSearch : []; 
        return (
            <div className="appContainer">
                <SearchBar tunnelNames={currentTunnelNames} onSearch={(newSearchVal) => this.handleSearch(newSearchVal)} />
                <SearchResult items={currentTunnelSearch} tunnelsWithImages={this.state.tunnelsWithImage}/>
            </div>
        );
    }

    public handleSearch(newSearchVal) {
        let newSearchResults
        console.log(newSearchResults);
        if(newSearchVal.length < 3) {
            newSearchResults = [];
        } else {
            newSearchResults = this.state.allTunnels.filter( tunnel => tunnel.name.toLocaleLowerCase().indexOf(newSearchVal.toLocaleLowerCase()) !== -1 );
        }
        this.setState({
            currentSearch: newSearchResults,
        });
    }
}

export default App;