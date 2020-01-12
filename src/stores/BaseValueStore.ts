import { observable, action } from "mobx";
import { IBaseValueStore } from "../interfaces";

export abstract class BaseValueStore implements IBaseValueStore {

    @observable
    public enabled: boolean = true;

    @action
    public setEnabledState(state: boolean): void {
        this.enabled = state;
    }
}
