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
import { createBottomTabNavigator, createAppContainer} from 'react-navigation';

const tabNavigator = createBottomTabNavigator(
      {
        Home:FamilyMemDashboard
      },
      {
        initialRouteName:'Home'
      });
    
    const AppContainer = createAppContainer(tabNavigator);

export default class App extends React.Component {
  render() {
  return (
    <View style={styles.container}>
          <AppContainer />
      {/* <FamilyMemDashboard/> */}
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


