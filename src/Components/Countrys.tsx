import React from "react";
import { inject, observer } from "mobx-react";

import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import { ICountrys, INewsApiStore } from "../interfaces";



const useStyles = makeStyles(theme => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 240,
        maxWidth: 240,
    },
    chips: {
        display: 'flex'
    },
    chip: {
        margin: 2,
    },
    noLabel: {
        marginTop: theme.spacing(3),
    },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

interface IProps {
    countrys: ICountrys[];
    selectedCountrys: string;
    handler: (data: string) => void;
}

function MultipleSelectCountrys(props: IProps) {
    const classes = useStyles();
    const { selectedCountrys, countrys } = props;
    const checkCountry = (e: any) => {
        props.handler(e.target.value);
    }
    return (
        <div>
            <FormControl className={classes.formControl}>
                <InputLabel id="mutiple-checkbox-label">Страна</InputLabel>
                <Select
                    labelId="mutiple-checkbox-label"
                    id="mutiple-checkbox"
                    value={selectedCountrys}
                    onChange={e => checkCountry(e)}
                    input={<Input />}
                    renderValue={(selected:any) => selected}
                    MenuProps={MenuProps}
                >
                    {  
                        countrys.map(data => (
                        <MenuItem key={data.name} value={data.name}>
                                <Checkbox 
                                    color="primary" 
                                    checked={selectedCountrys.includes(data.name)} 
                                />
                            <ListItemText primary={data.name} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}


interface ICountrysComponent {
    context?: { store: INewsApiStore };
}

@inject(stores => stores)
@observer
export class Countrys extends React.PureComponent<ICountrysComponent> {

    render() {
        const { selectedCountrys, countrys, checkCountrys } = this.props.context!.store;

        return (
            <div>
                <MultipleSelectCountrys 
                    selectedCountrys={selectedCountrys.value} 
                    countrys={countrys}
                    handler={(data: string) => checkCountrys(data)}
                />
            </div>
        );
    }
}
