import { observable, action, runInAction, computed } from "mobx";
import { BaseValueStore } from "./BaseValueStore";
import { IListValuesStore } from "../interfaces";

export class ListValuesStore<TValue, TKey> extends BaseValueStore implements IListValuesStore<TValue, TKey> {

    public constructor(
        protected readonly getItemsAsync: () => Promise<TValue[]>,
        public readonly getValueKey: (value: TValue) => TKey
    ) {
        super();
    }

    @action
    public clearSelected(): void {
        this.selectKeys([]);
    }

    @observable
    public isLoading: boolean = false;

    @observable
    private filter?: (item: TValue) => boolean;

    @action
    public setFilter(filter?: (item: TValue) => boolean): void {
        this.filter = filter;
    }

    @computed
    public get items(): TValue[] {

        if (this.filter === undefined) {
            return this.itemsCache;
        }
        return this.itemsCache.filter(this.filter);
    }

    @observable
    protected itemsCache: TValue[] = [];

    @observable
    public selectedKeys: TKey[] = [];

    @action
    public selectKeys(keys?: TKey[]): void {
        this.selectedKeys = keys || [];
    }

    public get selectedItems(): TValue[] {
        return this.items.filter(this.isItemInArray(this.selectedKeys, this.getValueKey));
    }

    public isItemInArray = <T, U>(selectedKeys: U[], getKey: (item: T) => U) => (item: T): boolean => {
        return selectedKeys.includes(getKey(item));
    }

    public async loadItemsAsync(): Promise<void> {

        runInAction(() => this.isLoading = true);

        try {
            const result = await this.getItemsAsync();

            runInAction(() => {
                this.itemsCache = result;

                const selected = result.filter(this.isItemInArray(this.selectedKeys, this.getValueKey));

                if (this.selectedKeys.length !== selected.length) {
                    this.selectKeys(selected.map(this.getValueKey));
                }
            });
        }
        catch (e) {
            console.warn(e.toString());
        }
        finally {
            runInAction(() => this.isLoading = false);
        }
    }
}
