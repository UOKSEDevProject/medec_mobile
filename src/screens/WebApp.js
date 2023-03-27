import React, {useEffect, useRef, useState} from 'react';
import {WebView} from 'react-native-webview';
import {StyleSheet, View, BackHandler, Alert, Platform} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import RNRestart from 'react-native-restart';

import CAlert from '../components/Alert/CAlert';
import {WEB_VIEW_URL} from '../constant/links';

let jsCode = `setInterval(()=>{
  if(window.ReactNativeWebView) 
    {
      window.ReactNativeWebView.postMessage(JSON.stringify({location: window.location.href}));
    }
  }, 100)`;

const WebApp = props => {
  const {setOnLoad,FCMToken} = props;
  let webViewRef = useRef(null);
  const [messageData, setMessageData] = useState(WEB_VIEW_URL);
  const [exitAlertVisibility, setExitAlertVisibility] = useState(false);
  const [connectionAlertVisibility, setConnectionAlertVisibility] = useState(false);
  const [jsInject,setJsInject] = useState(null);

  useEffect(() => {
    const backAction = () => {
      if (Platform.OS === 'android') {
        if (messageData === WEB_VIEW_URL) {
          setExitAlertVisibility(true);
        } else {
          webViewRef.current.goBack();
        }
        return true;
      }
    };

    // back button handler
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    //check network connection
    const unsubscribe = NetInfo.addEventListener(state => {
      if (!state.isConnected) {
        errorHandler();
      }
    });

    return () => {
      backHandler.remove();
      unsubscribe();
    };
  }, [messageData]);

  useEffect(() => {
    if(FCMToken){
      sendDataToWebView();
    }
  },[FCMToken])

  const errorHandler = () => {
    setConnectionAlertVisibility(true);
  };

  const retryFunction = () => {
    if (messageData) {
      webViewRef.current.reload(); // reload webview
    } else {
      RNRestart.Restart(); // restart application
    }

    NetInfo.addEventListener(state => {
      if (!state.isConnected) {
        errorHandler();
      }
    });
  };

  function sendDataToWebView() {
    setJsInject(`
      setInterval(()=>{
        if(window.ReactNativeWebView) 
          {
            window.ReactNativeWebView.postMessage(JSON.stringify({location: window.location.href}));
          }
        }, 100); 
      window.sessionStorage.setItem('FCMToken',${JSON.stringify(FCMToken.token)});
    `);
  }

  return (
    <View style={styles.screen}>
      <WebView
        ref={webViewRef}
        source={{uri: WEB_VIEW_URL}}
        originWhitelist={['http://', 'https://']}
        allowsBackForwardNavigationGestures
        setBuiltInZoomControls={false}
        dataDetectorTypes
        startInLoadingState={true}
        onLoadStart={msg => {
          setMessageData(msg.nativeEvent.url);
        }}
        onLoadEnd={() => setOnLoad(false)}
        cacheEnabled={true}
        showsVerticalScrollIndicator={false}
        onMessage={msg => {
          if (
            msg.nativeEvent.data &&
            JSON.parse(msg.nativeEvent.data).location !== messageData
          ) {
            setMessageData(JSON.parse(msg.nativeEvent.data).location);
          }
        }}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        // injectedJavaScript={`${jsCode}`}
        injectedJavaScript={`${jsInject}`}
        userAgent="Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:90.0) Gecko/20100101 Firefox/90.0"
      />

      <CAlert
        massage={'Are you sure ?'}
        exit={() => BackHandler.exitApp()}
        cancel
        visible={exitAlertVisibility}
        setVisible={setExitAlertVisibility}
      />
      <CAlert
        massage={'Please check your internet connection'}
        exit={() => BackHandler.exitApp()}
        retry={() => retryFunction()}
        visible={connectionAlertVisibility}
        setVisible={setConnectionAlertVisibility}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
export default WebApp;
