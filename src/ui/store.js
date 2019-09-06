import * as ACTIONS from 'constants/action_types';
import { persistStore, persistReducer } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import createCompressor from 'redux-persist-transform-compress';
import createFilter from 'redux-persist-transform-filter';
import localForage from 'localforage';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createHashHistory, createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import createRootReducer from './reducers';
import { parseURI, selectFollowedTags } from 'lbry-redux';
import { Lbryio } from 'lbryinc';
import { selectSubscriptions } from 'redux/selectors/subscriptions';

function isFunction(object) {
  return typeof object === 'function';
}

function isNotFunction(object) {
  return !isFunction(object);
}

const persistShape = {
  version: 0,
  app: {
    subscriptions: [],
  },
};

function backupSettingsMiddleware() {
  return ({ dispatch, getState }) => next => action => {
    if (action.type === ACTIONS.CHANNEL_SUBSCRIBE || action.type === ACTIONS.CHANNEL_UNSUBSCRIBE) {
      let newShape = { ...persistShape };
      const state = getState();
      const subscriptions = selectSubscriptions(state).map(({ uri }) => {
        const { channelClaimId } = parseURI(uri);
        return channelClaimId;
      });

      const { uri } = action.data;
      const { channelClaimId } = parseURI(uri);

      if (action.type === ACTIONS.CHANNEL_SUBSCRIBE) {
        let newSubscriptions = subscriptions.slice();
        newSubscriptions.push(channelClaimId);
        newShape.app.subscriptions = newSubscriptions;
      } else {
        let newSubscriptions = subscriptions.slice();
        newSubscriptions = newSubscriptions.filter(claimId => claimId !== channelClaimId);
        newShape.app.subscriptions = newSubscriptions;
      }

      // Lbryio.call('user_settings', 'set', { settings: newShape });
    }

    return next(action);
  };
}

function createBulkThunkMiddleware() {
  return ({ dispatch, getState }) => next => action => {
    if (action.type === 'BATCH_ACTIONS') {
      action.actions.filter(isFunction).map(actionFn => actionFn(dispatch, getState));
    }
    return next(action);
  };
}

function enableBatching(reducer) {
  return function batchingReducer(state, action) {
    switch (action.type) {
      case 'BATCH_ACTIONS':
        return action.actions.filter(isNotFunction).reduce(batchingReducer, state);
      default:
        return reducer(state, action);
    }
  };
}

const contentFilter = createFilter('content', ['positions', 'history']);
const fileInfoFilter = createFilter('fileInfo', [
  'fileListPublishedSort',
  'fileListDownloadedSort',
  'fileListSubscriptionSort',
]);
const appFilter = createFilter('app', ['hasClickedComment', 'searchOptionsExpanded', 'volume', 'muted']);
// We only need to persist the receiveAddress for the wallet
const walletFilter = createFilter('wallet', ['receiveAddress']);
const searchFilter = createFilter('search', ['options']);
const tagsFilter = createFilter('tags', ['followedTags']);
const blockedFilter = createFilter('blocked', ['blockedChannels']);
const whiteListedReducers = [
  // @if TARGET='app'
  'publish',
  'wallet',
  // 'fileInfo',
  // @endif
  'content',
  'subscriptions',
  'app',
  'search',
  'tags',
  'blocked',
];

const transforms = [
  // @if TARGET='app'
  walletFilter,
  contentFilter,
  fileInfoFilter,
  blockedFilter,
  // @endif
  appFilter,
  searchFilter,
  tagsFilter,
  createCompressor(),
];

const persistOptions = {
  key: 'v0',
  storage: localForage,
  stateReconciler: autoMergeLevel2,
  whitelist: whiteListedReducers,
  // Order is important. Needs to be compressed last or other transforms can't
  // read the data
  transforms,
};

let history;
// @if TARGET='app'
history = createHashHistory();
// @endif
// @if TARGET='web'
history = createBrowserHistory();
// @endif

const rootReducer = createRootReducer(history);
const persistedReducer = persistReducer(persistOptions, rootReducer);
const bulkThunk = createBulkThunkMiddleware();
const middleware = [backupSettingsMiddleware(), routerMiddleware(history), thunk, bulkThunk];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  enableBatching(persistedReducer),
  {}, // initial state
  composeEnhancers(applyMiddleware(...middleware))
);

const persistor = persistStore(store);
window.persistor = persistor;

export { store, persistor, history, whiteListedReducers };
