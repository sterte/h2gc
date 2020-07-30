import * as ActionTypes from './ActionTypes';
import { apiUrl } from '../shared/baseUrl';



//MOVIES
export const fetchMovies = () => (dispatch) => { //it returns a function -> it is a thunk	
	dispatch(moviesLoading(true));	
	
	return fetch(apiUrl + 'movies')
		.then(response => {
			if(response.ok) {
				return response;
			}
			else {
				var error = new Error('Error ' + response.status + ': ' + response.statusText);
				error.response = response;
				throw error;
			}
		},
			error => {
				var errmess = new Error(error.message);
				throw errmess;
			}
		)		
		.then(response => response.json())
		.then(movies => dispatch(addMovies(movies)))
		.catch(error => dispatch(moviesFailed(error.message)));
}


export const moviesLoading = () => ({
	type: ActionTypes.MOVIES_LOADING
})

export const moviesFailed = (errmess) => ({
	type: ActionTypes.MOVIES_FAILED,
	payload: errmess
})

export const addMovies = (movies) => ({
	type: ActionTypes.ADD_MOVIES,
	payload: movies
})


//PEOPLE
export const fetchPeople = () => (dispatch) => { //it returns a function -> it is a thunk	
	dispatch(peopleLoading(true));	
	
	return fetch(apiUrl + 'people')
		.then(response => {
			if(response.ok) {
				return response;
			}
			else {
				var error = new Error('Error ' + response.status + ': ' + response.statusText);
				error.response = response;
				throw error;
			}
		},
			error => {
				var errmess = new Error(error.message);
				throw errmess;
			}
		)		
		.then(response => response.json())
		.then(people => dispatch(addPeople(people)))
		.catch(error => dispatch(peopleFailed(error.message)));
}


export const peopleLoading = () => ({
	type: ActionTypes.PEOPLE_LOADING
})

export const peopleFailed = (errmess) => ({
	type: ActionTypes.PEOPLE_FAILED,
	payload: errmess
})

export const addPeople = (people) => ({
	type: ActionTypes.ADD_PEOPLE,
	payload: people
})

