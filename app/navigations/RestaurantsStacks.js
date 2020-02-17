import { createStackNavigator } from 'react-navigation-stack';
import Restaurants from '../screens/restaurants';
import AddRestaurant from '../screens/restaurants/AddRestaurant';

const RestaurantScreenStacks = createStackNavigator({
    Restaurants: {
        screen: Restaurants,
        navigationOptions: () => ({
            title: 'Restaurantes'
        })
    },
    AddRestaurant: {
        screen: AddRestaurant,
        navigationOptions: () => ({
            title: 'Nuevo Restaurante'
        })
    }
});

export default RestaurantScreenStacks;