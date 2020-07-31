import React, { Component } from 'react';
import { Breadcrumb, BreadcrumbItem, Card, CardBody, CardHeader, Row, Button, Label } from 'reactstrap';
import { Link } from 'react-router-dom';
import * as SearchTypes from '../shared/SearchTypes';
import { Control, LocalForm } from 'react-redux-form';

class Search extends Component {

  constructor(props) {
    super(props);           
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(values){

  }

  getMoviesForm(){
    return(
      <Card>                    
      <CardHeader>
      <h3 className="mb-0">    
      Movie Search
      </h3>
      </CardHeader>

      <CardBody>
      <LocalForm onSubmit={(values) => this.handleSubmit(values)}>

      <Row className="form-group">   
      <div className="col-12 col-md-3"> 
      <Control.select model=".field" name="field" className="form-control">
      <option>Title</option>
      <option>Plot</option>
      <option>Quote</option>                            
      <option>Trivia</option>
      <option>Soundtrack</option>        
      </Control.select>
      </div>
      <div className="col-12 col-md-9">
      <Control text model=".val" id="val" name="val" className="form-control" placeholder="Search Text" />
      </div>
      </Row>
      
      <Row>
      <div className="col-12 col-md-2 offset-md-10">

      <Button type="submit" className="btn-block btn-warning">
      Search
      </Button>
      </div>
      </Row>
      </LocalForm>
      </CardBody>              
      </Card>
      );
  }


  getPeopleForm(){
    return(
      <Card>                    
      <CardHeader>
      <h3 className="mb-0">    
      People Search
      </h3>
      </CardHeader>

      <CardBody>
      <LocalForm onSubmit={(values) => this.handleSubmit(values)}>

      <Row className="form-group">
      <div className="col-12 col-md-3">
      <Control.select model=".field" name="field" className="form-control">
      <option>Name</option>
      <option>Bio</option>
      <option>Quote</option>                            
      <option>Trivia</option>
      </Control.select>
      </div>            
      <div className="col-12 col-md-9">
      <Control text model=".val" id="val" name="val" className="form-control" placeholder="Search Text" />
      </div>
      </Row>

      <Row className="form-group">
      <div className="col-12 col-md-2 offset-md-10">
      <Button type="submit" className="btn-block btn-warning">
      Search
      </Button>
      </div>
      </Row>
      </LocalForm>
      </CardBody>
      </Card>

      );

  }


  getAdvancedForm(){
    return(
      <Card>                    
      <CardHeader>
      <h3 className="mb-0">    
      Advanced Searches
      </h3>
      </CardHeader>

      <CardBody>


      <div className="col-12">
      <h5>Collaborations <a data-container="body" data-toggle="popover" data-placement="bottom" data-content="Insert a list of names, one per line, to search for the movies in which they worked together." data-html="true"><span className="fa fa-question-circle-o"></span></a></h5>                    
      <LocalForm>
      <Row className="form-group">
      <Label htmlFor="namelist" className="col-12 col-form-label">Names</Label>
      <div className="col-12">
      <Control.textarea className="form-control" model=".namelist" id="namelist" name="namelist" rows="5" placeholder="First Name&#10;Second Name&#10;Third Name&#10;..." />
      </div>                        
      </Row>
      <Row className="form-group">
      <div className="col-12 col-md-2 offset-md-10">
      <Button id="searchollaborations" type="submit" className="btn btn-warning btn-block">
      Search
      </Button>
      </div>
      </Row>
      </LocalForm>
      <hr/>
      </div>

      <div className="col-12">
      <h5>Common Cast <a data-container="body" data-toggle="popover" data-placement="bottom" data-content="Insert a list of movie titles, one per line, to search for the people who worked in all of them." data-html="true"><span className="fa fa-question-circle-o"></span></a></h5>                    
      <LocalForm>
      <Row className="form-group">
      <Label htmlFor="titlelist" className="col-12 col-form-label">Titles</Label>
      <div className="col-12">
      <Control.textarea className="form-control" model=".titlelist" id="titlelist" name="titlelist" rows="5" placeholder="First Title&#10;Second Title&#10;Third Title&#10;..." />
      </div>                        
      </Row>
      <Row className="form-group">
      <div className="col-12 col-md-2 offset-md-10">
      <Button id="searchcommoncast" type="submit" className="btn btn-warning btn-block">
      Search
      </Button>
      </div>
      </Row>
      </LocalForm>
      <hr/>
      </div>                  
      </CardBody>
      </Card>

      );
    }

    getMenu(){
      return(<div className="row">
      <ul>
      <li><Link to="/search/movies">Movies search</Link></li>
      <li><Link to="/search/people">People search</Link></li>
      <li><Link to="/search/advanced">Advanced search</Link></li>
      </ul>
      </div>);
    }



    selectedForm(type) {
      switch(type){
        case SearchTypes.SEARCH_MOVIES:
        return this.getMoviesForm();
        case SearchTypes.SEARCH_PEOPLE:
        return this.getPeopleForm();
        case SearchTypes.SEARCH_ADVANCED:
        return this.getAdvancedForm();
        default:
        return this.getMenu();
      }
    }


    currentBreadcrumb(type){

      var searchBreadcrumb = null;
      switch(type){
        case SearchTypes.SEARCH_NONE:  
        searchBreadcrumb = (<><BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem> <BreadcrumbItem active>Search</BreadcrumbItem></>);
        break;
        case SearchTypes.SEARCH_MOVIES:
        searchBreadcrumb = (<><BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem> <BreadcrumbItem><Link to="/search">Search</Link></BreadcrumbItem> <BreadcrumbItem active>Movies Search</BreadcrumbItem></>);
        break;
        case SearchTypes.SEARCH_PEOPLE:
        searchBreadcrumb = (<><BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem> <BreadcrumbItem><Link to="/search">Search</Link></BreadcrumbItem> <BreadcrumbItem active>People Search</BreadcrumbItem></>);
        break;
        case SearchTypes.SEARCH_ADVANCED:
        searchBreadcrumb = (<><BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem> <BreadcrumbItem><Link to="/search">Search</Link></BreadcrumbItem> <BreadcrumbItem active>Advanced Search</BreadcrumbItem></>);
        break;
        default:
        searchBreadcrumb =(<></>);
      }


      var result =(
      <div className="row">
      <Breadcrumb>      
      {searchBreadcrumb}
      </Breadcrumb>
      </div>
      );

      return result;
    }

    
    render(){    



      var activeForm = this.selectedForm(this.props.type);
      var currentBreadcrumb = this.currentBreadcrumb(this.props.type);

      return(
      <div className="container">

      {currentBreadcrumb}



      <div className="row row-content align-items-top">
      <div className="col-12">
      {activeForm}
      </div>                                    
      </div>    
      </div>
      );
    }
  }
  export default Search;
