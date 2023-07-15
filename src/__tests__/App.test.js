import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

describe("<App /> component", () => {
  test("renders list of events", () => {
    render(<App />);
    expect(screen.getByPlaceholderText("Search for a city")).toBeInTheDocument();
  });

  test("renders textbox with number of events", () => {
    render(<App />);
    expect(screen.getByPlaceholderText("Enter a number")).toBeInTheDocument();
  });
});