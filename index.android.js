import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View
} from 'react-native';
import PomodoroClock from './app/components/PomodoroClock.js'
import TaskList from './app/components/TaskList.js'
import { TabNavigator, } from 'react-navigation'

const App = TabNavigator({
  pomodoro: { screen: PomodoroClock },
  taskList: { screen: TaskList }
})

export default class pomodoro extends Component {
  render() {
    return (
      <View>
        <PomodoroClock />
      </View>
    );
  }
}

AppRegistry.registerComponent('pomodoro', () => App);
