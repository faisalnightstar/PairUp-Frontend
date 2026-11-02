import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import GetStarted from './GetStarted';

const mockedNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual,
        useNavigate: () => mockedNavigate,
    };
});

describe('GetStarted Component', () => {
    it('renders the welcome title and description', () => {
        render(
            <BrowserRouter>
                <GetStarted />
            </BrowserRouter>
        );

        expect(screen.getByText('Welcome to PairUp!')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Get Started/i })).toBeInTheDocument();
    });

    it('navigates to /register when Get Started button is clicked', () => {
        render(
            <BrowserRouter>
                <GetStarted />
            </BrowserRouter>
        );

        const button = screen.getByRole('button', { name: /Get Started/i });
        fireEvent.click(button);

        expect(mockedNavigate).toHaveBeenCalledWith('/register');
    });
});

