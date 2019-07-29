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
import FamilyMemDashboard from './app/components/familymemberdashboard';
import {StackNavigator} from 'react-navigation';

export default class App extends React.Component {
  render() {
  return (
    <View style={styles.container}>
      <FamilyMemDashboard/>
    </View>

   );
  }
};

const styles = StyleSheet.create({
  container: {
      flex:1,
      backgroundColor: 'orange',
      // justifyContent:'center',
      // paddingLeft:60,
      // paddingRight:60

  }
})


