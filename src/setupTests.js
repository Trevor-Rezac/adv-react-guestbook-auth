import fetch from 'cross-fetch';
global.fetch = fetch;
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import { mockedToken } from '../src/fixtures/mockData';

const server = setupServer(
  rest.post(`${process.env.SUPABASE_API_URL}/auth/v1/token`, (req, res, ctx) =>
    res(ctx.json(mockedToken))
  ),

  rest.get(`${process.env.SUPABASE_API_URL}/rest/v1/entries`, (req, res, ctx) =>
    res(
      ctx.json([
        {
          content: 'test',
          user: 'me',
        },
      ])
    )
  )
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
