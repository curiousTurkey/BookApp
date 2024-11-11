import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { getDocs, collection } from 'firebase/firestore';
import { db } from './Database/firebase';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BooksList from './screens/BookList/BookList';
import { createStackNavigator } from '@react-navigation/stack';
import BookDetail from './screens/BookDetail/BookDetail';
import { Ionicons } from '@expo/vector-icons';
import BorrowedBooks from './screens/BorrowedBooks/BorrowedBooks';


const Tab = createBottomTabNavigator();
const Stack =  createStackNavigator();

function HomeStack(){
  return (
    <Stack.Navigator>
      <Stack.Screen name="Books" component={BooksList}/>
      <Stack.Screen name="Book Summary" component={BookDetail}/>
    </Stack.Navigator>
  );
}

function BorrowStack(){
  return(
  <Stack.Navigator>
    <Stack.Screen name='Borrow' component={BorrowedBooks}/>
  </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{tabBarActiveTintColor: "green", tabBarInactiveTintColor: "gray"}}>

      <Tab.Screen name='books' component={HomeStack} options={{title: "Home", headerShown: false, tabBarIcon: ({color}) => 
        (<Ionicons name="home" size={20} color={color} style={{paddingTop: 10}} />)
        }}/>
        <Tab.Screen name='borrowed' component={BorrowStack} options={{title: "Borrowed Books", headerShown: false, tabBarIcon: ({color}) => 
        (<Ionicons name="book" size={20} color={color} style={{paddingTop: 10}} />)}} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});