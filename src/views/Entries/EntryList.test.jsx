import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { UserProvider } from '../../context/UserContext';
import App from '../../App';
import { mockedEntryList, mockedNewEntry } from '../../fixtures/mockData';
import { server } from '../../setupTests';
import { rest } from 'msw';


describe('EntryList tests', () => {
  it('should test a user logging in and adding a new entry', async () => {
    render(
      <MemoryRouter>
        <UserProvider>
          <App />
        </UserProvider>
      </MemoryRouter>
    )
    
    //tests that an h2 is in the document
    //also checks that there is only one instance  of the auth page title "Sign In / Sign Up"
    const authHeader = screen.getByRole('heading', { level: 2 });
    const authTitle = await screen.findAllByText(/sign in \/ sign up/i);
    expect(authHeader).toBeInTheDocument();
    expect(authTitle.length).toEqual(1);
    
    //tests that the auth page inputs render and user can type their email and password
    const emailInput = screen.getByPlaceholderText(/email address/i);
    userEvent.type(emailInput, 'trev@test.com');
    
    const passwordInput = screen.getByPlaceholderText(/password/i);
    userEvent.type(passwordInput, 'trevtest');
    
    //tests that the Sign In button renders and is clicked by the user
    const signInBtn = screen.getByRole('button', {name: 'Sign In'})
    userEvent.click(signInBtn);
    
    //renders the EntryList Header upon log in
    await screen.findByRole('heading', { 
      name: 'Say something...' 
    });
    
    //tests that the entryInput renders
    const entryInput = screen.getByPlaceholderText(/add new entry/i);

    //tests that the current Entry list renders with two entries 
    //(each entry has an h4 header role)
    expect(entryInput).toBeInTheDocument();
    
    const entryListArr = await screen.findAllByRole('heading', { level: 4 })
    expect(entryListArr.length).toEqual(2);
    
    //the user types a new entry into the input
    userEvent.type(entryInput, 'hello world!');
    
    //tests that the user can click the add button
    const addBtn = screen.getByRole('button', { name: 'Add'});
    
    server.use(
      //mocks the user's post request  to add a new entry
      rest.post(`${process.env.SUPABASE_API_URL}/rest/v1/entries`, (req, res, ctx) => res(ctx.json(mockedNewEntry))),

      //mocks the get request showing the updated entry list containing the new entry
      rest.get(`${process.env.SUPABASE_API_URL}/rest/v1/entries`, (req, res, ctx) => res(ctx.json([{
        id: '1',
        content: 'hello there!',
        user: 'trev@test.com',
        timestamp: 'Fri May 09 2022',
      },
      {
        id: '2',
        content: 'howdy partner!',
        user: 'trev@test.com',
        timestamp: 'Fri May 09 2022',
      },
      {
        id: '3',
        content: 'hello world!',
        user: 'trev@test.com',
        timestamp: 'Fri May 09 2022',
      }
      ])))
    )
    
    //user clicks the add button to add new entry
    userEvent.click(addBtn);
    
    //wait for the entry list to update after the user interaction
    //updated entry list should have 3 entries
    //tests that the dom includes an entry containing "hello world!"
    await waitFor(() => {
      const updatedEntryListArr = screen.getAllByRole('heading', { level: 4 })
      expect(updatedEntryListArr.length).toEqual(3);

      const newEntry = screen.getByText(/hello world!/i);
      expect(newEntry).toBeInTheDocument();
    })
    
  })
})
