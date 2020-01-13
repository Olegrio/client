import React from "react";
import { List, ListItem, ListItemIcon } from "@material-ui/core";
import { SearchLineComponent } from "../../SearchLine";
import FindInPageIcon from '@material-ui/icons/FindInPage';
import SearchIcon from '@material-ui/icons/Search';
import { SearchButton } from "../../SearchButton";


export class Everything extends React.PureComponent {
    render() {
        return (
            <>
                <List>
                    <ListItem button key={'keyPhrase'}>
                        <ListItemIcon>
                            <FindInPageIcon color='disabled' />
                        </ListItemIcon>
                        <SearchLineComponent />
                    </ListItem>
                    <ListItem button key={'startSearch'}>
                        <ListItemIcon>
                            <SearchIcon color='disabled' />
                        </ListItemIcon>
                        <SearchButton />
                    </ListItem>
                </List>
            </>
        )
    }
}