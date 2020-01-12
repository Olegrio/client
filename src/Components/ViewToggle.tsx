import React from 'react';
import { inject, observer } from "mobx-react";
import { ISimpleValueStore, IActiveView } from '../interfaces';
import clsx from 'clsx';

import "./ViewToggle.scss";

interface IProps {
    activeView: ISimpleValueStore<IActiveView>;
}

@inject(stores => stores)
@observer
export class ViewToggle extends React.PureComponent<IProps> {
    topHeadlines = () => {
        this.props.activeView.setValue(IActiveView.topHeadlines);
    }
    everything = () => {
        this.props.activeView.setValue(IActiveView.everything);
    }

    render() {
        const activeView = this.props.activeView.value;
        return (
            <div className={'activeView'}>
                <div
                    onClick={() => this.topHeadlines()}
                    className={clsx('viewItem', {
                        'viewItemActive': activeView === IActiveView.topHeadlines,
                    })}
                >
                    Заголовки
                </div>
                <div
                    onClick={() => this.everything()}
                    className={clsx('viewItem', {
                        'viewItemActive': activeView === IActiveView.everything,
                    })}
                >
                    Новости
                </div>
            </div>
        )
    }
}