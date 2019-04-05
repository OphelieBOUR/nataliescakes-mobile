import React from "react";
import { createStackNavigator, createAppContainer} from "react-navigation";
import DetailsScreen from "../screens/DetailsScreen";

import AppNavigator from './AppNavigator';


const stack = createStackNavigator({
        RecetteDetails: {
            screen: DetailsScreen
        }
    },
    {
        headerMode: 'none',
        navigationOptions: {
            headerVisible: false,
        }
    });

const Navigator = createStackNavigator({
        AppNavigator: {
            screen: AppNavigator
        },
        stack: {
            screen: stack
        }
    },
    {
        headerMode: 'none',
        navigationOptions: {
            headerVisible: false,
        }
    });

export default createAppContainer(Navigator);