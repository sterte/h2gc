import React, { Component } from 'react';
import { View, StyleSheet, Text, ScrollView, Image } from 'react-native';
import { Icon, Input, CheckBox, Button }from 'react-native-elements';
import * as SecureStore from 'expo-secure-store';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';
import { Asset } from 'expo-asset';
import * as ImageManipulator from "expo-image-manipulator";
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { baseUrl } from '../shared/baseUrl';

class LoginTab extends Component {

    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
            remember: false
        }
    }

    componentDidMount(){
        SecureStore.getItemAsync('userinfo').then((userdata) => {
            let userinfo = JSON.parse(userdata);
            if(userinfo){
                this.setState({username: userinfo.username});
                this.setState({password: userinfo.password});
                this.setState({remember: true});
            }
        })
    }

    static navigationOptions = {
        title: 'Login',
        tabBarIcon: ({ tintColor }) => (
            <Icon
              name='sign-in'
              type='font-awesome'
              size={24}
              iconStyle={{ color: tintColor }}
             />
        )
    };

    handleLogin(){
        console.log(JSON.stringify(this.state));
        if(this.state.remember){
            SecureStore.setItemAsync('userinfo', JSON.stringify({ username: this.state.username, password: this.state.password}))
            .catch((error) => console.log('Could not save user info'));
        }
        else{
            SecureStore.deleteItemAsync('userinfo')
            .catch((error) => console.log('Could not delete user info'));
        }
    }

    render(){
        return(
            <View style={styles.container} >
                <Input 
                  placeholder='Username'
                  leftIcon={{type: 'font-awesome', name: 'user-o'}}
                  onChangeText={(username => this.setState({username}))}
                  value={this.state.username}
                  style={styles.formInput}
                />
                
                <Input 
                  placeholder='Password'
                  leftIcon={{type: 'font-awesome', name: 'key'}}
                  onChangeText={(password => this.setState({password}))}
                  value={this.state.password}
                  style={styles.formInput}
                />

                <CheckBox
                  title='Remember Me'
                  center
                  checked={this.state.remember}
                  onPress={() => this.setState({remember: !this.state.remember})}
                  containerStyle={styles.formCheckBox}
                />

                <View style={styles.formButton}>
                    <Button
                      onPress={() => this.handleLogin()}
                      title=' Login'
                      icon={<Icon name='sign-in' type='font-awesome' color='black' size={24} />}
                      titleStyle={{ color: 'black'}}
                      buttonStyle={{ backgroundColor: '#e8ea28'}}                      
                    />    
                </View>

                <View style={styles.formButton}>
                    <Button
                      onPress={() => this.props.navigation.navigate('Register')}
                      title='Register'                      
                      icon={<Icon name='user-plus' type='font-awesome' color='black' size={24} />}
                      titleStyle={{ color: 'black'}}
                      buttonStyle={{ backgroundColor: null}}
                    />
                </View>
            </View>
        );
    }
}



