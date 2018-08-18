import * as React from "react";
import AutoSuggest from 'react-autosuggest';
import TextField from '@material-ui/core/TextField';
import InputAdornment  from "@material-ui/core/InputAdornment";
import Search from '@material-ui/icons/Search';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import './searchbar.scss';



interface ISearchBarProps {
    onSearch: Function;
    tunnelNames: any[];
    currentSearch: string;
}

interface ISearchBarState {
    suggestions: string[];
    value: string;
}

export default class SearchBar extends React.Component<ISearchBarProps, ISearchBarState> {
    constructor(props) {
        super(props);
        this.state = {
            suggestions: props.tunnelNames,
            value: ""
        };
    }

    public render() {
        if ( !this.state ) { return <div/>}
        return (
            <div className={'searchContainer'}>
                <AutoSuggest 
                    renderInputComponent={this.renderInput}
                    suggestions= {this.state.suggestions}
                    onSuggestionsFetchRequested={this.handleSuggestionsFetchRequested}
                    onSuggestionsClearRequested={this.handleSuggestionsClearRequested}
                    renderSuggestionsContainer={this.renderSuggestionsContainer}
                    renderSuggestion={this.renderSuggestion}
                    getSuggestionValue={this.getSuggestionValue}
                    onSuggestionSelected={this.handleSelection}
                    inputProps={{
                        classes: {input: 'input'},
                        placeholder: 'Skriv inn et tunnelnavn',
                        value: this.state.value,
                        onChange: this.onSearch,
                        onKeyPress: this.handleSearch,
                        disableUnderline:true
                        
                    }}
                /> 
            </div>
        );
    }

    private renderInput( inputProps) {
        const { classes, ref, ...other } = inputProps;
        return (
            <TextField
            InputProps={{
                startAdornment:(
                    <InputAdornment position="start" >
                                <Search classes={{colorPrimary: '#fff'}} />
                            </InputAdornment>
                        ),
              inputRef: ref,
              classes: {
                input: classes.input,
              },
              ...other }}
            />
        )
    }

    private renderSuggestion(suggestion, {query, isHighlighted}) {
        const matches = match(suggestion.label, query);
        const parts = parse(suggestion.label, matches);
        return (
            <MenuItem selected={isHighlighted} component="div" >
                <div>
                    {parts.map((part, index) => {
                        return part.highlight ? (
                            <span key={String(index)} style={{ fontWeight: 500 }}>
                                {part.text}
                            </span>
                        ) : (
                            <strong key={String(index)} style={{ fontWeight: 300 }}>
                            {part.text}
                        </strong>
                        );
                    })}
                </div>
            </MenuItem>
        )
    }

    private renderSuggestionsContainer(options) {
        const { containerProps, children} = options;

        return (
            <Paper {...containerProps} square>
                {children}
            </Paper>
        )
    }

    private getSuggestionValue(suggestion) {
        return suggestion.label
    }

    private handleSearch = (ev) => {
        if( ev.key === 'Enter') {
            this.props.onSearch(this.state.value);
        }
    }

    private handleSelection = (_, {suggestion}) => {
        this.props.onSearch(suggestion.label);
        this.setState({
            value: suggestion.label,
        });
    }

    private getSuggestions(value: string): string[] {
        const searchValue = value.trim().toLocaleLowerCase();
        const searchstrLength = searchValue.length;
        return searchstrLength < 2 ? [] : this.props.tunnelNames.filter(suggestion => suggestion.label.toLocaleLowerCase().indexOf(searchValue) !== -1).slice(0,5);
    }

    private handleSuggestionsFetchRequested = ({ value }) => {
        this.setState({
          suggestions: this.getSuggestions(value),
        });
      };
    
      private handleSuggestionsClearRequested = () => {
        this.setState({
          suggestions: [],
        });
      };
    
      private onSearch = (_, { newValue }) => {
        this.setState({
            value: newValue
        })
      };
}