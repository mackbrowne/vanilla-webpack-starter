import 'typeface-open-sans';
import './main.scss';

import EmailsInput from './EmailsInput';

var inputContainerNode = document.querySelector('#emails-input');
var emailsInput = new EmailsInput(inputContainerNode);
