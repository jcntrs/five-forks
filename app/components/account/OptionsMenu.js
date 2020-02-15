import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { ListItem } from 'react-native-elements';
import Modal from '../Modal';
import ChangeNameForm from '../account/ChangeNameForm';
import ChangeEmailForm from '../account/ChangeEmailForm';
import ChangePasswordForm from '../account/ChangePasswordForm';

const styles = StyleSheet.create({
    menuItem: {
        borderBottomWidth: 1,
        borderBottomColor: '#c3c3c3'
    }
});

const OptionsMenu = ({ userInfo, setReloadData, toastRef }) => {

    const [isVisible, setIsVisible] = useState(false);
    const [renderComponent, setRenderComponent] = useState(null);

    const menuOptions = [{
        title: 'Cambiar Nombres y Apellidos',
        iconType: 'material-community',
        iconNameLeft: 'account-circle',
        iconColorLeft: '#ccc',
        iconNameRight: 'chevron-right',
        iconColorRight: '#ccc',
        onPress: () => selectedComponent('changeName')
    }, {
        title: 'Cambiar E-mail',
        iconType: 'material-community',
        iconNameLeft: 'at',
        iconColorLeft: '#ccc',
        iconNameRight: 'chevron-right',
        iconColorRight: '#ccc',
        onPress: () => selectedComponent('changeEmail')
    }, {
        title: 'Cambiar Contraseña',
        iconType: 'material-community',
        iconNameLeft: 'lock-reset',
        iconColorLeft: '#ccc',
        iconNameRight: 'chevron-right',
        iconColorRight: '#ccc',
        onPress: () => selectedComponent('changePassword')
    }];

    const selectedComponent = type => {
        switch (type) {
            case 'changeName':
                setRenderComponent(
                    <ChangeNameForm
                        displayName={userInfo.displayName}
                        setIsVisible={setIsVisible}
                        setReloadData={setReloadData}
                        toastRef={toastRef}
                    />
                );
                break;
            case 'changeEmail':
                setRenderComponent(
                    <ChangeEmailForm
                        email={userInfo.email}
                        setIsVisible={setIsVisible}
                        setReloadData={setReloadData}
                        toastRef={toastRef}
                    />
                );
                break;
            case 'changePassword':
                setRenderComponent(<ChangePasswordForm />);
                break;

            default:
                break;
        }
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
            {renderComponent && (
                <Modal isVisible={isVisible} setIsVisible={setIsVisible}>
                    {renderComponent}
                </Modal>
            )}
        </View>
    );

}

export default OptionsMenu;