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

export default class Regform extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: ""
    };

    this.registerUser = this.registerUser.bind(this);

    this.updateValue = this.updateValue.bind(this);
  }

  registerUser() {
    // console.log("State before register", this.state);

    axios
      .post("http://10.1.10.197:4000/users", {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password
      })
      .then(function(response) {
        console.log("Response data from register:", response.data);

        // AsyncStorage.setItem("user", JSON.stringify(response.data));
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  updateValue(text1, field) {
    if (field == "name") {
      this.setState({ name: text1 });
    }
    if (field == "email") {
      this.setState({ email: text1 });
    }
    if (field == "password") {
      this.setState({ password: text1 });
    }
  }

  onSubmit() {
    let collection = {};
    (collection.name = this.state.name),
      (collection.email = this.state.email),
      (collection.password = this.state.password);
    console.warn(collection);
  }

  signin() {
    Actions.login();
  }
  render() {
    return (
      <View style={styles.regform}>
        <TextInput
          style={styles.textinput}
          placeholder="Your name"
          onChangeText={text1 => this.updateValue(text1, "name")}
          underlineColorAndroid={"transparent"}
        />

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

        <TouchableOpacity style={styles.button} onPress={this.registerUser}>
          <Text style={styles.btntext}>Sign Up</Text>
        </TouchableOpacity>

        <Text style={styles.btntext}>Already signed in, </Text>
        <TouchableOpacity onPress={this.signin}>
          <Text style={styles.btntext}>Sign In</Text>
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
  }
});
