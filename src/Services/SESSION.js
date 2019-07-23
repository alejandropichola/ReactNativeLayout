import AsyncStorage from '@react-native-community/async-storage'
import Config from '../Config/Config'
import axios from 'axios'
import { Alert } from 'react-native'
import User from './models/User'

export const USER_KEY = 'multiPharm'
export const Session = () => {
  const env = Config.env || 'local'
  const apiRoot = Config[env].apiRoot
  const url = apiRoot + Config.apiSrvAuth
  const json = JSON.stringify({
    username: '',
    password: '',
    grant_type: ''
  })
  axios('http://192.168.86.47:3000/upload', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: json
  })
    .then((response) => response.json())
    .then((responseData) => {

      Alert.alert(
        'POST Response',
        'Response Body ' + JSON.stringify(responseData)
      )
    })
    .done()
}

export const setToken = async (token) => {
  try {
    await AsyncStorage.setItem(USER_KEY, token)
  } catch (e) {
    console.log(e)
  }
}
export const onSignIn = () => {

}

export const onSignOut = async () => {
  try {
    await AsyncStorage.removeItem(USER_KEY)
  } catch (e) {
    console.log(e)
  }
}

export const isSignedIn = () => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem(USER_KEY)
      .then(res => {
        if (res !== null) {
          resolve(true)
        } else {
          resolve(false)
        }
      })
      .catch(err => {
        reject(err)
      })
  })
}
export const getSignIn = () => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem(USER_KEY)
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}
