import React, { useContext, useState, useEffect } from 'react';
import { View, StyleSheet, Text, Button, StatusBar, TouchableOpacity, Image } from 'react-native';
import { ProgressBar } from 'react-native-paper';

import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthContext } from '../../App';
import { Context as PointContext } from '../context/PointContext';


const HomeScreen = ({ navigation }) => {
    const { signOut } = useContext(AuthContext);
    const [isLoading, setLoading] = useState(false);
    const { state, getBalance } = useContext(PointContext);
    const [accumPoint, setAccum] = useState('');

    useEffect(() => {
        setLoading(false);
        getBalance();
    }, [])

    useEffect(() => {
        if (state.accumPoint !== undefined) {
            setAccum(state.accumPoint);
        };
        setLoading(true);
    }, [state]);

    function setupGrade(accumPoint) {
        if (accumPoint < 2000) {
            return 'Bronze Potato';
        } else if (accumPoint < 5000) {
            return 'Silver Melon';
        } else if (accumPoint < 10000) {
            return 'Gold Lettuce';
        } else if (accumPoint < 30000){
            return 'Gold Apple';
        } else {
            return 'Navy Tomato'
        }
    };

    function setMax(accumPoint) {
        if (accumPoint < 2000) {
            return 2000;
        } else if (accumPoint < 5000) {
            return 5000;
        } else if (accumPoint < 10000) {
            return 10000;
        } else if (accumPoint < 30000){
            return 30000;
        } else {
            return 100000;
        }
    };

    return (
        <SafeAreaView style={styles.safe}>
            <StatusBar barStyle="light-content" backgroundColor="#080f2a" />

            <View style={styles.greeting}>
                <Text style={styles.text}>어서오세요 교찬님!</Text>
                <View style={styles.gradeText}>
                    <Text style={styles.text}>현재 </Text>
                    <Text style={styles.yelloText}>{setupGrade(parseInt(accumPoint))}</Text>
                    <Text style={styles.text}> 입니다</Text>
                </View>
                <TouchableOpacity><Text style={{fontSize:13,color:'#999999'}}>스샐 등급 안내</Text></TouchableOpacity>

                <Text style={{ textAlign: 'right', color: '#ffffff' }}>({accumPoint}/{setMax(parseInt(accumPoint))})</Text>
                <ProgressBar progress={accumPoint / setMax(parseInt(accumPoint))} color={'#f6c52a'} />
            </View>


            <View style={styles.menu}>
                <View style={styles.menuLeft}>

                    <View style={styles.charge}>
                        <TouchableOpacity onPress={() => navigation.navigate('Charge')}>
                            <Image
                                source={require('../../assets/charge.png')}
                                style={{
                                    height: 100,
                                    width: 100,
                                }}
                            />
                            <Text style={styles.buttonText}>
                                충전
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.saladMenu}>
                        <TouchableOpacity
                            style={{ flexDirection: 'row', }}
                        >
                            <Image
                                source={require('../../assets/menu.png')}
                                style={{
                                    height: 60,
                                    width: 60,
                                }}
                            />
                            <Text style={styles.buttonText}>메뉴 확인</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.details}>
                        <TouchableOpacity
                            style={{ flexDirection: 'row', }}
                            onPress={() => navigation.navigate('Payment')}
                        >
                            <Image
                                source={require('../../assets/payDetails.png')}
                                style={{
                                    height: 60,
                                    width: 60,
                                }}
                            />
                            <Text style={styles.buttonText}>충전금 내역</Text>
                        </TouchableOpacity>
                    </View>

                </View>

                <View style={styles.menuRight}>

                    <View style={styles.cameraPay}>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('CameraPay')}
                        >
                            <Image
                                source={require('../../assets/camera.png')}
                                style={{
                                    height: 100,
                                    width: 100,
                                }}
                            />
                            <Text style={styles.buttonText}>
                                카메라 결제
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.inven}>
                        <TouchableOpacity
                            style={{ flexDirection: 'row', }}
                        >
                            <Image
                                source={require('../../assets/inven.png')}
                                style={{
                                    height: 60,
                                    width: 60,
                                }}
                            />
                            <Text style={styles.buttonText}>재고 확인</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.delivery}>
                        <TouchableOpacity
                            style={{ flexDirection: 'row', }}
                        >
                            <Image
                                source={require('../../assets/delivery.png')}
                                style={{
                                    height: 60,
                                    width: 60,
                                }}
                            />
                            <Text style={styles.buttonText}>스샐의 민족</Text>
                        </TouchableOpacity>
                    </View>

                </View>


            </View>


            <View style={styles.ad}>
                <Text style={styles.text}>광고</Text>
                <Button title="Sign out" onPress={() => signOut()} />
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
    greeting: {
        flex: 3,
        marginLeft: 30,
        marginRight: 30,
    },
    gradeText: {
        flexDirection: 'row',
    },


    menu: {
        flex: 4,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderTopColor: '#ffffff',
        borderWidth: 0.3,
        marginLeft: 30,
        marginRight: 30,
    },
    ad: {
        flex: 1,
    },
    text: {
        color: '#b2b2b2',
        fontSize: 25,
    },
    buttonText: {
        color: '#e5e5e5',
        textAlign: 'center',
        alignSelf: 'center',
    },
    yelloText: {
        color: '#f6c52a',
        fontSize: 25,
    },

    menuLeft: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderWidth: 0.3,
        borderRightColor: '#ffffff',
        
    },
    menuRight: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    charge: {
        flex: 0.5,
        borderWidth: 0.3,
        borderBottomColor: '#ffffff',
        alignItems: 'center',
    },
    saladMenu: {
        flex: 0.25,
        borderWidth: 0.3,
        borderBottomColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    details: {
        flex: 0.25,
        alignItems: 'center',
        justifyContent: 'center',
    },

    cameraPay: {
        flex: 0.5,
        borderWidth: 0.3,
        borderBottomColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inven: {
        flex: 0.25,
        borderWidth: 0.3,
        borderBottomColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    delivery: {
        flex: 0.25,
        alignItems: 'center',
        justifyContent: 'center',
    }

});

export default HomeScreen;
