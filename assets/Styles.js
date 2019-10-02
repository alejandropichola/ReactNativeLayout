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
  fontSize: 18,
  color: '#fff'
}

export const paddingLeftPlaceholder = {
  paddingLeft: 18
}

export const paddingRightPlaceholder = {
  paddingRight: 18
}

export const iconLeftStyle = {
  position: 'absolute',
  top: 22,
  left: 5
}
export const iconRightStyle = {
  position: 'absolute',
  top: 16,
  right: 5
}
export const inputType = {
  height: 50,
  marginBottom: 6
}

export const forGot = {
  textAlign: 'center',
  marginTop: 15,
  color: '#00935e',
  textDecorationLine: 'underline'
}

export const tableHeader = {

}

export const inputIOS = {
  fontSize: 16,
  paddingVertical: 12,
  paddingHorizontal: 10,
  borderWidth: 1,
  borderColor: 'gray',
  borderRadius: 4,
  color: 'black',
  paddingRight: 30, // to ensure the text is never behind the icon
}
export const inputAndroid = {
  fontSize: 16,
  paddingHorizontal: 10,
  paddingVertical: 8,
  borderWidth: 0.5,
  borderColor: 'eggplant',
  borderRadius: 8,
  color: 'black',
  paddingRight: 30, // to ensure the text is never behind the icon
}
export const select = {
  borderBottomWidth: 1,
  borderColor: '#27b185'
}

export const heightInput = {
  margin: 20
}

export const widthInput = {
  width: '97%'
}

export const primary = '#00935e'

export const colorPrimary = {
  color: '#00935e'
}