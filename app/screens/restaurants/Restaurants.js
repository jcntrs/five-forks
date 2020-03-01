import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import ActionButton from 'react-native-action-button';
import RestaurantList from '../../components/restaurants/RestaurantList';
import { firebaseApp } from '../../utils/Firebase';
import firebase from 'firebase/app';
import 'firebase/firestore';

const db = firebase.firestore(firebaseApp);

const styles = StyleSheet.create({
    viewBody: {
        flex: 1
    }
});

const AddRestaurantButton = ({ navigation, setIsReloadRestaurant }) => {
    return (
        <ActionButton
            buttonColor="#00a680"
            onPress={() => navigation.navigate('AddRestaurant', { setIsReloadRestaurant })}
        />
    );
}

const Restaurants = ({ navigation }) => {

    const [user, setUser] = useState(null);
    const [restaurants, setRestaurants] = useState([]);
    const [startRestaurants, setStartRestaurants] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [totalRestaurants, setTotalRestaurants] = useState(0);
    const [isReloadRestaurant, setIsReloadRestaurant] = useState(false);
    const limitRestaurants = 8;

    useEffect(() => {
        firebase.auth().onAuthStateChanged(userInfo => {
            setUser(userInfo);
        });
    }, []);

    useEffect(() => {
        db.collection('restaurants').get().then(result => {
            setTotalRestaurants(result.size);
        });
        (async () => {
            const resultRestaurants = [];
            const restaurants = db.collection('restaurants').orderBy('created', 'desc').limit(limitRestaurants);
            await restaurants.get().then(response => {
                setStartRestaurants(response.docs[response.docs.length - 1]);
                response.forEach(doc => {
                    let restaurant = doc.data();
                    restaurant.id = doc.id;
                    resultRestaurants.push({ restaurant });
                });
                setRestaurants(resultRestaurants);
            });
        })();
        setIsReloadRestaurant(false);
    }, [isReloadRestaurant]);

    const handleLoadMore = async () => {
        const resultRestaurants = [];
        restaurants.length < totalRestaurants && setIsLoading(true);
        const restaurantsDB = db.collection('restaurants').orderBy('created', 'desc').startAfter(startRestaurants.data().created).limit(limitRestaurants);
        await restaurantsDB.get().then(response => {
            if (response.docs.length > 0) {
                setStartRestaurants(response.docs[response.docs.length - 1]);
            } else {
                setIsLoading(false);
            }
            response.forEach(doc => {
                let restaurant = doc.data();
                restaurant.id = doc.id;
                resultRestaurants.push({ restaurant });
            });
            setRestaurants([...restaurants, ...resultRestaurants]);
        })
    }

    return (
        <View style={styles.viewBody}>
            <RestaurantList restaurants={restaurants} isLoading={isLoading} handleLoadMore={handleLoadMore} />
            {user && <AddRestaurantButton navigation={navigation} setIsReloadRestaurant={setIsReloadRestaurant} />}
        </View>
    );

}

export default Restaurants;