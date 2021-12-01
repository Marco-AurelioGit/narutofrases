import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
const response = { speaker: 'Speaker', quote: 'test quote'};

const server = setupServer(
  rest.get('http://127.0.0.1:5000', (req,res,ctx) => {
    return res(ctx.json(response));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.restoreHandlers());
afterAll(() => server.close());

it('should render the app with a button, a quote and a button', () => {
  render(<App />)
  const buttonEl = screen.getByRole('button');
  const imageEl = screen.getByRole('img');
  const textEl = screen.getByText(/Speaker/);

  expect(buttonEl).toBeInTheDocument();
  expect(imageEl).toBeInTheDocument()
  expect(textEl).toBeInTheDocument()
})

it('sould call a pi on button click and update its text', async () => {
  render(<App />);

  const buttonEl = screen.getByRole('button');

  fireEvent.click(buttonEl);

  const quoteEl = await screen.findByText(/test quote/i);

  expect(quoteEl).toBeInTheDocument();  
});

it('should calls api on startup and renders it response', async () => {
  render(<App />);

  const quoteEl = await screen.findByText(response.quote);

  expect(quoteEl).toBeInTheDocument();
})