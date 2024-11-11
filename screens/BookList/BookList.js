import React, { useState, useEffect } from 'react';
import { FlatList, Text, TouchableOpacity, View, StyleSheet , Image, Button} from 'react-native';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../../Database/firebase';
import Toast from 'react-native-toast-message';
function BooksList({ navigation }) {
  const [books, setBooks] = useState([]);

  
  useEffect(() => {
    const fetchBooks = async () => {
      const snapshot = await getDocs(collection(db, "books"));
      const booksList = snapshot.docs.map(doc => ({...doc.data(),id: doc.id})); // Add the document ID as a key
      setBooks(booksList);
      console.log("In book List",books); 
    };

    fetchBooks(); 
  }, []);


  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => navigation.navigate('Book Summary', { bookDetails: item})}
    >
        <View style={styles.itemDetails}>
        <Text style={styles.title}>{item.name}</Text>
        <Text> - {item.author}</Text>
        </View>
        <Image source={{uri: item.cover}} style={{height: 60, width: 50}} />
        {/* <View>
            <Button onPress={() => {}} title='Borrow'/>
        </View> */}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={books} 
        keyExtractor={(item) => item.id} 
        renderItem={renderItem}
      />
      <Toast/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemDetails: {
    marginRight: 20,
    maxWidth: '75%'
  }
});

export default BooksList;
