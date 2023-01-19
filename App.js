import React, {useState} from 'react';
import {View, StyleSheet, StatusBar, SafeAreaView, LogBox} from 'react-native';
import SplashScreen from './src/screens/SplashScreen';
import WebApp from './src/screens/WebApp';

LogBox.ignoreAllLogs();

const App = () => {
    const [onLoad, setOnLoad] = useState(true);

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
            <WebApp setOnLoad={setOnLoad}/>
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
