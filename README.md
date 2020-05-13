# Considerations

- I didn't use a class because the spec said invoke `var emailsInput = EmailsInput(inputContainerNode, {...options});`. I planned to use a class but noticed it wasn't using the 'new' keyword indicating it isn't being constructed.
- Input box is small and doesn't stretch to fill the whole row. Considering emails generally aren't super long this seemed low priority.
- I used sass at my own discretion. Mostly so I could re-use color values and have an import structure for my styles.
