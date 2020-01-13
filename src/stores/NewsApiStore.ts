import { injectable } from "inversify";
import { observable, runInAction, action, toJS, reaction } from "mobx";
import { NewsApiServices } from "../services/NewsApiServices";
import { ICountrys, ISources, ICategorys, ITopHeadlines, INewsApiStore, IActiveView, ILanguage, ISortBy } from "../interfaces";
import { COUNTRYS } from "../assets/counrts-iso-3166";
import { CATEGORYS } from "../assets/categorys";
import { LANGUAGE } from "../assets/language";
import { SimpleValueStore } from "./SimpleValueStore";

@injectable()
export class NewsApiStore implements INewsApiStore { 
/** */
    public dateFrom = new SimpleValueStore<Date>(new Date());
    public dateTo = new SimpleValueStore<Date>(new Date());
    public qInTitle = new SimpleValueStore<string | null>(null);
    public domains = new SimpleValueStore<string | null>(null);
    public language = new SimpleValueStore<ILanguage[] | null>(LANGUAGE);
    public sortBy = new SimpleValueStore<ISortBy>(ISortBy.publishedAt);
    public pageSize = new SimpleValueStore<number>(9);
    public page = new SimpleValueStore<number>(1);

/** */
    public activeView = new SimpleValueStore<IActiveView>(IActiveView.topHeadlines);

/** */
    public miniDrawerOpen = new SimpleValueStore<boolean>(true);
/** */
    @observable
    public sources: ISources[] | null = null;
    @observable
    public selectedSources: string[] = [];

/** */
    public activePage = new SimpleValueStore<number | null>(1);
    public pageStartItem = new SimpleValueStore<number>(0);
    public pageFinishItem = new SimpleValueStore<number>(9);

/** */
    public countrys: ICountrys[] = COUNTRYS;
    public selectedCountrys = new SimpleValueStore<string>('Russian Federation');

/** */
    public categorys: ICategorys[] = CATEGORYS;
    public selectedCategorys = new SimpleValueStore<string>('Главные');

/** */
    public searchLine = new SimpleValueStore<string>('');

/** */
    public topHeadlines = new SimpleValueStore<ITopHeadlines[] | null>(null);
    public selectedHeadlines = new SimpleValueStore<ITopHeadlines | null>(null);

    public constructor() {
        this.loadSources();
        this.localStorageParser();
        this.searchTopHeadlines();
        reaction(() => this.selectedCountrys.value, () => localStorage.setItem('selectedCountrys', this.selectedCountrys.value));
        reaction(() => this.selectedCategorys.value, () => localStorage.setItem('selectedCategorys', this.selectedCategorys.value));
        reaction(() => this.searchLine.value, () => localStorage.setItem('searchLine', this.searchLine.value));
        reaction(() => this.searchLine.value, () => localStorage.setItem('searchLine', this.searchLine.value));
        reaction(() => this.activePage.value, 
            () => this.activePage.value === 1 ? (this.pageStartItem.setValue(1),this.pageFinishItem.setValue(9)) : undefined );
    }

    @action
    private localStorageParser(){
        const selectedCountrys = localStorage.getItem('selectedCountrys');
        const selectedCategorys = localStorage.getItem('selectedCategorys');
        const searchLine = localStorage.getItem('searchLine');
        if (selectedCountrys) { this.selectedCountrys.setValue(selectedCountrys)}
        if (selectedCategorys) { this.selectedCategorys.setValue(selectedCategorys) }
        if (searchLine) { this.searchLine.setValue(searchLine)}
    }

    @action
    public selectHeadlines = (data: ITopHeadlines) => {
        this.selectedHeadlines.setValue(data);
    }

    @action
    checkCountrys = (data: string) => {
        this.selectedCountrys.setValue(data);
    }

    @action
    checkCategory = (data: string) => {
        this.selectedCategorys.setValue(data);
    }

    @action
    openPage = (number: number | null) => {
        this.activePage.setValue(number) 
        this.activePage.setValue(number);
    }

    @action
    public loadTopHeadlines(data: ITopHeadlines[]){
        this.topHeadlines.setValue(data);
    }
    @action
    public async searchTopHeadlines(): Promise<void> {
        this.openPage(1);
        const countryObj = COUNTRYS.find(data => data.name === String(this.selectedCountrys)) as ICountrys;
        const categoryObj = CATEGORYS.find(data => data.name_rus === String(this.selectedCategorys)) as ICategorys;
        const params = {
            country: countryObj.alpha_2,
            category: categoryObj.name_eng,
            q: this.searchLine.value,
            sources: String(this.selectedSources)
        };
        const v = await new NewsApiServices('http://127.0.0.1:3002').startSearch(params);
        this.openPage(v.articles.length ? 1 : null);
        runInAction(() => this.topHeadlines.setValue(toJS(v.articles)));
    }
    
    @action
    public async loadSources(): Promise<void> {
        const v = await new NewsApiServices('http://127.0.0.1:3002').getSources();
        runInAction(() => this.sources = toJS(v));
    }


}