import React from "react";
import {View, Text, StyleSheet} from "react-native";
import MyHeader from "../components/MyHeader";
import {Icon} from "react-native-elements";

const FavorisScreen = props => {
    return (

        <View>
            <MyHeader navigation={props.navigation}/>
            <Text style={styles.titleFav}>Liste des Favoris</Text>
        </View>
    );
};


const styles = StyleSheet.create({

    titleFav: {
        color: '#555555',
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: 'center',
        marginTop: 10,
    },
});



export default FavorisScreen;