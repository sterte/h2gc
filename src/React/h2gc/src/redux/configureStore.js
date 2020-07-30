import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createForms } from 'react-redux-form';
import { Movies } from './movies';
import { People } from './people';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

export const ConfigureStore = () => {
	const store = createStore(
		combineReducers({
			movies: Movies,
			poeple: People			
		}),

		applyMiddleware(thunk, logger)
		);

	return store;
}