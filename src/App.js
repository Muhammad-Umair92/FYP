import React, { Component } from 'react';
import firebase from 'firebase';
import {Text, View} from "react-native";

import { Header, Button, Spinner } from './components/common';

import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import {Home} from './components/Home';





export default class App extends Component {
    static navigationOptions = {
        header:null
        // headerStyle: {
        //     backgroundColor: "red"
        // }
    };
    state = { loggedIn: null };

    componentWillMount() {
        firebase.initializeApp({
            apiKey: "AIzaSyDojvChl5TKo_uXbcCjiaxhSCfF1WSu6Rw",
            authDomain: "qataar-c1294.firebaseapp.com",
            databaseURL: "https://qataar-c1294.firebaseio.com",
            projectId: "qataar-c1294",
            storageBucket: "qataar-c1294.appspot.com",
            messagingSenderId: "899991899337"
        });

        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({ loggedIn: true });
            } else {
                this.setState({ loggedIn: false });
            }
        });

    }

    renderContent() {
        switch (this.state.loggedIn) {
            case true:
                return <Home navigation={this.props.navigation}/>;

            case false:
                // return <LoginForm />;
                return <SignupForm navigation={this.props.navigation}/>;
                // return this.props.navigation.navigate('SignupForm');
            default:
                return <Spinner size="large" />;
        }
    }

    render() {
        return(
            <View style={{flex: 1}}>

                {this.renderContent()}
            </View>
        )

    }
}