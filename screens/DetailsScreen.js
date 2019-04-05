import React from "react";
import MyHeader from "../components/MyHeader";
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    TextInput,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import {
    Icon,
} from 'react-native-elements';

const firebase = require("firebase");
require("firebase/firestore");

export default class DetailsScreen extends React.Component {
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
            <View style={styles.container}>
                <MyHeader navigation={this.props.navigation}/>
                <ScrollView>
                    <View style={ styles.boutonRetour} >
                        <Icon name="arrow-back" color="#dc2265" size={50} onPress={() =>
                            this.props.navigation.navigate('Recettes')}/>
                        <Text style={ styles.titre}>{JSON.stringify(nomRecette)}</Text>
                    </View>
                    <Image
                        style={styles.imagerecette}
                        source={{uri: img}}
                    />
                    <Text style={styles.listeRecettes} onPress={() => navigate('Favoris')}>Ajouter aux favoris</Text>


                    <View style={styles.alignPreparationText}>
                        <Image style={styles.logogateau} source={require('../assets/images/gateau_parts.png')}/>
                        <Text style={ styles.donnee1bold}>Nombre de personnes : {JSON.stringify(personnes)}</Text>
                    </View>


                    <View style={styles.alignPreparationText}>
                        <Image style={styles.logofouet} source={require('../assets/images/fouet.png')}/>
                        <Text style={ styles.donnee1bold}>Préparation : {JSON.stringify(preparation)}</Text>
                    </View>

                    <View style={styles.alignPreparationText}>
                        <Image style={styles.logofour} source={require('../assets/images/four.png')}/>
                        <Text style={ styles.donnee1bold}>Cuisson : {JSON.stringify(cuisson)}</Text>
                    </View>

                    <View style={styles.alignPreparationText}>
                        <Text style={ styles.subtitre}>Ingrédients et matériel</Text>
                        <Text style={ styles.donnee1}>{JSON.stringify(ingredients)} {"\n"}{"\n"} {JSON.stringify(materiel)}</Text>
                    </View>

                    <View style={styles.alignPreparationText}>
                        <Text style={ styles.subtitre}>Astuces et commentaires</Text>
                    </View>

                    <View style={styles.alignPreparationText}>
                        <Text style={ styles.donnee1}>{JSON.stringify(commentaire)}</Text>
                    </View>




                    <Text style={ styles.separator}></Text>

                </ScrollView>

            </View>
        )
    }
}





const styles = StyleSheet.create({
    boutonRetour: {
        alignContent: "flex-start",
        flexDirection: "row",
    },

    logogateau:{
        width: 80,
        height: 50,
        marginTop: 20,
        marginLeft: 20,
    },

    logofouet:{
        width: 80,
        height: 50,
        marginTop: 20,
        marginLeft: 12,
    },

    logofour:{
        width: 55,
        height: 50,
        marginTop: 20,
        marginLeft: 10,
    },

    imagerecette:{
        width: 350,
        height: 350,
        marginTop: 20,
    },
    listeRecettes: {
        textAlign: 'center',
        fontSize: 20,
        backgroundColor: '#fbf3c2',
        color: '#dc2265',
        paddingBottom: 10,
        paddingTop: 10,
    },

    titre:{
        width: '80%',
        textAlign: 'center',
        fontSize: 30,
        color: '#dc2265',
        fontWeight: 'bold',
        marginTop: 10,


    },
    donnee1:{
        textAlign: 'center',
        marginTop: 20,
        color: '#555555',
        // marginTop:20,
        // paddingLeft: 40,
        // paddingRight: 40,

    },
    donnee1bold:{
        textAlign: 'center',
        marginTop: 20,
        color: '#555555',
        fontWeight: 'bold',
        fontSize: 16,


    },
    donnee2:{
        textAlign: 'center',
        color: '#555555',
        marginTop:20,
        marginLeft: 40,
        marginRight: 40,

    },

    subtitre:{
        textAlign: 'center',
        fontSize: 20,
        color: '#dc2265',
        fontWeight: 'bold',
        marginTop: 50,
    },
    separator:{
        marginTop:80,
    },

    scrollrecettes:{
        alignItems: 'center'
    },
    container: {
        flex: 1,
        alignItems: 'center',
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
    },
    inputSrch: {
        fontSize: 28,
    },
    alignPreparation: {
        display: 'flex',
        justifyContent: 'flex-start',
    },

    alignPreparationText: {
        alignItems: 'center',
        paddingLeft: 30,
        paddingRight: 30,
        width: 350,
    }
});




