import React from 'react'
import { View, ScrollView } from 'react-native'
import { Text } from 'react-native-elements'
import { HelperText, TextInput } from 'react-native-paper'
import { containerMargin } from '../../../assets/Styles'

export default class UsersItemComponent extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      userId: null,
      firstName: null,
      lastName: null,
      email: null,
      birthDate: null,
      gender: 1
    }
  }

  getUserId = () => {
    const state = this.props.navigation.state || {}
    const params = state ? state.params : {}
    const userId = params ? params.userId : null
    this.setState({ userId: userId })
  }
  componentDidMount = () => {
    this.getUserId()
  }

  render () {
    const userId = this.state.userId
    return (
      <View>
        {userId ? <Text h2>Modificar usuario</Text> : <Text h2>Crear Usuario</Text>}
        <ScrollView style={containerMargin}>
          <TextInput label='Nombres'
                     value={this.state.firstName}
                     theme={{ colors: { background: 'transparent' } }}
                     error={(this.state.firstName !== null && this.state.firstName.length <= 0)}
                     onChangeText={firstName => this.setState({ firstName })}
                     placeholder='Ingresar nombre'/>
          <HelperText type="error"
                      visible={(this.state.firstName !== null && this.state.firstName.length <= 0)}>Nombre requerido</HelperText>
          <Text>{this.state.firstName}</Text>
        </ScrollView>
      </View>
    )
  }
}
