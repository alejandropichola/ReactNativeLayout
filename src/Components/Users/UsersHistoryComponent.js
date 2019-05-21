import React from 'react'
import { View, ScrollView } from 'react-native'
import { Button, Text } from 'react-native-elements'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Row, Col, Grid } from 'react-native-easy-grid'

export default class UsersHistoryComponent extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      header: ['Nombre', 'Apellidos', 'Edad', 'Correo', 'Telefono'],
      users: [
        { Id: '1', Nombre: 'Maiver', Apellido: 'Pichola', Edad: '', Email: 'g4alejandro29', Phone: '31583408' }
      ]
    }
  }

  createUser () {

  }

  getUsers () {
    return fetch('https://jsonplaceholder.typicode.com/users', {
      method: 'GET'
    })
      .then((response) => {
        console.warn(response)
      })
  }

  componentDidMount () {
    return this.getUsers()
  }

  render () {
    const state = this.state
    return (
      <Grid style={{ paddingTop: 5, paddingLeft: 5, paddingRight: 5 }}>
        <Col>
          <Row size={10}>
            <Col>
              <Text h3>Historial usuario</Text>
            </Col>
            <Col>
              <Button buttonStyle={{ width: 50 }} icon={
                <Ionicons name='md-add' size={30}/>
              }></Button>
            </Col>
          </Row>
          <Row size={90}>
            <ScrollView horizontal={true}>
              <View>

              </View>
            </ScrollView>
          </Row>
        </Col>
      </Grid>
    )
  }
}
