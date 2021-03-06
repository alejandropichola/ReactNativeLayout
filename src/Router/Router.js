import React from 'react'
import { StyleSheet, Image, View, TouchableOpacity, Alert } from 'react-native'
import {
  createDrawerNavigator,
  createStackNavigator,
  createAppContainer,
  createSwitchNavigator
} from 'react-navigation'
import {primary} from '../../assets/Styles'
import Ionicons from 'react-native-vector-icons/Ionicons'
import HomeComponent from '../Components/HomeComponent'
import LoginComponent from '../Components/LoginComponent'
import LogOutComponent from '../Components/LogOutComponent'
import ForgotPasswordComponent from '../Components/ForgotPasswordComponent'
import FormCamComponent from '../Components/FormCamComponent'
import { isSignedIn, onSignOut } from '../Services/SESSION'
import OfflineNoticeComponent from '../Components/OfflineNoticeComponent'
import ExpensesHistoryComponent from '../Components/Expenses/ExpensesHistoryComponent'
import ExpensesItemComponent from '../Components/Expenses/ExpensesItemComponent'
import ExpensesItem2Component from '../Components/Expenses/ExpensesItem2Component'
import ExpensesItem3Component from '../Components/Expenses/ExpensesItem3Component'
import ExpensesItem4Component from '../Components/Expenses/ExpensesItem4Component'
import ExpensesItemCamComponent from '../Components/Expenses/ExpensesItemCamComponent'

import PromotionsHistoryComponent from '../Components/Promotions/PromotionsHistoryComponent'
import PromotionsItemComponent from '../Components/Promotions/PromotionItemComponent'
const contentOption = {
  activeLabelStyle: '#00935e'
}

class NavigationDrawerStructure extends React.Component {
  constructor (props) {
    super(props)
  }

  login = async () => {
    await onSignOut()
    return await isSignedIn()
  }
  toggleDrawer = () => {
    this.props.navigationProps.toggleDrawer()
  }

  render () {
    return (
      <View>
        <OfflineNoticeComponent/>
        <View style={style.container}>
          <TouchableOpacity onPress={this.toggleDrawer.bind(this)}>
            <Ionicons name='md-menu' size={35} color='white'/>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const OptionTwo = createStackNavigator({
  Home: {
    screen: HomeComponent,
    navigationOptions: ({ navigation }) => ({
      headerLeft: <NavigationDrawerStructure navigationProps={navigation}/>,
      headerStyle: {
        backgroundColor: primary
      },
      headerTintColor: '#fff'
    })
  }
})

const OptionCamera = createStackNavigator({
  Camera: {
    screen: FormCamComponent,
    navigationOptions: ({ navigation }) => ({
      title: 'Formulario',
      headerLeft: <NavigationDrawerStructure navigationProps={navigation}/>,
      headerStyle: {
        backgroundColor: primary
      },
      headerTintColor: '#fff'
    })
  }
})


const OptionExpense = createStackNavigator({
  history: {
    screen: ExpensesHistoryComponent,
    navigationOptions: ({ navigation }) => ({
      headerLeft: <NavigationDrawerStructure navigationProps={navigation}/>,
      headerStyle: {
        backgroundColor: primary
      },
      headerTintColor: '#fff'
    })
  },
  create: {
    screen: ExpensesItemComponent,
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: primary
      },
      headerTintColor: '#fff'
    })
  },
  createItem2: {
    screen: ExpensesItem2Component,
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: primary
      },
      headerTintColor: '#fff'
    })
  },
  createItem3: {
    screen: ExpensesItem3Component,
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: primary
      },
      headerTintColor: '#fff'
    })
  },
  createItem4: {
    screen: ExpensesItem4Component,
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: primary
      },
      headerTintColor: '#fff'
    })
  },
  createItemCam: {
    screen: ExpensesItemCamComponent,
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: primary
      },
      headerTintColor: '#fff'
    })
  }
}, { initialRouteName: 'history' })

const OptionPromotion = createStackNavigator({
  history: {
    screen: PromotionsHistoryComponent,
    navigationOptions: ({ navigation }) => ({
      headerLeft: <NavigationDrawerStructure navigationProps={navigation}/>,
      headerStyle: {
        backgroundColor: primary
      },
      headerTintColor: '#fff'
    })
  },
  createItem: {
    screen: PromotionsItemComponent,
    navigationOptions: ({ navigation }) => ({
      headerLeft: <NavigationDrawerStructure navigationProps={navigation}/>,
      headerStyle: {
        backgroundColor: primary
      },
      headerTintColor: '#fff'
    })
  }
}, { initialRouteName: 'history' })

const logOutOption = createStackNavigator({
  logOut: {
    screen: LogOutComponent,
    navigationOptions: ({ navigation }) => ({
      headerLeft: <NavigationDrawerStructure navigationProps={navigation}/>,
      headerStyle: {
        backgroundColor: primary
      },
      headerTintColor: '#fff'
    })
  }
})

const OptionOne = createStackNavigator({
  Login: {
    screen: LoginComponent,
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: 'transparent',
        display: 'none'
      },
      headerTintColor: 'transparent'
    })
  },
  ForgotPassword: {
    screen: ForgotPasswordComponent,
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: primary
      },
      headerTintColor: '#fff'
    })
  }
}, { initialRouteName: 'Login' })
const DrawerNavigation = createDrawerNavigator({
  /*ScreenHome: {
    screen: OptionTwo,
    navigationOptions: {
      drawerLabel: 'Inicio',
      drawerIcon: ({ tintColor }) => (
        <Ionicons name="md-home" size={24} style={{ color: tintColor }}/>
      ),
    },
  },
  ScreenCam: {
    screen: OptionCamera,
    navigationOptions: {
      drawerLabel: 'Formulario camara',
      drawerIcon: ({ tintColor }) => (
        <Ionicons name="md-camera" size={24} style={{ color: tintColor }}/>
      )
    }
  },*/

  ScreenPromotion: {
    screen: OptionPromotion,
    navigationOptions: {
      drawerLabel: 'Promociones',
      drawerIcon: () => (
        <Ionicons name='md-megaphone' size={24} style={{ color: primary }}/>
      ),
      contentOption: contentOption
    }
  },
  ScreenExpense: {
    screen: OptionExpense,
    navigationOptions: {
      drawerLabel: 'Gastos',
      drawerIcon: () => (
        <Ionicons name='md-document' size={24} style={{ color: primary }}/>
      ),
      contentOption: contentOption
    }
  },
  ScreenLogOut: {
    screen: logOutOption,
    navigationOptions: {
      drawerLabel: 'Cerrar sesión',
      drawerIcon: () => (
        <Ionicons name='md-log-out' size={24} style={{ color: primary }}/>
      ),
      contentOption: contentOption
    }
  }
}, {
  initialRouteName: 'ScreenPromotion'
})
const navStack = createAppContainer(createSwitchNavigator(
  {
    App: DrawerNavigation,
    Auth: OptionOne,
    LogOut: LogOutComponent
  },
  {
    initialRouteName: 'Auth',
  }
))
const style = StyleSheet.create({
  container: {
    marginLeft: 10,
    marginRight: 10,
  }
})
export default navStack
