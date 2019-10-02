import React from 'react'
import {
  Text,
  View,
  Keyboard,
  KeyboardAvoidingView, Alert,
  ActivityIndicator,
  ImageBackground,
  Image
} from 'react-native'
import { Button } from 'react-native-elements'
import InputTextComponent from './Common/InputTextComponent'
import { forGot, container, titleOne, primary, iconCenter, colorPrimary } from '../../assets/Styles'
import { containerLogin } from '../../assets/Login'
import { onSignIn, isSignedIn, setToken } from '../Services/SESSION'
import validator from 'validator'
import Config from '../Config/Config'
import Toast, { DURATION } from 'react-native-easy-toast'

class LoginComponent extends React.Component {
  _isMounted = false
  focusNextField(id) {
    this.inputs[id].focus()
  }

  constructor(props) {
    super(props)
    this.focusNextField = this.focusNextField.bind(this)
    this.inputs = ['user', 'password']
    this.state = {
      user: '',
      password: '',
      userErrorMsg: null,
      passErrorMsg: null,
      buttonSubmit: false,
      isLoading: true,
      result: {}
    }
  }

  passIsSet = () => {
    return (this.state.password !== null)
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
  passIsValid = () => {
    if (!this.passIsSet() || this.state.password.length <= 0) {
      this.setState({
        passErrorMsg: 'Contraseña requerida'
      })
      return false
    }
    this.setState({
      passErrorMsg: null
    })
    return true
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
  validationForm = () => {
    this.setState({
      password: this.state.password || ''
    })
    this.setState({
      user: this.state.user || ''
    })
    this.userIsValid()
    this.passIsValid()
    return (this.passIsValid() && this.userIsValid())
  }

  submitForm = () => {
    const env = Config.env || 'local'
    const apiRoot = Config[env].apiRoot
    const url = apiRoot + Config.apiSrvAuth
    Alert.alert('ruta', url)
    Keyboard.dismiss()
    if (this.validationForm()) {
      const params = {
        username: this.state.user || null,
        password: this.state.password || null,
        grant_type: 'password'
      }
      let formData = []
      for (const item in params) {
        const encodeKey = encodeURIComponent(item)
        const encodeValue = encodeURIComponent(params[item])
        formData.push(encodeKey + '=' + encodeValue)
      }
      this.setState({ buttonSubmit: true })
      formData = formData.join('&')
      return fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: formData
      }).then((response) => response.json())
        .then((responseData) => {
          return responseData ? responseData['access_token'] : null
        })
        .then((token) => {
          this.setState({ buttonSubmit: false })
          if (!token) {
            this.refs.toast.show('Credenciales inválidas')
            return true;
          }
          return setToken(token)
            .then(() => {
              this.setState({ buttonSubmit: false })
              return this.isLogin()
            })
        })
        .then(() => {
          this.setState({ buttonSubmit: false })
          return this.isLogin()
        })
        .catch(err => {
          throw err
        })
        .done()
    }
  }

  LoginData = () => {
    const data = this.result
    const env = Config.env || 'local'
    const apiRoot = Config[env].apiRoot
    const url = apiRoot + Config.apiSrvAuth
    const params = {
      username: data ? data.user : null,
      password: data ? data.pass : null,
      grant_type: 'password'
    }
    let formData = []
    for (const item in params) {
      const encodeKey = encodeURIComponent(item)
      const encodeValue = encodeURIComponent(params[item])
      formData.push(encodeKey + '=' + encodeValue)
    }
    formData = formData.join('&')
    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: formData
    }).then((response) => response.json())
      .then((responseData) => {
        return responseData ? responseData['access_token'] : null
      })
      .done()
  }

  isLogin = () => {
    return isSignedIn()
      .then((res) => {
        this.setState({ isLoading: false })
        if (res) {
          this.props.navigation.navigate('App')
        }
      })
      .catch(err => {
        Alert.alert('error')
      })
  }

  componentDidMount() {
    return this.isLogin()
  }

  render() {
    return (
      <KeyboardAvoidingView
        style={container}
        behavior='position'
        keyboardVerticalOffset={-400}>
        <Toast ref="toast" />
        {this.state.isLoading ? <ActivityIndicator size="large" color="#0000ff" /> :
          <View style={{ width: '100%', height: '100%' }}>
            <View style={containerLogin}>
              <Text style={[titleOne, colorPrimary]}>Iniciar sesión</Text>
              <InputTextComponent label='   Correo'
                placeHolder='Ingrese correo electrónico'
                note=''
                MessageError={this.state.userErrorMsg}
                secure={false}
                onChangeText={(user) => this.setState({ user })}
                value={this.state.user}
                iconLeft='md-person'
                sizeIcon={20}
                returnKey={'next'}
                submit={() => { this.secondTextInput.focus() }}
                blurSubmit={false}
                colorIcon={primary}
                maxLength={100}
              />
              <InputTextComponent label='   Contraseña'
                placeHolder='Ingrese contraseña'
                note=''
                MessageError={this.state.passErrorMsg}
                secure={true}
                onChangeText={(password) => this.setState({ password })}
                value={this.state.password}
                iconLeft='md-lock'
                iconRight={'md-eye'}
                sizeIcon={20}
                submit={this.submitForm}
                refInput={(input) => { this.secondTextInput = input }}
                colorIcon={primary}
                maxLength={100}
              />
              <Text>{`\n`}</Text>
              {
                (this.state.buttonSubmit === true) ?
                  <Button title='Entrar' buttonStyle={{ backgroundColor: primary }} style={{ marginTop: 2 }} onPress={this.submitForm}
                    disabled={this.state.buttonSubmit} loading /> :
                  <Button title='Entrar' buttonStyle={{ backgroundColor: primary }} style={{ marginTop: 2 }} onPress={this.submitForm}
                    disabled={this.state.buttonSubmit} />
              }
              <Text style={forGot} onPress={() => this.props.navigation.navigate('ForgotPassword')}>
                Recuperar contraseña
              </Text>
              <Text>{`\n`}</Text>
            <View style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image style={{ width: 250, height: 100 }} source={require('../../assets/images/iconoprincipal.png')} />
            </View>
            </View>
          </View>
        }
      </KeyboardAvoidingView>
    )
  }
}

export default LoginComponent
