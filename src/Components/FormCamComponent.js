import React from 'react'
import {
  View, Text, Keyboard, Image,
  KeyboardAvoidingView, PermissionsAndroid, Platform
} from 'react-native'
import CameraRoll from '@react-native-community/cameraroll'
import { Input, Button } from 'react-native-elements'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { containerMargin } from '../../assets/Styles'

class FormCamComponent extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      hasCameraPermissions: null,
      hasCameraRollPermissions: null,
      image: null
    }
  }

  getCameraRoll() {
    CameraRoll.getPhotos({
      first:20,
      assetType: 'All'
    })
    .then((r) => {
      console.warn(r)
    })
  }
  
  async getCameraPermissions() {
    try {
      const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA)
      console.warn(granted)
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        this.getCameraRoll
      } else {
        console.warn('permiso denegado')
      }
    } catch(err) {
      console.error(err)
    }
  }
  saveImage = () => {
    if (Platform.OS === 'android') {
      return this.getCameraPermissions
    }
  }

  render () {
    let { image } = this.state
    return (
      <KeyboardAvoidingView style={containerMargin} behavior='position'
                            keyboardVerticalOffset={-25}>
                            <Ionicons name='md-camera' size={35} onPress={this.getCameraPermissions}/>
        {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }}/>}
        <Button title='Subir' onPress={this.saveImage}></Button>
      </KeyboardAvoidingView>
    )
  }
}

export default FormCamComponent
