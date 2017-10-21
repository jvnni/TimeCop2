import React, { Component } from 'react';
import { createStore } from 'redux';
import {
  StyleSheet,
  Text,
  View,
  Animated,
  PanResponder,
} from 'react-native';
import createReactClass from 'create-react-class';

const counter = (state = 1, action) => {
  switch (action.type) {
    case 'INCREMENT':
      console.log('hola');
      return state + 1;
    case 'DECREMENT':
      return state -1
    default:
      return state;
  }
};

const store = createStore(counter);

class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.value = this.props.value;
    this.Increment = this.props.onIncrement.bind(this);
    this.Decrement = this.props.onDecrement.bind(this);
    this.state = {
      x: 0,
      translateAnim: new Animated.Value(0),
    };
    this._panResponder = {};
    this.handlePanResponderMove = this.handlePanResponderMove.bind(this);
    this.handlePanResponderRelease = this.handlePanResponderRelease.bind(this);
  }

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderMove: this.handlePanResponderMove,
      onPanResponderRelease: this.handlePanResponderRelease,
    });
  }

  handlePanResponderMove(e: Object, gestureState: Object) {
    this.setState({
      x: gestureState.dx,
      translateAnim: new Animated.Value(gestureState.dx),
    });
    if (this.state.x > 120) {
      this.Increment();
    }
    if (this.state.x < -120 && store.getState() >= 2) {
      this.Decrement();
    }
    console.log();
  }

  handlePanResponderRelease(e: Object, gestureState: Object) {
    this.setState({
      x: 0,
    });
    Animated.spring(
      this.state.translateAnim,
      {
        toValue: 0,
        duration: 300,
        bounciness: 12,
      }
    ).start(); 
  }

  render() {
    const animationStyles = StyleSheet.create({
      counterMove: {
        transform: [{
          translateX: this.state.x,
        }],
      }  
    });

    const animationsStyles = StyleSheet.create({
      counterMove: {
        transform: [{
          translateX: this.state.translateAnim,
        }],
      }
    });

    return (
      <Animated.View 
        style={[
          styles.counter, 
          animationStyles.counterMove,
          animationsStyles.counterMove,
        ]}
        {...this._panResponder.panHandlers}
      >
        <Text style={styles.counterText}>{store.getState()}</Text>
      </Animated.View>
    )
  }
};

const App = createReactClass({
  render() {
    return (
      <View style={styles.container}>
        <Counter
          value={store.getState()}
          onIncrement={() =>
            store.dispatch({
              type: 'INCREMENT'
            })
          }
          onDecrement={() =>
            store.dispatch({
              type: 'DECREMENT'
            })
          }
        />
      </View>
    );
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ddd',
  },
  counter: {
    width: 78,
    height: 78,
    borderRadius: 5,
    backgroundColor: 'yellow',
    overflow: 'hidden',
  },
  counterText: {
    textAlign: 'center',
    color: 'black',
    fontSize: 21,
    fontWeight: 'bold',
    lineHeight: 64,
  }
});

module.exports = App;
