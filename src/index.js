import 'typeface-open-sans';
import './main.scss';
import './EmailsInput/EmailsInput.scss';

import EmailsInput from './EmailsInput';

var inputContainerNode = document.querySelector('#emails-input');
window.emailsInput = new EmailsInput(inputContainerNode);
