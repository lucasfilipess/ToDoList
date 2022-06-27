import React from 'react';
import {Text, TouchableOpacity, TouchableOpacityProps} from 'react-native';
import {styles} from './styles';

type ButtonProps = TouchableOpacityProps & {
  label: string;
};

const Button: React.FC<ButtonProps> = ({label, disabled, ...rest}) => {
  const opacity = disabled ? 0.7 : 1;
  return (
    <TouchableOpacity
      style={{...styles.button, opacity}}
      disabled={disabled}
      {...rest}>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

export default Button;
