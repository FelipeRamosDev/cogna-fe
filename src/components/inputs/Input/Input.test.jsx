import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Input from './Input';

jest.mock('@/helpers/parse', () => ({
   parseCSS: (...args) => args.filter(Boolean).join(' '),
}));

describe('Input', () => {
   it('renders input with label', () => {
      const { getByLabelText } = render(
         <Input id="test-input" label="Test Label" />
      );
      expect(getByLabelText('Test Label')).toBeInTheDocument();
   });

   it('renders input without label', () => {
      const { container } = render(<Input id="test-input" />);
      expect(container.querySelector('input#test-input')).toBeInTheDocument();
   });

   it('applies className and Input class', () => {
      const { container } = render(<Input id="test-input" className="custom" />);
      expect(container.firstChild.className).toContain('custom');
      expect(container.firstChild.className).toContain('Input');
   });

   it('passes props to input and handles onChange', () => {
      const handleChange = jest.fn();
      const { getByPlaceholderText } = render(
         <Input id="test-input" placeholder="Type here" onChange={handleChange} />
      );
      const input = getByPlaceholderText('Type here');
      fireEvent.change(input, { target: { value: 'abc' } });
      expect(handleChange).toHaveBeenCalled();
   });
});
