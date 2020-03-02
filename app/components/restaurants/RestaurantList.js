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
    },
    loaderRestaurants: {
        marginTop: 10,
        marginBottom: 10
    },
    notFoundRestaurants: {
        marginTop: 10,
        marginBottom: 20,
        alignItems: 'center'
    }
});

const Restaurant = props => {

    const { restaurant, navigation } = props;
    const { name, address, description, images } = restaurant.item.restaurant;
    const [imageURI, setImageURI] = useState(null);

    useEffect(() => {
        const imageName = images[0];
        firebase.storage().ref(`restaurant-images/${imageName}`).getDownloadURL().then(result => {
            setImageURI(result);
        });
    });

    return (
        <TouchableOpacity onPress={() => navigation.navigate('Restaurant', { restaurant })}>
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
                    <Text style={styles.restaurantDescription}>{description.substr(0, 60)}...</Text>
                </View>
            </View>
        </TouchableOpacity>
    );

}

const FooterList = ({ isLoading }) => {
    return (
        <View>
            {isLoading ?
                <View style={styles.loadingRestaurants}>
                    <ActivityIndicator size="large" />
                </View>
                :
                <View style={styles.notFoundRestaurants}>
                    <Text>No quedan restaurantes por cargar</Text>
                </View>
            }
        </View>
    );
}

const RestaurantList = ({ restaurants, isLoading, handleLoadMore, navigation }) => {
    return (
        <View>
            {restaurants ?
                <FlatList
                    data={restaurants}
                    renderItem={element => <Restaurant restaurant={element} navigation={navigation} />}
                    keyExtractor={(item, index) => index.toString()}
                    onEndReached={handleLoadMore}
                    onEndReachedThreshold={0.5}
                    ListFooterComponent={<FooterList isLoading={isLoading} />}
                />
                :
                <View style={Stylesheet.loaderRestaurants}>
                    <ActivityIndicator size="large" />
                    <Text>Cargando restaurantes</Text>
                </View>
            }
        </View>
    );
}

export default RestaurantList;