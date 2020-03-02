import { createStackNavigator } from 'react-navigation-stack';
import Restaurants from '../screens/restaurants';
import AddRestaurant from '../screens/restaurants/AddRestaurant';
import Restaurant from '../screens/restaurants/Restaurant';

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
    },
    Restaurant: {
        screen: Restaurant,
        navigationOptions: props => ({
            title: props.navigation.state.params.restaurant.item.restaurant.name
        })
    }
});

export default RestaurantScreenStacks;