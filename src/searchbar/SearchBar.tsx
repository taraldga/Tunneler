import * as React from "react";
import TextField from '@material-ui/core/TextField';
import InputAdornment  from "@material-ui/core/InputAdornment";
import Search from '@material-ui/icons/Search';
import './searchbar.scss';
import createHistory from 'history/createBrowserHistory'



interface ISearchBarProps {
    onSearch: Function;
    tunnelNames: any[];
    currentSearch: string;
}

interface ISearchBarState {
    suggestions: string[];
}

export default class SearchBar extends React.Component<ISearchBarProps, ISearchBarState> {
    constructor(props) {
        super(props);
        const history = createHistory();
        
        this.state = {
            suggestions: props.tunnelNames,
        };
    }

    public render() {
        if ( !this.state ) { return <div/>}
        return (
            <div className={'searchContainer'}>
                <TextField 
                    id="searchBar" 
                    value={this.props.currentSearch} 
                    className={'searchContainer'} 
                    onChange={(e) => this.onSearch(e)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position='start'>
                                <Search />
                            </InputAdornment>
                        ),
                    }} 
                />
            </div>
        );
    }
    
      private onSearch = (e) => {
        this.props.onSearch(e.target.value);
      };
}