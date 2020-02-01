import React from 'react';
import { Icon } from 'react-native-elements';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import RestaurantScreenStack from './RestaurantsStacks';
import TopRestaurantsScreenStacks from './TopRestaurantsStacks';
import SearchScreenStacks from './SearchStacks';
import AccountScreenStacks from './AccountStacks';

const NavigationStacks = createBottomTabNavigator({
    Restaurants: {
        screen: RestaurantScreenStack,
        navigationOptions: () => ({
            tabBarLabel: 'Restaurantes',
            tabBarIcon: ({ tintColor }) => (
                <Icon
                    type="material-community"
                    name="compass-outline"
                    size={22}
                    color={tintColor}
                />
            )
        })
    },
    TopList: {
        screen: TopRestaurantsScreenStacks,
        navigationOptions: () => ({
            tabBarLabel: 'Ranking',
            tabBarIcon: ({ tintColor }) => (
                <Icon
                    type="material-community"
                    name="star-outline"
                    size={22}
                    color={tintColor}
                />
            )
        })
    },
    Search: {
        screen: SearchScreenStacks,
        navigationOptions: () => ({
            tabBarLabel: 'Buscar',
            tabBarIcon: ({ tintColor }) => (
                <Icon
                    type="material-community"
                    name="magnify"
                    size={22}
                    color={tintColor}
                />
            )
        })
    },
    Account: {
        screen: AccountScreenStacks,
        navigationOptions: () => ({
            tabBarLabel: 'Mi Cuenta',
            tabBarIcon: ({ tintColor }) => (
                <Icon
                    type="material-community"
                    name="home-outline"
                    size={22}
                    color={tintColor}
                />
            )
        })
    }
},
    {
        initialRouteName: 'Account',
        order: ['Restaurants', 'TopList', 'Search', 'Account'],
        tabBarOptions: {
            inactiveTintColor: '#646464',
            activeTintColor: '#00a680'
        }
    }
);

export default createAppContainer(NavigationStacks);