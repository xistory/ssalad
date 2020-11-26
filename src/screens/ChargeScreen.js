import React, {useContext, useEffect, useState } from 'react';
import { View, StyleSheet, Text, Button, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Context as PointContext } from '../context/PointContext';

const ChargeScreen = () => {
    const { state, getBalance } = useContext(PointContext);

    useEffect(() => {
        getBalance();
    }, [])


    return (
        <SafeAreaView style={styles.safe}>
            <StatusBar barStyle="light-content" backgroundColor="#080f2a" />

            <View style={styles.balance}>
                <View style={styles.cash}>
                    <Text style={styles.yelloText}>Total {state.cash} 캐시</Text>
                </View>
                <View style={styles.point}>
                    <View style={styles.pointInven}>
                        <Text style={styles.text}>사용가능 포인트</Text>
                        <Text style={styles.text}>{state.point} p</Text>
                    </View>
                    <View style={styles.accumPoint}>
                        <Text style={styles.text}>누적 포인트</Text>
                        <Text style={styles.text}>{state.accumPoint} p</Text>
                    </View>
                </View>
            </View>


            <View style={styles.chargeList}>
                <Text>charge list</Text>
            </View>

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
