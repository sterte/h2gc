import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import { Fade, Stagger } from 'react-animation-components';
import { baseUrl } from '../shared/baseUrl';




function RenderCard({title, item, isLoading, errMess}) {
	return(
		<Card>		
		<CardBody>
		<CardTitle className="card-header">
		<h3>{title}</h3>
		</CardTitle>
		<RenderCardBody item={item} isLoading={isLoading} errMess={errMess} />		
		</CardBody>
		</Card>
		);
	
}

function RenderCardBody({title, item, isLoading, errMess}) {
	
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
			const movieList = item.map((movie) => {
				return (
				<Stagger in>
				<div className="row mt-3">
				<div className="col-10">
				<h3><Link to={'movieDetail/' + movie.id} >{movie.title}</Link></h3>				
				</div>
				<div className="col-2">
				<CardImg src={baseUrl + 'assets/images/' + movie.image} alt={movie.title} width="100%"/>
				</div>
				<div className="col-12">
				{movie.summary}
				<hr/>
				</div>
				</div>
				</Stagger>
				);			
			});
			return(
			<Fade in>
			<CardText>
			{movieList}
			</CardText>
			</Fade>
			);
		}
	}


	function Home(props) {

		const releasedMovies = props.movies.filter(movie => movie.released);
		const unreleasedMovies = props.movies.filter(movie => !movie.released);

		return (
		<div className="container">
		<div className="row align-items-start mt-3">
		<div className="col-12 col-md-6 ">
		<RenderCard title="Recently Released" item={releasedMovies} isLoading={props.moviesLoading} errMess={props.moviesErrMess} />
		</div>
		<div className="col-12 col-md-6 ">
		<RenderCard title="Imminent Release" item={unreleasedMovies} isLoading={props.moviesLoading} errMess={props.moviesErrMess} />
		</div>				
		</div>
		</div>
		);
	}

	export default Home;