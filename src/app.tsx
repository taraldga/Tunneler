import * as React from 'react';
import SearchBar from './searchbar/SearchBar';
import './App.scss';

interface ITunnel {
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
}

class App extends React.Component<{}, IAppState> {

    public componentDidMount() {
        const tunnelData = require('./Assets/tunnels.json');
        this.setState({
            allTunnels: tunnelData
        });
    }

    public render() {
        if(!this.state){ return null }
        console.log(this.state)
        let currentTunnelNames = this.state && this.state.currentSearch ? this.state.currentSearch.map(tunnel => tunnel.name) : []; 
        return (
            <div className="appContainer">
                <SearchBar tunnelNames={currentTunnelNames} onSearch={(newSearchVal) => this.handleSearch(newSearchVal)} />
            </div>
        );
    }

    public handleSearch(newSearchVal) {
        let newSearchResults
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