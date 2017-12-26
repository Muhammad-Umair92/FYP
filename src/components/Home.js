import React, { Component } from 'react';
import {Image, Text, View, StyleSheet, Dimensions, TouchableOpacity} from "react-native";
import { Button, Card, CardSection, Header} from '../components/common';
import firebase from 'firebase';
// import {CardSection} from "./common/CardSection";

const {width, height} = Dimensions.get('window');

export class Home extends Component {
    static navigationOptions = {
        header: null,
        title: 'AVAILABLE QATAARs',
        headerTintColor: 'red',
        headerStyle: {backgroundColor: '#dfdfdf', justifyContent: 'center',},
        headerTitleStyle: {color: 'red', alignSelf: 'center', marginRight: 80},
    };
    render() {
        return(
            <View style={{flex:1}}>
                <View style={{flex:1}}>
                        <Image
                            style={styles.splashImage}
                            source={require('../assets/images/bg.jpg')}
                        >
                            <Header headerText="AVAILABLE QATAAR" />
                        <Card>

                            <CardSection>
                                <Button onPress={() => this.props.navigation.navigate('Hospitals')} >
                                    Hospitals/Clinics
                                </Button>
                            </CardSection>
                            <CardSection>
                                <Button onPress={() => this.props.navigation.navigate('Franchises')} >
                                    Franchises
                                </Button>
                            </CardSection>
                            <CardSection>
                                <Button onPress={() => this.props.navigation.navigate('Pumps')} >
                                    Fuel Pumps
                                </Button>
                            </CardSection>
                            <CardSection>
                                <Button onPress={() => this.props.navigation.navigate('Saloons')} >
                                    Saloons
                                </Button>
                            </CardSection>
                            <CardSection>
                                <Button onPress={() => this.props.navigation.navigate('Banks')} >
                                    Banks
                                </Button>
                            </CardSection>
                        </Card>
                        <Card>
                            <CardSection>
                                {/*<Button onPress={() => firebase.auth().signOut()} >*/}
                                {/*Log Out*/}
                                {/*</Button>*/}
                            </CardSection>
                        </Card>
                        </Image>

                        {/*<Text>Home</Text>*/}

                        {/*<Button onPress={() => firebase.auth().signOut()} >*/}
                            {/*Log Out*/}
                        {/*</Button>*/}
                    </View>
                    <Card style={{flex:2}}>
                    <CardSection>
                        <TouchableOpacity style={{flex:1}} onPress={() => {firebase.auth().signOut(); this.props.navigation.navigate('SignupForm')}} >
                            <Text style={{color: 'white', alignSelf:'center', fontSize: 16, fontWeight: '600', paddingTop: 10, paddingBottom: 10}}>LOG OUT</Text>
                        </TouchableOpacity>
                    </CardSection>
                    </Card>
                </View>
        )

    }
}

const styles = StyleSheet.create({

    splashImage: {
        width: width,
        height: height,
        resizeMode: 'cover',
        position: 'absolute',
        // width: '100%',
        // height: '100%',
        flex: 1

    }

});