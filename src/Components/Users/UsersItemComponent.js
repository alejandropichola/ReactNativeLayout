import React from 'react'
import { View, ScrollView } from 'react-native'
import { Text } from 'react-native-elements'

export default class UsersItemComponent extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      userId: null
    }
  }

  getUserId = () => {
    const state = this.props.navigation.state || {}
    const params = state ? state.params : {}
    const userId = params ? params.userId : null
    this.setState({userId: userId})
  }
  componentDidMount = () => {
    this.getUserId()
  }

  render () {
    const userId = this.state.userId
    return (
      <View>
        {userId ? <Text h2>Modificar usuario</Text> : <Text h2>Crear Usuario</Text>}
      </View>
    )
  }
}
