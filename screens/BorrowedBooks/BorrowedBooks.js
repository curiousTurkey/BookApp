import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Button,
} from "react-native";
import Toast from "react-native-toast-message";
import { onSnapshot, collection, deleteDoc, doc} from "firebase/firestore";
import { db } from "../../Database/firebase";

export default function BorrowedBooks({ navigation }) {
  const [borrowedBooks, setBorrowedBooks] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "borrowedbooks"),
      (snapshot) => {
        const bookList = snapshot.docs.map((doc) => ({
          ...doc.data(), 
          id: doc.id
        }));
        setBorrowedBooks(bookList)
      },
      (error) => {
        console.log("Failed to fetch real-time ", error);
      }
    );

    return () => unsubscribe();
  }, []);

  const returnBook = async (id) => {
    try {
      await deleteDoc(doc(db, "borrowedbooks", id));
        Toast.show({
          type: 'success',
          text1: "Book returned!",
          text2: "Thank you!",
          text1Style: styles.toastText1,
          text2Style: styles.toastText2,
          visibilityTime: 3000,
          autoHide: true
        });
    } catch (e) {
      console.log("Error: ". e)
    }
  };
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.item}>
      <View style={styles.container2}>
        <View style={styles.itemDetails}>
          <Text style={styles.title}>{item.name}</Text>
          <Text> - {item.author}</Text>
        </View>
        <Image source={{ uri: item.cover }} style={{ height: 60, width: 50 }} />
      </View>
      <Button color={"green"} title="Return Book" onPress={() => {returnBook(item.id);}} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {borrowedBooks.length == 0 ? (
        <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
        <Text style={{ fontSize: 18}}>Borrow some books to read</Text>
        </View>
      ) : (<FlatList
        data={borrowedBooks} // Use the books array for data
        keyExtractor={(item) => item.id} // Use book ID as the unique key
        renderItem={renderItem} // Render each book item
      />)}
      
      <Toast />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  container2: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  item: {
    flexDirection: "column",
    justifyContent: "space-between",
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  itemDetails: {
    marginRight: 20,
    maxWidth: "75%",
  },
});
