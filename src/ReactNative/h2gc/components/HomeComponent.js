import React, { Component } from 'react';
import { Text, ScrollView, View, FlatList, Image } from 'react-native';
import { Card } from 'react-native-elements';
import { connect } from 'react-redux';
import { fetchMovies, fetchPeople } from '../redux/ActionCreators';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { TouchableHighlight } from 'react-native';


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


class Home extends Component {    
    
    componentDidMount() {
        this.props.fetchMovies();
        this.props.fetchPeople();
    }

    render(){


        const renderCardItem = ({item, index}) => {
            return(
                <TouchableHighlight onPress={() => navigate('Login')}>            
                <View key={index} style={{margin:10, flexDirection: 'row', justifyContent: 'flex-start'}}>
                <Image source={{uri: baseUrl + 'images/logo.png'}} style={{width:40, height: 20, marginRight: 20}} />
                <View>
                <Text style={{fontSize: 14}}>{item.title}</Text>
                <Text style={{fontSize: 12}}>{item.summary}</Text>               
                </View>        
                </View>
                </TouchableHighlight>
            );
        }
        
        const RenderCard = (props) => {
            if(props.isLoading){
                return(<Loading />);
            }
            else if(props.errMess){
                return(
                    <View>
                        <Text>{props.errMess}</Text>
                    </View>
                )
            }
            else if(props.movies.length > 0){
                let title = props.isReleased ? "Recently Released" : "Imminent Release";
                let items = props.isReleased ? props.movies.filter(movie => movie.id%2==0) : props.movies.filter(movie => movie.id%2==1);
                let navigation = props.navigation
                return(
                    <View>
                    <Card>
                        <Card.Title style={{backgroundColor: '#e8ea28', margin:10, padding:10}}>{title}</Card.Title>
                        <FlatList data={items} renderItem={renderCardItem} keyExtractor={item => item.id.toString()} />
                        </Card>
                        </View>
                );
            }
            else{
                return(<View></View>);
            }
        }


        const releasedMovies = this.props.movies;//.filter(movie => movie.released);
        const unreleasedMovies = this.props.movies;//.filter(movie => !movie.released);
        const { navigate } = this.props.navigation;
        return(
            <ScrollView>
                <RenderCard isLoading={this.props.movies.isLoading} errMess={this.props.movies.errMess} movies={this.props.movies.movies} isReleased={false} />
                <RenderCard isLoading={this.props.movies.isLoading} errMess={this.props.movies.errMess} movies={this.props.movies.movies} isReleased={true} />
            </ScrollView>
        );
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);