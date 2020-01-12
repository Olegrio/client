import { IBaseValueStore } from "./IBaseValueStore";

export interface ISimpleValueStore<T> extends IBaseValueStore {
    readonly value: T;
    setValue(value: T): void;
    clearSelected(): void;
}
