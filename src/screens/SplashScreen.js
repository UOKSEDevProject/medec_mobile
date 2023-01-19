import React from 'react';
import {Image, Modal, StyleSheet, View} from 'react-native';
import * as Progress from 'react-native-progress';
import {color} from '../styles/colors';

const SplashScreen = props => {
  const {onLoad} = props;

  return (
    <Modal transparent visible={onLoad} style={styles.screen}>
      <View style={styles.screenLogo}>
        <Image
          source={require('../../assets/images/splashIcon.png')}
          resizeMode={'contain'}
          style={{height: '30%'}}
        />
      </View>
      <View style={styles.progressContainer}>
        <Progress.Circle size={30} indeterminate={true} color={color.white} />
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: color.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  screenLogo: {
    flex: 1,
    backgroundColor: color.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressContainer: {
    alignItems: 'center',
    paddingBottom: 5,
    backgroundColor: color.white,
  },
});
export default SplashScreen;
