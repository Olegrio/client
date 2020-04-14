import { injectable } from "inversify";
import { observable, runInAction, action, toJS, reaction } from "mobx";
import { NewsApiServices } from "../services/NewsApiServices";
import { ICountrys, ISources, ICategorys, TopHeadlinesInterface, IActiveView, ILanguage, ISortBy, FullNewsInterface } from "../interfaces";
import { COUNTRYS } from "../assets/counrts-iso-3166";
import { CATEGORYS } from "../assets/categorys";
import { LANGUAGE } from "../assets/language";
import { SimpleValueStore } from "./SimpleValueStore";

@injectable()
export class NewsApiStore { 
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
    @observable
    public countrys: ICountrys[] = COUNTRYS;

    @observable
    public selectedCountrys = new SimpleValueStore<string>('Russian Federation');

/** */
    @observable
    public categorys: ICategorys[] = CATEGORYS;
    @observable
    public selectedCategorys = new SimpleValueStore<string>('Главные');

/** */
    public searchLine = new SimpleValueStore<string>('');

/** */
    public topHeadlines = new SimpleValueStore<TopHeadlinesInterface[] | null>(null);
    public fullNews = new SimpleValueStore<FullNewsInterface | null>(null);
    public selectedHeadlines = new SimpleValueStore<TopHeadlinesInterface | null>(null);

    public constructor() {
        (<any>window).__COUNTRYS__ = this.countrys;
        (<any>window).__CATEGORYS__ = this.categorys;
        this.loadSources();
        this.localStorageParser();
        this.loadTopHeadlines();
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
    public selectHeadlines = (data: TopHeadlinesInterface) => {
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
    public loadTopHeadlines(){
        this.searchTopHeadlines();
    }

    @action
    public async searchTopHeadlines(): Promise<void> {

        const countryObj = this.countrys.find(data => data.name === this.selectedCountrys.value) as ICountrys;
        const categoryObj = this.categorys.find(data => data.name_rus === this.selectedCategorys.value) as ICategorys;
        
        const params = {
            country: countryObj.alpha_2,
            category: categoryObj.name_eng,
            q: this.searchLine.value,
            sources: String(this.selectedSources)
        };
        const v = await new NewsApiServices('http://127.0.0.1:3002').startSearchHeadlines(params);
        this.openPage(v.articles.length ? 1 : null);
        runInAction(() => this.topHeadlines.setValue(toJS(v.articles)));
    }
    
    @action
    public async searchFullNews(): Promise<void> {
        this.openPage(1);
        const params = {
            q: this.searchLine.value
        };
        const v = await new NewsApiServices('http://127.0.0.1:3002').startSearchFullNews(params);
        this.openPage(v.articles.length ? 1 : null);
        runInAction(() => this.fullNews.setValue(toJS(v.articles)));
    }

    @action
    public async loadSources(): Promise<void> {
        const v = await new NewsApiServices('http://127.0.0.1:3002').getSources();
        runInAction(() => this.sources = toJS(v));
    }

}