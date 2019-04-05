import React from 'react';
import MyHeader from "../components/MyHeader";
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Linking,
    Button,
} from 'react-native';


const firebase = require("firebase");
require("firebase/firestore");


export default class LinksScreen extends React.Component {
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

        const RecettesList = this.state.data.map((items, index) => (
            <ScrollView>
                <Text style={styles.tagsSize} onPress={() => navigate('Filtre', {
                    nomRecette: items.nomRecette,
                    ingredients: items.ingredients,
                    materiel: items.materiel,
                    commentaire: items.commentaire,
                    cuisson: items.cuisson,
                    preparation: items.preparation,
                    personnes: items.personnes,
                    img: items.image,
                } )}>
                    #{items.tags}
                </Text>
            </ScrollView>
        ));

        return (
            <View style={styles.container}>
                <MyHeader navigation={this.props.navigation}/>
                <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>

                    <View style={styles.tagsContainer}>
                        <Text style={styles.titleTags}>Liste des tags</Text>
                        {RecettesList}
                    </View>

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
    imgRecettes: {
        width: 50,
        height: 350,
    },
    listeRecettes: {
        paddingTop: 10,
        textAlign: 'center',
        fontSize: 20,
    },
    tagsContainer: {
        marginLeft: 20,
        marginRight: 20,
    },
    tagsSize: {
        fontSize: 20,
        marginBottom: 15,
        color: '#DC2265',
        borderWidth: 1,
        borderColor: '#E8E8E8',
        borderRadius: 20,
        backgroundColor: '#F9F9F9',
        padding: 5,
        textAlign: 'center',
    },
    titleTags: {
        color: '#555555',
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: 'center',
        marginTop: 10,
    },
});
