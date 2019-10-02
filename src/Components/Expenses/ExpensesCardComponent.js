import React from 'react'
import { View } from 'react-native'
import { ListItem } from 'react-native-elements'
import Ionicons from 'react-native-vector-icons/Ionicons'

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
        { id: 1, name: 'Por Promociones' },
        { id: 2, name: 'Por Area Comercial' }
      ]
    })
  }

  componentDidMount () {
    return this.getOptions()
  }
  optionRoute(route) {
    console.warn(route)
  }
  render () {
    const optionItems = this.state.options
    return (
      <View>
        {
          optionItems.map(item => (
            <ListItem key={item.id}
                      title={item.name}
                      bottomDivider={true}
                      rightIcon={
                        <Ionicons name={'md-arrow-dropright'} size={30}/>
                      }
                      onPress={() => this.optionRoute(item.id)}/>
          ))
        }
      </View>
    )
  }
}
