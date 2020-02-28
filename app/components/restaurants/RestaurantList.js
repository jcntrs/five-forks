import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Image } from 'react-native-elements';
import * as firebase from 'firebase';

const styles = StyleSheet.create({
    loadingRestaurants: {
        marginTop: 20,
        alignItems: 'center'
    },
    viewRestaurant: {
        flexDirection: 'row',
        margin: 10
    },
    viewRestaurantImage: {
        marginRight: 15
    },
    imageRestaurant: {
        width: 80,
        height: 90
    },
    restaurantName: {
        fontWeight: 'bold'
    },
    restaurantAddress: {
        paddingTop: 2,
        color: 'grey'
    },
    restaurantDescription: {
        paddingTop: 2,
        color: 'grey',
        width: 300
    }
});

const Restaurant = props => {

    const { name, address, description, images } = props.restaurant.item.restaurant;
    const [imageURI, setImageURI] = useState(null);

    useEffect(() => {
        const imageName = images[0];
        firebase.storage().ref(`restaurant-images/${imageName}`).getDownloadURL().then(result => {
            setImageURI(result);
        });
    });

    return (
        <TouchableOpacity onPress={() => console.log('Ir al restaurante')}>
            <View style={styles.viewRestaurant}>
                <View style={styles.viewRestaurantImage}>
                    <Image
                        source={{ uri: imageURI }}
                        style={styles.imageRestaurant}
                        resizeMode="cover"
                        PlaceholderContent={<ActivityIndicator color="#fff" />}
                    />
                </View>
                <View>
                    <Text style={styles.restaurantName}>{name}</Text>
                    <Text style={styles.restaurantAddress}>{address}</Text>
                    <Text style={styles.restaurantDescription}>{address.substr(0, 60)}...</Text>
                </View>
            </View>
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