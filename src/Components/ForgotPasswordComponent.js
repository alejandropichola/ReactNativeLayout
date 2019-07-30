import React from 'react'
import { View, Button, Text, Keyboard, KeyboardAvoidingView, ImageBackground } from 'react-native'
import InputTextComponent from './Common/InputTextComponent'
import { container, containerMargin, titleOne } from '../../assets/Styles'
import { containerLogin } from '../../assets/Login'
import validator from 'validator'
import Config from '../Config/Config'
import Toast, { DURATION } from 'react-native-easy-toast'

class ForgotPasswordComponent extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      user: '',
      userErrorMsg: null,
      buttonSubmit: false,
    }
  }

  userIsSuccess = () => {
    return (this.passIsSet() && this.passIsValid())
  }
  userIsDanger = () => {
    return (this.passIsSet() && this.passIsValid())
  }
  userIsSet = () => {
    return (this.state.user !== null)
  }
  userIsValid = () => {
    if (!this.userIsSet() || this.state.user.length <= 0) {
      this.setState({
        userErrorMsg: 'Correo requerida'
      })
      return false
    }

    if (!validator.isEmail(this.state.user.trim())) {
      this.setState({
        userErrorMsg: 'Debe ingresar un correo electrónico'
      })
      return false
    }
    this.setState({
      userErrorMsg: null
    })
    return true
  }
  submitForm = () => {
    const env = Config.env || 'local'
    const apiRoot = Config[env].apiRoot
    let url = apiRoot + Config.apiSrvUserForgotPassword
    Keyboard.dismiss()
    if (this.validationForm()) {
      const email = this.state.user
      url = url.replace('{usuario}', email)
      this.setState({ buttonSubmit: true })
      return fetch(url, {
        method: 'GET',
      }).then((response) => {
        this.setState({ buttonSubmit: false })
        console.warn(response)
        if (response && response.Response === true) {
          this.refs.toast.show('Enviado exitosamente')
        }
      }).catch(err => {
        this.refs.toast.show('Error ' + err)
      })
    }
  }
  validationForm = () => {
    this.setState({
      user: this.state.user || ''
    })
    this.userIsValid()
    return (this.userIsValid())
  }

  render () {
    return (
      <KeyboardAvoidingView
        style={container}
        behavior='position'
        keyboardVerticalOffset={-300}>
        <Toast ref="toast"/>
        <ImageBackground source={require('../../assets/images/home-bkg1-tab.jpg')}
                         imageStyle={{ resizeMode: 'cover' }}
                         style={{ width: '100%', height: '100%' }}>
          <View style={containerLogin}>
            <Text style={titleOne}>Recuperar contraseña</Text>
            <InputTextComponent label='   Correo'
                                placeHolder='Ingrese correo electrónico'
                                note=''
                                MessageError={this.state.userErrorMsg}
                                secure={false}
                                onChangeText={(user) => this.setState({ user })}
                                value={this.state.user}
                                iconLeft='md-mail'
                                sizeIcon={20}
                                colorIcon={'#fff'}
                                maxLength={100}
            />
            <Text>{`\n`}</Text>
            {
              (this.state.buttonSubmit === true) ?
                <Button title='Enviar' style={{ marginTop: 2 }} onPress={this.submitForm}
                        disabled={this.state.buttonSubmit} loading/> :
                <Button title='Enviar' style={{ marginTop: 2 }} onPress={this.submitForm}
                        disabled={this.state.buttonSubmit}/>
            }
          </View>
        </ImageBackground>
      </KeyboardAvoidingView>
    )
  }
}

export default ForgotPasswordComponent
