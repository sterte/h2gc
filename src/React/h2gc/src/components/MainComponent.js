import React, { Component } from 'react';
import Home from './HomeComponent';
import About from './AboutComponent';
import * as SearchTypes from '../shared/SearchTypes';
import Search from './SearchComponent';
import Header from './HeaderComponent'
import Footer from './FooterComponent'
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { fetchMovies, fetchPeople } from '../redux/ActionCreators';


const mapStateToProps = (state) => {
  return {
    movies: state.movies,
    people: state.people
  }
}

const mapDispatchToProps = (dispatch) => ({    
  fetchMovies: () => {dispatch(fetchMovies())},
  fetchPeople: () => {dispatch(fetchPeople())}
});


class Main extends Component {

  componentDidMount() {
    this.props.fetchMovies();
    this.props.fetchPeople();
  }

  render() {

    const HomePage = () => {
      return(
        <Home
        movie={this.props.movies.movies}
        moviesLoading={this.props.movies.isLoading}
        moviesErrMess={this.props.movies.errMess}
        person={this.props.people}
        peopleLoading={this.props.isLoading}
        peopleErrMess={this.props.errMess}
        />
        );
    }

    return (
      <div>      
      <Header />
      <TransitionGroup>
      <CSSTransition key={this.props.location.key} classNames="page" timeout={300} >
      <Switch>
      <Route path="/home" component={HomePage} />
      <Route exact path="/search" component={ () => <Search type={SearchTypes.SEARCH_NONE} /> } />
      <Route path="/search/movies" component={ () => <Search type={SearchTypes.SEARCH_MOVIES} /> } />
      <Route path="/search/people" component={ () => <Search type={SearchTypes.SEARCH_PEOPLE} /> } />
      <Route path="/search/advanced" component={ () => <Search type={SearchTypes.SEARCH_ADVANCED} /> } />
      <Route path="/aboutus" component={About} />
      <Redirect to="/home" />
      </Switch>
      </CSSTransition>
      </TransitionGroup>
      <Footer />
      </div>
      );
    }
  }

  export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));

