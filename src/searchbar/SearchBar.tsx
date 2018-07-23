import * as React from "react";
import { AutoComplete } from 'antd';
import './searchbar.scss';

interface ISearchBarProps {
    onSearch: Function;
    tunnelNames: string[];
}

export default class SearchBar extends React.Component<ISearchBarProps, {}> {

    public render() {
        
        return (
            <div className={'searchContainer'}>
                <h4>Søk etter tunneler</h4>
                <AutoComplete
                    placeholder="Skriv inn et tunnelnavn..."
                    onSearch={value => this.onSearch(value)}
                    dataSource={this.props.tunnelNames}
                    className="searchContainer"
                />
            </div>
        );
    }

    private onSearch(value: string) {
        this.props.onSearch(value);
    }
}