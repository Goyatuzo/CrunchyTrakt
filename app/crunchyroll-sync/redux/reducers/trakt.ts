import { IAction } from "../../../global/action";
import { ActionType } from "../../../global/actiontype";
import { RequestState } from "../../../classes/request-state";

export interface TraktState {
    results: { [key: string]: Trakt.SearchResult };
    isRequesting: { [key: string]: RequestState };
    historicScrobbles: { [key: string]: Trakt.ScrobbleHistory[] };
    isRequestingHistoricScrobbles: { [key: string]: boolean };
    historyAddState: { [key: string]: RequestState };
}

const defaultState: TraktState = {
    results: {},
    isRequesting: {},
    historicScrobbles: {},
    isRequestingHistoricScrobbles: {},
    historyAddState: {}
}

export function reducer(state = defaultState, action: IAction) {
    switch (action.type) {
        case ActionType.REQUEST_TRAKT_SEARCH: {
            let currentRequests = { ...state.isRequesting };
            currentRequests[action.value] = RequestState.AWAITING;

            return { ...state, requesting: currentRequests };
        }
        case ActionType.STORE_TRAKT_SEARCH: {
            let currentResults = { ...state.results };
            let currentRequests = { ...state.isRequesting };

            currentResults[action.value.key] = action.value.value;
            currentRequests[action.value.key] = RequestState.SUCCESS;

            return { ...state, results: currentResults, isRequesting: currentRequests };
        }

        case ActionType.REQUEST_TRAKT_EPISODE_HISTORY: {
            let currentRequests = { ...state.isRequestingHistoricScrobbles };
            currentRequests[action.value] = true;

            return { ...state, isRequestingHistoricScrobbles: currentRequests };
        }

        case ActionType.STORE_TRAKT_EPISODE_HISTORY: {
            let currentHistory = { ...state.historicScrobbles };
            let currentRequests = { ...state.isRequestingHistoricScrobbles };

            currentHistory[action.value.key] = action.value.value;
            currentRequests[action.value.key] = false;

            return { ...state, historicScrobbles: currentHistory, isRequestingHistoricScrobbles: currentRequests };
        }

        case ActionType.START_TRAKT_EPISODE_HISTORY_ADD: {
            let currentHistoryAddState = { ...state.historyAddState };
            currentHistoryAddState[action.value] = RequestState.AWAITING;

            return { ...state, historyAddState: currentHistoryAddState };
        }

        case ActionType.SUCCESS_TRAKT_EPISODE_HISTORY_ADD: {
            let currentHistoryAddState = { ...state.historyAddState };
            currentHistoryAddState[action.value] = RequestState.SUCCESS;

            return { ...state, historyAddState: currentHistoryAddState };
        }

        case ActionType.ERROR_TRAKT_EPISODE_HISTORY_ADD: {
            let currentHistoryAddState = { ...state.historyAddState };
            currentHistoryAddState[action.value] = RequestState.FAILURE;

            return { ...state, historyAddState: currentHistoryAddState };
        }

        default:
            return state;
    }
}