import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Button, Divider } from 'react-native-elements';
import { Feather } from '@expo/vector-icons';

const IndexScreen = ({ navigation }) => {
    return (
        <View style={{flexDirection: 'column', flex: 1, justifyContent: 'space-between'}}>
            <View style={{flex: 3,
                          backgroundColor: 'skyblue',
                          padding: 20,
            }}>
                <Text style={styles.text}>안녕하세요</Text>
                <Text style={styles.text}> ____님 </Text>
                <Text style={styles.text}>현재 등급은 ___ 입니다.</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Grade')}>
                    <Text>등급 상세</Text>
                </TouchableOpacity>

            </View>
            <View style={{ flex: 1,
                           flexDirection: 'row',
                           justifyContent: 'space-between',
            }}>
                <View style={{flex:1,
                              marginRight: 5,
                              padding: 10,
                }}>
                    <Text style={{fontSize: 20, marginBottom: 10,}}>적립금 : </Text>
                    <Button
                        title="내역 확인"
                        onPress={() => navigation.navigate('Saving')}
                    />
                    <Button title="충전" />
                </View>

                <View style={{flex:1,
                              marginLeft: 5,
                              padding: 10
                }}>
                    <TouchableOpacity style={{ alignSelf: 'center' }}>
                        <Feather style={{fontSize:65,}} name="camera" />
                        <Text>카메라 결제</Text>
                    </TouchableOpacity>
                    
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    text: {
        fontSize: 20,
        marginBottom: 10
    }
});

export default IndexScreen;
