import React from 'react';
import { Text } from 'react-native';
import styles from '../styles/styles';

const CustomText = (props) => {
 const { style, children, ...rest } = props;
 return (
    <Text style={[styles.globalText, style]} {...rest}>
      {children}
    </Text>
 );
};

export default CustomText;
