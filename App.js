/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */


import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
 import Main from './app/components/Main';
import Routes from './app/pages/Routes';

export default class App extends React.Component {
  render() {
  return (
    <View style={styles.container}>
      <Routes/>
    </View>

   );
  }
};

const styles = StyleSheet.create({
  container: {
      flex:1,
      backgroundColor: '#36485f',
      justifyContent:'center',
      paddingLeft:60,
      paddingRight:60

  }
})


