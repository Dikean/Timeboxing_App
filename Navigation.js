import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Ionicons from 'react-native-vector-icons/Ionicons';

//screen
import HomeScreen from "./screens/HomeScreen";
import Form from "./screens/Form";
import TurnScreen from "./screens/TurnScreen";

const Tab = createBottomTabNavigator();

function MyTabs(){
    return(
        <Tab.Navigator 
      
        screenOptions={({ route }) => ({

          tabBarShowLabel: false,
          tabBarStyle : {
               position: 'absolute',
              bottom: 25,
                left : 20,
                right: 20,
                elevation: 0,
               backgroundColor: '#ffffff',
               borderRadius: 15,
               height: 90,
              
            },
          
    
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
               
              if (route.name === 'Home') {
                iconName = focused
                  ? 'ios-home'
                  : 'ios-home-outline';
              } else if (route.name === 'Turn') {
                iconName = focused ? 'notifications' : 'notifications';
              }else if (route.name === 'Form') {
                iconName = focused ? 'clipboard' : 'clipboard';
              }
  
              // You can return any component that you like here!
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: '#5C9DDE',
            tabBarInactiveTintColor: 'gray',
          })}
        >
            <Tab.Group  screenOptions={{ 
                headerStyle: { backgroundColor: '#5C9DDE'}
                }}> 
            <Tab.Screen name='Home' component={HomeScreen} />
            <Tab.Screen name='Turn' component={TurnScreen} />
            <Tab.Screen name='Form' component={Form} />
            </Tab.Group>
        </Tab.Navigator>
    );
}



export default function Navigation(){
    return(

        <NavigationContainer>
            <MyTabs></MyTabs>
        </NavigationContainer>
     
    )
}