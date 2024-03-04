import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ImageListScreen from './src/ImageListScreen';
import DetailsScreen from './src/DetailsScreen';
import KycModule from './src/KycModule';
import Login from './src/Login';
import SignUp from './src/SignUp';



const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={Login} options={{headerShown: false,}}/>
      <Stack.Screen name="SignUp" component={SignUp} options={{headerShown: true, headerTitle: '',  headerStyle: {
      backgroundColor: '#9932cc', 
    },}}/>
      <Stack.Screen name="KycModule" component={KycModule} options={{headerShown: true, headerTitle: '',  headerStyle: {
      backgroundColor: '#9932cc', 
    },}}/>
        <Stack.Screen name="ImageListScreen" component={ImageListScreen} options={{headerShown: true, headerTitle: 'Image Listing'}}/>
        <Stack.Screen name="DetailsScreen" component={DetailsScreen} options={{headerShown: true, headerTitle: 'Details'}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

