import { createStackNavigator } from "@react-navigation/stack";
import RegistroAutomatico from '../screens/registrar/RegistroAutomatico'
import HomeScreen from '../screens/HomeScreen'

const Stack = createStackNavigator();

const AppNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="RegistroAuto"
                component={RegistroAutomatico}
                options={{
                    title: 'Registro Automatico',
                    headerBackTitleVisible: false,
                }}
            />
        </Stack.Navigator>
    );
};