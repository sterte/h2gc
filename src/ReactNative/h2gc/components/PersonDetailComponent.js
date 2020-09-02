import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, ScrollView, Image, Linking, FlatList, TouchableHighlight, Button } from 'react-native';
import { Card } from 'react-native-elements';
import { Text } from 'react-native';
import { baseUrl } from '../shared/baseUrl'



const mapStateToProps = (state) => {
    return {
      movies: state.movies,
      people: state.people
    }
  }

class PersonDetail extends Component {

    render(){      
      const renderMenuItem = ({item, index}) => {
        const genres = item.genres.join(', ');
        return(                     
          <View style={{marginBottom: 10}}>
          <TouchableHighlight onPress={() => navigate('MovieDetail', {movieId: item.id})}>                                 
          <Text style={{marginLeft:10, fontSize: 14}}>{item.title}</Text>
          </TouchableHighlight>
          <Text style={{marginLeft: 10, fontSize: 12}}>{item.releaseDate}</Text>
          <Text style={{marginLeft: 10, fontSize: 12}}>{genres}</Text>                     
          </View>
        );
      }

        const personId = this.props.navigation.getParam('personId','');
        const person = this.props.people.people.filter((person) => (person.id === personId))[0];
        const movies = this.props.movies.movies.filter((movie) => (movie.directorId === personId));
        const { navigate } = this.props.navigation;
        
        let fullName = person.firstName;
        if(person.middleName.length){
          fullName += " " + person.middleName;
        }
        fullName += " " + person.lastName;
        
        const death = person.deathDate ? <Text style={{marginBottom: 10}}>Died: {person.deathDate}, {person.deathPlace}</Text> : <View></View>;

        return(
            <ScrollView>                                        
                    <Card>
                        <Card.Title style={{backgroundColor: '#e8ea28', margin:10, padding:10}}>{fullName}</Card.Title>                                                                        
                        <View style={{flexDirection: 'row'}}>                        
                        <Image resizeMode='contain' source={{uri: baseUrl + 'images/logo.png'}} style={{width: 100, margin: 10}} />                        
                        <View style={{flexDirection: 'column'}}>                        
                        <Text style={{flexWrap: 'wrap', marginBottom: 10}}>Born: {person.birthDate}, {person.birthPlace}</Text>
                        {death}
                        <Text style={{flexWrap: 'wrap', marginBottom: 10}}>Bio: {person.shortBio}</Text>
                        </View>                        
                        </View>       
                        <View style={{marginTop: 10, marginLeft:10, marginRight:10}}>                                         
                        <Button
                        title='IMDb Full File'
                        color='#e8ea28'                        
                        onPress={() => {Linking.openURL(person.fullBio).catch((err) => console.error('An error occurred', err))}}                        
                        />
                        </View>

                        <Card>                      
                        <Card.Title style={{backgroundColor: '#e8ea28', padding:10}}>Filmography</Card.Title>
                        <FlatList
                        data={movies}
                        renderItem={renderMenuItem}
                        keyExtractor={item => item.id.toString()}
                        />
                        </Card>

                        </Card>
            </ScrollView>
        );
    }
}

export default connect(mapStateToProps)(PersonDetail);