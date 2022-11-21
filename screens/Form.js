import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native'
import { StyleSheet,  TouchableOpacity,Text, View, ScrollView, RefreshControl,} from 'react-native';
import {BarCodeScanner} from 'expo-barcode-scanner';
import { Input } from '@rneui/themed';

function Form() {

      const route = useRoute()
      const navigation = useNavigation();
    const [hasPermission, setHasPermision] = useState(null)
    const [scanned, setScanned] = useState(false)
    const [text, setText] = useState('Not yet Scanned')
    const [name, setName] = useState("");
    const [valueroute, setValueroute] = useState('ConsultaMedica')


    const [refresh, setRefresh] = useState(false)
    const pullMe = () =>{
     setRefresh(true)  
     
     setTimeout(()=>{
      setScanned(false)
      setText('Not yet Scanned')
     setRefresh(false)
     },3000)
    }
    
    const askForCameraPermission = () =>{
     (async()=>{
       const {status} = await BarCodeScanner.requestPermissionsAsync();
       setHasPermision(status == 'granted')
     })()
    }
    //permision camera
    useEffect(()=>{
      askForCameraPermission();
    },[]);

    //sacn ocurreencia
    const handleBarCodeScanned = ({type, data}) => {
      setScanned(true);
      setText(data);
      console.log('Type'+type + '\nData'+data);
    }

    //check permison
     if(hasPermission === null){
      return (
        <View style={styles.hasPermission}>
          <Text>Requiero permiso de camara</Text>
        </View>
      )
     }
     if(hasPermission === false){
      return (
        <View style={styles.hasPermission}>
          <Text>Requiero permiso de camara</Text>
          <TouchableOpacity 
         
          onPress={()=>askForCameraPermission()} 
          >
            <Text>Permitir</Text>
          </TouchableOpacity>
        </View>
      )
     }
    
     const senddataTurn = () =>{
    
      if(route.params?.name || 'ConsultaMedica' == 'Laboratorio'){
         navigation.navigate("Turn",{
        Turno: text,
        name:name,
        About: route.params?.name|| 'Laboratorio',
      })
      }else{
        navigation.navigate("Turn",{
          Turno: text,
          name:name,
          About: route.params?.name|| 'ConsultaMedica' ,
        })
      }
     
     }

  


  const setShow =  route.params?.name || valueroute;

  if (setShow == 'ConsultaMedica' ) {

    return (
      <View  style={styles.container}>
        <ScrollView  
    
    refreshControl={
   <RefreshControl  refreshing={refresh} onRefresh={()=>pullMe()} />
    }>
      <Text  style={styles.Title}>{valueroute}</Text> 
          <View style={styles.scanner}>
             <BarCodeScanner
             onBarCodeScanned={scanned ? undefined: handleBarCodeScanned}
             style={{height:400,width:400}}/>
          </View>
          <Text style={styles.textescaneado}>Su turno: <Text style={{backgroundColor: '#ccc'}}>{text}</Text></Text>
        <View  style={styles.containerform}>{scanned && 
          <TouchableOpacity
          style={styles.boton}
          onPress={()=>setScanned(false)} 
        >
          <Text>New</Text>
        </TouchableOpacity>}
         </View>
         <View style={styles.divform}>
         <Input
      onChangeText={(text)=>setName(text)}
      value={name}
      placeholder="Name"
    />
    
    <TouchableOpacity
          style={styles.boton}
          onPress={senddataTurn} 
        >
          <Text>Enviar</Text>
        </TouchableOpacity>

        
        </View> 
        </ScrollView>
      </View>
    )
  }
  if(setShow == 'Laboratorio'){
 
 

    return (
      <View  style={styles.container}>
        <ScrollView  
    
    refreshControl={
   <RefreshControl  refreshing={refresh} onRefresh={()=>pullMe()} />
    }>
        <Text  style={styles.Title}>{route.params.name}</Text> 
            <View style={styles.scanner}>
               <BarCodeScanner
               onBarCodeScanned={scanned ? undefined: handleBarCodeScanned}
               style={{height:400,width:400}}/>
            </View>
            <Text style={styles.textescaneado}>Su turno: <Text style={{backgroundColor: '#ccc'}}>{text}</Text></Text>
          <View  style={styles.containerform}>{scanned && 
            <TouchableOpacity
            style={styles.boton}
            onPress={()=>setScanned(false)} 
          >
            <Text>New</Text>
          </TouchableOpacity>}
           </View>
           <View style={styles.divform}>
           <Input
        onChangeText={(text)=>setName(text)}
        value={name}
        placeholder="Name"
      />
      <TouchableOpacity
            style={styles.boton}
            onPress={senddataTurn} 
          >
            <Text>Enviar</Text>
          </TouchableOpacity>
        
          
          </View> 
          </ScrollView>
        </View>
    )
  }


}
const styles =  StyleSheet.create({
  hasPermission:{
      alignItems: 'center', 
    justifyContent: 'center',
    marginTop:30
  },
  container:{
    marginTop:30,
  },
  Title: {
   // alignItems: 'center', 
    //justifyContent: 'center',
    textAlign: "center",
    fontSize: 30,
    fontWeight: 'bold',
  },
  scanner:{
    marginTop: 10,
    marginLeft: 45,
    alignItems: 'center',
    height:300,
    width: 300,
    borderRadius:30,
    overflow: 'hidden',
  },
  containerform:{
    marginTop:5,
  },
  boton:{
    alignItems: "center",
    width: 80,
    marginLeft: 130,
    backgroundColor: "#5C9DDE",
    padding: 14,
  },
  textescaneado:{
    textAlign: "center",
    marginTop: 25,
    fontWeight: 'blod'
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  divform:{
    marginLeft: 20,
    marginTop:30,
    width:350,
  }
  
  
})
export default Form