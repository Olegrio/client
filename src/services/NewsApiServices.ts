import axios from 'axios';
import { ISearchParams } from '../interfaces';

export interface IResponse { 

}

export interface INewsApiServices {
    getSources(): Promise<any>;
    startSearch(params: ISearchParams): Promise<any>;
}

export class NewsApiServices implements INewsApiServices {

    private readonly _api = axios.create({ baseURL: this.host });

    public constructor(private readonly host: string) { 
    }

    public async getSources(): Promise<any> {
        const result = await this._api.get<any>(`/news/sources`);
        return result.data.sources;
    }

    public async startSearch(params: ISearchParams): Promise<any> {
        const result = await this._api.post<any>(`news/search`, params);
        return result.data;
    }

}


