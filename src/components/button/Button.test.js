import { render, screen } from "@testing-library/react";
import { Button } from './button';

it('should render buttton with text', () => {
    render(<Button>Quote no Justu</Button>)

    const buttonEl = screen.getByText('Quote no Justu');

    expect(buttonEl).toBeInTheDocument();
})