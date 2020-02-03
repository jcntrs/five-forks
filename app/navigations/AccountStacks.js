import { createStackNavigator } from 'react-navigation-stack';
import MyAccount from '../screens/account/MyAccount';
import Login from '../screens/account/Login';
import Register from '../screens/account/Register';

const AccountScreenStacks = createStackNavigator({
    MyAccount: {
        screen: MyAccount,
        navigationOptions: () => ({
            title: 'Mi cuenta'
        })
    },
    Login: {
        screen: Login,
        navigationOptions: () => ({
            title: 'Iniciar Sesión'
        })
    },
    Register: {
        screen: Register,
        navigationOptions: () => ({
            title: 'Registro'
        })
    }
});

export default AccountScreenStacks;