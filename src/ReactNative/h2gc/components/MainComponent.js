import React, { Component } from 'react';
import { View, Platform, Image, StyleSheet, ScrollView, Text } from 'react-native';
import Home from './HomeComponent';
import Login from './LoginComponent';
import MovieDetail from './MovieDetailComponent';
import PersonDetail from './PersonDetailComponent';
import { createAppContainer, SafeAreaView } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';
import { Icon } from 'react-native-elements';


const HomeNavigator = createStackNavigator({
    Home: {
        screen: Home,
        navigationOptions: ({navigation}) => ({
            headerStyle: {
                backgroundColor: "#e8ea28"
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: 'black'            
            },
            headerLeft: () => <Icon name='menu' size={24} color='black' onPress={() => navigation.toggleDrawer()} />
        })
    },
    MovieDetail: {
        screen: MovieDetail,
        navigationOptions: {
            title: 'Movie Detail'
        }
    },
    PersonDetail: {
        screen: PersonDetail,
        navigationOptions: {
            title: 'Person Detail'
        }
    }
},
{        
    defaultNavigationOptions: ({navigation}) => ({
        headerStyle: {
            backgroundColor: "#e8ea28"
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            color: 'black'            
        },
        headerLeft: () => <Icon name='menu' size={24} color='black' onPress={() => navigation.toggleDrawer()} />
    })
}
);

const LoginNavigator = createStackNavigator({
    Login: { screen: Login }
},
{        
    defaultNavigationOptions: ({navigation}) => ({
        headerStyle: {
            backgroundColor: "#e8ea28"
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            color: 'black'            
        },
        headerLeft: () => <Icon name='menu' size={24} color='black' onPress={() => navigation.toggleDrawer()} />
    })
}
);

const CustomDrawerContentComponent = (props) => (
    <ScrollView>
        <SafeAreaView style={styles.container} forceInset={{top: 'always', horizontal: 'never'}} >
            <View style={styles.drawerHeader} >
                <View style={{flex: 1}} >
                    <Image source={require('./images/logo.png')} style={styles.drawerImage} />
                </View>
                <View style={{flex: 2}}>
                    <Text style={styles.drawerHeaderText}>Hitchhickers' guide to cinema</Text>
                </View>
            </View>
            <DrawerItems {...props} />
        </SafeAreaView>
    </ScrollView>
);

const MainNavigator = createDrawerNavigator({
    Login: {
		screen: LoginNavigator,
		navigationOptions: {
			title: 'Login',
			drawerLabel: 'Login',
            drawerIcon: ({tintColor}) => (<Icon name='sign-in' type='font-awesome' size={24} color={tintColor} />)
		}
    },
    Home: {
		screen: HomeNavigator,
		navigationOptions: {
			title: 'Home',
			drawerLabel: 'Home',
            drawerIcon: ({tintColor}) => (<Icon name='sign-in' type='font-awesome' size={24} color={tintColor} />)
		}
    }
},
{
    initialRouteName: 'Home',
    drawerBackgroundColor: '#000000',
    contentOptions: {        
        activeTintColor: '#e8ea28',
        inactiveTintColor: '#aaaaaa',
        activeBackgroundColor: 'gray'
    },
    contentComponent: CustomDrawerContentComponent,
});


class Main extends Component {

	render() {
		return(
        <View style={{flex:1, paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight}}>        
            <MainNavigator />
        </View>
		);
	}
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    drawerHeader: {
        backgroundColor: '#e8ea28',
        height: 140,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row'
    },
    drawerHeaderText: {
        color: 'black',
        fontSize: 24,
        fontWeight: 'bold'
    },
    drawerImage: {
        margin: 10,
        width: 80,
        height: 60
    }
});

export default createAppContainer(MainNavigator);
