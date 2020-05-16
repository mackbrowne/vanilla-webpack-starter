import 'typeface-open-sans';
import './main.scss';

import EmailsInput from './EmailsInput';

document.querySelectorAll('.emails-input--wrapper').forEach((node, index) =>
  new EmailsInput(node, { id: index }).subscribe((message) => {
    console.log(`Element ${index + 1} -- ${message}`);
  })
);
