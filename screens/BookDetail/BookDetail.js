import React, { useState } from "react";
import { View, Text, StyleSheet, Image, ScrollView, Button, ActivityIndicator } from "react-native";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from '../../Database/firebase';
import Toast from "react-native-toast-message";

function BookDetail({ route }) {

  const { bookDetails } = route.params; // Get book data from navigation params
  const [isLoading, setIsLoading] = useState(false);

  async function borrowBook(){
    setIsLoading(true);
    const snapshot = await getDocs(collection(db, "borrowedbooks"))
    if(snapshot.size >= 3){
      Toast.show({
        type: 'error',
        text1: "Cannot borrow more than three books!",
        text2: "Return books to borrow more!",
        text1Style: styles.toastText1,
        text2Style: styles.toastText2,
        visibilityTime: 3000,
        autoHide: true
      });
      setIsLoading(false);
      return;
    }
    try {
      console.log(bookDetails.author, "In try")
      const docRef = await addDoc(collection(db, "borrowedbooks"), {
        author: bookDetails.author,
        cover: bookDetails.cover,
        name: bookDetails.name,
        rating: bookDetails.rating,
        summary: bookDetails.summary
      });
      setIsLoading(false)
      Toast.show({
        type: 'success',
        text1: "Book borrowed successfully!",
        text2: "Remember to return.",
        text1Style: styles.toastText1,
        text2Style: styles.toastText2,
        visibilityTime: 3000,
        autoHide: true,
        swipeable: true
      });
    } catch(exception){
      setIsLoading(false)
      console.log(`Error adding document: ${exception}`)
    }
  }
  return (
    <ScrollView>
      {isLoading ? (
        <View style={styles.loader}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Borrowing book... please wait...</Text>
      </View>
      ): (
        <View style={styles.container}>
        <Image
          source={{ uri: bookDetails.cover }}
          style={{ width: 200, height: 300 }}
        />
        <Text style={styles.title}>{bookDetails.name}</Text>
        <Text style={{ fontSize: 20, fontWeight: 300 }}>By</Text>
        <Text style={styles.author}>{bookDetails.author}</Text>
        <Text style={{ color: "#BAAA01", fontSize: 18, fontWeight: 500, paddingTop: 10}}>
          Rating: {bookDetails.rating}
        </Text>
        <Text style={{ fontSize: 16, textAlign: "justify", padding: 18 }}>
          Summary: {bookDetails.summary}
        </Text>
      </View>
      )}
      <Button title="Borrow this book" color={"green"} onPress={borrowBook}/>
      <View style={{height: 20}}></View>
      <Toast/>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  activityIndicatorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },  
  container: {
    flex: 1,
    paddingTop: 30,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    paddingStart: 10,
    paddingEnd: 10,
    textAlign: 'center'
  },
  author: {
    fontSize: 22,
    color: "gray",
  },
  toastText2: {
    fontSize: 12
  },
  toastText1: {
    fontSize: 14
  }
});

export default BookDetail;
