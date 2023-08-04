import '@testing-library/jest-dom';

const MESSAGES_TO_IGNORE = [
  "When testing, code that causes React state updates should be wrapped into act(...):",
  "Error:",
  "The above error occurred",
];

const originalConsoleError = console.error;

beforeEach(() => {
  // Spy on console.error and prevent it from being called
  jest.spyOn(console, 'error').mockImplementation((...args) => {
    const ignoreMessage = MESSAGES_TO_IGNORE.some(message => args.join(' ').includes(message));
    if (!ignoreMessage) {
      originalConsoleError(...args);
    }
  });
});

afterEach(() => {
  // Restore the original console.error implementation after each test
  jest.restoreAllMocks();
});

jest.setTimeout(30000);

const { ResizeObserver } = window;

beforeEach(() => {
  //@ts-ignore
  delete window.ResizeObserver;
  window.ResizeObserver = jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
  }));
});

afterEach(() => {
  window.ResizeObserver = ResizeObserver;
  jest.restoreAllMocks();
});