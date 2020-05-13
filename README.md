# Considerations

- I didn't use a class because the spec said invoke `var emailsInput = EmailsInput(inputContainerNode, {...options});`. I planned to use a class but noticed it wasn't using the 'new' keyword indicating it isn't being constructed.
- Input box is small and doesn't stretch to fill the whole row. Considering emails generally aren't super long this seemed low priority.
- I used sass at my own discretion. Mostly so I could re-use color values and have an import structure for my styles.

Functional requirements:
Experiment with editable span to get rid of input bug.
maybe add a button around the x
hit too many keys and the commas come back

kinda weird bug with multiple instances maybe worth checkin' out
Tests are not mandatory, but having them is a plus.

Look into detaching, breaking all the events

API:
An emails-input instance should implement the following API:
A method to get all entered emails. Both valid and invalid.
A method to replace all entered emails with new ones.
Ability to subscribe for emails list changes.
