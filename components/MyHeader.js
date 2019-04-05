import React from "react";
import { Header, Image } from "react-native-elements";
import HamburgerMenu from "./HamburgerMenu";
import { StyleSheet } from 'react-native';

const MyHeader = props => {
    return (

        <Header
            leftComponent={<HamburgerMenu navigation={props.navigation} />}
            centerComponent={<Image style={styles.logo} source={require('../assets/images/logo.png')} />
            }
            containerStyle={{
                backgroundColor: '#fbf3c2',
                height: 135
            }}
            statusBarProps={{ barStyle: "light-content"}}
        />

    );
};

const styles = StyleSheet.create({

    logo:{
        width: 250,
        height: 80,
    }
});
export default MyHeader;


// #fbf3c2  BEIGE

// #dc2265  ROUGE

// #555555  GRIS