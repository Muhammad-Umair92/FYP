import React, { Component } from 'react';
import {Image, Text, View, StyleSheet, Dimensions} from "react-native";
import logo from '../assets/images/logo.png';
import {NavigationActions} from "react-navigation";
const {width, height} = Dimensions.get('window');

export class Splash extends Component {
    static navigationOptions = {
        header:null
        // headerStyle: {
        //     backgroundColor: "red"
        // }
    };


    constructor(props){
        super(props);
        setTimeout(()=>{
            const resetAction = NavigationActions.reset({
                index: 0,
                actions: [
                    NavigationActions.navigate({ routeName: 'App'})
                ]
            });
            this.props.navigation.dispatch(resetAction)

        }, 3000);
    }


    // componentDidMount(){
    //     const {navigate} = this.props.navigation;
    //     setTimeout(()=>{
    //         navigate("App")
    //     },3000);
    // }

    render() {
        return(
            <View style={styles.splashView}>
                <Image
                    style={styles.splashImage}
                    source={require('../assets/images/logo.png')}
                />
            </View>
        )

    }
}

const styles = StyleSheet.create({
    splashView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    splashImage: {
        width: width,
        height: height,
        resizeMode: 'cover'

    }
});