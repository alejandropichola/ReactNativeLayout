import React from 'react'
import { View, Picker, KeyboardAvoidingView } from 'react-native'
import { Text, Button } from 'react-native-elements'
import { container, inputIOS, inputAndroid, select } from '../../../assets/Styles'
import DatePicker from 'react-native-datepicker'
import { HelperText, TextInput } from 'react-native-paper'
import { Grid, Col, Row } from 'react-native-easy-grid'
import { containerLogin } from '../../../assets/Login'

export default class ExpensesItem2Component extends React.Component {
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
    this.props.navigation.navigate('createItem3')
  }

  back () {
    if (this.state.view > 1) {
      const counter = this.state.view
      this.setState({
        view: (counter - 1),
        date: '2016-05-15'
      })
    }
  }

  componentDidMount (): void {
    this.back()
  }

  render () {
    return (
      <KeyboardAvoidingView>
        <View>
          <View style={containerLogin} size={50}>
            <Text>Promoción</Text>
            <Picker selectedValue={this.state.expenseType}
                    onValueChange={(itemValue, index) => {
                      this.setState({ expenseType: itemValue })
                    }}
            >
              <Picker.Item label='Promoción 1' value={1}></Picker.Item>
              <Picker.Item label='Promoción 2' value={2}></Picker.Item>
            </Picker>
          </View>
          <View style={containerLogin} size={50}>
            <View>
              <Text>Fecha</Text>
            </View>
            <View>
              <DatePicker
                date={this.state.date}
                mode="date"
                placeholder="Seleccionar fecha"
                format="DD-MM-YYYY"
                confirmBtnText="Confirmar"
                cancelBtnText="Cancelar"
                customStyles={{
                  dateIcon: {
                    position: 'absolute',
                    left: 0,
                    top: 4,
                    marginLeft: 0
                  },
                  dateInput: {
                    marginLeft: 36
                  }
                  // ... You can check the source to find the other keys.
                }}
                onDateChange={(date) => {this.setState({ date: date })}}
              />
            </View>
          </View>
        </View>
        <View size={10}>
          <View>
            <Button buttonStyle={{ backgroundColor: '#27b185' }} onPress={() => this.next()}
                    title='Siguiente'/>
          </View>
        </View>
      </KeyboardAvoidingView>
    )
  }
}
