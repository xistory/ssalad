import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';


import HomeScreen from './src/screens/HomeScreen';
import PaymentScreen from './src/screens/PaymentScreen';
import SignInScreen from './src/screens/SignInScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import SplashScreen from './src/screens/SplashScreen';

import Amplify from 'aws-amplify';
import { Auth } from 'aws-amplify';
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
//        urlOpener: urlOpenerExpo
    }
});


const Stack = createStackNavigator();
export const AuthContext = React.createContext();

function App() {
    const [state, dispatch] = React.useReducer(
        (prevState, action) => {
            switch (action.type) {
                case 'RESTORE_TOKEN':
                    return {
                        ...prevState,
                        userToken: action.token,
                        isLoading: false,
                    };
                case 'SIGN_IN':
                    return {
                        ...prevState,
                        isSignout: false,
                        userToken: action.token,
                    };
                case 'SIGN_OUT':
                    return {
                        ...prevState,
                        isSignout: true,
                        userToken: null,
                    };
            }
        },
        {
            isLoading: true,
            isSignout: false,
            userToken: null,
        }
    );

    React.useEffect(() => {
        // Fetch the token from storage then navigate to our appropriate place
        const bootstrapAsync = async () => {
            let userToken;

            try {
                await Auth.currentSession();
                userToken = true;
            } catch (e) {
                // Restoring token failed
                userToken = null;
            }

            // After restoring token, we may need to validate it in production apps

            // This will switch to the App screen or Auth screen and this loading
            // screen will be unmounted and thrown away.
            dispatch({ type: 'RESTORE_TOKEN', token: userToken });
        };

        bootstrapAsync();
    }, []);

    const authContext = React.useMemo(
        () => ({
            signIn: async data => {
                // In a production app, we need to send some data (usually username, password) to server and get a token
                // We will also need to handle errors if sign in failed
                // After getting token, we need to persist the token using `AsyncStorage`
                // In the example, we'll use a dummy token
                await Auth.signIn(data.username, data.password);

                dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
            },
            signOut: async () => {
                await Auth.signOut();

                dispatch({ type: 'SIGN_OUT' });
            },
            signUp: async data => {
                // In a production app, we need to send user data to server and get a token
                // We will also need to handle errors if sign up failed
                // After getting token, we need to persist the token using `AsyncStorage`
                // In the example, we'll use a dummy token

                dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
            },
        }),
        []
    );

    if (state.isLoading) {
        // We haven't finished checking for the token yet
        return <SplashScreen />;
    }


    return (
        <AuthContext.Provider value={authContext}>
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
                    {state.userToken == null ? (
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
                    ) : (
                         <>
                         <Stack.Screen
                             name="Home"
                             component={HomeScreen}
                             options={{ title: 'Stockholm Salad' }}
                         />
                         <Stack.Screen name="Payment" component={PaymentScreen} />
                         </>
                    )}

                </Stack.Navigator>
            </NavigationContainer>
        </SafeAreaProvider>
        </AuthContext.Provider>
    );
}

export default App;
