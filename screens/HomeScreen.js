import { useNavigation } from '@react-navigation/native';
import React from 'react'
import { StyleSheet, TouchableOpacity, Text, View, Image, Alert } from 'react-native';

import { Input, Icon, Button } from '@rneui/themed';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth'

//login
import { initializeApp } from "firebase/app";
import { FirebaseApp, firebaseConfig } from "../database/config";



function HomeScreen() {
   const [ViewHome, setViewHome] = React.useState('')
   
  function HomeHome() {
    const navigation = useNavigation();
    const tipeevent = () => {
      navigation.navigate("Form", {
        name: 'ConsultaMedica',
      })
    }
    const Lab = () => {
      navigation.navigate("Form", {
        name: 'Laboratorio',
      })
    }
    return (
  
      <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 40 }} >
  
        <Image
          style={styles.tinyLogo}
          source={{
            uri: 'https://ss-static-01.esmsv.com/id/130303/galeriaimagenes/obtenerimagen/?id=255&tipoEscala=crop&width=788&height=788',
          }}
  
        />
  
        <Text style={styles.title}>Welcome to TimeBoxing</Text>
        <Text style={styles.about}>¿Que desea hacer?</Text>
  
        <View style={styles.box}>
  
          <TouchableOpacity
            style={styles.heading}
            onPress={tipeevent}
          >
            <Text style={styles.text}>Consulta Medica</Text>
          </TouchableOpacity>
  
          <TouchableOpacity
            style={styles.heading}
            onPress={Lab}
          >
            <Text style={styles.text}>Laboratorio</Text>
          </TouchableOpacity>
  
        </View>
  
  
  
  
      </View>
    )
  }
  
  function Loginscreen(){
    const navigation = useNavigation();
   const [email, setEmail] = React.useState('')
   const [password, setPassword] = React.useState('')
  
   const app = initializeApp(firebaseConfig)
   const auth = getAuth(app)
  
   const handleCreateAccount = () =>{
    createUserWithEmailAndPassword(auth,email,password)
    .then((userCredential)=>{
      console.log('Create Account');
      const user =  userCredential.user;
      console.log(user);
      Alert.alert('Registrado exitosamente')
    }).catch(error=>{
      console.log(error);
      Alert.alert(error.message)
    })
   }
  
  
   const handleSignIn = () => {
    signInWithEmailAndPassword(auth,email,password)
    .then((userCredential)=>{
       console.log('Signed in');
       const user =  userCredential.user;
       console.log(user);
       setViewHome('Home')
      
    }).catch(error=>{
      console.log(error);
      Alert.alert(error.message)
    })
   }
  
  
  
    return (
      <View style={styles.containerlogin}>
      <Text style={styles.logintitle}>Login</Text>
  
      <View style={styles.containerInput}>
        
      <Input
      onChangeText={(text) => setEmail(text)}
        placeholder=' Email'
        leftIcon={{ type: 'font-awesome', name: 'envelope' }}
      />
      <Input
        onChangeText={(text) => setPassword(text)}
        placeholder=' Password'
        secureTextEntry={true}
        leftIcon={{ type: 'font-awesome', name: 'lock' }}
  
      />
      </View>
  
      <TouchableOpacity
         onPress={handleSignIn}
          style={styles.Button1}
      
      >
        <Text style={styles.textbuton}>Sing in</Text>
      </TouchableOpacity>
  
      <TouchableOpacity 
      onPress={handleCreateAccount}
        style={styles.Button2}
      >
        <Text style={styles.textbuton}>Register</Text>
      </TouchableOpacity>
  
  
  
  
    </View>
    )
  }
  
  
if(ViewHome === 'Home'){
  return (
    <>
  
   <HomeHome></HomeHome>
    </>

  )
}else{
  return (
    <>
   <Loginscreen></Loginscreen>
  
    </>

  )
}
 

}

const styles = StyleSheet.create({

  containerlogin: {
    marginTop: 80,
    justifyContent: "center",
    alignItems: "center",
  },
  logintitle:{
    fontWeight: 'blod',
    fontSize: 50,
    marginBottom: 40
  },
  containerInput:{
    width: 330
  },
  Button1:{
    width: 330,
    backgroundColor: '#5C9DDE',
    marginTop:40,
    padding: 10,
    marginBottom:30,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  textbuton:{
    fontSize: 15,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  Button2:{
    width: 330,
    backgroundColor: '#5C9DDE',
    padding: 10,
    marginBottom:30,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  tinyLogo: {
    width: 100,
    height: 110,
    marginTop: 15,
  },
  title: {
    marginTop: 5,
    fontSize: 30,
    fontWeight: 'bold'
  },
  about: {
    marginTop: 10,
  },
  box: {
    marginTop: 50,
  },
  text: {
    textAlign: 'center',
    marginTop: 35,
    fontSize: 15,
    fontWeight: 'bold'
  },
  heading: {
    height: 90,
    width: 350,
    marginTop: 15,
    backgroundColor: "#fff",
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },

})

export default HomeScreen