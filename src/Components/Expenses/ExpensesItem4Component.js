import React from 'react'
import { View, Picker } from 'react-native'
import { Text, Button, Input } from 'react-native-elements'
import { container, inputIOS, inputAndroid, select } from '../../../assets/Styles'
import datePicker from 'react-native-datepicker'
import { HelperText, TextInput } from 'react-native-paper'
import { Grid, Col, Row } from 'react-native-easy-grid'
import { containerLogin } from '../../../assets/Login'

export default class ExpensesItem4Component extends React.Component {
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
    this.props.navigation.navigate('createItemCam')
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
              <Input label='No. Documento'
                     value={this.state.expenseType}
                     theme={{ colors: { background: 'transparent' } }}
                     error={(this.state.expenseType !== null && this.state.expenseType.length <= 0)}
                     onChangeText={expenseType => this.setState({ expenseType })}
                     placeholder='Ingresar No. Documento'/>
            </Col>
            <Col style={containerLogin} size={50}>
              <Input label='Tipo de Gasto'
                     value={this.state.line}
                     theme={{ colors: { background: 'transparent' } }}
                     error={(this.state.line !== null && this.state.line.length <= 0)}
                     onChangeText={line => this.setState({ line })}
                     placeholder='Ingresar tipo de gasto'/>
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
