import axios from 'axios';
import { ISearchHeadlinesParams, ISearcFullNewshParams } from '../interfaces';

export interface IResponse { 

}

export interface INewsApiServices {
    getSources(): Promise<any>;
    startSearchHeadlines(params: ISearchHeadlinesParams): Promise<any>;
}

export class NewsApiServices implements INewsApiServices {

    private readonly _api = axios.create({ baseURL: this.host });

    public constructor(private readonly host: string) { 
    }

    public async getSources(): Promise<any> {
        const result = await this._api.get<any>(`/news/sources`);
        return result.data.sources;
    }

    public async startSearchHeadlines(params: ISearchHeadlinesParams): Promise<any> {
        const result = await this._api.post<any>(`news/search`, params);
        return result.data;
    }

    public async startSearchFullNews(params: ISearcFullNewshParams): Promise<any> {
        const result = await this._api.post<any>(`/news/search-e`, params);
        return result.data;
    }

}


