import React from 'react';
import { render } from '@testing-library/react';
import PageBase from './PageBase';

jest.mock('@/components/headers', () => ({
   HeaderBase: () => <header data-testid="mock-header">Header</header>,
}));
jest.mock('@/providers/AuthContext', () => ({
  AuthProvider: ({ children, ...props }) => (
    <div
      data-testid="mock-auth-provider"
      redirectlogin={props.redirectLogin ? props.redirectLogin.toString() : ''}
      spinnerheight={props.spinnerHeight ?? ''}
    >
      {children}
    </div>
  ),
}));

describe('PageBase', () => {
   it('renders header and children when not authProtected', () => {
      const { getByTestId, getByText, container } = render(
         <PageBase>Content</PageBase>
      );
      expect(container.querySelector('.PageBase')).toBeInTheDocument();
      expect(getByTestId('mock-header')).toBeInTheDocument();
      expect(getByText('Content')).toBeInTheDocument();
   });

   it('wraps with AuthProvider when authProtected', () => {
      const { getByTestId, getByText, container } = render(
         <PageBase authProtected>Secret</PageBase>
      );
      expect(getByTestId('mock-auth-provider')).toBeInTheDocument();
      expect(getByTestId('mock-header')).toBeInTheDocument();
      expect(getByText('Secret')).toBeInTheDocument();
      expect(container.querySelector('.PageBase')).toBeInTheDocument();
   });

   it('passes correct props to AuthProvider', () => {
      const { getByTestId } = render(
         <PageBase authProtected>Test</PageBase>
      );
      const authProvider = getByTestId('mock-auth-provider');
      expect(authProvider.getAttribute('redirectlogin')).toBe('true');
      expect(authProvider.getAttribute('spinnerheight')).toBe('98vh');
   });
});
