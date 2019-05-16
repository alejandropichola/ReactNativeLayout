import React from 'react'
import { Alert } from 'react-native'
import DrawerNavigation from './src/Router/Router'
import AsyncStorage from '@react-native-community/async-storage'

import firebase from 'react-native-firebase'

export default class app extends React.Component {
  async componentDidMount () {
    this.checkPermission()
    this.createNotificationListeners()
  }

  componentWillUnmount () {
    this.notificationListener()
    this.notificationOpenedListener()
  }

  async checkPermission () {
    const enabled = await firebase.messaging().hasPermission()
    if (enabled) {
      this.getToken()
    } else {
      this.requestPermission()
    }
  }

  async createNotificationListeners () {
    /*
    * Triggered when a particular notification has been received in foreground
    * */
    this.notificationListener = firebase.notifications().onNotification((notification) => {
      const { title, body } = notification
      this.showAlert(title, body)
    })

    /*
    * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
    * */
    this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
      const { title, body } = notificationOpen.notification
      this.showAlert(title, body)
    })

    /*
    * Si su aplicación está cerrada, puede verificar si se abrió con una notificación haciendo clic / tocando / abriendo de la siguiente manera:
    * */
    const notificationOpen = await firebase.notifications().getInitialNotification()
    if (notificationOpen) {
      const { title, body } = notificationOpen.notification
      this.showAlert(title, body)
    }
    /*
    * Activado para datos solo carga útil en primer plano
    * */
    this.messageListener = firebase.messaging().onMessage((message) => {
      //mensaje de datos de proceso
      console.log(JSON.stringify(message))
    })
  }

  showAlert (title, body) {
    Alert.alert(
      title, body,
      [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ],
      { cancelable: false },
    )
  }

  async getToken () {
    let fcmToken = await AsyncStorage.getItem('fcmToken')
    // console.warn(fcmToken)
    if (!fcmToken) {
      fcmToken = await firebase.messaging().getToken()
      if (fcmToken) {
        // user has a device token
        await AsyncStorage.setItem('fcmToken', fcmToken)
      }
    }
  }

  //2
  async requestPermission () {
    try {
      await firebase.messaging().requestPermission()
      // User has authorised
      this.getToken()
    } catch (error) {
      // User has rejected permissions
      console.log('permission rejected')
    }
  }

  render () {
    return (
      <DrawerNavigation/>
    )
  }
}
