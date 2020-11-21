import React from 'react';
import { View, StyleSheet, Text, Button, StatusBar, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


const HomeScreen = ({ navigation }) => {
    return (
            <SafeAreaView style={styles.safe}>
            <StatusBar barStyle="light-content" backgroundColor="#080f2a" />



            <View style={styles.greeting}>
                <Text style={styles.text}>어서오세요 자이스토리님!!</Text>
                <View style={styles.gradeText}>
                    <Text style={styles.text}>현재 </Text>
                    <Text style={styles.yelloText}>Bronze Potato</Text>
                    <Text style={styles.text}> 입니다</Text>
                </View>
            <TouchableOpacity><Text style={{fontSize:13,color:'#999999'}}>스샐 등급 안내</Text></TouchableOpacity>
            </View>





            <View style={styles.menu}>


            <View style={styles.menuLeft}>

            <View style={styles.charge}>
            <TouchableOpacity>
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
            <TouchableOpacity>
            <Text style={styles.buttonText}>메뉴 확인</Text>
            </TouchableOpacity>
            </View>

            <View style={styles.history}>
            <TouchableOpacity
        onPress={() => navigation.navigate('Payment')}
            >
            <Text style={styles.buttonText}>충전금 내역</Text>
            </TouchableOpacity>
            </View>

            </View>


            <View style={styles.menuRight}>

            <View style={styles.cameraPay}>
            <TouchableOpacity>
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
            <TouchableOpacity>
            <Text style={styles.buttonText}>재고 확인</Text>
            </TouchableOpacity>
            </View>

            <View style={styles.delivery}>
            <TouchableOpacity>
            <Text style={styles.buttonText}>스샐의 민족</Text>
            </TouchableOpacity>
            </View>

            </View>


            </View>





            <View style={styles.ad}>
            <Text style={styles.text}>광고</Text>
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
    history: {
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
