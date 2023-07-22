import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NumberOfEvents from '../components/NumberOfEvents';

describe('<NumberOfEvents /> component', () => {
  let NumberOfEventsComponent;
  beforeEach(() => {
    // Create a mock function for setCurrentNOE
    const mockSetCurrentNOE = jest.fn();

    // Provide the currentNOE and setCurrentNOE props
    NumberOfEventsComponent = render(
      <NumberOfEvents currentNOE={32} setCurrentNOE={mockSetCurrentNOE} />
    );
  });

  test('renders number of events text input', () => {
    const numberTextBox = NumberOfEventsComponent.queryByRole('textbox');
    expect(numberTextBox).toBeInTheDocument();
    expect(numberTextBox).toHaveClass('number-of-events-input');
  });

  test('default number is 32', async () => {
    const numberTextBox = NumberOfEventsComponent.queryByRole('textbox');
    expect(numberTextBox).toHaveValue("32");
  });

  test('number of events text box value changes when the user types in it', async () => {
    const user = userEvent.setup();
    const numberTextBox = NumberOfEventsComponent.queryByRole('textbox');

    // Type "123" into the text box
    await user.type(numberTextBox, "123");

    // The value should be "32123" as it appends to the existing "32"
    expect(numberTextBox).toHaveValue("32123");
  });
});
