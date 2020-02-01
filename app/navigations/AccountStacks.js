import { createStackNavigator } from 'react-navigation-stack';
import MyAccount from '../screens/Account/MyAccount';

const AccountScreenStacks = createStackNavigator({
    MyAccount: {
        screen: MyAccount,
        navigationOptions: () => ({
            title: 'Mi cuenta'
        })
    }
});

export default AccountScreenStacks;