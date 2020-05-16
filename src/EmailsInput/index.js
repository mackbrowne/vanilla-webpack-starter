import EmailsInputTemplate from './EmailsInput.html';
import randomEmail from 'random-email';
import emailValidator from 'email-validator';

import Button from './Button';
import PillsInput from './PillsInput';

export default class EmailsInput {
  constructor(node, options = {}) {
    this.node = node;
    this.options = options;
    this.options.id = this.options.id || '';

    this.node.innerHTML = EmailsInputTemplate;

    this._renderInput();
    this._renderButtons();
  }

  _renderInput() {
    const inputContainer = this.node.querySelector(`.content`);
    this.pillsInput = new PillsInput(
      inputContainer,
      emailValidator.validate,
      'Please correct invalid emails',
      this.options.id
    );
  }

  _renderButtons() {
    const buttonContainer = this.node.querySelector(`.actions`);

    new Button(buttonContainer, 'Add email', () => 
      this.pillsInput.addPill(this._getRandomValidEmail())
    );

    new Button(buttonContainer, 'Get emails count', () => this._getCount());
  }

  _getRandomValidEmail(){
    let newEmail = randomEmail();
    while (!emailValidator.validate(newEmail)) {
      newEmail = randomEmail();
    }
    return newEmail;
  }

  _getCount() {
    alert(`Total Emails: ${this.pillsInput.size()}`);
  }

  getEmails() {
    return this.pillsInput.values();
  }

  replaceEmails(emails) {
    this.pillsInput.clear();
    emails.forEach((email) => this.pillsInput.addPill(email));
  }

  subscribe(callback) {
    if (document.addEventListener) {
      document.addEventListener(
        `input${this.options.id}-change`,
        ({ detail }) => callback(detail),
        false
      );
    } else {
      document.attachEvent(`input${this.options.id}-change`, ({ detail }) =>
        callback(detail)
      );
    }
  }
}
