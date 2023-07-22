import { loadFeature, defineFeature } from 'jest-cucumber';
import { render, within, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

defineFeature(feature, (test) => {
  test('When user hasn\'t specified a number, 32 is the default number', ({ given, when, then }) => {
    let AppComponent;
    let AppDOM;
    given('the main page is open', () => {
      AppComponent = render(<App />);
      AppDOM = AppComponent.container.firstChild;
    });

    let NumberOfEventsDOM;
    let NOEInput;
    when('the user doesn\'t specify the number of events visible', () => {
      NumberOfEventsDOM = AppDOM.querySelector('#number-of-events');
      NOEInput = within(NumberOfEventsDOM).queryByRole('textbox');
    });

    then('the default number should be 32', () => {
      expect(Number(NOEInput.value)).toBe(32);
    });
  });

  test('User can change the number of events they want to see', ({ given, when, then }) => {
    let AppComponent;
    let AppDOM;
    given('the main page is open', () => {
      AppComponent = render(<App />);
      AppDOM = AppComponent.container.firstChild;
    });

    let NumberOfEventsDOM;
    let NOEInput;
    when('the user specifies the number of events visible', async () => {
      NumberOfEventsDOM = AppDOM.querySelector('#number-of-events');
      NOEInput = within(NumberOfEventsDOM).queryByRole('textbox');

      await userEvent.clear(NOEInput);
      await userEvent.type(NOEInput, '10');
    });

    then('the user should be able to see events equal to the given number at once', async () => {
      // Wait for events to be loaded and displayed
      await waitFor(() => {
        const EventListDOM = AppDOM.querySelector('#event-list');
        const EventListItems = within(EventListDOM).queryAllByRole('listitem');
        expect(EventListItems.length).toBe(10);
      });
    });
  });
});
