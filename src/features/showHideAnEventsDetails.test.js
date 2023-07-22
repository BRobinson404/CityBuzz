import { defineFeature, loadFeature } from 'jest-cucumber';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { getEvents } from '../api';
import Event from '../components/Event';

const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');

defineFeature(feature, (test) => {
  let EventComponent;
  let allEvents;

  beforeEach(async () => {
    allEvents = await getEvents();
    EventComponent = render(<Event event={allEvents[0]} />);
  });

  test('An event element is collapsed by default', ({ given, when, then }) => {
    given('the user is viewing a list of events', () => {});

    when('the user is on the main page', () => {});

    then('the event element should be collapsed by default', () => {
      expect(EventComponent.container.querySelector('.details')).not.toBeInTheDocument();
    });
  });

  test('User can expand an event to see its details', ({ given, when, then }) => {
    given('the user is on the main page', () => {});

    when('the user clicks the show details button', async () => {
      const user = userEvent.setup();
      await user.click(EventComponent.queryByText('show details'));
      EventComponent.rerender(<Event event={allEvents[0]} />);
    });

    then('the event details should be displayed', () => {
      expect(EventComponent.container.querySelector('.details')).toBeInTheDocument();
      expect(EventComponent.queryByText('hide details')).toBeInTheDocument();
      expect(EventComponent.queryByText('show details')).not.toBeInTheDocument();
    });
  });

  test('User can collapse an event to hide details', ({ given, when, then }) => {
    given('an event element with details is displayed', () => {});

    when('the user clicks the hide details button', async () => {
      const user = userEvent.setup();
      await user.click(EventComponent.queryByText('hide details'));
      EventComponent.rerender(<Event event={allEvents[0]} />);
    });

    then('the event element should collapse, hiding the event details', () => {
      expect(EventComponent.container.querySelector('.details')).not.toBeInTheDocument();
      expect(EventComponent.queryByText('hide details')).not.toBeInTheDocument();
      expect(EventComponent.queryByText('show details')).toBeInTheDocument();
    });
  });
});
