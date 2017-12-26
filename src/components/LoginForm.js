import React, { Component } from 'react';
import {Image, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import firebase from 'firebase';
import { Button, Card, CardSection, Input, Spinner } from './common';

const {width, height} = Dimensions.get('window');

class LoginForm extends Component {
  static navigationOptions = {
    title: 'Sign In',
    headerTintColor: 'red',
      headerStyle: {backgroundColor: '#dfdfdf', justifyContent: 'center',},
      headerTitleStyle: {color: 'red', alignSelf: 'center', marginRight: 80},
  };


  state = { email: '', password: '', error: '', loading: false };

  onButtonPress() {
    const { email, password } = this.state;

    this.setState({ error: '', loading: true });

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(this.onLoginSuccess.bind(this))
      // .catch(() => {
        // firebase.auth().createUserWithEmailAndPassword(email, password)
        //   .then(this.onLoginSuccess.bind(this))
          .catch(this.onLoginFail.bind(this));
      // });
  }

  onLoginFail() {
    if(this.state.email == '' || this.state.password == '' || this.state.mobile == ''){
      this.setState({ error: 'Please Fill All Fields', loading: false });
    }
    else {
      this.setState({ error: 'Invalid Email or Password', loading: false });
  }

  }

  onLoginSuccess() {
    this.setState({
      email: '',
      password: '',
      loading: false,
      error: ''
    });
    this.props.navigation.navigate('Home')
  }

  renderButton() {
    if (this.state.loading) {
      return <Spinner size="small" />;
    }

    return (
      <Button onPress={this.onButtonPress.bind(this)}>
        Log in
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


      <Card>
        <CardSection>
          <Input
            placeholder="user@gmail.com"
            label="Email"
            value={this.state.email}
            onChangeText={email => this.setState({ email })}
          />
        </CardSection>

        <CardSection>
          <Input
            secureTextEntry
            placeholder="(min length 6)"
            label="Password"
            value={this.state.password}
            onChangeText={password => this.setState({ password })}
          />
        </CardSection>

        <Text style={styles.errorTextStyle}>
          {this.state.error}
        </Text>

        <CardSection>
          {this.renderButton()}
        </CardSection>

        <CardSection >
          <TouchableOpacity style={styles.myTextStyle}>
              {/*<View >*/}
            <Text > Forgot Your Password? </Text>
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
  splashImage: {
      width: width,
      height: height,
      resizeMode: 'cover',
      position: 'absolute',
      // width: '100%',
      // height: '100%',
      flex: 1

  },
  myTextStyle: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 10,
      marginBottom: 10

  },
};

export default LoginForm;
