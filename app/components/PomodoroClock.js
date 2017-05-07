import React from 'react'
import { View, Text, AppRegistry, StyleSheet, Button, Vibration} from 'react-native'

export default class PomodoroClock extends React.Component {
  constructor(props) {
    super(props)
    this.defaultTimeInSeconds = (1*60*60*25)
    super(props)
    this.state = {
      timer: this.defaultTimeInSeconds,
      intervalId: null
    }
  }
  render() {
    let minutes = Math.floor((this.state.timer/60)/60)
    let minutesString = minutes < 10 ? '0'+minutes : minutes
    let seconds = ((this.state.timer /60) % 60)
    let secondsString = seconds < 10 ? seconds = '0'+seconds.toString() : seconds
    return (
      <View style={styles.container}>
        <View style={styles.header} >
          <Text style={styles.title}>Pomodoro do Alex</Text>
        </View>
        <View style={styles.body}>
          <View style={styles.timer}>
            <Text style={styles.timerString}>{minutesString} : {secondsString}</Text>
            <View style={styles.buttons}>
            <Button
             style={styles.startButton}
              title="Start"
              onPress={this.onStart.bind(this)} />
              <View style={styles.buttonSeparator} />
              <Button
              onPress={this.onCancel.bind(this)}
              style={styles.cancelButton}
              title="Cancel"
              />
              </View>


          </View>
        </View>

      </View>
    )
  }
  onStart() {
    let intervalId = setInterval(() => {

      this.setState({timer: this.state.timer - 60})
      if(this.state.timer <= 0) {
          Vibration.vibrate([0,1000,1000,0])
          this.setState({timer: 0})
          clearInterval(this.state.intervalId)
      }
    },1000)

    this.setState({intervalId})
  }
  onCancel() {
    clearInterval(this.state.intervalId)

    this.setState({timer: this.defaultTimeInSeconds})
  }
}

let styles = StyleSheet.create({
  container: {
    display:'flex',
    flexDirection:'column'
  },
  header: {
    display:'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'red',
    height:100,
    color:'white'
  },
  title: {
    color:'white',
    fontSize:28
  },
  body: {
    height:500,
    backgroundColor:'#e3e3e3',

  },
  timer: {
    display: 'flex',
    height:200,
    alignItems:'center',
    justifyContent:'center',
    alignContent:'space-between'
  },
  timerString: {
    fontSize:36
  },
  startButton: {
    marginBottom: 40,

  },
  buttons: {
    marginTop:50,
    display:'flex',
    alignContent:'space-between'
  },
  buttonSeparator: {
    height:20
  }
})

AppRegistry.registerComponent('PomodoroClock', () => PomodoroClock)
