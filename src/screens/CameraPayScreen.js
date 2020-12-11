import React, {useContext, useEffect, useState } from 'react';
import { View, StyleSheet, Text, StatusBar } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Context as PointContext } from '../context/PointContext';
// import * as Location from 'expo-location';

const CameraPayScreen = () => {
    const { state, getBalance, chargeBalance } = useContext(PointContext);
    const [isLoading, setLoading] = useState(true);
    const [salad, setSalad] = useState('');
    const [point, setPoint] = useState('0');
    const [accumPoint, setAccum] = useState('');
    const [disable, setDisable] = useState(true);
    // const [location, setLocation] = useState(null);
    // const [errorMsg, setErrorMsg] = useState(null);

    

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

    function calculateAccum(accumPoint, saladPrice) {
        if (accumPoint < 2000) {
            return parseInt(saladPrice * 0.02);
        } else if (accumPoint < 5000) {
            return parseInt(saladPrice * 0.03);
        } else if (accumPoint < 10000) {
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
                    <Text style={styles.yelloText}>Total {state.cash} 캐시</Text>
                </View>
                <View style={styles.point}>
                    <View style={styles.pointInven}>
                        <Text style={styles.text}>사용가능 포인트</Text>
                        <Text style={styles.text}>{state.point} p </Text>
                        
                    </View>
                    <View style={styles.accumPoint}>
                        <Text style={styles.text}>누적 포인트</Text>
                        <Text style={styles.text}>{state.accumPoint} p</Text>
                    </View>
                </View>
            </View>
            : null}


            <View style={styles.payMenu}>
                <TextInput
                    label="샐러드 가격"
                    value={salad}
                    onChangeText={salad => setSalad(salad)}
                />
                <Button
                    mode="contained" color="black"
                    
                    onPress={() => setDisable(!disable)}
                >포인트 사용</Button>
                <TextInput
                    label="사용할 포인트"
                    value={point}
                    disabled={disable}
                    onChangeText={point => setPoint(point)}
                />
                
            </View>
            {!isLoading ? (
                 <Button mode="text" color="#ffffff"
                         onPress={async () => {
                                 const saladInt = parseInt(salad);
                                 const pointInt = parseInt(point);
                                 const cashInt = saladInt - pointInt;
                                 const accumInt = parseInt(accumPoint);
                                 

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
    point: {
        flex: 1,
        flexDirection: 'row',
    },
    pointInven: {
        flex: 1,
        alignItems: 'center',
    },
    accumPoint: {
        flex: 1,
        alignItems: 'center',
    },
})


export default CameraPayScreen;
