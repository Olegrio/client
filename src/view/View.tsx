import React from "react";
import { inject, observer } from "mobx-react";
import { NewsApiStore } from '../stores/NewsApiStore';
import { Provider } from "mobx-react";
import "./View.scss";
import { INewsApiStore, IActiveView } from "../interfaces";
import { TopHeadlinesCards } from "../Components/TopHeadlinesCard";
import MiniDrawer from "./MiniDrawer";

@inject(stores => stores)
@observer
export class View extends React.PureComponent {

    private readonly newsContext: { store: INewsApiStore } = {
        store: new NewsApiStore()
    };

    public render() {
        const { activeView, miniDrawerOpen } = this.newsContext.store;
        return (
            <Provider context={this.newsContext}>
                <MiniDrawer
                    activeView={activeView}
                    miniDrawerOpen={miniDrawerOpen}  
                />
                <div className="content">
                    {
                        activeView.value === IActiveView.topHeadlines
                            ? <TopHeadlinesCards />
                            : null
                    }
                </div>
            </Provider>
        );
    }
}

