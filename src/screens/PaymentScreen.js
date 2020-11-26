import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, Text, Button, TouchableOpacity, StatusBar, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Context as PointContext } from '../context/PointContext';

const PaymentScreen = ({ navigation }) => {
    const { state, getBalance, getDetails } = useContext(PointContext);
    const [details, setDetails] = useState([]);
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(false);
        getBalance();
        getDetails();
    }, []);

    useEffect(() => {
        if (state.details) {
            setDetails(state.details.filter(detail => detail.pointId !== 'balance'));
        };
        setLoading(true);
    }, [state]);


    function charge() {
        setDetails(state.details.filter(detail => (detail.pointId !== 'balance') && detail.plus));
    };

    function pay() {
        setDetails(state.details.filter(detail => (detail.pointId !== 'balance') && !detail.plus));
    };




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



            <View style={styles.date}>
                <Text style={styles.buttonSelected}>1주일</Text>
                <Text style={styles.text2}>1개월</Text>
                <Text style={styles.text2}>3개월</Text>
                <Text style={styles.text2}>6개월</Text>
            </View>





            <View style={styles.details}>
                {isLoading ? (
                     <View style={styles.select}>
                         <TouchableOpacity onPress={() => {
                                 setDetails(state.details.filter(detail => detail.pointId !== 'balance'));
                         }}>
                             <Text>전체</Text>
                         </TouchableOpacity>
                         <Text>  |  </Text>
                         <TouchableOpacity onPress={() =>
                             setDetails(state.details.filter(detail => (detail.pointId !== 'balance') && detail.plus))
                         }>
                             <Text>충전</Text>
                         </TouchableOpacity>
                         <Text>  |  </Text>
                         <TouchableOpacity onPress={() =>
                             setDetails(state.details.filter(detail => (detail.pointId !== 'balance') && !detail.plus))
                         }>
                             <Text>사용</Text>
                         </TouchableOpacity>


                     </View>
                 ) : null}
                

                    <FlatList
                        data = {details}
                        keyExtractor = {(detail => detail.createdAt )}
                        renderItem = {({ item }) => {
                                const createdSec = new Date(item.createdAt);
                                const createdYear = createdSec.getFullYear();
                                const createdMonth = createdSec.getMonth() + 1;
                                const createdDay = createdSec.getDate();


                                const createdAt = `${createdYear}. ${createdMonth}.${createdDay}`;
                                let statement;


                                if (item.plus) {
                                    if (item.cashAmount == 0) {
                                        statement = `+ ${item.pAmount}포인트`;
                                    }else {
                                        statement = `+ ${item.cashAmount}캐시`;
                                    }
                                } else {
                                    if (item.cashAmount == 0) {
                                        statement = `- ${item.pAmount}포인트`;
                                    } else if (item.pAmount == 0) {
                                        statement = `- ${item.cashAmount}캐시`;
                                    } else {
                                        statement = `- ${item.cashAmount}캐시 (${item.pAmount}포인트 차감)`
                                    }
                                }
                                


                                return (
                                    <View style={{ flexDirection: 'row', borderColor: 'white', borderBottomColor: 'black', borderWidth: 0.2, padding: 5, margin: 5, }}>
                                        <Text>{createdAt}</Text>
                                        {item.plus ? (
                                             <Text>   {statement}</Text>
                                        ) : (
                                             <Text style={styles.redText}>   {statement}</Text>
                                        )}
                                    </View>
                                )
                        }}
                    />
                
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
