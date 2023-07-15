import { fireEvent, render, screen } from "@testing-library/react";
import Event from "../components/Event";

const event =  {
  "kind": "calendar#event",
  "etag": "\"3181159875584000\"",
  "id": "3qtd6uscq4tsi6gc7nmmtpqlct_20200520T120000Z",
  "status": "confirmed",
  "htmlLink": "https://www.google.com/calendar/event?eid=M3F0ZDZ1c2NxNHRzaTZnYzdubW10cHFsY3RfMjAyMDA1MjBUMTIwMDAwWiBmdWxsc3RhY2t3ZWJkZXZAY2FyZWVyZm91bmRyeS5jb20",
  "created": "2020-05-19T19:14:30.000Z",
  "updated": "2020-05-27T11:45:37.792Z",
  "summary": "React is Fun",
  "description": "Love HTML, CSS, and JS? Want to become a cool front-end developer? \n\nReact is one of the most popular front-end frameworks. There is a huge number of job openings for React developers in most cities. \n\nJoin us in our free React training sessions and give your career a new direction. ",
  "location": "Berlin, Germany",
  "creator": {
   "email": "fullstackwebdev@careerfoundry.com",
   "self": true
  },
  "organizer": {
   "email": "fullstackwebdev@careerfoundry.com",
   "self": true
  },
  "start": {
   "dateTime": "2020-05-20T14:00:00+02:00",
   "timeZone": "Europe/Berlin"
  },
  "end": {
   "dateTime": "2020-05-20T15:00:00+02:00",
   "timeZone": "Europe/Berlin"
  },
  "recurringEventId": "3qtd6uscq4tsi6gc7nmmtpqlct",
  "originalStartTime": {
   "dateTime": "2020-05-20T14:00:00+02:00",
   "timeZone": "Europe/Berlin"
  },
  "iCalUID": "3qtd6uscq4tsi6gc7nmmtpqlct@google.com",
  "sequence": 0,
  "reminders": {
   "useDefault": true
  },
  "eventType": "default"
 };

 describe("<Event /> component", () => {
  test("renders event location", () => {
    render(<Event event={event} />);
    expect(screen.getByText(event.location)).toBeInTheDocument();
  });

  test("renders event name", () => {
    render(<Event event={event} />);
    expect(screen.getByText(event.summary)).toBeInTheDocument();
  });

  test("renders event date", () => {
    render(<Event event={event} />);
    expect(screen.getByText(event.start.dateTime)).toBeInTheDocument();
  });

  test("renders event details button with the title (show details)", () => {
    render(<Event event={event} />);
    expect(screen.getByText("Show Details")).toBeInTheDocument();
    expect(
      screen.queryByText(/Love HTML, CSS, and JS?/)
    ).not.toBeInTheDocument();
  });

  test("by default, event's details section should be hidden", () => {
    const eventDetails = screen.queryByText("description");
    expect(eventDetails).not.toBeInTheDocument();
  });

  test("shows and hides details section when the user toggles button", () => {
    render(<Event event={event} />);
    const showDetailsButton = screen.getByText("Show Details");
    fireEvent.click(showDetailsButton);
    expect(
      screen.getByText(/Love HTML, CSS, and JS?/)
    ).toBeInTheDocument();

    fireEvent.click(showDetailsButton);
    expect(
      screen.queryByText(/Love HTML, CSS, and JS?/)
    ).not.toBeInTheDocument();
  });
});