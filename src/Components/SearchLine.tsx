import React from "react";
import { inject, observer } from "mobx-react";

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { ISimpleValueStore, INewsApiStore } from "../interfaces";

interface IProps {
    line: ISimpleValueStore<string>;
}

const useStyles = makeStyles(theme => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: 240,
        },
    },
}));

export default function SearchLine(props: IProps) {
    const classes = useStyles();
    return (
        <form className={classes.root} noValidate autoComplete="off">
            <TextField 
                type="search" 
                id="standard-basic" 
                label="Ключевая фраза" 
                defaultValue={props.line.value}
                onChange={(e) => props.line.setValue(e.target.value)}
            />
        </form>
    );
}
interface ISearchLineComponent {
    context?: { store: INewsApiStore };
}

@inject(stores => stores)
@observer
export class SearchLineComponent extends React.PureComponent<ISearchLineComponent> {
    render() {
        const { searchLine } = this.props.context!.store;
        return (
            <div>
                <SearchLine line={searchLine}  />
            </div>
        );
    }
}