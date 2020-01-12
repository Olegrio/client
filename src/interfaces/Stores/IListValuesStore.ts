import { IBaseValueStore } from "./IBaseValueStore";

export interface IListValuesStore<TValue, TKey> extends IBaseValueStore {

    readonly isLoading: boolean;
    readonly items: TValue[];
    readonly selectedKeys: TKey[];
    readonly selectedItems: TValue[];

    selectKeys(keys?: TKey[]): void;
    loadItemsAsync(): Promise<void>;
    setFilter(filter?: (item: TValue) => boolean): void;
    clearSelected(): void;
}
