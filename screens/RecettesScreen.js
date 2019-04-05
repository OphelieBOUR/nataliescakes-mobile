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

let recettesRef = db.ref('/items');

const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");


export default class RecettesScreen extends React.Component {
    static navigationOptions = {
        header: null,
    };


    constructor (props){
        super(props);
        this.state ={
            searchString: '',
            data: []
        };
        this.getImage=this.getImage.bind(this);

        this.refImage = React.createRef();

        console.disableYellowBox = true;

    }

    handleChange(e) {
        var nativeEvent = e.nativeEvent;
        /* If you comment out this line, the textbox will not change its value. This is because in React, an input cannot change independently of the value that was assigned to it. In our case this is this.state.searchString. */
        this.setState({searchString: nativeEvent.text});
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
        //console.log("image: ", imageActuelle);
        var storageRefActuel = firebase.storage().ref(imageActuelle);
        //console.log("après storage.ref");
        var urlImage="";
        await storageRefActuel.getDownloadURL().then( function (url) {

            urlImage = url;

        });

        return urlImage;
    }

    render() {

        let recettes = this.state.data;
        let searchString = this.state.searchString.trim().toLowerCase();
        const {navigate} = this.props.navigation;

        if(searchString.length > 0) {
            //We are searching, filter the results.
            recettes = recettes.filter(function(l) {
                return l.nomRecette.toLowerCase().match( searchString );
            });
        }






        return (
            <View style={styles.scrollrecettes}>
                <MyHeader navigation={this.props.navigation}/>
                <ScrollView>

                    <View style={styles.searchBar}>
                        <TextInput style={styles.inputSrch} type = "text" value = {this.state.searchString} onChange = {this.handleChange.bind(this)} placeholder = "Recherche ..." />
                    </View>

                    {recettes.map(function(l){
                        return (


                            <View>
                                <TouchableHighlight onPress={() => navigate('Détails', {
                                    nomRecette: l.nomRecette,
                                    ingredients: l.ingredients,
                                    materiel: l.materiel,
                                    commentaire: l.commentaire,
                                    cuisson: l.cuisson,
                                    preparation: l.preparation,
                                    personnes: l.personnes,
                                    img: l.image,


                                } )}>
                                    <Image
                                        style={styles.imagerecette}
                                        source={{uri: l.image}}
                                    />
                                </TouchableHighlight>
                                <Text style={styles.listeRecettes} onPress={() => navigate('Détails', {
                                    nomRecette: l.nomRecette,
                                    ingredients: l.ingredients,
                                    materiel: l.materiel,
                                    commentaire: l.commentaire,
                                    cuisson: l.cuisson,
                                    preparation: l.preparation,
                                    personnes: l.personnes,
                                    img: l.image,
                                } )}>{l.nomRecette}</Text>
                            </View>

                        )
                    }) }



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





