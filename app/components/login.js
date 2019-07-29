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

import { Actions } from "react-native-router-flux";
// import AsyncStorage from "@react-native-community/async-storage";
import axios from "axios";

export default class Loginform extends React.Component {
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
      <View style={styles.regform}>
        <TextInput
          style={styles.textinput}
          placeholder="Your email"
          onChangeText={text1 => this.updateValue(text1, "email")}
          underlineColorAndroid={"transparent"}
        />

        <TextInput
          style={styles.textinput}
          placeholder="Your password"
          onChangeText={text1 => this.updateValue(text1, "password")}
          secureTextEntry={true}
          underlineColorAndroid={"transparent"}
        />

        <TouchableOpacity onPress={this.loginUser} style={styles.button}>
          <Text style={styles.btntext}>Login In</Text>
        </TouchableOpacity>

        <Text style={styles.txtinput}>Not signed yet ? </Text>
        <TouchableOpacity onPress={this.signup}>
          <Text style={styles.txtinput}>Sign UP</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  regform: {
    alignSelf: "stretch"
  },
  header: {
    fontSize: 24,
    color: "#fff",
    marginBottom: 40,
    paddingBottom: 10,
    borderBottomColor: "green",
    borderBottomWidth: 1
  },
  textinput: {
    alignSelf: "stretch",
    color: "#fff",
    height: 40,
    marginBottom: 40,
    paddingBottom: 10,
    borderBottomColor: "#f8f8f8",
    borderBottomWidth: 1
  },
  button: {
    alignSelf: "stretch",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#59cbbd",
    marginTop: 30
  },
  btntext: {
    color: "#fff",
    fontWeight: "bold"
  },
  txtinput: {
    color: "#fff",
    fontWeight: "bold",
    flexDirection: "row"
  }
});
