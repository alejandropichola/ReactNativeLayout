import React, { Component } from 'react'
import { Platform, StyleSheet, Text, View, Dimensions } from 'react-native'
import FusionCharts from 'react-native-fusioncharts'

export default class ChartComponent extends Component {
  constructor (props) {
    super(props)

    this.state = {
      type: 'line',
      width: (Dimensions.get('window').width * 0.93),
      height: (Dimensions.get('window').width * 0.6),
      dataFormat: 'json',
      dataSource: {
        'chart': {
          'caption': 'Countries With Most Oil Reserves [2017-18]',
          'xAxisName': 'Country',
          'yAxisName': 'Reserves (MMbbl)',
          'numberSuffix': '$',
          'connectNullData': '1',
          'theme': 'fusion'
        },
        'data': [{
          'label': 'Venezuela',
          'value': '290'
        }, {
          'label': 'Saudi',
          'value': null
        }, {
          'label': 'Canada',
          'value': '180'
        }, {
          'label': 'Iran',
          'value': '140'
        }, {
          'label': 'Russia',
          'value': '115'
        }, {
          'label': 'UAE',
          'value': '100'
        }, {
          'label': 'US',
          'value': '30'
        }, {
          'label': 'China',
          'value': '30'
        }]
      }
    }
    this.libraryPath = Platform.select({
      // Specify fusioncharts.html file location
      android: {
        uri: 'file:///android_asset/fusioncharts.html'
      }//,
      //ios: require('./assets/fusioncharts.html')
    })
  }

  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>A Column 2D Chart</Text>
        <View style={styles.chartContainer}>
          <FusionCharts
            type={this.state.type}
            width={this.state.width}
            height={this.state.height}
            dataFormat={this.state.dataFormat}
            dataSource={this.state.dataSource}
            libraryPath={this.libraryPath} // set the libraryPath property
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10
  },
  header: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    paddingBottom: 10
  },
  chartContainer: {
    height: (Dimensions.get('window').width * 0.6),
    borderColor: '#000',
    borderWidth: 1
  }
})
