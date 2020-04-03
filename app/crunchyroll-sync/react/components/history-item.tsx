import * as React from 'react';
import { connect } from 'react-redux';
import { CombinedState } from '../../redux/reducers';
import { searchTraktFor } from '../../redux/actions';
import SyncEpisodeToggle from './sync-episode-toggle';
import { RequestState } from '../../../classes/request-state';

interface ExternalProps {
    data: Crunchyroll.HistoryItem;
}

interface StateToProps {
    traktData: Trakt.SearchResult;
    isRequestingTrakt: RequestState;
}

interface DispatchToProps {
    requestTrakt: (type: Trakt.SearchType[]) => void;
}

type HistoryItemProps = ExternalProps & StateToProps & DispatchToProps;

const HistoryItemComp: React.StatelessComponent<HistoryItemProps> = props => {
    if (props.data.media && !props.traktData) {
        props.requestTrakt(['episode'])
    }

    let TraktComponent: JSX.Element = null

    // If the trakt request returns data 
    if (props.isRequestingTrakt === RequestState.SUCCESS && props.traktData) {
        TraktComponent = <>
            <h3 className="header">Trakt: {props.traktData?.episode.title}</h3>
            <div className="description">
                Season {props.traktData?.episode.season}, Episode {props.traktData?.episode.number}
            </div>
        </>
        // We are still waiting for a response
    } else if (props.isRequestingTrakt === RequestState.AWAITING) {
        TraktComponent = <progress className="progress is-small is-info" max="100">15%</progress>;
        // Couldn't find the data in Trakt.
    } else if (props.isRequestingTrakt === RequestState.SUCCESS && !props.traktData) {
        TraktComponent = <>
            <h3 className="header">Could not find the Episode in Trakt</h3>
        </>
    }

    return (
        <div className="box">
            <article className="media">
                <div className="media-left">
                    <figure className="image">
                        <img src={props.data.media.screenshot_image.thumb_url} />
                    </figure>
                </div>
                <div className="media-content">
                    <div className="content">
                        <h3 className="header">{props.data.media.name}</h3>
                        <div className="description">
                            Season {parseInt(props.data.collection.season)}, Episode {props.data.media.episode_number}
                        </div>

                        {TraktComponent}
                    </div>
                </div>

                <div className="media-right">
                    <SyncEpisodeToggle crunchyData={props.data} traktData={props.traktData} />
                </div>
            </article>
        </div>
    )
}

const HistoryItem = connect<StateToProps, DispatchToProps, ExternalProps, CombinedState>((state, ext) => {
    return {
        traktData: state.trakt.results[ext.data.media.media_id],
        isRequestingTrakt: state.trakt.isRequesting[ext.data.media.media_id],
    }
}, (dispatch, ext) => {
    return {
        requestTrakt: (type: Trakt.SearchType[]) => dispatch(searchTraktFor(type, ext.data) as any)
    }
})(HistoryItemComp);

export default HistoryItem;