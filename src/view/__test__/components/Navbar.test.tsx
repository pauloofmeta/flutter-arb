import { render } from '@testing-library/react';
import { Navbar } from '../../components/Navbar';
import React from 'react';

describe('Navbar', () => {
  it('should render correctly', () => {
    const { container } = render(<Navbar />);
    expect(container).toBeTruthy();
  });
});
