import React, {useContext, useEffect, useState } from 'react';
import { View, StyleSheet, Text, StatusBar, TouchableOpacity } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Context as PointContext } from '../context/PointContext';

// import * as Location from 'expo-location';

const CameraPayScreen = ({ route, navigation }) => {
    const { state, getBalance, chargeBalance } = useContext(PointContext);
    const [isLoading, setLoading] = useState(true);
    const [salad, setSalad] = useState('');
    const [carrot, setCarrot] = useState('0');
    const [accumCarrot, setAccum] = useState('');
    const [disable, setDisable] = useState(true);
    // const [location, setLocation] = useState(null);
    // const [errorMsg, setErrorMsg] = useState(null);

    const { price } = route.params;

    useEffect(() => {
        (async () => {
            await getBalance();
            setAccum(state.accumPoint);
            /*
            let { status } = await Location.requestPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
            }
            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
            */

            setLoading(false);
        })();
    }, []);

    /*
    let text = 'Waiting..';
    if (errorMsg) {
        text = errorMsg;
    } else if (location) {
        text = JSON.stringify(location);
    }
    */

    function calculateAccum(accumCarrot, saladPrice) {
        if (accumCarrot < 2000) {
            return parseInt(saladPrice * 0.02);
        } else if (accumCarrot < 5000) {
            return parseInt(saladPrice * 0.03);
        } else if (accumCarrot < 10000) {
            return parseInt(saladPrice * 0.04);
        } else {
            return parseInt(saladPrice * 0.05);
        }
    }


    return (
        <SafeAreaView style={styles.safe}>
            <StatusBar barStyle="light-content" backgroundColor="#080f2a" />

            {!isLoading ?

            <View style={styles.balance}>
                <View style={styles.cash}>
                    <Text style={styles.yelloText}>Total {state.cash} 금화</Text>
                </View>
                <View style={styles.carrot}>
                    <View style={styles.carrotInven}>
                        <Text style={styles.text}>사용가능 당근</Text>
                        <Text style={styles.text}>{state.point}</Text>
                    </View>
                    <View style={styles.accumCarrot}>
                        <Text style={styles.text}>누적 당근</Text>
                        <Text style={styles.text}>{state.accumPoint}</Text>
                    </View>
                </View>
            </View>
            : null}


          <View style={styles.payMenu}>
            <Text style={{ color: 'black', fontSize: 40 }}>{price}원</Text>
            <Button
              mode="contained" color="black"
              onPress={() => navigation.navigate('Camera')}
            >다시 촬영</Button>
            <Button
              mode="contained" color="black"
              onPress={() => setDisable(!disable)}
            >당근 사용</Button>
            <TextInput
              label="사용할 당근"
              value={carrot}
              disabled={disable}
              onChangeText={carrot => setCarrot(carrot)}
            />
            </View>
            {!isLoading ? (
                 <Button mode="text" color="#ffffff"
                         onPress={async () => {
                                 const saladInt = parseInt(price);
                                 const carrotInt = parseInt(carrot);
                                 const cashInt = saladInt - carrotInt;
                                 const accumInt = parseInt(accumCarrot);

                                 await chargeBalance(false, cashInt, pointInt);
                                 await chargeBalance(true, 0, calculateAccum(accumInt, saladInt));
                         // true means plus

                                 getBalance();
                         }} > 결제 </Button>
            ) : null}

        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    safe: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: '#080f2a',
    },
    text: {
        color: '#b2b2b2',
    },
    text2: {
        color: '#666666',
    },
    yelloText: {
        color: '#f6c52a',
        fontSize: 25,
    },
    redText: {
        color: '#b20000',
    },
    buttonSelected: {
        color: '#000066',
    },

    balance: {
        flex: 3,
        flexDirection: 'column',
    },
    payMenu: {
        flex: 7,
        flexDirection: 'column',
        backgroundColor: '#ffffff',
        padding: 30,
    },


    cash: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    carrot: {
        flex: 1,
        flexDirection: 'row',
    },
    carrotInven: {
        flex: 1,
        alignItems: 'center',
    },
    accumCarrot: {
        flex: 1,
        alignItems: 'center',
    },

})


export default CameraPayScreen;
