import React from 'react'
import { AsyncStorage } from 'react-native'

export async function setSession (user) {
  await AsyncStorage.setItem('myApp', user)
}

export async function distroy () {
  await AsyncStorage.clear()
}

export async function getSession () {
  return await AsyncStorage.getItem('myApp')
}