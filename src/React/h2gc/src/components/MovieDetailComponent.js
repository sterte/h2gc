import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Row} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import { Fade } from 'react-animation-components';
import { baseUrl } from '../shared/baseUrl';




function RenderCard({movie, director, isLoading, errMess}) {
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
		return(
			<Fade in>
			<Card>		
			<CardBody>
			<CardTitle className="card-header">
			<h3>{movie.title}</h3>
			</CardTitle>
			<CardText>
			

			<Row className="row-content">
			<div className="col-12 col-md-4 mb-3 mb-md-0">			
			<CardImg className="img-fluid" height="50" src={baseUrl + 'assets/images/' + movie.image} alt={movie.title} />			
			
			<div className="mt-3">
			{movie.summary}
			</div>
			</div>

			<div className="col-12 col-md-4 mb-3 mb-md-0">
			<h3 className="mt-0">Cast & Crew</h3>
			<ul>
			<li>
			<Link to={'/persondetail/' + director.id}>
			{director.firstName + (director.middleName ? " " + director.middleName : "") + " " + director.lastName}
			</Link>			
			</li>
			</ul>
			</div>

			<div className="col-12 col-md-4 mb-3 mb-md-0">
			<h3 className="mt-0">Additional Info</h3>

			<div className="mt-3">
			<h5>Rating</h5>{movie.rating}
			</div>

			<div className="mt-3">
			<h5>Duration</h5>{movie.duration}
			</div>

			<div className="mt-3">
			<h5>Genre</h5>{movie.genres.join(", ")}
			</div>

			<div className="mt-3">
			<h5>Release Date</h5>{movie.releaseDate}
			</div>

			</div>

			</Row>

			<Row>
			<div className="col-12 offset-md-4 col-md-4">			
			<a className="btn btn-warning btn-block mt-3" role="button" href={movie.URL} target="_blank" rel="noopener noreferrer">IMDb full file</a>
			</div>
			</Row>

			</CardText>		
			</CardBody>
			</Card>
			</Fade>
			);
	}
}


class MovieDetail extends Component {		  

	render(){		
		var isLoading = this.props.peopleLoading || this.props.moviesLoading;		
		var movie = isLoading ? null : this.props.movies.filter((movie) => (movie.id === parseInt(this.props.id)))[0];
		var director = isLoading ? null : this.props.people.filter((person) => (person.id === movie.directorId))[0];

		return (
			<div className="container">
			<div className="row align-items-start mt-3">
			<div className="col-12">
			<RenderCard movie={movie} director={director} isLoading={isLoading} errMess={this.props.moviesErrMess} />
			</div>		
			</div>
			</div>
			);
	}
}

export default MovieDetail;