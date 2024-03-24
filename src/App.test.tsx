import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { setupServer } from 'msw/node';
import { HttpResponse, http } from 'msw';
import App from './App';
import { beforeAll, afterEach, afterAll, describe, it, expect } from 'vitest';

const server = setupServer();

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('App', () => {
  it('should work as expected', async () => {
    server.use(
      http.get('http://api.vidio.com/category', () => {
        return HttpResponse.json({
          data: 'ssttt',
        });
      })
    );

    render(<App />);

    expect(screen.getByText('Hello')).toBeInTheDocument();
  });
});
