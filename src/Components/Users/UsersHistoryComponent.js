import React from 'react'
import { View, ScrollView, ActivityIndicator, Alert, AlertIOS, Platform } from 'react-native'
import { Button, Text } from 'react-native-elements'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Row, Col, Grid } from 'react-native-easy-grid'
import { DataTable } from 'react-native-paper'
import { container } from '../../../assets/Styles'
import Toast, { DURATION } from 'react-native-easy-toast'
import { getUser } from '../../Services/modules/Users'

export default class UsersHistoryComponent extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      users: [],
      isLoading: true,
      userId: null
    }
  }

  deleteModal (id) {
    if (Platform.OS === 'android') {
      Alert.alert('Eliminar usuario',
        '¿Seguro que quiere eliminar a este usuario?',
        [
          { text: 'CANCELAR', style: 'cancel' },
          { text: 'ELIMINAR', onPress: () => this.deleteUser(id) }
        ]
      )
    }
  }

  deleteUser (id) {
    this.refs.toast.show('Se ha eliminado ' + id + ' !')
  }

  createUser = () => {
    this.props.navigation.navigate('CreateUser')
  }

  getUsers () {
    this.setState({
      users: [{
        id: 1,
        firstName: 'Maiver alejandro',
        lastName: 'Pichola',
        email: 'g4alejandro29@gmail.com',
        gender: 'Masculino',
        age: '03-03-1997'
      }]
    })
    this.setState({ isLoading: false })

    /*return getUser()
      .then((response) => {
        this.setState({ isLoading: false })
        this.setState({ users: response })
      })
      .catch(err => {
        console.error(err)
      })*/
  }

  componentDidMount () {
    return this.getUsers()
  }

  render () {
    const items = this.state.users
    return (
      <Grid style={{ paddingTop: 5, paddingLeft: 5, paddingRight: 5 }}>
        <Toast ref="toast"/>
        <Col>
          <Row size={10}>
            <Col>
              <Text h3>Historial usuario</Text>
            </Col>
            <Col>
              <Button onPress={this.createUser} buttonStyle={{ width: 50 }} icon={
                <Ionicons name='md-add' size={30}/>
              }></Button>
            </Col>
          </Row>
          <Row size={90} style={{ paddingTop: 35 }}>
            {this.state.isLoading ? <View style={container}><ActivityIndicator size="large" color="#0000ff"/></View> :
              <ScrollView>
                <View>
                  {items.length > 0 ?
                    <DataTable>
                      <DataTable.Header>
                        <DataTable.Title style={{ width: 150 }}>Nombre</DataTable.Title>
                        <DataTable.Title style={{ width: 150 }}>Apellido</DataTable.Title>
                        <DataTable.Title style={{ width: 150 }}>Genero</DataTable.Title>
                        <DataTable.Title></DataTable.Title>
                      </DataTable.Header>

                      {items.map(item => (

                        <DataTable.Row key={item.id}>
                          <DataTable.Cell style={{ width: 150 }}>{item.firstName}</DataTable.Cell>
                          <DataTable.Cell style={{ width: 150 }}>{item.lastName}</DataTable.Cell>
                          <DataTable.Cell style={{ width: 150 }}>{item.gender}</DataTable.Cell>
                          <DataTable.Cell>
                            <Ionicons onPress={() => this.deleteModal(item.id)} name='md-trash' size={25}/>
                            <Ionicons name='md-information'
                                      size={35}
                                      onPress={() => this.deleteModal(item.id)}/></DataTable.Cell>
                        </DataTable.Row>
                      ))}

                      <DataTable.Pagination
                        page={1}
                        numberOfPages={3}
                        onPageChange={(page) => { console.log(page) }}
                        label="1-2 of 6"
                      />
                    </DataTable> :
                    <Text>No hay usuario registrados</Text>
                  }
                </View>
              </ScrollView>
            }
          </Row>
        </Col>
      </Grid>
    )
  }
}
