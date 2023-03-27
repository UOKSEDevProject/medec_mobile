import React, {useEffect, useState} from 'react';
import {View, StyleSheet, StatusBar, SafeAreaView, LogBox} from 'react-native';
import SplashScreen from './src/screens/SplashScreen';
import WebApp from './src/screens/WebApp';
import PushController from './src/controller/PushController';
import {BACKEND_URL} from './src/constant/links';

setInterval(()=>{
    if(window.ReactNativeWebView) 
      {
        window.ReactNativeWebView.postMessage(JSON.stringify({location: window.location.href}));
      }
    }, 100)

LogBox.ignoreAllLogs();

const App = () => {
    const [onLoad, setOnLoad] = useState(true);
    const [FCMToken, setFCMToken] = useState('');

    const MyStatusBar = ({backgroundColor, ...props}) => (
        <View style={[styles.statusBar]}>
            <SafeAreaView>
                <StatusBar translucent {...props} />
            </SafeAreaView>
        </View>
    );

    return (
            <View style={styles.screen}>
                <MyStatusBar backgroundColor="red" barStyle="default"/>
                <SplashScreen onLoad={onLoad}/>
                {/* <WebApp setOnLoad={setOnLoad}/> */}
                <WebApp setOnLoad={setOnLoad} FCMToken={FCMToken}/>
                <PushController setFCMToken={setFCMToken} FCMToken={FCMToken}/>
            </View>
    );
};

const STATUSBAR_HEIGHT = StatusBar.currentHeight;

const styles = StyleSheet.create({
    screen: {flex: 1},
    statusBar: {
        height: STATUSBAR_HEIGHT,
    },
});

export default App;