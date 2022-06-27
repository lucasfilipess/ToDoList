import React from 'react';
import {
  TextInput as ReactNativeTextInput,
  TextInputProps as ReactNativeTextInputProps,
} from 'react-native';
import {styles} from './styles';

type TextInputProps = ReactNativeTextInputProps & {
  width?: number;
};

const TextInput: React.FC<TextInputProps> = ({width = 200, ...rest}) => {
  return (
    <ReactNativeTextInput style={{...styles.textInput, width}} {...rest} />
  );
};

export default TextInput;
