import React from 'react'
import { View, ScrollView, ActivityIndicator, Alert, AlertIos, Platform } from 'react-native'
import { Button, ListItem, Text } from 'react-native-elements'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Row, Col, Grid } from 'react-native-easy-grid'
import { container, table } from '../../../assets/Styles'
import Toast, { DURATION } from 'react-native-easy-toast'
import ListDetailComponent from '../Common/ListDetailComponent'

export default class PromotionsHistoryComponent extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      promotions: []
    }
  }

  getPromotions () {
    this.setState({
      promotions: [
        {
          id: 1,
          promotion: 'Promoción 1',
          amount: 'Monto disponible GTQ 0.00',
          detailHeader: ['Vigencia', 'Estado', 'Monto disponible', 'Monto asignado', 'Monto ejecutado', 'Presupuesto'],
          detailBody: ['01-01-2019 - 31-12-2019', 'Activa', 'GTQ 0.00', 'GTQ 1000.00', 'GTQ 1000.00', 'GTQ 1000.00']
        },
        {
          id: 2,
          promotion: 'Promoción 2',
          amount: 'Monto disponible GTQ 0.00',
          detailHeader: ['Vigencia', 'Estado', 'Monto disponible', 'Monto asignado', 'Monto ejecutado', 'Presupuesto'],
          detailBody: ['02-02-2019 - 31-12-2019', 'Activa', 'GTQ 0.00', 'GTQ 2000.00', 'GTQ 2000.00', 'GTQ 2000.00']
        },
        {
          id: 3,
          promotion: 'Promoción 3',
          amount: 'Monto disponible GTQ 0.00',
          detailHeader: ['Vigencia', 'Estado', 'Monto disponible', 'Monto asignado', 'Monto ejecutado', 'Presupuesto'],
          detailBody: ['03-03-2019 - 31-12-2019', 'Activa', 'GTQ 0.00', 'GTQ 3000.00', 'GTQ 3000.00', 'GTQ 3000.00']
        },
        {
          id: 4,
          promotion: 'Promoción 4',
          amount: 'Monto disponible GTQ 0.00',
          detailHeader: ['Vigencia', 'Estado', 'Monto disponible', 'Monto asignado', 'Monto ejecutado', 'Presupuesto'],
          detailBody: ['04-04-2019 - 31-12-2019', 'Activa', 'GTQ 0.00', 'GTQ 4000.00', 'GTQ 4000.00', 'GTQ 4000.00']
        },
        {
          id: 5,
          promotion: 'Promoción 1',
          amount: 'Monto disponible GTQ 0.00',
          detailHeader: ['Vigencia', 'Estado', 'Monto disponible', 'Monto asignado', 'Monto ejecutado', 'Presupuesto'],
          detailBody: ['01-01-2019 - 31-12-2019', 'Activa', 'GTQ 0.00', 'GTQ 1000.00', 'GTQ 1000.00', 'GTQ 1000.00']
        },
        {
          id: 6,
          promotion: 'Promoción 2',
          amount: 'Monto disponible GTQ 0.00',
          detailHeader: ['Vigencia', 'Estado', 'Monto disponible', 'Monto asignado', 'Monto ejecutado', 'Presupuesto'],
          detailBody: ['02-02-2019 - 31-12-2019', 'Activa', 'GTQ 0.00', 'GTQ 2000.00', 'GTQ 2000.00', 'GTQ 2000.00']
        },
        {
          id: 7,
          promotion: 'Promoción 3',
          amount: 'Monto disponible GTQ 0.00',
          detailHeader: ['Vigencia', 'Estado', 'Monto disponible', 'Monto asignado', 'Monto ejecutado', 'Presupuesto'],
          detailBody: ['03-03-2019 - 31-12-2019', 'Activa', 'GTQ 0.00', 'GTQ 3000.00', 'GTQ 3000.00', 'GTQ 3000.00']
        },
        {
          id: 8,
          promotion: 'Promoción 4',
          amount: 'Monto disponible GTQ 0.00',
          detailHeader: ['Vigencia', 'Estado', 'Monto disponible', 'Monto asignado', 'Monto ejecutado', 'Presupuesto'],
          detailBody: ['04-04-2019 - 31-12-2019', 'Activa', 'GTQ 0.00', 'GTQ 4000.00', 'GTQ 4000.00', 'GTQ 4000.00']
        },
        {
          id: 9,
          promotion: 'Promoción 1',
          amount: 'Monto disponible GTQ 0.00',
          detailHeader: ['Vigencia', 'Estado', 'Monto disponible', 'Monto asignado', 'Monto ejecutado', 'Presupuesto'],
          detailBody: ['01-01-2019 - 31-12-2019', 'Activa', 'GTQ 0.00', 'GTQ 1000.00', 'GTQ 1000.00', 'GTQ 1000.00']
        },
        {
          id: 10,
          promotion: 'Promoción 2',
          amount: 'Monto disponible GTQ 0.00',
          detailHeader: ['Vigencia', 'Estado', 'Monto disponible', 'Monto asignado', 'Monto ejecutado', 'Presupuesto'],
          detailBody: ['02-02-2019 - 31-12-2019', 'Activa', 'GTQ 0.00', 'GTQ 2000.00', 'GTQ 2000.00', 'GTQ 2000.00']
        },
        {
          id: 11,
          promotion: 'Promoción 3',
          amount: 'Monto disponible GTQ 0.00',
          detailHeader: ['Vigencia', 'Estado', 'Monto disponible', 'Monto asignado', 'Monto ejecutado', 'Presupuesto'],
          detailBody: ['03-03-2019 - 31-12-2019', 'Activa', 'GTQ 0.00', 'GTQ 3000.00', 'GTQ 3000.00', 'GTQ 3000.00']
        },
        {
          id: 12,
          promotion: 'Promoción 4',
          amount: 'Monto disponible GTQ 0.00',
          detailHeader: ['Vigencia', 'Estado', 'Monto disponible', 'Monto asignado', 'Monto ejecutado', 'Presupuesto'],
          detailBody: ['04-04-2019 - 31-12-2019', 'Activa', 'GTQ 0.00', 'GTQ 4000.00', 'GTQ 4000.00', 'GTQ 4000.00']
        }
      ]
    })
    this.setState({ isLoading: false })
  }

  AuthPromotion = () => {

  }

  managementPromotion = () => {

  }

  componentDidMount () {
    this.getPromotions()
  }

  createPromotion = () => {
    this.props.navigation.navigate('createItem')
  }

  render () {
    const items = this.state.promotions
    return (
      <Grid style={{ paddingTop: 5, paddingLeft: 5, paddingRight: 5 }}>
        <Toast ref="toast"/>
        <Col>
          <Row size={10}>
            <Col size={70}>
              <Text h3>Promociones</Text>
            </Col>
            <Col size={30}>

            </Col>
          </Row>
          <Row size={90} style={{ paddingTop: 35 }}>
            {this.state.isLoading ? <View style={container}><ActivityIndicator size="large" color="#0000ff"/></View> :
              <Col>
                <ScrollView>
                  {
                    items.map(item => (
                      <ListDetailComponent title={item.promotion}
                                           subtitle={item.amount}
                                           heightBody='{ height: 150 }'
                                           detailHeader={item.detailHeader}
                                           detailBody={item.detailBody}
                                           widthHeader={50}
                                           heightRow={30}
                                           key={item.id}/>
                    ))
                  }

                </ScrollView>
              </Col>
            }
          </Row>
        </Col>
      </Grid>
    )
  }
}
