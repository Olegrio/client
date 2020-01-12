export interface IBaseValueStore {
    readonly enabled: boolean;
    setEnabledState(state: boolean): void;
}
