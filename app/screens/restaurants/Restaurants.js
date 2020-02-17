import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import ActionButton from 'react-native-action-button';
import * as firebase from 'firebase';

const styles = StyleSheet.create({
    viewBody: {
        flex: 1
    }
});

const AddRestaurantButton = ({ navigation }) => {
    return (
        <ActionButton
            buttonColor="#00a680"
            onPress={() => navigation.navigate('AddRestaurant')}
        />
    );
}

const Restaurants = ({ navigation }) => {

    const [user, setUser] = useState(null);

    useEffect(() => {
        firebase.auth().onAuthStateChanged(userInfo => {
            setUser(userInfo);
        });
    }, []);

    return (
        <View style={styles.viewBody}>
            <Text>Estamos en Restaurantess.</Text>
            {user && <AddRestaurantButton navigation={navigation} />}
        </View>
    );

}

export default Restaurants;