import React from 'react';
import { RectButtonProperties } from 'react-native-gesture-handler';

import PropTypes from 'prop-types';

import { Container, ButtonText } from './styles';

interface ButtonProps extends RectButtonProperties {
  children: string;
}

const Button: React.FC<ButtonProps> = ({ children, ...rest }) => (
  <Container {...rest}>
    <ButtonText>{children}</ButtonText>
  </Container>
);

Button.propTypes = {
  children: PropTypes.string.isRequired,
};

export default Button;
