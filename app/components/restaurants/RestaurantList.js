import React from 'react';
import { StyleSheet, View, Text, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Image } from 'react-native-elements';
import * as firebase from 'firebase';

const styles = StyleSheet.create({
    loadingRestaurants: {
        marginTop: 20,
        alignItems: 'center'
    }
});

const Restaurant = props => {

    const { name, address, description, images } = props.restaurant.item.restaurant;
    console.log(name)

    return (
        <TouchableOpacity onPress={() => console.log('Ir al restaurante')}>
            <View></View>
        </TouchableOpacity>
    );

}

const RestaurantList = ({ restaurants, isLoading }) => {

    return (
        <View>
            {restaurants ?
                <FlatList
                    data={restaurants}
                    renderItem={element => <Restaurant restaurant={element} />}
                    keyExtractor={(item, index) => index.toString()}
                    //onEndReached={}
                    onEndReachedThreshold={0}
                //ListFooterComponent={}
                />
                :
                <View style={Stylesheet.loadingRestaurants}>
                    <ActivityIndicator size="large" />
                    <Text>Cargando restaurantes</Text>
                </View>
            }
        </View>
    );

}

export default RestaurantList;