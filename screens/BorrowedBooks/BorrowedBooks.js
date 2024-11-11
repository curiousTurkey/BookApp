import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function BorrowedBooks({ route }) {
  const { bookName, author } = route.params; // Get book data from navigation params

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{bookName}</Text>
      <Text style={styles.author}>{author}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  author: {
    fontSize: 18,
    color: 'gray',
  },
});

export default BorrowedBooks;