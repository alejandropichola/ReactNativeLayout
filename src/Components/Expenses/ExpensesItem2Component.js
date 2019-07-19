import React from 'react'
import { View, Picker, KeyboardAvoidingView } from 'react-native'
import { Text, Button } from 'react-native-elements'
import { container, inputIOS, inputAndroid, select } from '../../../assets/Styles'
import DatePicker from 'react-native-datepicker'
import { containerLogin, heightInput } from '../../../assets/Login'
import InputTextDarkComponent from '../Common/InputTextDarkComponent'
import InputSelectComponent from '../Common/InputSelectComponent'
import moment from 'moment'

export default class ExpensesItem2Component extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      expenseType: null,
      line: null,
      promotion: null,
      provider: null,
      providerSearch: null,
      typeExpense: null,
      conceptExpense: null,
      view: 1,
      date: moment().format('DD-MM-YYYY'),
      promotions: ['Promoción 1', 'Promoción 2', 'Promoción 3']
    }
  }

  next () {
    this.props.navigation.navigate('createItemCam')
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
      <KeyboardAvoidingView style={{flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        marginLeft: 10,
        marginRight: 10,}}>
        <View style={{
          width: '100%',
          padding: 4
        }}>
          <Text h2>Detalle de pago</Text>
          <View style={{ paddingLeft: 7 }}>
            <Text style={{ color: primary }}>Forma de pago</Text>
          </View>
          <View style={{ borderBottomWidth: 2, borderColor: primary }}>
            <Picker selectedValue={this.state.promotion}
                    onValueChange={(promotion, index) => {
                      this.setState({ promotion })
                    }}
            >
              <Picker.Item label='Efectivo' value={1}/>
              <Picker.Item label='Tarjeta Crédito/Débito' value={2}/>
              <Picker.Item label='Cheque' value={3}/>
            </Picker>
          </View>
          <InputTextDarkComponent
            label='Beneficiario'
            placeHolder='Ingrese el beneficiario'
            note=''
            onChangeText={(providerSearch) => this.setState({ providerSearch })}
            value={this.state.providerSearch}
          />
          {
            (this.state.provider && this.state.provider.length > 0) ?
              <View style={{ paddingLeft: 7 }}>
                <Text style={{ color: primary }}>Promoción</Text>
              </View> : null
          }
          <View style={{ paddingLeft: 7 }}>
            <Text style={{ color: primary }}>Tipo de gasto</Text>
          </View>
          <View style={{ borderBottomWidth: 2, borderColor: primary }}>
            <Picker selectedValue={this.state.typeExpense}
                    onValueChange={(typeExpense, index) => {
                      this.setState({ typeExpense })
                    }}
            >
              <Picker.Item label='Prueba' value={1}/>
            </Picker>
          </View>
          <InputTextDarkComponent
            label='Concepto gasto'
            placeHolder='Ingrese el concepto de gasto'
            note=''
            onChangeText={(conceptExpense) => this.setState({ conceptExpense })}
            value={this.state.conceptExpense}
          />
          <View style={{marginTop: 10}}>
            <Button buttonStyle={{ backgroundColor: primary }}
                    onPress={() => this.next()}

                    title='Siguiente'/>
          </View>
        </View>
      </KeyboardAvoidingView>
    )
  }
}
