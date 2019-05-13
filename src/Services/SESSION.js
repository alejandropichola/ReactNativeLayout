import AsyncStorage from '@react-native-community/async-storage';

export const USER_KEY = 'multiPharm'

export const onSignIn = async () => {
  try{
    await AsyncStorage.setItem(USER_KEY, 'true')
  } catch(e) {
    console.error(e)
  }

}

export const onSignOut = async () => {
  try {
    await AsyncStorage.removeItem(USER_KEY)
  }catch(e) {
    console.log(e)
  }
}

export const isSignedIn = () => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem(USER_KEY)
      .then(res => {
        if (res!==null) {
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
