import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Movies } from './movies';
import { People } from './people';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

export const ConfigureStore = () => {
	const store = createStore(
		combineReducers({
			movies: Movies,
			people: People			
		}),

		applyMiddleware(thunk, logger)
		);

	return store;
}