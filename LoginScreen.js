import React, {useState, useEffect} from 'react';
import {View, Text, TouchableWithoutFeedback, StyleSheet} from 'react-native';
import {useSpring, useTransition, animated, config} from 'react-spring';

const AnimatedView = animated(View);

const backgroundActions = [
  {id: 1, message: 'Check user & pass'},
  {id: 2, message: 'Trying to fetch a user'},
  {id: 3, message: 'Being sure it is you'},
  {id: 4, message: "Ok, let's start!"},
];

function LoginScreen() {
  const [clicked, setClicked] = useState(false);
  const [index, setIndex] = useState(0);

  const {size} = useSpring({
    size: clicked ? 1000 : 0,
    from: {
      size: 0,
    },
  });

  const transitions = useTransition(backgroundActions[index], item => item.id, {
    from: {opacity: 0, top: 40},
    enter: {opacity: 1, top: 0},
    leave: {opacity: 0, top: -40},
    dellay: 250,
    config: config.molasses,
  });

  useEffect(() => {
    if (clicked) {
      setInterval(() => {
        setIndex(state => (state + 1) % 4);
      }, 2000);
    }
  }, [clicked]);

  return (
    <View style={s.container}>
      <AnimatedView
        style={[
          s.animatedBox,
          {
            width: size.interpolate(s => s),
            height: size.interpolate(s => s),
          },
        ]}
      />
      {!clicked && (
        <TouchableWithoutFeedback onPress={() => setClicked(state => !state)}>
          <View style={s.button}>
            <Text style={s.text}>Login</Text>
          </View>
        </TouchableWithoutFeedback>
      )}
      {clicked && (
        <View style={s.wordsTransitionContainer}>
          {transitions.map(({item, props, key}) => {
            return (
              <AnimatedView key={key} style={[s.animatedSlideBox, props]}>
                <Text style={s.text}>{item.message}</Text>
              </AnimatedView>
            );
          })}
        </View>
      )}
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  animatedBox: {
    position: 'absolute',
    backgroundColor: 'cyan',
    width: 0,
    height: 0,
    borderRadius: 500,
  },
  button: {
    backgroundColor: 'cyan',
    paddingHorizontal: 48,
    paddingVertical: 16,
    borderRadius: 5,
  },
  text: {
    fontWeight: 'bold',
  },
  wordsTransitionContainer: {
    position: 'relative',
    width: '100%',
    justifyContent: 'center',
  },
  animatedSlideBox: {
    position: 'absolute',
    width: '100%',
    alignItems: 'center',
  },
});

export default LoginScreen;
