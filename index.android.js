/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */


import React, { Component } from 'react';
import {
  AppRegistry, View
} from 'react-native';

import OneSignal from 'react-native-onesignal'; // Import package from node modules
import {StackNavigator} from "react-navigation";
import App from "./src/App";
import {Splash} from "./src/components/Splash";
import {TokenPage} from "./src/components/TokenPage";
import {Home} from "./src/components/Home";
import LoginForm from "./src/components/LoginForm";
import SignupForm from "./src/components/SignupForm";
import {Hospitals, Banks, Franchises, Pumps, Saloons} from "./src/components"



const MainNav = StackNavigator({
                Splash: {
                    screen:Splash
                },
                Home: {
                    screen:Home
                },
                App: {
                    screen:App
                },
                LoginForm: {
                    screen:LoginForm
                },
                SignupForm:{
                    screen:SignupForm
                },
                Banks:{
                    screen:Banks
                },
                Franchises:{
                    screen:Franchises
                },
                Hospitals:{
                    screen:Hospitals
                },
                Pumps:{
                    screen:Pumps
                },
                Saloons:{
                    screen:Saloons
                },
                TokenPage:{
                    screen:TokenPage
                },
                // Banks:{
                //     screen:Banks
                // },

            },
                {
                    initialRouteName:"Splash",
                    headerTintColor: 'red',
                }
);

class First extends Component {

    componentWillMount() {
        OneSignal.addEventListener('received', this.onReceived);
        OneSignal.addEventListener('opened', this.onOpened);
        OneSignal.addEventListener('registered', this.onRegistered);
        OneSignal.addEventListener('ids', this.onIds);
    }

    componentWillUnmount() {
        OneSignal.removeEventListener('received', this.onReceived);
        OneSignal.removeEventListener('opened', this.onOpened);
        OneSignal.removeEventListener('registered', this.onRegistered);
        OneSignal.removeEventListener('ids', this.onIds);
    }

    onReceived(notification) {
        console.log("Notification received: ", notification);
    }

    onOpened(openResult) {
        console.log('Message: ', openResult.notification.payload.body);
        console.log('Data: ', openResult.notification.payload.additionalData);
        console.log('isActive: ', openResult.notification.isAppInFocus);
        console.log('openResult: ', openResult);
    }

    onRegistered(notifData) {
        console.log("Device had been registered for push notifications!", notifData);
    }

    onIds(device) {
        console.log('Device info: ', device);
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <MainNav />
            </View>
        )

    }

}
AppRegistry.registerComponent('Qataar', () => First);

