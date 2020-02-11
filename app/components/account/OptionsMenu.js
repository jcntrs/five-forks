import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { ListItem } from 'react-native-elements';
import Modal from '../Modal';

const styles = StyleSheet.create({
    menuItem: {
        borderBottomWidth: 1,
        borderBottomColor: '#c3c3c3'
    }
});

const OptionsMenu = () => {

    const [isVisible, setIsVisible] = useState(false);

    const menuOptions = [{
        title: 'Cambiar Nombres y Apellidos',
        iconType: 'material-community',
        iconNameLeft: 'account-circle',
        iconColorLeft: '#ccc',
        iconNameRight: 'chevron-right',
        iconColorRight: '#ccc',
        onPress: () => selectedComponent()
    }, {
        title: 'Cambiar E-mail',
        iconType: 'material-community',
        iconNameLeft: 'at',
        iconColorLeft: '#ccc',
        iconNameRight: 'chevron-right',
        iconColorRight: '#ccc',
        onPress: () => console.log('Change e-mail')
    }, {
        title: 'Cambiar Contraseña',
        iconType: 'material-community',
        iconNameLeft: 'lock-reset',
        iconColorLeft: '#ccc',
        iconNameRight: 'chevron-right',
        iconColorRight: '#ccc',
        onPress: () => console.log('Change password')
    }];

    const selectedComponent = () => {
        setIsVisible(true);
    }

    return (
        <View>
            {menuOptions.map((element, index) => (
                <ListItem
                    key={index}
                    title={element.title}
                    leftIcon={{
                        type: element.iconType,
                        name: element.iconNameLeft,
                        color: element.iconColorLeft
                    }}
                    rightIcon={{
                        type: element.iconType,
                        name: element.iconNameRight,
                        color: element.iconColorRight
                    }}
                    onPress={element.onPress}
                    containerStyle={styles.menuItem}
                />
            ))}
            <Modal isVisible={isVisible} setIsVisible={setIsVisible}>
                <View>
                    <Text>Estoy dentro del modal</Text>
                </View>
            </Modal>
        </View>
    );

}

export default OptionsMenu;