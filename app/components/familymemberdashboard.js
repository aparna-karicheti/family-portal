/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity
} from "react-native";
import AvatarSocial from 'react-native-avatar-social';

import { Actions } from "react-native-router-flux";
// import AsyncStorage from "@react-native-community/async-storage";
import axios from "axios";

export default class FamilyMemDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };

    this.loginUser = this.loginUser.bind(this);

    this.updateValue = this.updateValue.bind(this);
  }

  signup() {
    Actions.signup();
  }

  loginUser() {
    axios
      .post("http://10.1.10.197:4000/users/login", {
        email: this.state.email,
        password: this.state.password
      })
      .then(function(response) {
        console.log("Response data from login:", response);

        // AsyncStorage.setItem('user', JSON.stringify(response.data));
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  updateValue(text1, field) {
    if (field == "email") {
      this.setState({ email: text1 });
    }
    if (field == "password") {
      this.setState({ password: text1 });
    }
  }

  render() {
    return (
      <View>
      {/* Image and title */}
      <View style={{flexDirection:"row"}}>
        <AvatarSocial 
         dim={150}
          image={{
              uri:  'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
          }}
          name="Connie Nielsen"
          type="image"
          positionStatus="left"
         />

        <View>
        <Text style={[styles.textstyle, {marginTop:30}]}> Resident Name: Priyanka Chopra </Text>
        <Text style={styles.textstyle}> Unit Num: 733</Text>
        <Text style={styles.textstyle}> Age : 35</Text>
        </View>
      </View>

      <View style={[{flexDirection:"row"}, {marginHorizontal:20}]}>
           <Text >Activities </Text> 
           <Text >Maintenance </Text> 
           <Text >Food </Text>
          </View>
      </View> 
    );
  }
}

const styles = StyleSheet.create({

  textstyle: {
    paddingBottom:5,
    flexDirection:'row',
   // alignItems: "center",
    //justifyContent: 'center'
  }

});
