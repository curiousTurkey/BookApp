import React from "react";
import { View, Text, StyleSheet, Image, ScrollView, Button } from "react-native";

function BookDetail({ route }) {
  const { bookDetails } = route.params; // Get book data from navigation params

  return (
    <ScrollView>
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
      <Button title="Borrow this book" color={"green"} onPress={() => {}}/>
        <View style={{height: 20}}></View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
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
});

export default BookDetail;
