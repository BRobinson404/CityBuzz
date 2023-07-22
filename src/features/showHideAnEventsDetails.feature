Feature: Show and hide event details
    Scenario: An event element is collapsed by default
        Given the user is viewing a list of events
        When the user is on the main page
        Then the event element should be collapsed by default
    
    Scenario: User can expand an event to see its details
        Given the user is on the main page
        When the user clicks the show details button
        Then the event details should be displayed

    Scenario: User can collapse an event to hide details
        Given an event element with details is displayed
        When the user clicks the hide details button
        Then the event element should collapse, hiding the event details