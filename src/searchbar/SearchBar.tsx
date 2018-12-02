import * as React from "react";
import TextField from '@material-ui/core/TextField';
import InputAdornment  from "@material-ui/core/InputAdornment";
import Search from '@material-ui/icons/Search';
import Close from '@material-ui/icons/Close';
import './searchbar.scss';




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
                    inputProps={{
                        className: 'input'
                    }}
                    InputProps={{
                        placeholder:"Skriv inn tunnel her",
                        disableUnderline: true,
                        startAdornment: (
                            <InputAdornment position="start">
                                <Search className="searchIcon" />
                            </InputAdornment>
                        ),
                        endAdornment: (
                            <InputAdornment position="end">
                                <Close className='removeTextIcon' onClick={(e) => this.onSearch(e,"")}/>
                            </InputAdornment>
                        )
                    }} 
                />
            </div>
        );
    }
    
      private onSearch = (e, newVal?:string) => {
        let _newVal = newVal !== undefined ? newVal : e.target.value;
        this.props.onSearch(_newVal);
      };
}