class RegisterTab extends Component {

    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
            firstname: '',
            lastname: '',
            email: '',
            imageUrl: baseUrl + 'images/logo.png',
            remember: false
        }
    }

    getImageFromCamera = async () => {
        const cameraPermission = await Permissions.askAsync(Permissions.CAMERA);
        const cameraRollPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);        
        
        if(cameraPermission.status === 'granted' && cameraRollPermission.status === 'granted'){
            let capturedImage = await ImagePicker.launchCameraAsync({
                allowsEditing: true,
                aspect: [4,3],
                type: Camera.Constants.Type.back
            });

            if(!capturedImage.cancelled){
                this.processImage(capturedImage.uri);
            }
        }
    }

    getImageFromGallery = async () => {
        const cameraPermission = await Permissions.askAsync(Permissions.CAMERA);
        const cameraRollPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);      
        
        if(cameraPermission.status === 'granted' && cameraRollPermission.status === 'granted'){
            let chosenImage = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4,3]
            });

            if(!chosenImage.cancelled){
                this.processImage(chosenImage.uri);
            }
        }
    }

    processImage = async (imageUri) => {
        let processedImage = await ImageManipulator.manipulateAsync(imageUri, [{ resize: { width: 400}}], { format: 'png'});
        this.setState({imageUrl: processedImage.uri})
    }

    static navigationOptions = {
        title: 'Register',
        tabBarIcon: ({ tintColor }) => (
            <Icon
              name='user-plus'
              type='font-awesome'
              size={24}
              iconStyle={{ color: tintColor }}
             />
        )
    };


    handleLogin(){
        console.log(JSON.stringify(this.state));
        if(this.state.remember){
            SecureStore.setItemAsync('userinfo', JSON.stringify({ username: this.state.username, password: this.state.password}))
            .catch((error) => console.log('Could not save user info'));
        }
        else{
            SecureStore.deleteItemAsync('userinfo')
            .catch((error) => console.log('Could not delete user info'));
        }
    }


    handleRegister(){
        console.log(JSON.stringify(this.state));
        if(this.state.remember){
            SecureStore.setItemAsync('userinfo', JSON.stringify({ username: this.state.username, password: this.state.password}))
            .catch((error) => console.log('Could not save user info'));
        }
        else{
            SecureStore.deleteItemAsync('userinfo')
            .catch((error) => console.log('Could not delete user info'));
        }
    }

    render(){
        return(
            <ScrollView>
            <View style={styles.container} >

                <View style={styles.imageContainer} >
                    <Image
                      source={{uri: this.state.imageUrl}}
                      loadingIndicatorSource={require('./images/logo.png')}
                      style={styles.image}
                    />
                    <Button
                      title='Camera'
                      onPress={this.getImageFromCamera}
                      buttonStyle={{ backgroundColor: '#e8ea28'}}
                      titleStyle={{ color: 'black'}}
                    />
                    <Button
                      title='Gallery'
                      buttonStyle={{ backgroundColor: '#e8ea28'}}
                      titleStyle={{ color: 'black'}}
                      onPress={this.getImageFromGallery}
                    />
                </View>
                <Input 
                  placeholder='Username'
                  leftIcon={{type: 'font-awesome', name: 'user-o'}}
                  onChangeText={(username => this.setState({username}))}
                  value={this.state.username}
                  style={styles.formInput}
                />
                
                <Input 
                  placeholder='Password'
                  leftIcon={{type: 'font-awesome', name: 'key'}}
                  onChangeText={(password => this.setState({password}))}
                  value={this.state.password}
                  style={styles.formInput}
                />
                
                <Input 
                  placeholder='Firstname'
                  leftIcon={{type: 'font-awesome', name: 'user-o'}}
                  onChangeText={(firstname => this.setState({firstname}))}
                  value={this.state.firstname}
                  style={styles.formInput}
                />
                
                <Input 
                  placeholder='Lastname'
                  leftIcon={{type: 'font-awesome', name: 'user-o'}}
                  onChangeText={(lastname => this.setState({lastname}))}
                  value={this.state.lastname}
                  style={styles.formInput}
                />
                
                <Input 
                  placeholder='Email'
                  leftIcon={{type: 'font-awesome', name: 'envelope-o'}}
                  onChangeText={(email => this.setState({email}))}
                  value={this.state.email}
                  style={styles.formInput}
                />

                <CheckBox
                  title='Remember Me'
                  center
                  checked={this.state.remember}
                  onPress={() => this.setState({remember: !this.state.remember})}
                  containerStyle={styles.formCheckBox}
                />

                <View style={styles.formButton}>
                    <Button
                      onPress={() => this.handleRegister()}
                      title='Register'
                      icon={<Icon name='user-plus' type='font-awesome' color='black' size={24} />}
                      buttonStyle={{ backgroundColor: '#e8ea28'}}
                      titleStyle={{ color: 'black'}}
                    />                    
                </View>
            </View>
            </ScrollView>
        );
    }

}

const Login = createBottomTabNavigator(
    {
        Login: LoginTab,
        Register: RegisterTab
    },
    {
        tabBarOptions: {
            activeBackgroundColor: '#e8ea28',
            inactiveBackgroundColor: '#aaaaaa',
            activeTintColor: 'black',
            inactiveTintColor: 'gray'
        }
    }
);

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        margin: 20
    },
    imageContainer: {
        flex: 1,
        flexDirection: 'row',
        margin: 20,
        justifyContent: 'space-around'
    },
    image: {
        margin: 10,
        width: 80,
        height: 60
    },
    formInput: {
        margin: 20
    },
    formCheckBox: {
        margin:20,
        backgroundColor: null,
        borderWidth: 0
    },
    formButton: {
        margin: 60
    }
});

export default Login;