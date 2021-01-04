import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';

const CameraScreen = ({ navigation }) => {
    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);


    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    if (hasPermission === null) {
        return <View />;
    }

    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    function uuidv4() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    return (
        <View style={styles.container}>
          <Camera
            style={styles.camera}
            type={type}
            ref={ref => {
                this.camera = ref;
            }}
          >
            <View style={styles.whole}>
              <View style={styles.shelter}></View>
              <View style={styles.filter}></View>
              <View style={styles.button}>
                <TouchableOpacity
                  style={styles.capture}
                  onPress={async () => {
                      if (this.camera) {
                          const data = await this.camera.takePictureAsync({ base64: true });
                          let timest = + new Date();
                          const payImg = {
                              "images": [
                                  {
                                      "format": "jpg",
                                      "name": "ssalad",
                                      "data": data.base64,
                                  }
                              ],
                              "lang": "ko",
                              "requestId": uuidv4(),
                              "resultType": "string",
                              "timestamp": timest,
                              "version": "V1"
                          }

                          try {
                              const response = await fetch('https://8e1669b556f14b8886ecd2947d0f1dc3.apigw.ntruss.com/custom/v1/5513/73694d5eb011cbfbdb5d55349681e56af0085a8f6bb4e3cf54f789665d0ad1b4/general', {
                                  method: 'POST',
                                  headers: {
                                      'Content-Type': 'application/json',
                                      'X-OCR-SECRET' : 'YnVWY01NalZHU0R0UU5iY2xSVlpabFNTVkRVeHJ4ZWs='
                                  },
                                  body: JSON.stringify(payImg)
                              });

                              let json = await response.json();
                              console.log(json.images[0].fields[0].inferText);
                              let price = json.images[0].fields[0].inferText;

                              navigation.navigate('CameraPay', {
                                  price: price,
                              });

                          } catch (e) {
                              console.log(e);
                          }
                      };
                  }}
                >
                  <View style={{ width: 50, height: 50, backgroundColor: 'black' }}></View>
                </TouchableOpacity>
              </View>
            </View>
          </Camera>
        </View>

    )

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    camera: {
        flex: 1,
    },
    whole: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    shelter: {
        height: 50,
    },
    filter: {
        width: 250,
        height: 80,
        borderStyle: 'dashed',
        borderWidth: 3,
        borderColor: 'steelblue',
        borderRadius: 10,
    },
    button: {
        width: 50,
        height: 50,
        backgroundColor: 'powderblue',
    },

})

export default CameraScreen;
