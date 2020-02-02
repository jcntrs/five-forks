import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import * as firebase from 'firebase';
import Loading from '../../components/Loading';

const MyAccount = () => {

    const [isLogged, setIsLogged] = useState(null);

    useEffect(() => {
        firebase.auth().onAuthStateChanged(user => {
            !user ? setIsLogged(false) : setIsLogged(true);
        });
    }, []);

    if (isLogged === null) {
        return <Loading isVisible={true} text="cargando..." />;
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