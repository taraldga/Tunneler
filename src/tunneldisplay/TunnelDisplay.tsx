import * as React from "react";
import { Input } from 'antd';

import './searchbar.scss';

interface ISearchBarProps {
    onSearch: Function;
    tunnelNames: string[];
}

const Search = Input.Search;

export default class SearchBar extends React.Component<ISearchBarProps, {}> {
    constructor(props) {
        super(props);
    }

    public render() {

        return (
            <div className={'searchContainer'}>
                <h4>Søk etter tunneler</h4>
        <Search
        placeholder="Skriv inn et tunnelnavn..."
        className="searchContainer"
        onChange= {event => this.onSearch(event.target.value)}
        />
        </div>
    );
    }

    private onSearch(value: string) {
        this.props.onSearch(value);
    }
}