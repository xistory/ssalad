import React from 'react';
import { View, StyleSheet, Text, Button, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const PaymentScreen = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.safe}>
            <StatusBar barStyle="light-content" backgroundColor="#080f2a" />

            <View style={styles.balance}>
                <View style={styles.cash}>
                    <Text style={styles.yelloText}>Total 18,560 캐시</Text>
                </View>
                <View style={styles.point}>
                    <View style={styles.pointInven}>
                        <Text style={styles.text}>사용가능 포인트</Text>
                        <Text style={styles.text}>3,560 p</Text>
                    </View>
                    <View style={styles.accumPoint}>
                        <Text style={styles.text}>누적 포인트</Text>
                        <Text style={styles.text}>31,560 p</Text>
                    </View>
                </View>
            </View>





            <View style={styles.date}>
                <Text style={styles.buttonSelected}>1주일</Text>
                <Text style={styles.text2}>1개월</Text>
                <Text style={styles.text2}>3개월</Text>
                <Text style={styles.text2}>6개월</Text>
            </View>





            <View style={styles.details}>
                <View style={styles.select}>
                    <Text style={styles.buttonSelected}>전체 |</Text>
                    <Text style={styles.text2}> 충전 |</Text>
                    <Text style={styles.text2}> 사용</Text>
                </View>

                <View style={styles.detailList}>
                    <Text style={styles.text2}>11.19</Text>
                    <Text style={styles.buttonSelected}>   + 20000캐시 충전</Text>
                </View>
            </View>






        </SafeAreaView>
    );
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
    buttonSelected: {
        color: '#000066',
    },

    balance: {
        flex: 3,
        flexDirection: 'column',
    },
    date: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#e5e5e5',
        justifyContent: 'space-around',
        alignItems: 'center',

    },
    details: {
        flex: 6,
        backgroundColor: '#ffffff',
        flexDirection: 'column',
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

    select: {
        flexDirection: 'row',
        padding: 10,
        justifyContent: 'flex-end',
        borderBottomColor: '#666666',
        borderBottomWidth: 0.3,
    },
    detailList: {
        padding: 20,
        flexDirection: 'row',
    },

});

export default PaymentScreen;
