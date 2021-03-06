import React, {useContext, useEffect, useState } from 'react';
import { View, StyleSheet, Text, Button, StatusBar } from 'react-native';
import { RadioButton } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Context as PointContext } from '../context/PointContext';

const ChargeScreen = () => {
    const { state, getBalance, chargeBalance } = useContext(PointContext);
    const [value, setValue] = useState('5000');

    useEffect(() => {
        getBalance();
    }, [])


    return (
        <SafeAreaView style={styles.safe}>
            <StatusBar barStyle="light-content" backgroundColor="#080f2a" />

            <View style={styles.balance}>
                <View style={styles.cash}>
                    <Text style={styles.yelloText}>Total {state.cash} 금화</Text>
                </View>
                <View style={styles.point}>
                    <View style={styles.pointInven}>
                        <Text style={styles.text}>사용가능 당근</Text>
                        <Text style={styles.text}>{state.point}</Text>
                    </View>
                    <View style={styles.accumPoint}>
                        <Text style={styles.text}>누적 당근</Text>
                        <Text style={styles.text}>{state.accumPoint}</Text>
                    </View>
                </View>
            </View>


            <View style={styles.chargeList}>
                <RadioButton.Group onValueChange={value => setValue(value)} value={value}>
                    <RadioButton.Item label="5000 금화" value="5000" />
                    <RadioButton.Item label="10000 금화" value="10000" />
                    <RadioButton.Item label="20000 금화" value="20000" />
                    <RadioButton.Item label="50000 금화" value="50000" />
                </RadioButton.Group>
            </View>
            <Button title="충전" onPress={async () => {
                    const valueInt = parseInt(value);
                    await chargeBalance(true, valueInt, 0);
                    // true means plus
                    getBalance();
            }} />

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
    chargeList: {
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


export default ChargeScreen;
