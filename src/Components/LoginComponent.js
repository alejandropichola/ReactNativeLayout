import React from 'react'
import {
  Text,
  Button,
  View,
  Keyboard,
  KeyboardAvoidingView, Alert,
  ActivityIndicator
} from 'react-native'
import InputTextComponent from './Common/InputTextComponent'
import { forGot, containerMargin, container, titleOne } from '../../assets/Styles'
import { onSignIn, isSignedIn } from '../Services/SESSION'

class LoginComponent extends React.Component {
  focusNextField (id) {
    this.inputs[id].focus()
  }

  constructor (props) {
    super(props)
    this.focusNextField = this.focusNextField.bind(this)
    this.inputs = ['user', 'password']
    this.state = {
      user: '',
      password: '',
      userErrorMsg: null,
      passErrorMsg: null,
      buttonSubmit: false,
      isLoading: true
    }
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

  componentDidMount () {
    return this.isLogin()
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
    if (!this.passIsSet() || this.state.user.length <= 0) {
      this.setState({
        userErrorMsg: 'Usuario requerida'
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
    Keyboard.dismiss()
    if (this.validationForm()) {
      return onSignIn()
        .then(() => this.isLogin())
        .catch(err => {
          throw err
        })
    }
  }

  render () {
    return (
      <KeyboardAvoidingView
        style={container}
        behavior='position'
        keyboardVerticalOffset={-250}>
        {this.state.isLoading ? <ActivityIndicator size="large" color="#0000ff"/> : <View style={containerMargin}>
          <Text style={titleOne}>Iniciar sesión</Text>
          <InputTextComponent label='Usuario'
                              placeHolder='Ingrese usuario'
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
          />

          <InputTextComponent label='Contraseña'
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
          />
          <Text>{`\n`}</Text>
          <Button title='Entrar' style={{ marginTop: 2 }} onPress={this.submitForm}
                  disabled={this.state.buttonSubmit}/>
          <Text style={forGot} onPress={() => this.props.navigation.navigate('ForgotPassword')}>
            Recuperar contraseña?
          </Text>
        </View>}
      </KeyboardAvoidingView>
    )
  }
}

export default LoginComponent
