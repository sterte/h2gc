import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Row} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import { Fade, Stagger } from 'react-animation-components';
import { baseUrl } from '../shared/baseUrl';


function RenderFilmography({movies}) {

	return(
		<Fade in>
		<h3 className="mt-0">Filmography</h3>
		<Stagger in>
		{movies.map((movie) => {
			return (
				<ul>
				<Fade in>
				<li key={movie.id} className="mb-3"><p><Link to={'/moviedetail/' + movie.id}>{movie.title}</Link></p></li>
				</Fade>
				</ul>
				);
		})}
		</Stagger>
		</Fade>
		);
}

function RenderCard({person, movies, isLoading, errMess}) {
	if(isLoading){
		return(
			<div className="row">
			<div className="col-12 mt-3 d-flex justify-content-center">
			<Loading />
			</div>
			</div>
			);
	}
	else if(errMess){
		return(
			<h4>{errMess}</h4>
			);
	}
	else{		
		var fullName = person.firstName;
		if(person.middleName.length){
			fullName += " " + person.middleName;
		}
		fullName += " " + person.lastName;
		return(
			<Fade in>
			<Card>		
			<CardBody>
			<CardTitle className="card-header">
			<h3>{fullName}</h3>
			</CardTitle>
			<CardText>
			

			<Row className="row-content">
			<div className="col-12 col-md-4 mb-3 mb-md-0">
			<CardImg className="img-fluid" height="50" src={baseUrl + 'assets/images/' + person.image} alt={fullName} />			
			<div className="mt-3">
			<h5>Born</h5>{person.birthDate}, {person.birthPlace}			
			</div>
			<div className="mt-3">
			<h5>Died</h5>{person.deathDate}, {person.deathPlace}			
			</div>
			<div className="mt-3">
			{person.shortBio}
			<a className="btn btn-warning btn-block mt-3" role="button" href={person.fullBio} target="_blank" rel="noopener noreferrer">IMDb full bio</a>
			</div>
			</div>
			

			
			<div className="col-12 col-md-4 mb-3 mb-md-0">
			<RenderFilmography movies={movies} />
			</div>						


			<div className="col-12 col-md-4 mb-3 mb-md-0">
			<h3 className="mt-0">Additional Info</h3>
			<h5 className="mt-0">Quotes</h5>
			{person.quotes[0]}			
			<a className="btn btn-warning btn-block mt-3" role="button" href={person.fullQuotes} target="_blank" rel="noopener noreferrer">IMDb full quotes</a>

			<h5 className="mt-5">Trivia</h5>
			{person.trivia[0]}
			
			<a className="btn btn-warning btn-block mt-3" role="button" href={person.fullTrivia} target="_blank" rel="noopener noreferrer">IMDb full trivia</a>
			</div>		

			</Row>
			</CardText>		
			</CardBody>
			</Card>
			</Fade>
			);
	}
}


class PersonDetail extends Component {		  

	render(){
		var isLoading = this.props.peopleLoading || this.props.moviesLoading;
		var person = isLoading ? null : this.props.people.filter((person) => (person.id === parseInt(this.props.id)))[0];
		var movies = isLoading ? null : this.props.movies.filter((movie) => (movie.directorId === parseInt(this.props.id)));

		return (
			<div className="container">
			<div className="row align-items-start mt-3">
			<div className="col-12">
			<RenderCard person={person} movies={movies} isLoading={isLoading} errMess={this.props.peopleErrMess} />
			</div>		
			</div>
			</div>
			);
	}
}

export default PersonDetail;