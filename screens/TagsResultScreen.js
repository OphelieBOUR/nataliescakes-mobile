import React from 'react';
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableHighlight,
    View,
    Button,
} from 'react-native';

import MyHeader from "../components/MyHeader";


import { db } from '../config';
import {Icon} from "react-native-elements";

let recettesRef = db.ref('/items');

const firebase = require("firebase");
require("firebase/firestore");


export default class RecettesScreen extends React.Component {
    static navigationOptions = {
        header: null,
    };


    constructor (props){
        super(props);
        this.state ={
            data: []
        };
        this.getImage=this.getImage.bind(this);

        this.refImage = React.createRef();

    }

    async componentDidMount() {
        var data = await this.getData();

        for(var i=0; i<data.length; i++) {
            data[i].image = await this.getImage(data[i].image);
        }

        this.setState({
            data: data
        });
    }


    async getData() {
        var collectionRef = firebase.firestore().collection("recettes");

        var self = this;

        return await collectionRef.orderBy("dateCreation", "desc").get().then(async function (querySnapshot) {
            var dataSource = [];

            querySnapshot.forEach(function (doc) {
                var d = doc.data();
                d.id = doc.id;

                dataSource.push(d);
            });

            return dataSource;
        });
    }


    async getImage(image){
        var imageActuelle = 'images/'+image;
        var storageRefActuel = firebase.storage().ref(imageActuelle);
        var urlImage="";
        await storageRefActuel.getDownloadURL().then( function (url) {

            urlImage = url;

        });

        return urlImage;
    }

    render() {

        const {navigate} = this.props.navigation;
        let recettes = this.state.data;
        const { navigation } = this.props;
        const nomRecette = navigation.getParam('nomRecette');
        const ingredients = navigation.getParam('ingredients');
        const materiel = navigation.getParam('materiel');
        const commentaire = navigation.getParam('commentaire');
        const preparation = navigation.getParam('preparation');
        const cuisson = navigation.getParam('cuisson');
        const personnes = navigation.getParam('personnes');
        const img = navigation.getParam('img');

        return (
            <View style={styles.scrollrecettes}>
                <MyHeader navigation={this.props.navigation}/>
                <ScrollView>
                    <View style={ styles.boutonRetour} >
                        <Icon name="arrow-back" color="#dc2265" size={50} onPress={() =>
                            this.props.navigation.navigate('Tags')}/>

                    </View>
                            <View>
                                <TouchableHighlight onPress={() => navigate('Détails', {
                                    nomRecette: nomRecette,
                                    ingredients: ingredients,
                                    materiel: materiel,
                                    commentaire: commentaire,
                                    cuisson: cuisson,
                                    preparation: preparation,
                                    personnes: personnes,
                                    img: img,


                                } )}>
                                    <Image
                                        style={styles.imagerecette}
                                        source={{uri: img}}
                                    />
                                </TouchableHighlight>
                                <Text style={styles.listeRecettes} onPress={() => navigate('Détails', {
                                    nomRecette: nomRecette,
                                    ingredients: ingredients,
                                    materiel: materiel,
                                    commentaire: commentaire,
                                    cuisson: cuisson,
                                    preparation: preparation,
                                    personnes: personnes,
                                    img: img,


                                } )}>{JSON.stringify(nomRecette)}</Text>
                            </View>


                    <Text style={ styles.separator}></Text>
                </ScrollView>

            </View>

        )
    }
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    developmentModeText: {
        marginBottom: 20,
        color: 'rgba(0,0,0,0.4)',
        fontSize: 14,
        lineHeight: 19,
        textAlign: 'center',
    },

    boutonRetour: {
        alignContent: "flex-start",
        flexDirection: "row",
    },
    contentContainer: {
    },
    welcomeContainer: {
        alignItems: 'center',
        marginBottom: 20,
        height: 110,
        backgroundColor: 'rgb(251,243,194)',
    },
    separator:{
        marginTop:150,
    },
    welcomeImage: {
        width: 200,
        height: 120,
        resizeMode: 'contain',
        marginTop: 10,
    },
    searchBar: {
        width: 240,
        height: 40,
        paddingLeft: 10,
        alignSelf: 'center',
        borderWidth: 2,
        borderColor: 'black',
        marginTop: 20,
    },
    inputSrch: {
        fontSize: 28,
    },
    imgRecettes: {
        width: 50,
        height: 350,
    },
    listeRecettes: {
        textAlign: 'center',
        fontSize: 20,
        backgroundColor: '#fbf3c2',
        color: '#dc2265',
        paddingBottom: 10,
        paddingTop: 10,
    },

    imagerecette:{
        width: 350,
        height: 350,
        marginTop: 20,
    },

    scrollrecettes:{
        alignItems: 'center',
    }


});



