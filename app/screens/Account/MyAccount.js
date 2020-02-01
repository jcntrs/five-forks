import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import * as firebase from 'firebase';

const MyAccount = () => {

    const [isLogged, setIsLogged] = useState(null);

    useEffect(() => {
        firebase.auth().onAuthStateChanged(user => {
            !user ? setIsLogged(false) : setIsLogged(true);
        });
    }, []);

    if (isLogged === null) {
        return (
            <View>
                <Text>Cargando...</Text>
            </View>
        );
    }

    if (isLogged) {
        return (
            <View>
                <Text>Usuario logeado.</Text>
            </View>
        );
    } else {
        return (
            <View>
                <Text>Usuario no logeado.</Text>
            </View>
        );
    }

}

export default MyAccount;