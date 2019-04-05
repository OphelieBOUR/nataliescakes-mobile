import React from "react";
import MyHeader from "../components/MyHeader";
import { AppRegistry, FlatList, StyleSheet, Text, View } from 'react-native';

const PanierScreen = props => {
    return (

        <View>
            <MyHeader navigation={props.navigation}/>
            <Text style={styles.title}>Liste de course
            </Text>

            <FlatList
                data={[
                    {key: '100g de Sucre'},
                    {key: '6 oeufs'},
                    {key: 'Levure'},
                    {key: '500g de farine'},
                    {key: 'Beurre'},
                ]}
                renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>}
            />



        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 22
    },
    item: {
        textAlign:'center',
        marginTop: 5,
        padding: 10,
        fontSize: 18,
        height: 44,
        backgroundColor: '#ECECEC',
        color:'#383838'
    },
    title: {
        textAlign:'center',
        fontWeight: 'bold',
        color:'white',
        backgroundColor: '#ff96a6',
        padding: 10,
        fontSize: 22,
        height: 44,
    },
})

AppRegistry.registerComponent('AwesomeProject', () => FlatListBasics);

export default PanierScreen;