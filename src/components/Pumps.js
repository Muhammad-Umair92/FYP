import React, { Component } from 'react';
import {Image, Text, View, StyleSheet, Dimensions, TouchableOpacity} from "react-native";
import { Button, Card, CardSection, Header} from '../components/common';
import firebase from 'firebase';

const {width, height} = Dimensions.get('window');

export class Pumps extends Component {
    static navigationOptions = {
        title: 'Pumps',
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
                        {/*<Header headerText="AVAILABLE QATAARs" />*/}
                        <Card>

                            <CardSection>
                                <Button >
                                    Total CNG
                                </Button>
                            </CardSection>
                            <CardSection>
                                <Button>
                                    Shell
                                </Button>
                            </CardSection>
                            <CardSection>
                                <Button >
                                    PSO
                                </Button>
                            </CardSection>
                            <CardSection>
                                <Button >
                                    Caltex
                                </Button>
                            </CardSection>
                            <CardSection>
                                <Button >
                                    Al-Fattah CNG
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