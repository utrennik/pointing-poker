import Footer from '@components/footer/footer';
import { render, screen } from '@testing-library/react';

describe('Footer', () => {
  it('must be rendered with links', () => {
    render(<Footer />);
    const leed = screen.getByText(/utrennik/i);
    const links = screen.getAllByRole('link');
    expect(leed).toBeInTheDocument();
    expect(leed).toHaveAttribute('href');
    expect(links.length).toEqual(4);
  });
});
