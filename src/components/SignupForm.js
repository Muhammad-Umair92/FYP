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
    state = { email: '', password: '', error: '', loading: false, mobile: '' };

    onButtonPress() {
        const { email, password } = this.state;

        this.setState({ error: '', loading: true });
                firebase.auth().createUserWithEmailAndPassword(email, password)
                    .then(this.onLoginSuccess.bind(this))
                    .catch(this.onLoginFail.bind(this));

    }

    onLoginFail() {
        if(this.state.email == '' || this.state.password == '' || this.state.mobile == ''){
            this.setState({ error: 'Please Fill All Fields', loading: false });
        }
        else {
        this.setState({ error: '    Invalid Information  \n                    or\nAccount Already Exists', loading: false });
        }
    }

    onLoginSuccess() {
        this.setState({
            email: '',
            password: '',
            loading: false,
            error: ''
        });
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

                <CardSection>
                    <Input
                        placeholder="+92 333 1234567"
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
