import React from "react";

import ListItem from '@material-ui/core/ListItem';

import FlagIcon from '@material-ui/icons/Flag';
import CategoryIcon from '@material-ui/icons/Category';
import FindInPageIcon from '@material-ui/icons/FindInPage';
import SearchIcon from '@material-ui/icons/Search';
import { ListItemIcon } from "@material-ui/core";
import List from '@material-ui/core/List';

import { Countrys } from "../../Countrys";
import { Categorys } from "../../Categorys";
import { SearchLineComponent } from "../../SearchLine";
import { SearchButton } from "../../SearchButton";

export class TopHeadlines extends React.PureComponent {
    render(){
        return (
            <>
                <List>
                    <ListItem button key={'countrys'}>
                        <ListItemIcon>
                            <FlagIcon color='disabled' />
                        </ListItemIcon>
                        <Countrys />
                    </ListItem>
                    <ListItem button key={'categorys'}>
                        <ListItemIcon>
                            <CategoryIcon color='disabled' />
                        </ListItemIcon>
                        <Categorys />
                    </ListItem>
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