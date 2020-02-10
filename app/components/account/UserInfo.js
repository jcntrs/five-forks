import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Avatar } from 'react-native-elements';
import * as firebase from 'firebase';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import { YellowBox } from 'react-native';

const styles = StyleSheet.create({
    viewUserInfo: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: '#f2f2f2',
        paddingTop: 30,
        paddingBottom: 30
    },
    avatarUserInfo: {
        marginRight: 20
    },
    displayName: {
        fontWeight: 'bold'
    },
    viewCenter: {
        alignItems: 'center'
    }
});

const UserInfo = props => {

    YellowBox.ignoreWarnings(['Setting a timer']);

    const { userInfo: { uid, displayName, email, photoURL } } = props;

    const editAvatar = async () => {
        const resultPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        const resultPermissionCamera = resultPermission.permissions.cameraRoll.status;
        if (resultPermissionCamera === 'denied') {
            console.log('Es necesario aceptar los permisos');
        } else {
            const result = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                aspect: [4, 3]
            });
            console.log(result)
            if (result.cancelled) {
                console.log('Has cerrado la galeria de imagenes');
            } else {
                uploadImage(result.uri, uid).then(() => {
                    console.log('Imagen subida correctamente');
                });
            }
        }
    }

    const uploadImage = async (uri, imageName) => {
        const response = await fetch(uri);
        const blob = await response.blob();
        const ref = firebase.storage().ref().child(`avatar/${imageName}`);
        return ref.put(blob);
        //console.log(JSON.stringify(blob));
    }

    return (
        <View style={styles.viewUserInfo}>
            <Avatar
                rounded
                size="large"
                showEditButton
                onEditPress={editAvatar}
                containerStyle={styles.avatarUserInfo}
                source={{ uri: photoURL ? photoURL : 'https://api.adorable.io/avatars/266/abott@adorable.png' }}
            />
            <View style={styles.viewCenter}>
                <Text style={styles.displayName}>
                    {displayName ? displayName : 'Anónimo'}
                </Text>
                <Text>{email ? email : 'Sesión Facebook'}</Text>
            </View>
        </View>
    );

}

export default UserInfo;