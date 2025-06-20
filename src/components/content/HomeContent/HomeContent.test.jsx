import React from 'react';
import { render } from '@testing-library/react';
import HomeContent from './HomeContent';

// Mock Container and ProductsGrid
jest.mock('@/components/common', () => ({
   Container: ({ children }) => <div data-testid="mock-container">{children}</div>,
}));
jest.mock('@/components/grids', () => ({
   ProductsGrid: ({ products }) => (
      <div data-testid="mock-products-grid">{products && products.length} products</div>
   ),
}));

describe('HomeContent', () => {
   it('renders without crashing', () => {
      const { container } = render(<HomeContent products={[]} />);
      expect(container.querySelector('.HomeContent')).toBeInTheDocument();
   });

   it('wraps ProductsGrid in Container', () => {
      const { getByTestId } = render(<HomeContent products={[]} />);
      expect(getByTestId('mock-container')).toBeInTheDocument();
      expect(getByTestId('mock-products-grid')).toBeInTheDocument();
   });

   it('passes products prop to ProductsGrid', () => {
      const products = [{ id: 1 }, { id: 2 }];
      const { getByTestId } = render(<HomeContent products={products} />);
      expect(getByTestId('mock-products-grid').textContent).toContain('2 products');
   });
});
