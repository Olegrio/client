export interface ISearchHeadlinesParams {
    country: string;
    category: string;
    q: string;
    sources?: string;
}

export interface ISearcFullNewshParams{
    q?: string;
    qInTitle?: string
    sources?: string;
    from?: Date;
    to?: Date;
    domains?: string;
    excludeDomains?: string;   
    language?: string;
    sortBy?: Sort;    
}


export enum Sort {
    relevancy,
    popularity,
    publishedAt
}