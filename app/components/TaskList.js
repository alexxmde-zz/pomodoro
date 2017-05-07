import React from 'react'
import {StyleSheet, TouchableHighlight,View, Text, Button, ListView } from 'react-native'

export default class TaskList extends React.Component { constructor(props) { super(props)

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 != r2 })
    this.state = { 
      tasks: [], 
      error: '',
      tasksDataSource: ds.cloneWithRows([])
    }
  }

  getTasks() {
    fetch('http://192.168.0.8:3000/tasks').then(response => {
      if (response.ok) {
        response.json().then(json => {
          console.log(json)
          this.setState({ 
            tasksDataSource: this.state.tasksDataSource.cloneWithRows(json)
          })
        }).catch(err => this.setState({ error: err }))

      } else {
        response.text().then(text => {
          this.setState({ error: text })
        }).catch(err => this.setState({error: err}))
      }
    }).catch(err => {
      this.setState({ error: err })
    })
  }
  componentDidMount() {
    this.getTasks()
  }
  render() {
    return(
      <View>
        <View style={styles.controls}>
          <Button title="Add Task" style={styles.addButton}></Button>
        </View>
          <View style={styles.list}>
            <ListView
              dataSource={this.state.tasksDataSource}
              renderRow={this.renderRow.bind(this)}
              />
          </View>

        </View>
        )
        }

        renderRow(rowData) {
          return(
            <View style={styles.container}>
              <TouchableHighlight>
                <Text style={styles.cell}>{rowData.desc}</Text>
              </TouchableHighlight>

            </View>
          )
        }
        }

        const styles = StyleSheet.create({
          controls: {
            width:100,
            height:75,
            marginTop:30,
            marginLeft:30
          },
          list: {
          },
          addButton: {
            marginTop:100,
            height:30,
            width:30
          },
          cell: {
            borderBottomColor:'grey',
            borderBottomWidth: 1,
            paddingTop:20,

            textAlign:'center',
            paddingBottom:20,
          },

          container: {

          }
        })
