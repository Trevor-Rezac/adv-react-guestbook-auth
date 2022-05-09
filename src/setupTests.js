import fetch from 'cross-fetch';
global.fetch = fetch;
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import {
  mockedEntryList,
  mockedNewEntry,
  mockedToken,
} from '../src/fixtures/mockData';

const server = setupServer(
  //mocks user log in post request
  rest.post(`${process.env.SUPABASE_API_URL}/auth/v1/token`, (req, res, ctx) =>
    res(ctx.json(mockedToken))
  ),

  //mocks the get request on initial load
  rest.get(`${process.env.SUPABASE_API_URL}/rest/v1/entries`, (req, res, ctx) =>
    res(ctx.json(mockedEntryList))
  ),

  //mocks the post request for a new entry
  rest.post(
    `${process.env.SUPABASE_API_URL}/rest/v1/entries`,
    (req, res, ctx) => res(ctx.json(mockedNewEntry))
  )
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

module.exports = { server };
