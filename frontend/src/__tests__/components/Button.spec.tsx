import React from 'react';
import { render } from '@testing-library/react';

import Button from '../../components/Button';

describe('Button component', () => {
  it('should be able to render an button', () => {
    const { getByText } = render(
      <Button loading={false} type="submit">
        Entrar
      </Button>,
    );

    expect(getByText('Entrar')).toBeTruthy();
  });

  it('should be able to render an button with loading state', () => {
    const { getByText } = render(
      <Button loading type="submit">
        Entrar
      </Button>,
    );

    expect(getByText('Carregando...')).toBeTruthy();
  });
});
