import React from 'react'
import { View, Picker, Image, PermissionsAndroid, Platform, KeyboardAvoidingView, ScrollView } from 'react-native'
import { Text, Button } from 'react-native-elements'
import { container, inputIOS, inputAndroid, select, primary } from '../../../assets/Styles'
import datePicker from 'react-native-datepicker'
import { HelperText, TextInput } from 'react-native-paper'
import { Grid, Col, Row } from 'react-native-easy-grid'
import { containerLogin } from '../../../assets/Login'
import ImagePicker from 'react-native-image-crop-picker'
import Ionicons from 'react-native-vector-icons/Ionicons'

export default class ExpensesItemCamComponent extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      view: 1,
      hasCameraPermissions: null,
      hasCameraRollPermissions: null,
      image: [],
      pdf: null
    }
  }

  next () {
    this.props.navigation.navigate('history')
  }

  async getCameraPermissions () {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA, {
          'title': 'Permisos necesarios',
          'message': 'Se requieren permisos para acceder a la camara'
        }
      )
      const photos = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE, {
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
    } catch (err) {
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
          }
        }
      })
      fetch('http://192.168.86.47:3000/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: json
      })
        .then(response => {
          this.refs.toast.show('Se ha subido exitosamente!')
          this.setState({ image: null })
        })
        .catch(err => {
          console.error(err)
        })
    }
  }
  getImageLibrary = () => {
    const options = {
      mediaType: 'photo',
      cancelButtonTitle: 'Cancelar',
      // cropping: true,
      includeBase64: true,
      multiple: true
    }
    ImagePicker.openPicker(options)
      .then((response) => {
        let images = this.state.image
        response.forEach(item => {
          images.push(item)
        })
        this.setState({ image: images })
      })
  }

  getCamera = () => {
    const options = {
      mediaType: 'photo',
      cancelButtonTitle: 'Cancelar',
      cropping: true,
      includeBase64: true
    }
    ImagePicker.openCamera(options)
      .then((response) => {
        let images = this.state.image
        images.push(response)
        this.setState({ image: images })
      })
  }

  deleteImage (key) {
    const data = this.state.image
    data.splice(key, 1)
    this.setState({ image: data })
  }

  back () {
    if (this.state.view > 1) {
      const counter = this.state.view
      this.setState({ view: (counter - 1) })
    }
  }

  render () {
    let { image } = this.state
    return (
      <KeyboardAvoidingView style={containerLogin}>
        <ScrollView
          style={{
            width: '100%',
            padding: 4
          }}
        >
          <View></View>
          <Col>
            <Row size={30}>
              <Col style={containerLogin} size={50}>
                <Ionicons onPress={this.getImageLibrary} name='md-images' size={35}/>
              </Col>
              <Col style={containerLogin} size={50}>
                <Ionicons name='md-camera' size={35} onPress={this.getCamera}/>
              </Col>
            </Row>
            <Row size={10}>
              <Col style={containerLogin}>
                {
                  image.map((items, key) => (
                    <Row key={key} style={{
                      alignItems: 'center', flex: 1,
                      flexDirection: 'column', paddingBottom: 4
                    }}>
                      <View style={{width: 200, height: 200, position: 'relative'}}>
                        <Ionicons style={{
                          width: 20,
                          height: 20,
                          marginBottom: 5,
                          paddingLeft: 4,
                          position: 'absolute',
                          color: '#cf0000',
                          borderRadius: 8,
                          borderWidth: 2,
                          borderColor: '#000',
                          backgroundColor: '#bcbcbc',
                          top: 5,
                          left: 5,
                          zIndex: 1
                        }} onPress={() => this.deleteImage(key)} name='md-remove' size={20}/>
                        <Image source={{ uri: 'data:image/jpeg;base64,' + items.data }}
                               style={{ width: 200, height: 200, position: 'absolute', zIndex: 0 }}/>
                      </View>
                    </Row>
                  ))
                }
                <Button buttonStyle={{ backgroundColor: primary, paddingBottom: 15 }} onPress={() => this.next()}
                        title='Guardar'/>
              </Col>
            </Row>
          </Col>
        </ScrollView>
      </KeyboardAvoidingView>
    )
  }
}
