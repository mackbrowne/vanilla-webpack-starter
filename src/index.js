import 'typeface-open-sans';
import './main.scss';

import EmailsInput from './EmailsInput';

document.querySelectorAll('.emails-input--wrapper').forEach((node, index) => {
  const id = index + 1
  const emailsInput = new EmailsInput(
    node,
    { id }
  );
  emailsInput.subscribe((message) => {
    console.log(`Element $${id} -- ${message}`);
  });
  window[`emailsInput${id}`] = emailsInput;
});
