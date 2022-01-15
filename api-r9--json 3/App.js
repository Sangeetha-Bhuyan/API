import * as React from 'react';
import { Text, View, StyleSheet, FlatList, TextInput, Button, Pressable } from 'react-native';
import Constants from 'expo-constants';
import FileSystem from 'expo';
import {useState, useEffect} from 'react';
import axios from 'axios';
const API_KEY = 'yMJgSExx3sdFku01NAc8X0ek0tm5pHDmiQKtuvfi';
// or any pure javascript modules available in npm
import { Card } from 'react-native-paper';

export default function App() {
  const [response, setResponse] = useState({});
  const [queryText, setQueryText] = useState("");
  const [inputText, setInputText] = useState("");
  const [data, setData] = useState([]);
  
  //Mr. Oswald helped me insert the API into the code along with the query text to add a search bar and button
  useEffect( () => {
    const getIngredients = async () => {
      await axios.get(`https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${API_KEY}&query=${queryText}`)
        .then( (r) => { 
          console.log(r.data);
          setResponse( r.data );
          setData(r.data.foods)
        })
        .catch( (e) => {
          console.log(`error ${e}`);
        });
    };
    getIngredients();
  },[queryText]);

  useEffect( () => {
    // another axios call 
    // https://api.nal.usda.gov/fdc/v1/food/{foodId}?api_key=y${API_KEY}
  })


  const renderRow = ({item}) => {
    // const [date,time] = item.startTime.split("T");
    return (
      <Pressable>
        <Card style={styles.card}>
          <Card.Title style={styles.heading} title={item.description} subtitle={item.foodCategory} />
          <Card.Content> 
            <Text style={styles.servingSize}> Brand Name: </Text><Text> {item.brandName} </Text>
            <Text style={styles.ingredients}> Ingredients: </Text><Text> {item.ingredients} </Text>
            <Text style={styles.servingSize}> Serving Size (g): </Text><Text> {item.servingSize} </Text>
            <Text style={styles.servingSize}> Package Weight: </Text><Text> {item.packageWeight} </Text>
          </Card.Content>
        </Card>
      </Pressable>
    )    
  }

//brandName
//foodCategory
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderRow}
        keyExtractor={item=>item[0]}
        ListHeaderComponent={<View><Text style={styles.space}></Text><Text style={styles.title}>WHAT'S IN YOUR FOOD?!
        </Text><TextInput style={styles.searchBox} value={inputText} onChangeText={setInputText}></TextInput><Button  style={styles.button} title="Search" onPress={() => setQueryText(inputText)}/></View>}
      />
    </View>
  );
}
// https://reactnative.dev/docs/flexbox
// https://css-tricks.com/snippets/css/a-guide-to-flexbox/
const styles = StyleSheet.create({
  dataView: {
    flex: 1,
    flexDirection: 'row',
   },
 title: {
    height:30,
    backgroundColor: "#bfa8ad",
    fontWeight:'bold',
    textAlign: 'center',
    color: '#421127',
    fontSize: 20,
    font: 'comingsans'
    },

  heading: {
    height:20,
    backgroundColor: "#b0adba",

    },
 space: {
    height:13,
    backgroundColor: "#bfa8ad"
  },
 searchBox: {
    height:50,
    backgroundColor: "#dae2f5",
    fontWeight:'bold',
    textAlign: 'center',
    borderWidth: 5,
    borderColor: '#997384',
    margin: 3,
    fontSize: 18,
  },
  header: {
    fontWeight:'bold'
   },
  ingredients: {
    fontWeight:'bold',
    color: '#8f0d47',
    fontSize: 15,
     margin: 2
   },
 servingSize: {
    fontWeight:'bold',
    color: '#8f0d47',
    fontSize: 15,
     margin: 1
  },
  card:{
    margin: 2,
    backgroundColor: '#e5e4ed',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#817e9c',
    padding: 8,
  }, 
});
