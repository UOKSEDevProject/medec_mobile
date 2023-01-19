import React from 'react';
import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {color} from '../../styles/colors';
import {fonts} from '../../styles/fonts';

const CAlert = props => {
  const {title, massage, cancel, exit, retry, visible, setVisible} = props;
  return (
    <Modal transparent visible={visible}>
      <View style={styles.screen}>
        <View style={styles.alertContainer}>
          {title ? <Text style={styles.title}>{title}</Text> : null}
          {massage ? <Text style={styles.massage}>{massage}</Text> : null}
          <View style={styles.buttonContainer}>
            {exit ? (
              <TouchableOpacity onPress={exit}>
                <Text style={styles.btn}>EXIT</Text>
              </TouchableOpacity>
            ) : null}

            {cancel ? (
              <TouchableOpacity onPress={() => setVisible(false)}>
                <Text style={styles.btn}>CANCEL</Text>
              </TouchableOpacity>
            ) : null}

            {retry ? (
              <TouchableOpacity
                onPress={() => {
                  retry();
                  setVisible(false);
                }}>
                <Text style={styles.btn}>RETRY</Text>
              </TouchableOpacity>
            ) : null}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: color.alertBG,
    justifyContent: 'center',
    alignItems: 'center',
  },
  alertContainer: {
    justifyContent: 'center',
    width: '80%',
    backgroundColor: color.white,
    paddingHorizontal: 20,
    paddingVertical: 35,
    borderRadius: 15,
  },
  title: {
    fontSize: 20,
    color: color.black,
  },
  massage: {
    fontSize: 17,
    padding: 5,
    marginBottom: 15,
    color: color.black,
    fontFamily: fonts.regular,
  },
  buttonContainer: {
    padding: 5,
    flexDirection: 'row',
    position: 'absolute',
    bottom: 10,
    right: 20,
  },
  btn: {
    fontSize: 15,
    fontFamily: fonts.medium,
    marginHorizontal: 10,
    color: color.red,
  },
});

export default CAlert;
