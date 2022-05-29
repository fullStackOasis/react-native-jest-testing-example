# Simple React Native Jest Testing Example

This project is built for Android. It may work for iOS, but hasn't been tested there.

[Instructions for creating a simple React Native project are here.](https://reactnative.dev/docs/environment-setup) I followed those to create my project template:

```
npx react-native init ReactNativeJestTestingExample
```

This creates a directory, `ReactNativeJestTestingExample`, containing a simple React Native app that's ready to run.

After getting everything set up, the instructions say

> cd "ReactNativeJestTestingExample" && npx react-native run-android

The instructions that you see there from the CLI are incorrect, and you'll see an error if you follow them. To avoid that, open a second terminal and `npx react-native start` to run Metro server.

After creating the application using the standard boilerplate, I add a component and modified the app quite a bit, because I wanted to create tests for a bug that I'd run across in my development work.

The app has been checked in with a bug that will cause the app to crash on Android.

# the template test

Here's the React Native testing documentation.

https://reactnative.dev/docs/testing-overview#structuring-tests

Our template project has a test built in. It's here: `__tests__/App-test.js`.

Run the test: `npm test`. You must use `npm` and not `npx`.

This is the output:

```

> reactnativejesttestingexample@0.0.1 test
> jest

 PASS  __tests__/App-test.js (5.065 s)
  ✓ renders correctly (3538 ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        5.099 s
Ran all test suites.
```

The `App-test.js` test doesn't do much:

```
it('renders correctly', () => {
  renderer.create(<App />);
});
```

# another component test

Here's a more meaningful test.

https://reactnative.dev/docs/testing-overview#structuring-tests

Replace the current display content [with something more functional](https://github.com/fullStackOasis/react-native-jest-testing-example/blob/main/components/FlexibleContent.js), a `KeyboardAvoidingView` with some text inputs.

I added `styled-components`, because I wanted to add a test for a problem that I had experienced in a real project.

Unfortunately, I ran into [a problem during the install](https://stackoverflow.com/questions/65802896/installing-styled-components-failed-in-react-native). I wound up deleting `node_modules` and installing all dependencies via `yarn`, which worked:

```
yard add react react-native styled-components
yarn add --dev @testing-library/jest-native
```

Now I can install the app, run it, and test it manually:

(Terminal 1)
```
npx react-native start
```

(Terminal 2)
```
npx react-native run-android
```

[Here's a screenrecording of the app that demonstrates how the KeyboardAvoidingView works](https://youtube.com/shorts/OeRM2tuBlF4).

We're on our way to a functioning form with `TextInput`s. But there are no tests, so every time you tweak something, you run the risk of unknowingly breaking the app. And there's no way to easily exercise any code that you add.

In fact, the code as it is contains a bug, but you can't tell that, because the demo app doesn't exercise all the code in the `FlexibleContent` component. The code in `App.js` doesn't define `isPortal` prop on `FlexibleContent`, so the styled `KeyboardAvoidingView` has height set to `auto`:

```
      <FlexibleContent
      style={{
        backgroundColor: '#EFEFEF',
        padding: 0,
        height:'auto'
        }
      }
      >
```

It's not really clear that `auto` height is valid, but the app doesn't complain.

What if `FlexibleContent` has `isPortal` set to true?
```
      <FlexibleContent
      style={{
        backgroundColor: '#EFEFEF',
        padding: 0,
        height:'auto'
        }
      }
      isPortal={true}
      >
```

In that case, the `KeyboardAvoidingView` will get height set to `100px`:

```
  <FlexibleContentKeyboardAvoidingView
  behavior="padding"
  height={this.props.isPortal ? '100px' : 'auto'}
  >
```
and the app crashes on Android. You might see a redbox error with `Error while updating property 'height' in shadow node of...`. Or the app just might crash without an explanation. On Android, you'll see a stack trace that starts with the unhelpful `java.lang.IllegalStateException: com.facebook.react.uimanager.IllegalViewOperationException: ViewManager for tag 59 could not be found.`.

What happened was that height is not allowed to be a string like `100px`. It's easy to see how a developer might accidentally set height to this string value. The `styled-components` library allows you to use heights like `100px` with pixels and other units attached. We're mixing styled components and regular React Native components, which can lead to a little bug like this. It is surprisingly difficult to debug.

The tests in `FlexibleContent-test.js` were written to exercise both code paths: the one where the `KeyboardAvoidingView` has `height` set to `100px` and the one where it's set to `auto`. Unfortunately, I see no way to just make these tests crash when an invalid `height` is passed in. If the developer is so foolish as to set `height` to the string "monkey butt", and then write a test that expects the height to be "monkey butt", then the test will pass, and a bug will exist in the code.

You just have to know the [valid values for a `View`'s height property in React Native](https://reactnative.dev/docs/height-and-width). Notice the documentation states:

>All dimensions in React Native are unitless, and represent density-independent pixels.

You **can** use percentage dimensions in a style, like so: `<View style={{ height: '100%' }}>`.

It's actually quite difficult to find what the allowed values are for height and width when searching through the [React Native documentation](https://reactnative.dev/). :/