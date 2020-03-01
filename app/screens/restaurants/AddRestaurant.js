import React, { useState, useRef } from 'react';
import { View } from 'react-native';
import Toast from 'react-native-easy-toast';
import Loading from '../../components/Loading';
import AddRestaurantForm from '../../components/restaurants/AddRestaurantForm';

const AddRestaurant = ({ navigation }) => {

    const toastRef = useRef();
    const { setIsReloadRestaurant } = navigation.state.params;
    const [isLoading, setIsLoading] = useState(false);

    return (
        <View>
            <AddRestaurantForm
                toastRef={toastRef}
                setIsLoading={setIsLoading}
                navigation={navigation}
                setIsReloadRestaurant={setIsReloadRestaurant}
            />
            <Toast ref={toastRef} position="top" opacity={0.7} />
            <Loading isVisible={isLoading} text="Creando Restaurante" />
        </View>
    );

}

export default AddRestaurant;