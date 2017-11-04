import React from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import CounterCard from '../CounterCard';
import store from '../../store/cards';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#222',
  },
  playBtn: {
    position: 'absolute',
    bottom: 60,
  },
});

const Layout = () => {
  return (
    <View style={styles.container}>
      <CounterCard
        onIncrement={() =>
          store.dispatch({
            type: 'INCREMENT',
          })
        }
        onDecrement={() =>
          store.dispatch({
            type: 'DECREMENT',
          })
        }
      />
      <View style={styles.playBtn}>
        <Text> Play </Text>
      </View>
    </View>
  );
};

module.exports = Layout;
