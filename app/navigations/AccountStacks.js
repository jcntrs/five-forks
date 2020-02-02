import { createStackNavigator } from 'react-navigation-stack';
import MyAccount from '../screens/Account/MyAccount';
import Login from '../screens/Account/Login';

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
    }
});

export default AccountScreenStacks;