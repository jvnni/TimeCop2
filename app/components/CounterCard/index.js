import React from 'react';
import {
  StyleSheet,
  Text,
  Animated,
  PanResponder,
} from 'react-native';
import store from '../../store/cards';

const styles = StyleSheet.create({
  counter: {
    width: 84,
    height: 84,
    borderRadius: 6,
    backgroundColor: 'yellow',
    overflow: 'hidden',
  },
  counterText: {
    textAlign: 'center',
    color: 'black',
    fontSize: 23,
    fontWeight: 'bold',
    lineHeight: 84,
    height: 84,
  },
});

class CounterCard extends React.Component {
  constructor(props) {
    super(props);
    this.Increment = this.props.onIncrement.bind(this);
    this.Decrement = this.props.onDecrement.bind(this);
    this.state = {
      x: 0,
      translateAnim: new Animated.Value(0),
    };
    this.panResponder = {};
    this.handlePanResponderMove = this.handlePanResponderMove.bind(this);
    this.handlePanResponderRelease = this.handlePanResponderRelease.bind(this);
  }

  componentWillMount() {
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: this.handlePanResponderMove,
      onPanResponderRelease: this.handlePanResponderRelease,
    });
  }

  handlePanResponderMove(e, gestureState) {
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
  }

  handlePanResponderRelease() {
    this.setState({
      x: 0,
    });
    Animated.spring(
      this.state.translateAnim,
      {
        toValue: 0,
        duration: 300,
        bounciness: 12,
      },
    ).start();
  }

  render() {
    const animationStyles = StyleSheet.create({
      move: {
        transform: [{
          translateX: this.state.x,
        }],
      },
      release: {
        transform: [{
          translateX: this.state.translateAnim,
        }],
      },
    });

    return (
      <Animated.View
        style={[
          styles.counter,
          animationStyles.move,
          animationStyles.release,
        ]}
        {...this.panResponder.panHandlers}
      >
        <Text style={styles.counterText}>{store.getState()}</Text>
      </Animated.View>
    );
  }
}

module.exports = CounterCard;
