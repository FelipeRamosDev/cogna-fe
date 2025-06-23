import React from 'react';
import { render, waitFor, fireEvent } from '@testing-library/react';
import MyProfileContent from './MyProfileContent';

// Mocks
const mockLogout = jest.fn();
const mockUser = { id: '1', name: 'Test User', email: 'test@email.com' };
jest.mock('@/providers/AuthContext', () => ({
  useAuth: () => ({ user: mockUser, logout: mockLogout })
}));

const mockGet = jest.fn();
jest.mock('@/services/AJAX', () => () => ({ get: mockGet }));

jest.mock('@/components/grids', () => ({
  ProductsGrid: ({ products }) => <div data-testid="mock-products-grid">{products && products.length} products</div>
}));
jest.mock('@/components/headers', () => ({
  PageHeader: ({ title, subtitle }) => <div data-testid="mock-header">{title} - {subtitle}</div>
}));
jest.mock('@/components/common', () => ({
  Button: ({ children, ...props }) => <button data-testid="mock-button" {...props}>{children}</button>,
  Card: ({ children }) => <div data-testid="mock-card">{children}</div>,
  Container: ({ children }) => <div data-testid="mock-container">{children}</div>,
}));
jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ href, children }) => <a href={href} data-testid="mock-link">{children}</a>
}));

describe('MyProfileContent', () => {
  beforeEach(() => {
    mockGet.mockReset();
    mockLogout.mockReset();
  });

  it('renders user info and products', async () => {
    mockGet.mockResolvedValueOnce({ data: { success: true, products: [{ id: 1 }, { id: 2 }] } });
    const { getByTestId, getByText } = render(<MyProfileContent />);
    await waitFor(() => {
      expect(getByTestId('mock-header')).toHaveTextContent('Meu Perfil');
      expect(getByTestId('mock-products-grid')).toHaveTextContent('2 products');
      expect(getByText('Test User')).toBeInTheDocument();
      expect(getByText('test@email.com')).toBeInTheDocument();
      expect(getByText('Sair da Conta')).toBeInTheDocument();
    });
  });

  it('calls logout on button click', async () => {
    mockGet.mockResolvedValueOnce({ data: { success: true, products: [] } });
    const { getByText } = render(<MyProfileContent />);
    await waitFor(() => expect(getByText('Sair da Conta')).toBeInTheDocument());
    fireEvent.click(getByText('Sair da Conta'));
    expect(mockLogout).toHaveBeenCalled();
  });

  it('handles AJAX error gracefully', async () => {
    const error = { error: 'fail' };
    mockGet.mockRejectedValueOnce(error);
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    render(<MyProfileContent />);
    await waitFor(() => {
      expect(mockGet).toHaveBeenCalled();
      expect(consoleSpy).toHaveBeenCalledWith(error);
    });
    consoleSpy.mockRestore();
  });

  it('handles unsuccessful response', async () => {
    mockGet.mockResolvedValueOnce({ data: { success: false } });
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    render(<MyProfileContent />);
    await waitFor(() => {
      expect(mockGet).toHaveBeenCalled();
      expect(consoleSpy).toHaveBeenCalledWith({ success: false });
    });
    consoleSpy.mockRestore();
  });
});

