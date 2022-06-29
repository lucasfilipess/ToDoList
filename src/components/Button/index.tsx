import React from 'react';
import {Text, TouchableOpacity, TouchableOpacityProps} from 'react-native';
import {styles} from './styles';

type ButtonProps = TouchableOpacityProps & {
  label: string;
  fontWeight?:
    | 'bold'
    | 'normal'
    | '100'
    | '200'
    | '300'
    | '400'
    | '500'
    | '600'
    | '700'
    | '800'
    | '900';
  fontSize?: number;
};

const Button: React.FC<ButtonProps> = ({
  label,
  disabled,
  fontWeight = 'normal',
  fontSize = 14,
  ...rest
}) => {
  const opacity = disabled ? 0.7 : 1;
  return (
    <TouchableOpacity
      style={{...styles.button, opacity}}
      disabled={disabled}
      {...rest}>
      <Text
        style={{
          ...styles.label,
          fontWeight,
          fontSize,
        }}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
