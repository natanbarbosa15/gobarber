import React from 'react';
import { render } from '@testing-library/react';

import Tooltip from '../../components/Tooltip';

describe('Tooltip component', () => {
  it('should be able to render an tooltip', () => {
    const { getByText } = render(<Tooltip title="Title">Description</Tooltip>);

    expect(getByText('Title')).toBeTruthy();
    expect(getByText('Description')).toBeTruthy();
  });

  it('should be able to render an tooltip with class name', () => {
    const { getByText, getByTestId } = render(
      <Tooltip title="Title" className="test-class">
        Description
      </Tooltip>,
    );

    expect(getByText('Title')).toBeTruthy();
    expect(getByText('Description')).toBeTruthy();

    const tooltipContainer = getByTestId('tooltip-container');

    expect(tooltipContainer).toBeTruthy();
    expect(tooltipContainer).toHaveClass('test-class');
  });
});
