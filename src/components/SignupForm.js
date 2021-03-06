import React, { Component } from 'react';
import {Image, View, Text, TouchableOpacity, Dimensions } from 'react-native';
import firebase from 'firebase';
import {Button, Card, CardSection, Input, Spinner, Header } from './common';
import LoginForm from "./LoginForm";

const {width, height} = Dimensions.get('window');

class SignupForm extends Component {

    static navigationOptions = {
        header: null

    };
    state = { email: '', password: '', error: '', loading: false, mobile: '', name: '', };

    onButtonPress() {
        if(this.state.email == '' || this.state.password == '' || this.state.mobile == '' || this.state.name == ''){
            this.setState({ error: 'Please Fill All Fields', loading: false });
        }    
        else if(/^[A-Za-z\s]+$/.test(this.state.name) != true){
            this.setState({ error: 'Name only contains alphabets', loading: false });    
        }

        else if((this.state.mobile).length < 11){
            this.setState({ error: 'Invalid Mobile Number', loading: false });
        }

        else{
            const { email, password } = this.state;
            this.setState({ error: '', loading: true });
                    firebase.auth().createUserWithEmailAndPassword(email, password)
                        .then(this.onLoginSuccess.bind(this))
                        .catch((err)=>{
                            this.setState({ error: err.message, loading: false });
                                        });
        }
    }

    onLoginFail() {
        if(this.state.email == '' || this.state.password == '' || this.state.mobile == '' || this.state.name == ''){
            this.setState({ error: 'Please Fill All Fields', loading: false });
        }
        else {
        this.setState({ error: '    Invalid Information  \n                    or\nAccount Already Exists', loading: false });
        }
    }

    onLoginSuccess() {
        // this.setState({
        //     name:"",
        //     email: '',
        //     password: '',
        //     loading: false,
        //     error: ''
        // });
        
        var userId = firebase.auth().currentUser.uid;
        var rootRef =  firebase.database().ref();
        // var tokenRef = rootRef.child('Tokens/');
        var usersRef = rootRef.child('Users/');
        var userRef = usersRef.child(userId);
        var userIdRef = userRef.update({'userId':userId});

        var userInfoRef = userRef.child('userInfo');
        var userName = userInfoRef.update({'userName': this.state.name});
        var userMobile = userInfoRef.update({'userMobile': this.state.mobile});
        var userEmail = userInfoRef.update({'userEmail': this.state.email});
        var userPass = userInfoRef.update({'userPass': this.state.password});

        
        
        


        this.props.navigation.navigate('Home')
    }

    renderButton() {
        if (this.state.loading) {
            return <Spinner size="small" />;
        }

        return (
            <Button onPress={this.onButtonPress.bind(this)}>
                Sign Up
            </Button>
        );
    }

    render() {

        return (
            <View>
                <Image
                    style={styles.splashImage}
                    source={require('../assets/images/bg.jpg')}
                >

                <Header headerText="Please Sign Up" />

            <Card>
            <CardSection>
                    <Input
                        placeholder="Name"
                        label="Name   "
                        value={this.state.name}
                        onChangeText={name => this.setState({ name })}
                    />
                </CardSection>

                <CardSection>
                    <Input
                        keyboardType='email-address'
                        placeholder="user@gmail.com"
                        label="Email"
                        value={this.state.email}
                        onChangeText={email => this.setState({ email })}
                    />
                </CardSection>

                <CardSection>
                    <Input
                        maxLength={25}
                        secureTextEntry
                        placeholder="(min length 6)"
                        label="Password"
                        value={this.state.password}
                        onChangeText={password => this.setState({ password })}
                    />
                </CardSection>

                <CardSection>
                    <Input
                        maxLength={11}
                        keyboardType='numeric'
                        placeholder="0333 1234567"
                        label="Mobile "
                        value={this.state.mobile}
                        onChangeText={mobile => this.setState({ mobile })}
                    />
                </CardSection>

                <Text style={styles.errorTextStyle}>
                    {this.state.error}
                </Text>

                <CardSection>
                    {this.renderButton()}
                </CardSection>

                <CardSection >
                    <TouchableOpacity  onPress={() => this.props.navigation.navigate('LoginForm')} style={styles.myTextStyle}>
                        {/*<View >*/}
                        <Text > Already Have An Account? </Text>
                        {/*</View>*/}
                    </TouchableOpacity>
                </CardSection>

            </Card>
            </Image>
            </View>

        );
    }
}

const styles = {
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    },
    myTextStyle: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        marginBottom: 10

    },
    splashImage: {
        width: width,
        height: height,
        resizeMode: 'cover',
        position: 'absolute',
        // width: '100%',
        // height: '100%',
        flex: 1

    }
};

export default SignupForm;
