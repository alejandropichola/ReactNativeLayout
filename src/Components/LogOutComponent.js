import React from 'react'
import { ActivityIndicator, Alert, View } from 'react-native'
import { isSignedIn, onSignOut } from '../Services/SESSION'
import {container} from '../../assets/Styles'
export default class LogOutComponent extends React.Component {
  login = () => {
    onSignOut()
      .then(() => {
        isSignedIn()
          .then((res) => {
            if (!res) {
              this.setState({ isLogin: 'no login' })
              this.props.navigation.navigate('Auth')
            }
          })
          .catch(err => {
            Alert.alert('error')
          })
      })
      .catch()
  }

  componentDidMount () {
    this.login()
  }

  render () {
    return (
      <View style={container}>
        <ActivityIndicator size="large" color="#0000ff"/>
      </View>
    )
  }
}
