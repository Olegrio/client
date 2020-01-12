import { observable, action } from "mobx";
import { BaseValueStore } from "./BaseValueStore";
import { IArrayValuesStore } from "../interfaces";


export class ArrayValuesStore<T> extends BaseValueStore implements IArrayValuesStore<T> {

    public constructor(
        private readonly defaultValue: T,
        private readonly setRule?: (value: T) => boolean
    ) {
        super();
    }

    @observable
    public array: T[] = [];

    @action
    public setValue = (index: number, value: T): void => {

        if (this.setRule && !this.setRule(value)) {
            return;
        }

        if (index < this.array.length) {
            this.array[index] = value;
        }
        else {
            this.array.push(value);
        }
    }

    @action
    public resize(length: number): void {

        if (length < this.array.length) {
            const deletedCount = this.array.length - length!;
            this.array.splice(this.array.length - deletedCount, deletedCount);
        }
        else {
            let idx = this.array.length;

            while (idx < length) {
                this.array.push(this.defaultValue);
                idx += 1;
            }
        }
    }

    @action
    public clear(): void {
        this.array = [];
    }
}
