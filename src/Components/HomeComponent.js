import React from 'react'
import { Text, View, Image, Button, Alert } from 'react-native'
import {onSignOut, isSignedIn } from '../Services/SESSION'

class HomeComponent extends React.Component {
  constructor (props) {
    super(props)
    this.state={
      isLogin: 'no login',
      login: false
    }
  }
  componentDidMount () {
    this.auth()
    if (this.state.login) {
      Alert.alert('titulo', 'entra en la condicion')
      this.setState({isLogin: 'is login'})
    }
  }
  auth=()=> {
    isSignedIn()
      .then((res) => {
        if (res) {
          this.setState({login: true})
          this.setState({isLogin: 'is login'})
        }
      })
      .catch(err => {
        Alert.alert('error')
      })
  }
  login = () => {
    onSignOut()
      .then(() => {
        isSignedIn()
          .then((res) => {
            if (!res) {
              this.setState({isLogin: 'no login'})
              this.props.navigation.navigate('Auth')
            }
          })
          .catch(err => {
            Alert.alert('error')
          })
      })
      .catch()
  }
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>{this.state.isLogin}</Text>

        <Text>Home Screen</Text>
        <Button title='login' onPress={this.login}></Button>
      </View>
    );
  }
}
export default HomeComponent;
