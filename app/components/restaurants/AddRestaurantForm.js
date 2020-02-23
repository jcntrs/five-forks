import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, Alert, Dimensions } from 'react-native'
import { Icon, Avatar, Image, Input, Button } from 'react-native-elements';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';

const widthScreen = Dimensions.get('window').width;

const styles = StyleSheet.create({
    viewImage: {
        flexDirection: 'row',
        marginLeft: 20,
        marginRight: 20,
        marginTop: 30
    },
    containerIcon: {
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
        height: 70,
        width: 70,
        backgroundColor: '#e3e3e3'
    },
    miniature: {
        height: 70,
        width: 70,
        marginRight: 10
    },
    viewPhoto: {
        alignItems: 'center',
        height: 200,
        marginBottom: 20
    }
});

const UploadImage = ({ imagesSelected, setImagesSelected, toastRef }) => {

    const imageSelect = async () => {
        const resultPermissions = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        const resultPermissionsCamera = resultPermissions.permissions.cameraRoll.status;
        if (resultPermissionsCamera === 'denied') {
            toastRef.current.show('Es necesario aceptar los permisos de la galeria', 2000);
        } else {
            const result = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                aspect: [4, 3]
            });
            if (result.cancelled) {
                toastRef.current.show('Has cerrado la galeria sin seleccionar ninguna imagen', 2000);
            } else {
                setImagesSelected([...imagesSelected, result.uri]);
            }
        }
    }

    const removeImage = image => {
        const arrayImages = imagesSelected;
        Alert.alert(
            'Eliminar Imagen',
            '¿Estás seguro de eliminar la imagen?',
            [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Eliminar', onPress: () => setImagesSelected(arrayImages.filter(element => element !== image)) }
            ],
            { cancelable: false }
        );
    }

    return (
        <View style={styles.viewImage}>
            {imagesSelected.length < 4 && (
                <Icon
                    type="material-community"
                    name="camera"
                    color="#7a7a7a"
                    containerStyle={styles.containerIcon}
                    onPress={imageSelect}
                />
            )}
            {imagesSelected.map((element, index) => (
                <Avatar
                    key={index}
                    style={styles.miniature}
                    source={{ uri: element }}
                    onPress={() => removeImage(element)}
                />
            ))}
        </View>
    );

}

const AddRestaurantForm = ({ toastRef, setIsLoading, navigation }) => {

    const [imagesSelected, setImagesSelected] = useState([]);

    return (
        <ScrollView>
            <RestaurantImage imagesSelected={imagesSelected[0]} />
            <UploadImage
                imagesSelected={imagesSelected}
                setImagesSelected={setImagesSelected}
                toastRef={toastRef}
            />
        </ScrollView>
    );

}

const RestaurantImage = ({ imagesSelected }) => (
    <View style={styles.viewPhoto}>
        {imagesSelected ?
            <Image source={{ uri: imagesSelected }} style={{ width: widthScreen, height: 200 }} />
            :
            <Image source={require('../../../assets/img/no-image.png')} style={{ width: widthScreen, height: 200 }} />
        }
    </View>
);


export default AddRestaurantForm;