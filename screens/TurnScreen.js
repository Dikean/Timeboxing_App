import React, { useState,useEffect } from 'react'
import { useRoute } from '@react-navigation/native'
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, RefreshControl, Alert } from 'react-native';
import { db } from '../database/config';
import { collection, addDoc, getDocs} from "firebase/firestore"; 

import { query, where } from "firebase/firestore";
import { orderBy, limit } from "firebase/firestore";


function TurnScreen() {
  const route = useRoute()
   const valuename =  route.params?.name || 'No ingreso Name'
  const parametroguia = route.params?.About || ''
  const parametrotueno = route.params?.Turno || 'Error'
  const parametroAbout = route.params?.About || 'Nesecita pedir su turno'

  if(parametroguia == 'ConsultaMedica'){
 //1- configurara hooks
 const [datos, setDatos] = useState([])
 console.log('Consultamedica');
  //2- data firestore
  const datosCollection = collection(db, "datos")
  //3-mostar
  const getDatos = async () => {
     
    try {

      const q1 = query(datosCollection, orderBy("Turno"))
      const data = await getDocs(q1)
      let p = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setDatos(p[0].Turno);


    } catch (error) {
      console.log(error)
    }

  }

const mostar = () =>{
  let datos_first = datos
  return datos_first
}

  //6 useeffect
  useEffect(() => {
   
    getDatos()
    
    // eslint-disable-next-line
  },[])
  //crear
  const create = async()=>{

  // // Add a new document with a generated id.
  const docRef = await addDoc(collection(db, "datos"), {
    Turno: route.params.Turno,
     name: route.params.name,
     about: route.params.About
    });

    Alert.alert(
      "Correcto",
      "Su turno ha sido ingresado correctamente (Consulta Medica)",
      [    
        { text: "OK", onPress: () => console.log("OK") }
      ]
    );
    
  
  }

 const [refresh, setRefresh] = useState(false)
 const pullMe = () =>{
  setRefresh(true)  
  
  setTimeout(()=>{
    getDatos()
  setRefresh(false)
  },3000)
 }
 return  (
  <View  >
    <ScrollView  
    
    refreshControl={
   <RefreshControl  refreshing={refresh} onRefresh={()=>pullMe()} />
    }>
      
    <Text style={styles.title}>{valuename}</Text>
   <View style={styles.circule }>
   <Text style={styles.texttitlecircule}>Su turno</Text>
    <Text style={styles.textCircle}>{parametrotueno}</Text>
   </View>
   
   <View style={styles.square}>
    <Text style={styles.textsquare}>Turno actual :     <Text style={styles.span}> {mostar()} </Text></Text>
   </View> 
   <View> 
  <Text style={styles.bottom}>{parametroAbout}</Text>
   <TouchableOpacity
            style={styles.tomar}
           onPress={create}
          >
            <Text style={styles.textbuton}>Tomar turno</Text>
          </TouchableOpacity>
  
   </View>
   </ScrollView>
  </View>
  )
  }else{
     //1- configurara hooks
 const [laboratorio, setLaboratorio] = useState([])
 console.log('Laboratorio');
 //2- data firestore
 const laboratorioCollection = collection(db, "Laboratorio")
 //3-mostar
 const getLaboratorio = async () => {
    
   try {

    const q1 = query(laboratorioCollection, orderBy("Turno"))
    const data = await getDocs(q1)
    let p = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    setLaboratorio(p[0].Turno);

   } catch (error) {
     console.log(error)
   }

 }

const mostar1 = () =>{
 let datos_first = laboratorio
 return datos_first
}

 //6 useeffect
 useEffect(() => {
  
  getLaboratorio()
   // eslint-disable-next-line
 }, [])
 //crear
 const create1 = async()=>{

   // Add a new document with a generated id.
    const docRef = await addDoc(collection(db, "Laboratorio"), {
    Turno: route.params.Turno,
    name: route.params.name,
    about: route.params.About
   });
   Alert.alert(
    "Correcto",
    "Su turno ha sido ingresado correctamente (Laboratorio)",
    [    
      { text: "OK", onPress: () => console.log("OK") }
    ]
  );
 }

 const [refresh, setRefresh] = useState(false)
 const pullMe = () =>{
  setRefresh(true)  
  
  setTimeout(()=>{
    getLaboratorio()
  setRefresh(false)
  },3000)
 }
 return  (
  <View  >
    <ScrollView  
    
    refreshControl={
   <RefreshControl  refreshing={refresh} onRefresh={()=>pullMe()} />
    }>
      
    <Text style={styles.title}>{valuename}</Text>
   <View style={styles.circule }>
   <Text style={styles.texttitlecircule}>Su turno</Text>
    <Text style={styles.textCircle}>{parametrotueno}</Text>
   </View>
   
   <View style={styles.square}>
    <Text style={styles.textsquare}>Turno actual : <Text style={styles.span}> {mostar1()} </Text></Text>
   </View> 
   <View> 
  <Text style={styles.bottom}>{parametroAbout}</Text>
   <TouchableOpacity
            style={styles.tomar}
           onPress={create1}
          >
            <Text style={styles.textbuton}>Tomar turno</Text>
          </TouchableOpacity>
  
   </View>
   </ScrollView>
  </View>
  )
 }
}

const styles =  StyleSheet.create({
  title:{
  marginTop:40,
  textAlign: "center",
  fontSize:40,
  },
  span:{
    backgroundColor:'white',
    padding: 10,
    
  },
  circule: {
    marginTop: 40,
    marginLeft: 90,
    justifyContent: 'center',
    width: 200,
    height: 200,
    borderRadius: 200/2,
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
  texttitlecircule:{
    textAlign:'center',
  },
  textCircle:{
    textAlign:'center',
    fontSize: 60,
    fontWeight: 'blod',
  },
  square:{
     backgroundColor: '#5C9DDE',
     padding: 10,
     marginTop:50,
     marginLeft: 40,
     width: 300
  },
  textsquare:{
    fontSize: 30,
  },
  bottom:{
    marginLeft:40,
   fontSize: 15
  },
  tomar:{
    marginLeft:100,
    margin:60,
    width: 185,
    padding:15,
    backgroundColor: '#5C9DDE',
    borderWidth: 5,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  textbuton:{
    fontSize: 20,
    marginLeft: 20,
    fontWeight: 'bold'
  }
})
export default TurnScreen