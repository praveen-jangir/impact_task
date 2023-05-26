import { render, screen } from '@testing-library/react';
import ProductTable from './ProductTable/index';

test('renders learn react link', () => {
  render(<ProductTable />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
