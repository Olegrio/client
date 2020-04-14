import React from "react";
import { TopHeadlinesInterface } from "../interfaces";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import { inject, observer } from "mobx-react";

import "./TopHeadlinesCard.scss";
import { NewsApiStore } from "../stores/NewsApiStore";

const CopyToClipboard = require('react-copy-to-clipboard');
const useStylesBootstrap = makeStyles(theme => ({
    arrow: {
        color: theme.palette.common.black,
    },
    tooltip: {
        backgroundColor: theme.palette.common.black,
    },
}));

function BootstrapTooltip(props: any) {
    const classes = useStylesBootstrap();

    return <Tooltip arrow classes={classes} {...props} />;
}

const useStyles = makeStyles({
    card: {
        maxWidth: 345,
        marginBottom: 9
    },
    media: {
        height: 180,
    },
});

interface IProps {
    topHeadlines: TopHeadlinesInterface;
}

export default function MediaCard(props: IProps) {
    const classes = useStyles();
    const { urlToImage, title, description, url } = props.topHeadlines;  
    return (
        <Card className={classes.card}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image={urlToImage ? urlToImage : "/img/globus.png"} 
                    title={title}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {title}
          </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {description}
          </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <CopyToClipboard onCopy={() => {}} text={url}>
                <Button 
                    size="small" 
                    color="primary"
                >
                    <BootstrapTooltip title="Скопиовать ссылку">
                        <span>
                            Поделиться
                        </span>
                   </BootstrapTooltip>
        </Button>
                </CopyToClipboard>
                <Button 
                    size="small" 
                    color="primary" 
                    onClick={() => window.open(url, '_blank')}
                > 
                    <BootstrapTooltip title="Перейти на сайт источника">
                        <span>
                              Подробнее...
                        </span>
                     </BootstrapTooltip>
        </Button>
            </CardActions>
        </Card>
    );
}

interface ITopHeadlinesCard {
    context?: { store: NewsApiStore };
}

@inject(stores => stores)
@observer
export class TopHeadlinesCards extends React.PureComponent<ITopHeadlinesCard> {


    openPage = (start: number, finish: number, number: number) => {
        const S = this.props.context!.store;
        S.pageStartItem.setValue(start);
        S.pageFinishItem.setValue(finish);
        S.openPage(number);
    }

    pagination = (length: number): number[] => {
        let arr = [];
        for (let i = 1; i <= length; i = i + 1) {
            arr.push(i);
        }
        return arr;
    }

    render() {
        const { topHeadlines, activePage, pageStartItem, pageFinishItem } = this.props.context!.store;
        if (!topHeadlines.value) { return null }
        
        const length = topHeadlines.value.length;
        const topHeadlinesVision = topHeadlines.value.slice(pageStartItem.value, pageFinishItem.value);
      
        return (
            <div className='TopHeadlinesCards'>
                {
                    topHeadlinesVision.map(
                        (data, index) => 
                            <MediaCard 
                                key={index} 
                                topHeadlines={data}
                            />
                    )
                }
                <div className='pagination'>
                    {
                        this.pagination(Math.ceil(length / 9)).map((data, index) =>
                            <div 
                                key={index} 
                                className={`pagination-item ${activePage.value === index + 1 ? 'active' : ''}`} 
                                onClick={() => this.openPage(index * 9, index * 9 + 9, index + 1)
                            }>
                                {index + 1}
                            </div>
                        )
                    }
                </div>              
            </div>
        );
    }
}

