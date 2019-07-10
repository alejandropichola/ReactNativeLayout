import React from 'react'
import { View, ScrollView, ActivityIndicator, Alert, AlertIos, Platform } from 'react-native'
import { Button, ListItem, Text } from 'react-native-elements'
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

  createExpense = () => {
    this.props.navigation.navigate('create')
  }
  expensesAction(item) {
    console.warn(item)
  }
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
              <Col>
                {items.map(item => (
                <ListItem key={item.id}
                          title={item.promotion}
                          subtitle={item.date}
                          bottomDivider={true}
                          rightIcon={
                            <Ionicons name={'md-arrow-dropright'} size={30}/>
                          }
                          onPress={() => this.expensesAction(item.id)}/>
                ))}
              </Col>
            }
          </Row>
        </Col>
      </Grid>
    )
  }
}
