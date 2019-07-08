import React from 'react'
import { View, ScrollView, ActivityIndicator, Alert, AlertIos, Platform } from 'react-native'
import { Button, Text } from 'react-native-elements'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Row, Col, Grid } from 'react-native-easy-grid'
import { container, table } from '../../../assets/Styles'
import Toast, { DURATION } from 'react-native-easy-toast'

export default class ExpensesHistoryComponent extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      expenses: [],
      isLoading: true,
      expenseId: null
    }
  }

  deleteModal (id) {
    if (Platform.OS === 'android') {
      Alert.alert('Eliminar usuario',
        '¿Seguro que quiere eliminar a este usuario?',
        [
          { text: 'CANCELAR', style: 'cancel' },
          { text: 'ELIMINAR', onPress: () => this.deleteExpense(id) }
        ]
      )
    }
  }

  deleteExpense (id) {
    this.refs.toast.show('Se ha eliminado ' + id + ' !')
  }

  getExpenses () {
    this.setState({
      expenses: [
        {
          id: 1,
          promotion: 'Promoción 1',
          line: 'Línea 1',
          date: '02-02-2019',
          promoter: 'David Moral',
          amount: 'GTQ 2000.00',
          state: 'Pendiente'
        },
        {
          id: 2,
          promotion: 'Promoción 1',
          line: 'Línea 1',
          date: '02-02-2019',
          promoter: 'David Moral',
          amount: 'GTQ 2000.00',
          state: 'Pendiente'
        },
        {
          id: 3,
          promotion: 'Promoción 1',
          line: 'Línea 1',
          date: '02-02-2019',
          promoter: 'David Moral',
          amount: 'GTQ 2000.00',
          state: 'Pendiente'
        },
        {
          id: 4,
          promotion: 'Promoción 1',
          line: 'Línea 1',
          date: '02-02-2019',
          promoter: 'David Moral',
          amount: 'GTQ 2000.00',
          state: 'Pendiente'
        }
      ]
    })
    this.setState({ isLoading: false })
  }

  componentDidMount () {
    return this.getExpenses()
  }

  createExpense = () => {}

  render () {
    const items = this.state.expenses
    return (
      <Grid style={{ paddingTop: 5, paddingLeft: 5, paddingRight: 5 }}>
        <Toast ref="toast"/>
        <Col>
          <Row size={10}>
            <Col size={70}>
              <Text h3>Gestión de gastos</Text>
            </Col>
            <Col size={30}>
              <Button onPress={this.createExpense} buttonStyle={{ width: 50 }} icon={
                <Ionicons name='md-add' size={30}/>
              }></Button>
            </Col>
          </Row>
          <Row size={90} style={{ paddingTop: 35 }}>
            {this.state.isLoading ? <View style={container}><ActivityIndicator size="large" color="#0000ff"/></View> :
              <ScrollView>
                {items.length > 0 ?
                  <ScrollView horizontal={true} style={{ borderWidth: 1 }}>
                    <Col size={100}>
                      <View>
                        <Row style={{ borderBottomWidth: 1 }}>
                          <Col style={{ width: 150 }}><Text style={{ fontWeight: 'bold' }}>Promoción</Text></Col>
                          <Col style={{ width: 150 }}><Text style={{ fontWeight: 'bold' }}>Línea</Text></Col>
                          <Col style={{ width: 150 }}><Text style={{ fontWeight: 'bold' }}>Fecha</Text></Col>
                          <Col style={{ width: 150 }}><Text style={{ fontWeight: 'bold' }}>Promotor</Text></Col>
                          <Col style={{ width: 120 }}><Text style={{ fontWeight: 'bold' }}>Monto</Text></Col>
                          <Col style={{ width: 120 }}><Text style={{ fontWeight: 'bold' }}>Estado</Text></Col>
                          <Col style={{ width: 100 }}><Text> </Text></Col>
                        </Row>
                      </View>
                      <View>
                        {items.map(item => (
                          <Row key={item.id}>
                            <Col style={{ width: 150 }}><Text>{item.promotion}</Text></Col>
                            <Col style={{ width: 150 }}><Text>{item.line}</Text></Col>
                            <Col style={{ width: 150 }}><Text>{item.date}</Text></Col>
                            <Col style={{ width: 150 }}><Text>{item.promoter}</Text></Col>
                            <Col style={{ width: 120 }}><Text>{item.amount}</Text></Col>
                            <Col style={{ width: 120 }}><Text>{item.state}</Text></Col>
                            <Col style={{ width: 100 }}>
                              <Button onPress={this.createExpense}
                                      buttonStyle={{ width: 50, backgroundColor: '#F7DC6F' }} icon={
                                <Ionicons name='md-information' size={30}/>
                              }></Button>
                            </Col>
                          </Row>
                        ))}
                      </View>
                    </Col>
                  </ScrollView>
                  : <Text>No hay gastos registrados</Text>
                }
              </ScrollView>
            }
          </Row>
        </Col>
      </Grid>
    )
  }
}
