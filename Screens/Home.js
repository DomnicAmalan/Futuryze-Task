import React, { useEffect } from 'react';
import { Search, Profile, RepoView, Files } from './HomeScreens/index';
import { createStackNavigator } from '@react-navigation/stack';


const HomeStack = createStackNavigator()

const Home = () => {

    return (
        <>
            <HomeStack.Navigator headerMode="none">
                <HomeStack.Screen name="Search" component={Search}/>
                <HomeStack.Screen name="Profile" component={Profile}/>
                <HomeStack.Screen name="Repoview" component={RepoView}/>
                <HomeStack.Screen name="Files" component={Files}/>
            </HomeStack.Navigator>
        </>
    )
}

export {Home}