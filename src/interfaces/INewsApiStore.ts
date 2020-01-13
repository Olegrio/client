import { ISources } from "./ISources";
import { ISimpleValueStore } from "./Stores/ISimpleValueStore";
import { ITopHeadlines } from "./ITopHeadlines";
import { ICountrys } from "./ICountrys";
import { ICategorys } from "./ICategorys";
import { IActiveView } from "./IActiveView";

export interface INewsApiStore {
    activeView: ISimpleValueStore<IActiveView>;
    miniDrawerOpen: ISimpleValueStore<boolean>;

    sources: ISources[] | null;
    topHeadlines: ISimpleValueStore<ITopHeadlines[] | null>;
    selectedHeadlines: ISimpleValueStore<ITopHeadlines | null>;

    activePage: ISimpleValueStore<number | null>;
    pageStartItem: ISimpleValueStore<number>;
    pageFinishItem: ISimpleValueStore<number>;

    searchLine: ISimpleValueStore<string>;
    selectedSources: string[];
    selectedCountrys: ISimpleValueStore<string>;
    selectedCategorys: ISimpleValueStore<string>;
    countrys: ICountrys[];
    categorys: ICategorys[];
    loadSources(): Promise<void>;
    selectHeadlines: (data: ITopHeadlines) => void;
    readonly loadTopHeadlines: (data: ITopHeadlines[]) => void;
    readonly searchTopHeadlines: () => Promise<void>
    checkCountrys(data: string): void;
    checkCategory(data: string): void;
    openPage: (number: number | null) => void;
}
