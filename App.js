/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import FlexibleContent from './components/FlexibleContent';

const App = ()  => {

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
      style={styles.scrollView}
      >
      <FlexibleContent
      style={{
        backgroundColor: '#EFEFEF',
        padding: 0,
        height:'auto'
        }
      }
      isPortal={true}
      >
      <View>
        <Text style={styles.description}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Mauris porta sapien non scelerisque faucibus.
        Fusce condimentum neque at justo venenatis, ac ullamcorper diam tempor.
        Aenean interdum turpis orci, non laoreet orci aliquam eget.
        </Text>
      </View>
      <View>
        <Text style={styles.description}>
          First Name
        </Text>
      </View>
      <View>
        <TextInput 
        style={styles.input}
        placeholder={"Enter First Name"}
        />
      </View>
      <View>
        <Text style={styles.description}>
        Last Name
        </Text>
      </View>
      <View>
        <TextInput 
        style={styles.input}
        placeholder={"Enter Last Name"}
        />
      </View>
      <View>
        <Text style={styles.description}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Mauris porta sapien non scelerisque faucibus.
        Fusce condimentum neque at justo venenatis, ac ullamcorper diam tempor.
        Aenean interdum turpis orci, non laoreet orci aliquam eget.
        </Text>
      </View>
      <View>
          <TextInput 
        style={styles.input}
        placeholder={"Enter Ipsum"}
        />
      </View>
      <View>
        <Text style={styles.description}>
        Pellentesque congue viverra pharetra.
        Praesent dignissim sed nisl et hendrerit.
        Vestibulum in erat vitae diam luctus commodo.
        Maecenas dictum a risus quis venenatis
        </Text>
      </View>
      <View>
        <TextInput 
        style={styles.input}
        placeholder={"Enter Lorem"}
        />
      </View>
      </FlexibleContent>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  container: {
    flex: 1
  },
  highlight: {
    fontWeight: '700',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 4,
    borderColor: '#4b23db',
    padding: 10,
    color: '#4b23db',
  },
  description: {
    margin: 12,
    borderWidth: 1,
    borderColor: '#4b23db',
    padding: 10,
    color: '#4b23db',
  },
  scrollView: {
    backgroundColor: 'pink',
    marginHorizontal: 20,
  },
});

export default App;
