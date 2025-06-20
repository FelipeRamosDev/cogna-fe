import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FormProvider from './FormControl';
import FormInput from './FormInput';

// Mock the Input component to simplify testing
jest.mock('@/components/inputs', () => ({
   Input: ({ value, onChange, ...props }) => (
      <input data-testid="mock-input" value={value} onChange={onChange} {...props} />
   ),
}));

describe('FormInput component', () => {
   it('renders with default type and value', () => {
      render(
         <FormProvider initialValues={{ name: 'John' }} onSubmit={jest.fn()}>
            <FormInput fieldName="name" />
         </FormProvider>
      );
      const input = screen.getByTestId('mock-input');
      expect(input).toBeInTheDocument();
      expect(input.value).toBe('John');
      expect(input.type).toBe('text');
   });

   it('updates value on change', () => {
      render(
         <FormProvider initialValues={{ name: '' }} onSubmit={jest.fn()}>
            <FormInput fieldName="name" />
         </FormProvider>
      );
      const input = screen.getByTestId('mock-input');
      fireEvent.change(input, { target: { value: 'Jane' } });
      expect(input.value).toBe('Jane');
   });

   it('supports different input types', () => {
      render(
         <FormProvider initialValues={{ age: 30 }} onSubmit={jest.fn()}>
            <FormInput fieldName="age" type="number" />
         </FormProvider>
      );
      const input = screen.getByTestId('mock-input');
      expect(input.type).toBe('number');
      expect(input.value).toBe('30');
   });

   it('passes extra props to the input', () => {
      render(
         <FormProvider initialValues={{ email: '' }} onSubmit={jest.fn()}>
            <FormInput fieldName="email" type="email" placeholder="Type your email" />
         </FormProvider>
      );
      const input = screen.getByTestId('mock-input');
      expect(input.placeholder).toBe('Type your email');
      expect(input.type).toBe('email');
   });
});
