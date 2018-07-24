import * as React from "react";
import { AutoComplete } from 'antd';
import './searchbar.scss';

interface ISearchBarProps {
    onSearch: Function;
    tunnelNames: string[];
}

const Option = AutoComplete.Option;

export default class SearchBar extends React.Component<ISearchBarProps, {}> {
    constructor(props) {
        super(props);
    }

    public render() {
        const dataSource = this.props.tunnelNames ? this.props.tunnelNames : [];
        const children = dataSource.map((tunnel) => {
            return <Option key={tunnel}>{tunnel}</Option>;
          });
        return (
            <div className={'searchContainer'}>
                <h4>Søk etter tunneler</h4>
                <AutoComplete
                    placeholder="Skriv inn et tunnelnavn..."
                    onSearch={value => this.onSearch(value)}
                    className="searchContainer"
                    filterOption={false}
                    
                >
                {children}
                </AutoComplete>
            </div>
        );
    }

    private onSearch(value: string) {
        this.props.onSearch(value);
    }
}