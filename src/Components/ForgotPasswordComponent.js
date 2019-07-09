import React from 'react'
import { View, Button, Text, Keyboard, KeyboardAvoidingView, ImageBackground } from 'react-native'
import InputTextComponent from './Common/InputTextComponent'
import { container, containerMargin, titleOne } from '../../assets/Styles'
import { containerLogin } from '../../assets/Login'

class ForgotPasswordComponent extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      email: null
    }
  }

  forgotPass () {
    Keyboard.dismiss()
  }

  render () {
    return (
      <KeyboardAvoidingView
        style={container}
        behavior='position'
        keyboardVerticalOffset={-300}>
        <ImageBackground source={require('../../assets/images/home-bkg1-tab.jpg')}
                         imageStyle={{ resizeMode: 'cover' }}
                         style={{ width: '100%', height: '100%' }}>
          <View style={containerLogin}>
            <Text style={titleOne}>Recuperar contraseña</Text>
            <InputTextComponent label='Correo'
                                onChangeText={(email) => this.setState({ email })}
                                value={this.props.email}
                                placeHolder='Ingrese correo'
                                secure={false}
                                iconLeft='md-mail'
                                sizeIcon={18}
            />
            <Text>{`\n`}</Text>
            <Button title='Enviar' onPress={this.forgotPass}></Button>
          </View>
        </ImageBackground>
      </KeyboardAvoidingView>
    )
  }
}

export default ForgotPasswordComponent
