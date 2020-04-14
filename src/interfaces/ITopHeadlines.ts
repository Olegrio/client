export interface TopHeadlinesInterface {
    source: SourceInterface;
    author: string | null;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    content: string;
}

interface SourceInterface {
    id: string;
    name: string;
}


export interface FullNewsInterface {
    status: string;
    totalResults: number;
    articles: Array<ArticlesInterface>
}

interface ArticlesInterface {
    source: SourceInterface;
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    content: string;
}