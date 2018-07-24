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
        let currentTunnelSearch = this.state && this.state.currentSearch ? this.state.currentSearch : []; 
        let searchResult = this.state && this.state.currentSearch ? <SearchResult items={currentTunnelSearch} tunnelsWithImages={this.state.tunnelsWithImage}/> : []; 
        return (
            <div className="appContainer">
                <SearchBar tunnelNames={['currentTunnelNames']} onSearch={(newSearchVal) => this.handleSearch(newSearchVal)} />
                {searchResult}
            </div>
        );
    }

    public handleSearch(newSearchVal) {
        let newSearchResults
        console.log(newSearchResults);
        if(newSearchVal.length < 2) {
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