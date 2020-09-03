import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, ScrollView, Image, TouchableHighlight, Button, Linking, FlatList } from 'react-native';
import { Card } from 'react-native-elements';
import { Text } from 'react-native';
import { baseUrl } from '../shared/baseUrl'

const mapStateToProps = (state) => {
    return {
      movies: state.movies,
      people: state.people
    }
  }

class MovieDetail extends Component {

    render(){

        const renderMenuItem = ({item, index}) => {

            let fullName = item.firstName;
            if(item.middleName.length){
              fullName += " " + item.middleName;
            }
            fullName += " " + item.lastName;
            
            return(                     
              <View style={{marginBottom: 10}}>
              <TouchableHighlight onPress={() => navigate('PersonDetail', {personId: item.id})}>                                 
              <Text style={{marginLeft:10, fontSize: 14}}>{fullName}</Text>
              </TouchableHighlight>
              <Text style={{marginLeft: 10, fontSize: 12}}>{item.birthDate}</Text>
              </View>
            );
          }
    

        const movieId = this.props.navigation.getParam('movieId','');
        const movie = this.props.movies.movies.filter(item => item.id === movieId)[0];        
        const director = this.props.people.people.filter((person) => (person.id === movie.directorId))[0];
        const { navigate } = this.props.navigation;

        return(
            <ScrollView>                                        
                    <Card>
                        <Card.Title style={{backgroundColor: '#e8ea28', margin:10, padding:10}}>{movie.title}</Card.Title>                                                
                        <View style={{flexDirection: 'row'}}>                        
                        <Image resizeMode='contain' source={{uri: baseUrl + 'images/' + movie.image}} style={{width: 100, margin: 10}} />                        
                        <View style={{flexDirection: 'column'}}>                        
                        <Text style={{flexWrap: 'wrap', marginBottom: 10}}>Rating: {movie.rating}</Text>
                        <Text style={{flexWrap: 'wrap', marginBottom: 10}}>Duration: {movie.duration}</Text>
                        <Text style={{flexWrap: 'wrap', marginBottom: 10}}>Genres: {movie.genres.join(', ')}</Text>
                        <Text style={{flexWrap: 'wrap', marginBottom: 10}}>Release Date: {movie.releaseDate}</Text>                        
                        </View>                        
                        </View>
                        <TouchableHighlight onPress={() => navigate('PersonDetail', {personId: director.id})}>            
                        <Text style={{flexWrap: 'wrap', marginLeft:10, marginTop: 10}}>Director: {director.firstName + (director.middleName ? " " + director.middleName : "") + " " + director.lastName}</Text>
                        </TouchableHighlight>
                        <Text style={{flexWrap: 'wrap', marginLeft:10, marginTop: 10}}>Summary: {movie.summary}</Text>                                                
                        <View style={{marginTop: 10, marginLeft:10, marginRight:10}}>                                         
                        <Button
                        title='IMDb Full File'
                        color='#e8ea28'
                        onPress={() => {Linking.openURL(movie.URL).catch((err) => console.error('An error occurred', err))}}                        
                        />
                        </View>

                        <Card>                      
                        <Card.Title style={{backgroundColor: '#e8ea28', padding:10}}>Cast &amp; Crew</Card.Title>
                        <FlatList
                        data={this.props.people.people}
                        renderItem={renderMenuItem}
                        keyExtractor={item => item.id.toString()}
                        />
                        </Card>

                        </Card>
            </ScrollView>
        );
    }
}

export default connect(mapStateToProps)(MovieDetail);