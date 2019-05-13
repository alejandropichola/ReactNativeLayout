import React from 'react'
import { View, Button, Text, Keyboard, KeyboardAvoidingView } from 'react-native'
import InputTextComponent from './Common/InputTextComponent'
import { container, containerMargin, titleOne } from '../../assets/Styles'

class ForgotPasswordComponent extends React.Component {
  constructor(props) {
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
        keyboardVerticalOffset={-25}>
        <View style={containerMargin}>
          <Text style={titleOne}>Recuperar contraseña</Text>
          <InputTextComponent label='Correo'
                              onChangeText={(email) => this.setState({email})}
                              value={this.props.email}
                              placeHolder='Ingrese correo'
                              secure={false}
                              iconLeft='md-mail'
                              sizeIcon={18}
          />
          <Text>{`\n`}</Text>
          <Button title='Enviar' onPress={this.forgotPass}></Button>
        </View>
      </KeyboardAvoidingView>
    )
  }
}

export default ForgotPasswordComponent