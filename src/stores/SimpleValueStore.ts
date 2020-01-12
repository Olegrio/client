import { observable, action } from "mobx";
import { BaseValueStore } from "./BaseValueStore";
import { ISimpleValueStore } from "../interfaces";

export class SimpleValueStore<T> extends BaseValueStore implements ISimpleValueStore<T> {

    public constructor(private readonly _defaultValue: T, private readonly setRule?: (value: T, thisValue: T) => boolean) {
        super();
        this.setValue(_defaultValue);
    }

    @observable
    public value!: T;

    @action
    public setValue(value: T): void {
        if (this.setRule === undefined || this.setRule(value, this.value)) {
            this.value = value;
        }
    }

    @action
    public clearSelected(): void {
        this.value = this._defaultValue;
    }
}
