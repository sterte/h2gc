import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Movies } from './movies';
import { People } from './people';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import {persistStore, persistCombineReducers} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';

export const ConfigureStore = () => {

	const config ={
		key: 'root',
		debug: true,
		storage: AsyncStorage
	}

	const store = createStore(
		persistCombineReducers(config, {
			movies: Movies,
			people: People			
		}),

		applyMiddleware(thunk, logger)
	);

	const persistor = persistStore(store);

	return {persistor, store};
}