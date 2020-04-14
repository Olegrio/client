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
import { ICategorys } from "../interfaces";
import { NewsApiStore } from "../stores/NewsApiStore";

interface IProps {
    categorys: ICategorys[];
    selectedCategorys: string;
    handler: (data: string) => void;
}

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

function SelectCategorys(props: IProps) {
    const classes = useStyles();
    const { categorys, selectedCategorys, handler } = props;
    
    const checkCategory = (e: any) => {
       handler(e.target.value);
    }
    return (
        <div>
            <FormControl className={classes.formControl}>
                <InputLabel id="mutiple-checkbox-label">Категории</InputLabel>
                <Select
                    labelId="mutiple-checkbox-label"
                    id="mutiple-checkbox"
                    value={selectedCategorys}
                    onChange={e => checkCategory(e)}
                    input={<Input />}
                    renderValue={(selected: any) => selected}
                >
                    {
                        categorys.map(data => (
                            <MenuItem key={data.category_id} value={data.name_rus}>
                                <Checkbox
                                    color="primary"
                                    checked={selectedCategorys.includes(data.name_rus)} 
                                />
                                <ListItemText primary={data.name_rus} />
                            </MenuItem>
                        ))}
                </Select>
            </FormControl>
        </div>
    );
}


interface ICategorysComponent {
    context?: { store: NewsApiStore };
}

@inject(stores => stores)
@observer
export class Categorys extends React.PureComponent<ICategorysComponent> {

    render() {
        const { categorys, selectedCategorys, checkCategory } = this.props.context!.store;

        return (
            <div>
                <SelectCategorys
                    categorys={categorys}
                    selectedCategorys={selectedCategorys.value}
                    handler={(data: string) => checkCategory(data)}
                />
            </div>
        );
    }
}
