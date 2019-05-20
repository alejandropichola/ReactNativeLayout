import React from 'react'
import {
  View, Text, Keyboard, Image,
  KeyboardAvoidingView, PermissionsAndroid, Platform
} from 'react-native'
import { Input, Button } from 'react-native-elements'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { containerMargin } from '../../assets/Styles'
import ImagePicker from 'react-native-image-picker'
import Toast, {DURATION} from 'react-native-easy-toast'
class FormCamComponent extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      hasCameraPermissions: null,
      hasCameraRollPermissions: null,
      image: null,
      pdf: null
    }
  }
  async getCameraPermissions() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,{
          'title': 'Permisos necesarios',
          'message': 'Se requieren permisos para acceder a la camara'
        }
      )
      const photos = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,{
          'title': 'Permisos necesarios',
          'message': 'Se requieren permisos para acceder al contenido multimedia'
        }
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        //console.warn('permisos acepted')
      } else {
        //console.warn('permiso denegado')
      }
      if (photos === PermissionsAndroid.RESULTS.GRANTED) {
        //console.warn('permisos acepted photos')
      } else {
        //console.warn('permiso denegado photos')
      }
    } catch(err) {
      console.error(err)
    }
  }
  componentDidMount = () => {
    if (Platform.OS === 'android') {
      this.getCameraPermissions()
    }
  }
  saveImage = () => {
    if (this.state.image != null) {
      const data = this.state.image.data


      const json = JSON.stringify({
        data: {
        type: 'upload',
        attributes: {
          bodyImage: data,
          mimeType: 'data:image/jpeg;base64'
        }}
      })
      fetch('http://192.168.86.47:3000/upload', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: json
    })
    .then(response => {
      this.refs.toast.show('hello world!')
    })
    .catch(err => {
      console.error(err)
    })
  }
}
  getImageLibrary = () => {
    const options = {
      title: 'Seleccionar imagen',
      mediaType: 'photo',
      cancelButtonTitle: 'Cancelar',
      allowsEditing: true
    }
    ImagePicker.launchImageLibrary(options, (response) => {
      this.setState({image: response})
    })
  }


  render () {
    let { image } = this.state
    return (
      <KeyboardAvoidingView style={containerMargin} behavior='position'
                            keyboardVerticalOffset={-25}>

                            <Toast ref="toast"/>
                            <Ionicons name='md-images' size={35} onPress={this.getImageLibrary}/>
        {image && image.data ? <Image source={{ uri: 'data:image/jpeg;base64,' + image.data }} style={{ width: 200, height: 200 }}/> : null}
        <Button title='Subir' onPress={this.saveImage}></Button>
      </KeyboardAvoidingView>
    )
  }
}

export default FormCamComponent
