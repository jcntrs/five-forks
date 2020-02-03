import { createStackNavigator } from 'react-navigation-stack';
import MyAccount from '../screens/Account/MyAccount';
import Login from '../screens/Account/Login';
import Register from '../screens/Account/Register';

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