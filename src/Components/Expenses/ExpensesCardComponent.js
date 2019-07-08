import React from 'react'
import { View } from 'react-native'
import { ListItem } from 'react-native-elements'
import { Grid, Col, Row } from 'react-native-easy-grid'

export default class ExpensesCardComponent extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      options: []
    }
  }

  getOptions () {
    this.setState({
      options: [
        { id: 1, name: 'Promociones abiertas' },
        { id: 2, name: 'Avance de cumplimiento sobre objetivo de ventas' }
      ]
    })
  }

  componentDidMount () {
    return this.getOptions()
  }
  keyExtractor = (item, index) => index.toString()

  renderItem=({item}) => (
    <ListItem title={item.name}/>
  )
  render () {
    return (
      <View>
        <FlatList KeyExtractor={this.keyExtractor} data={options} renderItem={this.renderItem}/>
      </View>
    )
  }
}
