import EmailsInputTemplate from './EmailsInput.html';
import randomEmail from 'random-email';
import emailValidator from 'email-validator';

import Button from './Button';
import PillsInput from './PillsInput';

export default class EmailsInput {
  constructor(
    node,
    options = {
      buttons: [],
    }
  ) {
    this.node = node;
    this.options = options;

    this.node.innerHTML = EmailsInputTemplate;

    this._renderInput();
    this._renderButtons();
  }

  _renderInput() {
    const inputContainer = this.node.querySelector(`.content`);
    this.pillsInput = new PillsInput(
      inputContainer,
      emailValidator.validate,
      'Please correct invalid emails'
    );
  }

  _renderButtons() {
    const buttonContainer = this.node.querySelector(`.actions`);

    new Button(buttonContainer, 'Add email', () =>
      this.pillsInput.addPill(randomEmail())
    );

    new Button(buttonContainer, 'Get emails count', () => this._getCount());
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
        `input-change`,
        ({ detail }) => callback(detail),
        false
      );
    } else {
      document.attachEvent(`input-change`, ({ detail }) =>
        callback(detail)
      );
    }
  }
}
