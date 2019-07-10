import React from 'react'
import { View, Picker, Image, PermissionsAndroid, Platform } from 'react-native'
import { Text, Button } from 'react-native-elements'
import { container, inputIOS, inputAndroid, select } from '../../../assets/Styles'
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
      expenseType: null,
      line: null,
      promotion: null,
      expenses: [],
      lines: [],
      promotions: [],
      view: 1,
      hasCameraPermissions: null,
      hasCameraRollPermissions: null,
      image: null,
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
          this.setState({image: null})
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
      cropping: true,
      includeBase64: true
    }
    ImagePicker.openPicker(options)
      .then((response) => {
        this.setState({ image: response })
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
        this.setState({ image: response })
      })
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
      <Grid>
        <View></View>
        <Col style={containerLogin}>
          <Row size={30}>
            <Col style={containerLogin} size={50}>
              <Button onPress={this.getImageLibrary} icon={<Ionicons name='md-images' size={35}/>}></Button>
            </Col>
            <Col style={containerLogin} size={50}>
              <Button onPress={this.getCamera} icon={<Ionicons name='md-camera' size={35}/>}></Button>
            </Col>
          </Row>
          <Row size={10}>
            <Col>
              {image && image.data ? <Image source={{ uri: 'data:image/jpeg;base64,' + image.data }}
                                            style={{ width: 200, height: 200 }}/> : null}
              <Button buttonStyle={{ backgroundColor: '#27b185' }} onPress={() => this.next()}
                      title='Guardar'></Button>
            </Col>
          </Row>
        </Col>
      </Grid>
    )
  }
}
