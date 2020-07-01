import React, {useState} from 'react';
import {View, Image, TouchableWithoutFeedback, StyleSheet} from 'react-native';
import {useSpring, animated} from 'react-spring/native';

import lofi1 from './assets/images/lofifull1.jpg';
import lofi2 from './assets/images/lofifull3.jpg';

const AnimatedView = animated(View);

function Card() {
  const [flipped, setFlipped] = useState(false);

  const {opacity, rotate} = useSpring({
    opacity: flipped ? 0 : 1,
    rotate: flipped ? 180 : 0,
    from: {
      opacity: 1,
      rotate: 0,
    },
    config: {mass: 5, tension: 500, friction: 80},
  });

  function handleCardPress() {
    setFlipped(state => !state);
  }

  function renderWithUseSpring() {
    return (
      <TouchableWithoutFeedback onPress={handleCardPress}>
        <View style={styles.container}>
          <View style={styles.innerContainer}>
            <AnimatedView
              style={[
                styles.imageContainer,
                {
                  opacity: opacity.interpolate(
                    currentOpacity => currentOpacity,
                  ),
                  transform: [
                    {perspective: 800},
                    {
                      rotateX: rotate.interpolate(
                        currentRotation => `${currentRotation}deg`,
                      ),
                    },
                  ],
                },
              ]}>
              <Image source={lofi1} style={styles.image} />
            </AnimatedView>
            <AnimatedView
              style={[
                styles.imageContainer,
                {
                  opacity: opacity.interpolate(
                    currentOpacity => 1 - currentOpacity,
                  ),
                  transform: [
                    {perspective: 800},
                    {
                      rotateX: rotate.interpolate(
                        currentRotation => `${180 + currentRotation}deg`,
                      ),
                    },
                  ],
                },
              ]}>
              <Image source={lofi2} style={styles.image} />
            </AnimatedView>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  return renderWithUseSpring();
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerContainer: {
    position: 'relative',
    height: '100%',
    width: '100%',
  },
  imageContainer: {
    height: '100%',
    width: '100%',
    position: 'absolute',
  },
  image: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
  },
  textCheck: {
    marginBottom: 40,
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default Card;
