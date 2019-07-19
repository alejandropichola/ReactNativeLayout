import React from 'react'
import { View, Picker, KeyboardAvoidingView } from 'react-native'
import { container, inputIOS, inputAndroid, select, primary } from '../../../assets/Styles'
import DatePicker from 'react-native-datepicker'
import { containerLogin, heightInput } from '../../../assets/Login'
import InputTextDarkComponent from '../Common/InputTextDarkComponent'
import InputSelectComponent from '../Common/InputSelectComponent'
import { Button, Text } from 'react-native-elements'
import moment from 'moment'

export default class ExpensesItemComponent extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      promotion: null,
      provider: null,
      providerSearch: null,
      view: 1,
      date: moment().format('DD-MM-YYYY'),
      promotions: ['Promoción 1', 'Promoción 2', 'Promoción 3']
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
      <KeyboardAvoidingView style={{flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        marginLeft: 10,
        marginRight: 10,}}>
        <View style={{
          width: '100%',
          padding: 4
        }}>
          <Text h2>Información General</Text>
          <View style={{ paddingLeft: 7 }}>
            <Text style={{ color: primary }}>Promoción</Text>
          </View>
          <View style={{ borderBottomWidth: 2, borderColor: primary }}>
            <Picker selectedValue={this.state.promotion}
                    onValueChange={(promotion, index) => {
                      this.setState({ promotion })
                    }}
            >
              <Picker.Item label='Promoción 1' value={1}></Picker.Item>
              <Picker.Item label='Promoción 2' value={2}></Picker.Item>
            </Picker>
          </View>
          <InputTextDarkComponent
            label='Proveedor'
            placeHolder='Ingrese el codigo del proveedor'
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
          <View>
            <DatePicker
              style={{ width: '100%' }}
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
