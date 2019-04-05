/*
import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';

export default createAppContainer(createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  Main: MainTabNavigator,
}));*/



import { createDrawerNavigator, createAppContainer } from "react-navigation";
import RecettesScreen from "../screens/RecettesScreen";
import TagsScreen from "../screens/TagsScreen";
import FavorisScreen from "../screens/FavorisScreen";
import PanierScreen from "../screens/PanierScreen";
import DetailsScreen from "../screens/DetailsScreen";
import TagsResultScreen from "../screens/TagsResultScreen";


import React from "react";
import { Ionicons } from '@expo/vector-icons';


  const AppNavigator = createDrawerNavigator({

          Recettes: {
              screen: RecettesScreen,
          },

          Tags: {
              screen: TagsScreen
          },

          Favoris: {
              screen: FavorisScreen
          },

          Panier: {
              screen: PanierScreen
          },

          Détails: {
              screen: DetailsScreen
          },

          Filtre: {
              screen: TagsResultScreen
          },


      },



      {
        drawerBackgroundColor: '#dc2265',
        drawerWidth: 150,
        navigationOptions: {
        },
        contentOptions: {
          activeTintColor: '#dc2265',
          activeBackgroundColor: '#fbf3c2',
          inactiveTintColor: '#fbf3c2',
          inactiveBackgroundColor: 'transparent',


        }
      }
  );

export default createAppContainer(AppNavigator);

