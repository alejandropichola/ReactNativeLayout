import { Dimensions, Platform } from 'react-native'

const { width, height } = Dimensions.get('window')

export const container =
  {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  }
export const errorMsg = {
  color: 'red'
}
export const containerMargin = {
  marginLeft: 10,
  marginRight: 10,
}
export const titleOne = {
  textAlign: 'center',
  fontSize: 18
}

export const paddingLeftPlaceholder = {
  paddingLeft: 18
}

export const paddingRightPlaceholder = {
  paddingRight: 18
}

export const iconLeftStyle = {
  position: 'absolute',
  top: 14
}
export const iconRightStyle = {
  position: 'absolute',
  top: 14,
  right: 4
}
export const inputType = {
  height: 50,
  marginBottom: 6,
  borderBottomWidth: 1,
  borderColor: 'black'
}

export const forGot = {
  textAlign: 'center',
  marginTop: 15,
  textDecorationLine: 'underline'
}