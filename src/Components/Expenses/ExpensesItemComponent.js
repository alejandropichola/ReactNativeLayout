import React from 'react'
import { View, Picker } from 'react-native'
import { Text, Button } from 'react-native-elements'
import { container, inputIOS, inputAndroid, select } from '../../../assets/Styles'
import datePicker from 'react-native-datepicker'
import { HelperText, TextInput } from 'react-native-paper'
import { Grid, Col, Row } from 'react-native-easy-grid'
import { containerLogin } from '../../../assets/Login'

export default class ExpensesItemComponent extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      expenseType: null,
      line: null,
      promotion: null,
      expenses: [],
      lines: [],
      promotions: [],
      view: 1,
    }
  }

  next () {
    this.props.navigation.navigate('createItem2')
  }

  back () {
    if (this.state.view > 1) {
      const counter = this.state.view
      this.setState({ view: (counter - 1) })
    }
  }

  render () {
    return (
      <Grid>
        <View></View>
        <Col style={containerLogin}>
          <Row size={30}>
            <Col style={containerLogin} size={50}>
              <Text>Tipo de pago</Text>
              <Picker selectedValue={this.state.expenseType}
                      onValueChange={(itemValue, index) => {
                        this.setState({ expenseType: itemValue })
                      }}
              >
                <Picker.Item label='Efectivo' value={1}></Picker.Item>
                <Picker.Item label='Tarjeta de Crédito/Dévito' value={2}></Picker.Item>
                <Picker.Item label='Cheque' value={3}></Picker.Item>
              </Picker>
            </Col>
            <Col style={containerLogin} size={50}>
              <Text>Línea</Text>
              <Picker selectedValue={this.state.line}
                      onValueChange={(itemValue, index) => {
                        this.setState({ line: itemValue })
                      }}
                      style={select}
              >
                <Picker.Item label='Ningúna' value={1}></Picker.Item>
                <Picker.Item label='Línea 1' value={2}></Picker.Item>
                <Picker.Item label='Línea 2' value={3}></Picker.Item>
              </Picker>
            </Col>
          </Row>
          <Row size={10}>
            <Col>
              <Button buttonStyle={{ backgroundColor: '#27b185' }} onPress={() => this.next()}
                      title='Siguiente'></Button>
            </Col>
          </Row>
        </Col>
      </Grid>
    )
  }
}
