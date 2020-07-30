import React, { Component } from 'react';
import Home from './HomeComponent';
//import Menu from './MenuComponent';
//import Contact from './ContactComponent';
//import About from './AboutComponent';
//import DishDetail from './DishDetailComponent';
import Header from './HeaderComponent'
import Footer from './FooterComponent'
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { fetchMovies, fetchPeople } from '../redux/ActionCreators';


const mapStateToProps = (state) => {
  return {
    movies: { movies: state.movies }, //TEMP! TO DEAL WITH STATIC JSON RATHER THAN ACTUAL FETCH
    people: { people: state.people }
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
        person={this.props.people.people}
        peopleLoading={this.props.people.isLoading}
        peopleErrMess={this.props.people.errMess}
        />
        );
    }

      /*
      <Route exact path ="/menu" component={() => <Menu dishes={this.props.dishes} /> } />
      <Route path="/menu/:dishId" component={DishWithId} />
      <Route path="/contactus" component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm} postFeedback={this.props.postFeedback} />} />
      <Route path="/aboutus" component={ () => <About leaders={this.props.leaders} /> } />
      */
    return (
      <div>      
      <Header />
      <TransitionGroup>
      <CSSTransition key={this.props.location.key} classNames="page" timeout={300} >
      <Switch>
      <Route path="/home" component={HomePage} />

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

