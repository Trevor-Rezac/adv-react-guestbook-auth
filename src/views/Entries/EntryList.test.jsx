import { render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { UserProvider } from '../../context/UserContext';
import App from '../../App';

describe('EntryList tests', () => {
  it('should test a user adding a new entry', async () => {
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

    screen.debug();

    
  })
})
