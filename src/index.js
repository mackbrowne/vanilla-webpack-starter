import 'typeface-open-sans';
import './main.scss';

import EmailsInput from './EmailsInput';

var inputContainerNode = document.querySelector('#emails-input');
window.emailsInput = new EmailsInput(inputContainerNode);

window.emailsInput.subscribe((email) => {
  console.log(email);
});

// var inputContainerNode2 = document.querySelector('#emails-input2');
// window.emailsInput2 = new EmailsInput(inputContainerNode2);

// window.emailsInput2.subscribe((email) => {
//   console.log(email);
// });