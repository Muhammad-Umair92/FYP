import React, { Component } from 'react';
import {Image, Text, View, StyleSheet, Dimensions, TouchableOpacity} from "react-native";
import { Button, Card, CardSection, Header, Token} from '../components/common';
import firebase from 'firebase';

const {width, height} = Dimensions.get('window');

export class TokenPage extends Component {

    



    constructor(){
        super();{

            this.state = {
                CurrentToken: undefined,
                Total: undefined,
                yourToken : 0,
                totalTokens : 0,
                booked : true,
                dateNow : (new Date().toDateString).toString
            }
        }
    }

    static navigationOptions = {
        title: 'Get Your Token',
        headerTintColor: 'red',
        headerStyle: {backgroundColor: '#dfdfdf', justifyContent: 'center',},
        headerTitleStyle: {color: 'red', alignSelf: 'center', marginRight: 80},
    };


    componentWillMount(){
        
        var rootRef =  firebase.database().ref();
        var companiesRef = rootRef.child('Companies/');
        var companyRef = companiesRef.child('rLkjptEBZsSaD8VCXlh4Ksyxi4z1/');
        var currentTokenRef = companyRef.child('currentToken/');
        var reportRef = companyRef.child('Report/');
        // var dateRef = reportRef.set(this.state.dateNow)
        // if(dateRef === Date().toDateString){
            // var currentTokenRef = dateRef.child('CurrentToken')
            // var currToken = currentTokenRef.update(this.state.CurrentToken)
        // }
        // else{
            // var dateAfterRef = reportRef.child(this.state.dateNow)
            // console.log(dateAfterRef)
        // }
        
        var userId = firebase.auth().currentUser.uid;
        var usersRef = rootRef.child('Users/');
        var userRef = usersRef.child(userId);
        var userToken = userRef.child('userToken');
        userToken.on('value',(snapshot)=>{
            if(snapshot.val()==0 || snapshot.val()==null){
                this.setState({yourToken: null});
            }
            else{
                this.setState({yourToken:snapshot.val()});
            }
    });
        
        currentTokenRef.on('value',(snapshot) => {

            this.setState({CurrentToken: snapshot.val()});
        });
        var tokenRef = rootRef.child('Tokens/');
        tokenRef.on('value',(snapshot) => {
            if(snapshot.val().Total == 0){
                var user = userRef.update({'userToken':0});
                this.setState({yourToken: 0});

            }
            
                this.setState({Total: snapshot.val().Total})
            
            
        })
    }

    bookNow(){
        if(this.state.booked){
        // const { yourToken, totalTokens } = this.state;
        // if (!this.state.booked) {
        var rootRef =  firebase.database().ref();
        var tokenRef = rootRef.child('Tokens/');     
        var userId = firebase.auth().currentUser.uid;
        var usersRef = rootRef.child('Users/');
        var userRef = usersRef.child(userId);
        // var userTokenRef = userRef.child('userToken');
        var user = userRef.update({'userToken':this.state.Total + 1});
        tokenRef.once('value',(snapshot) => {
        this.setState({totalTokens: snapshot.val()});
        if(this.state.totalTokens != null){
            tokenRef.update({Total : snapshot.val().Total + 1});
        }
        else{
            tokenRef.update({Total : 1});
        }


        // firebase.database().ref('Tokens/').child({yourToken : this.state.totalTokens});
        // console.log("+++++++++++++",snapshot.val());
        // this.setState({totalTokens: 1 + snapshot.val().Total});
        // this.setState({yourToken:  snapshot.val().Total + 1});
        });
        // firebase.database().ref('Tokens/').set({TokenNo : 1});
        // firebase.database().ref('Tokens/').set({Total : this.state.totalTokens});

        this.setState({booked: false});

                    
        // }

    }

    }




    render() {
        return(
            <View style={{flex:1}}>
                <View style={{flex:1}}>
                    <Image
                        style={styles.splashImage}
                        source={require('../assets/images/bg.jpg')}
                    >
                    </Image>
                    <Card style={{flex:2}}>
                       

                        <Token>
                              Total Tokens = {this.state.Total}
                        </Token>

                        <Token>
                              Your Token No. = {this.state.yourToken}
                        </Token>

                        <Token>
                            Now Serving = {this.state.CurrentToken}

                        </Token>



                        <CardSection style={{flex:1, backgroundColor:'red'}}>
                        <Button onPress={this.bookNow.bind(this)} >
                        Book Now
                        </Button>
                        </CardSection>







                     </Card>

                   



                   
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