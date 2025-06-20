import React from 'react';
import { render } from '@testing-library/react';
import Spinner from './Spinner';

describe('Spinner', () => {
   it('renders without crashing', () => {
      const { container } = render(<Spinner />);
      expect(container.querySelector('.Spinner')).toBeInTheDocument();
      expect(container.querySelector('.spinner__circle')).toBeInTheDocument();
   });

   it('applies the default minHeight style', () => {
      const { container } = render(<Spinner />);
      const spinnerDiv = container.querySelector('.Spinner');
      expect(spinnerDiv).toHaveStyle('min-height: 3rem');
   });

   it('applies a custom minHeight style when height prop is provided', () => {
      const { container } = render(<Spinner height="5rem" />);
      const spinnerDiv = container.querySelector('.Spinner');
      expect(spinnerDiv).toHaveStyle('min-height: 5rem');
   });
});
