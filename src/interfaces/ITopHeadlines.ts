export interface ITopHeadlines {
    source: ISource;
    author: string | null;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    content: string;
}

interface ISource {
    id: string;
    name: string;
}
