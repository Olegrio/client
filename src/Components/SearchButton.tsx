import React from "react";
import { inject, observer } from "mobx-react";
import Fab from '@material-ui/core/Fab';

import SearchIcon from '@material-ui/icons/Search';

import { makeStyles } from '@material-ui/core/styles';
import { INewsApiStore } from "../interfaces";

const useStyles = makeStyles(theme => ({
    button: {
        margin: theme.spacing(1),
        width: 200
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
    },
}));

interface IProps {
    handler: () => void;
}

export default function Search(props: IProps) {
    const classes = useStyles();

    return (
        <Fab 
            variant="extended" 
            color="primary" 
            aria-label="add" 
            className={classes.button}
            onClick={() => props.handler()}
        >
            <SearchIcon className={classes.extendedIcon} />
            Поиск
        </Fab>
    );
}
interface ISearchButton {
    context?: { store: INewsApiStore };
}

@inject(stores => stores)
@observer
export class SearchButton extends React.PureComponent<ISearchButton> {

    render() {
        const { searchTopHeadlines, selectedCountrys, selectedCategorys, topHeadlines, searchLine, selectedSources, openPage } = this.props.context!.store;
        return (
            <div>
                <Search handler= {
                    () => searchTopHeadlines(
                        String(selectedCountrys.value), 
                        String(selectedCategorys.value), 
                        searchLine.value, 
                        String(selectedSources), 
                        topHeadlines,
                        openPage)
                }/>
            </div>
        );
    }
}