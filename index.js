/**
 * @format
 */

import { AppRegistry } from 'react-native'
import App from './App'
import { name as appName } from './app.json'
import firebase, { RemoteMessage } from 'react-native-firebase'
// Move to a proper place
const handleFCMNotification = async (message: RemoteMessage) => {
  if (Platform.OS === 'android') {
    try {
      const res = await firebase.messaging().requestPermission()
      const fcmToken = await firebase.messaging().getToken()
      if (fcmToken) {
        logger.log('FCM Token: ', fcmToken)
        const enabled = await firebase.messaging().hasPermission()
        if (enabled) {
          logger.log('FCM messaging has permission:' + enabled)
        } else {
          try {
            await firebase.messaging().requestPermission()
            logger.log('FCM permission granted')
          } catch (error) {
            logger.log('FCM Permission Error', error)
          }
        }
        firebase.notifications().onNotificationDisplayed((notification: Notification) => {
          // Process your notification as required
          // ANDROID: Remote notifications do not contain the channel ID. You will have to specify this manually if you'd like to re-display the notification.
          logger.log('Notification: ', notification)
        })
        this.notificationListener = firebase.notifications().onNotification((notification: Notification) => {
          logger.log('Notification: ', notification)
        })
      } else {
        logger.log('FCM Token not available')
      }
    } catch (e) {
      logger.log('Error initializing FCM', e)
    }
  }
  console.log('FCM OFFLINE: ', message)
  return Promise.resolve()
}
AppRegistry.registerComponent(appName, () => App)
AppRegistry.registerHeadlessTask('RNFirebaseBackgroundMessage', () => PushNotificationService.handleFCMNotification)
