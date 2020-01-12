import { IBaseValueStore } from "./IBaseValueStore";

export interface IArrayValuesStore<T> extends IBaseValueStore {

    readonly array: T[];
    setValue(index: number, value: T): void;
    resize(length: number): void;
    clear(): void;
}
