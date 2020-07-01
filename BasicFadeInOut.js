import React, {useState, useEffect} from 'react';
import {View, Text, TouchableWithoutFeedback, StyleSheet} from 'react-native';
import {Spring} from 'react-spring/renderprops-native';

function BasicFadeInOut() {
  const [hidden, setHidden] = useState(false);

  useEffect(function() {
    console.log('redraw');
  });

  function updateHiddenState() {
    setHidden(state => !state);
  }

  return (
    <View style={styles.container}>
      <Spring from={{number: 1}} to={{number: hidden ? 0 : 1}}>
        {springProps => {
          return (
            <>
              <Text style={[styles.text, {opacity: springProps.number}]}>
                Yo!
              </Text>
              <Text>{springProps.number.toFixed(2)}</Text>
            </>
          );
        }}
      </Spring>
      <TouchableWithoutFeedback onPress={updateHiddenState}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Click me</Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  button: {
    backgroundColor: 'cyan',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 4,
  },
  buttonText: {
    fontWeight: 'bold',
  },
});

export default BasicFadeInOut;
