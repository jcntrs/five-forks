import React, { useState, useEffect } from 'react';
import * as firebase from 'firebase';
import Loading from '../../components/Loading';
import UserGuest from './UserGuest';
import UserLogged from './UserLogged';

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

    return isLogged ? <UserLogged /> : <UserGuest />;

}

export default MyAccount;