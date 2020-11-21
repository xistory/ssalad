import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import HomeScreen from './src/screens/HomeScreen';
import PaymentScreen from './src/screens/PaymentScreen';
import SignInScreen from './src/screens/SignInScreen';
import SignUpScreen from './src/screens/SignUpScreen';

import Amplify from 'aws-amplify';
import config from './src/config';


Amplify.configure({
    Auth: {
        mandatorySignIn: true,
        region: config.cognito.REGION,
        userPoolId: config.cognito.USER_POOL_ID,
        identityPoolId: config.cognito.IDENTITY_POOL_ID,
        userPoolWebClientId: config.cognito.APP_CLIENT_ID
    },
    Storage: {
        region: config.s3.REGION,
        bucket: config.s3.BUCKET,
        identityPoolId: config.cognito.IDENTITY_POOL_ID
    },
    API: {
        endpoints: [
            {
                name: "notes",
                endpoint: config.apiGateway.URL,
                region: config.apiGateway.REGION
            },
        ]
    },
    oauth: {
        domain: config.oauth.DOMAIN,
        scope: config.oauth.SCOPE,
        redirectSignIn: config.oauth.REDIRECTSIGNIN,
        redirectSignOut: config.oauth.REDIRECTSIGNOUT,
        responseType: config.oauth.RESPONSETYPE,
        options: config.oauth.OPTIONS,
        urlOpener: urlOpenerExpo
    }
});


const Stack = createStackNavigator();

function App() {

    const isSignedIn = true;

    return (
        <SafeAreaProvider>
            <NavigationContainer>
                <Stack.Navigator
                    initialRouteName="Home"
                    screenOptions={{
                        headerStyle: {
                            backgroundColor: '#080f2a',
                        },
                        headerTintColor: '#ffffff',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                            fontSize: 30,
                            textAlign: 'center',
                        },
                    }}
                >
                    {isSignedIn? (
                         <>
                             <Stack.Screen
                                 name="Home"
                                 component={HomeScreen}
                                 options={{ title: 'Stockholm Salad' }}
                             />
                             <Stack.Screen name="Payment" component={PaymentScreen} />
                         </>
                    ) : (
                         <>
                             <Stack.Screen
                                 name="SignIn"
                                 component={SignInScreen}
                                 options={{ title: '로그인' }}
                             />
                             <Stack.Screen
                                 name="SignUp"
                                 component={SignUpScreen}
                                 options={{ title: '회원가입' }}
                             />
                         </>
                    )}
                </Stack.Navigator>
            </NavigationContainer>
        </SafeAreaProvider>
    );
}

export default App;
