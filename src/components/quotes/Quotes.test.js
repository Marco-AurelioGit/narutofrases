import { render, screen, fireEvent } from '@testing-library/react';
import { Quotes } from './quotes';
const quote = 'test quote';
const speaker = 'random speaker';

it('should render component quotes on app, quote, speaker and a button', () => {
    render(<Quotes  quote={quote} speaker={speaker}/>);

    const quoteEl = screen.getByText(/test quote/i);
    const speakerEl = screen.getByText(/random speaker/i)
    const buttonEl = screen.getByRole('button')

    expect(quoteEl).toBeInTheDocument();
    expect(speakerEl).toBeInTheDocument();
    expect(buttonEl).toBeInTheDocument();
})

it('should call a callback when a button is pressed', () => {
    const callback = jest.fn();

    render(<Quotes  quote={quote} speaker={speaker} onUpdate={callback} />);

    const buttonEl = screen.getByRole('button');

    fireEvent.click(buttonEl);

    expect(callback).toHaveBeenCalledTimes(1);
})
