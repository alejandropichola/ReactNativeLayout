import React from 'react'
import DrawerNavigation from './src/Router/Router'
import InLocoEngage from 'react-native-inlocoengage'
import firebase from 'react-native-firebase'

export default class app extends React.Component<Props> {
  render () {
    return (
      <DrawerNavigation/>
    )
  }
}
