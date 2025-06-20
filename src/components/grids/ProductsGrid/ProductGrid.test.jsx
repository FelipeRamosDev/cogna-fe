import React from 'react';
import { render } from '@testing-library/react';
import ProductsGrid from './ProductsGrid';

// Mocks
jest.mock('next/link', () => ({
   __esModule: true,
   default: ({ href, children, ...props }) => <a href={href} data-testid="mock-link" {...props}>{children}</a>,
}));
jest.mock('@/components/tiles', () => ({
   ProductTile: ({ product }) => <div data-testid="mock-product-tile">{product.name}</div>,
}));

describe('ProductsGrid', () => {
   const products = [
      { id: 1, name: 'Produto 1' },
      { id: 2, name: 'Produto 2' },
   ];

   it('renders a grid with the correct number of product tiles', () => {
      const { getAllByTestId, container } = render(<ProductsGrid products={products} />);
      expect(container.querySelector('.ProductsGrid')).toBeInTheDocument();
      expect(getAllByTestId('mock-link')).toHaveLength(2);
      expect(getAllByTestId('mock-product-tile')).toHaveLength(2);
   });

   it('renders correct hrefs for each product', () => {
      const { getAllByTestId } = render(<ProductsGrid products={products} />);
      const links = getAllByTestId('mock-link');
      expect(links[0].getAttribute('href')).toBe('/produto/1');
      expect(links[1].getAttribute('href')).toBe('/produto/2');
   });

   it('renders nothing if products is empty', () => {
      const { container } = render(<ProductsGrid products={[]} />);
      expect(container.querySelectorAll('[data-testid="mock-link"]').length).toBe(0);
      expect(container.querySelectorAll('[data-testid="mock-product-tile"]').length).toBe(0);
   });
});
