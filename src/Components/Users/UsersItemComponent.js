import React from 'react'
import { View, ScrollView } from 'react-native'
import {Text} from 'react-native-elements'

export default class UsersItemComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state={
      userId: null
    }
  }
  componentDidMount = () => {
    const userId = this.props.navigation.state.params.userId;
    this.setState({userId: userId})
  }

  render () {
    const userId = this.state.userId
    return (
      <View>
        {userId ? <Text h2>Modificar usuario</Text> : <Text h2>Crear Usuario</Text> }
      </View>
    )
  }
}
