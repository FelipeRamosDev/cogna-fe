import React from 'react';
import { render, screen } from '@testing-library/react';
import Card from './Card';

// Mock the parse helpers to return their input for easier className assertions
jest.mock('@/helpers/parse', () => ({
   parseCSS: (...args) => args.filter(Boolean).join(' '),
   parsePadding: (p) => `padding-${p}`,
   parseRadius: (r) => `radius-${r}`,
   parseElevation: (e) => `elevation-${e}`,
}));

describe('Card component', () => {
   it('renders children', () => {
      render(<Card>Test Content</Card>);
      expect(screen.getByText('Test Content')).toBeInTheDocument();
   });

   it('applies default classes', () => {
      render(<Card>Test</Card>);
      const card = screen.getByTestId('card');
      expect(card.className).toMatch(/Card/);
      expect(card.className).toMatch(/padding-m/);
      expect(card.className).toMatch(/radius-m/);
      expect(card.className).toMatch(/elevation-m/);
   });

   it('applies custom className', () => {
      render(<Card className="my-card">Test</Card>);
      const card = screen.getByTestId('card');
      expect(card.className).toMatch(/my-card/);
   });

   it('applies custom padding, radius, and elevation', () => {
      render(
         <Card padding="l" radius="xl" elevation="xs">
            Custom
         </Card>
      );
      const card = screen.getByTestId('card');
      expect(card.className).toMatch(/padding-l/);
      expect(card.className).toMatch(/radius-xl/);
      expect(card.className).toMatch(/elevation-xs/);
   });
});