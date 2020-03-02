import React from 'react';
import { View, Text } from 'react-native'

const Restaurant = props => {

    const { navigation } = props;
    const { restaurant } = navigation.state.params.restaurant.item;
    console.log(restaurant)

    return (
        <View>
            <Text>Página del restaurante</Text>
        </View>
    );

}

export default Restaurant;