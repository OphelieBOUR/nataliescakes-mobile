import React from "react";
import { Icon } from "react-native-elements";


const HamburgerMenu = props => {
    return (
        <Icon
            size={35}
            color="#dc2265"
            name="menu"
            onPress={() => props.navigation.toggleDrawer()}
        />
    );
};


export default HamburgerMenu;