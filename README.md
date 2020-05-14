# Considerations

- Used a class to make it more re-usable. Although a slight change from the requirement, you need to use the `new` prefix
- Input box is small and doesn't stretch to fill the whole row. Considering emails generally aren't super long this seemed low priority.
- I used sass at my own discretion. Mostly so I could re-use color values and have an import structure for my styles.
- I used 3 small external libraries. 1 for email validation, 1 for random emails generated, 1 for keycodes. I chose extremely small libraries and reviewed their source before adding. I don't believe this took away from the value test in any way, just saved me from having to write email generators and validators.

Functional requirements:
Tests are not mandatory, but having them is a plus.

An emails-input instance should implement the following API:
A method to replace all entered emails with new ones.
Ability to subscribe for emails list changes.
click anywhere in the textarea and get focus
gotta do something with the error

Minor:
maybe add a button around the x
hit too many keys and the commas come back
think about how im doing bem in index.js more
Look into detaching, unsubscribing events
kinda weird bug with multiple instances maybe worth checkin' out
