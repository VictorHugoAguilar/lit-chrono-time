import {
  LitElement,
  html,
  css
} from "lit";

import {
  FireEventMixin,
  MonitoringMixin
} from '../mixins/index.js';

import styles from './config-option-style.js';

export class ConfigOption extends MonitoringMixin(FireEventMixin(LitElement)) {
  static get is() {
    return 'config-option';
  }

  static get properties() {
    return {
      /**
       * Name of component to represent
       */
      name: {
        type: String,
        attribute: 'name'
      },
      /**
       * fase that represent this option
       */
      fase: {
        type: String,
        attribute: 'fase'
      },
      /**
       * title of option
       */
      title: {
        type: String,
        attribute: 'title'
      },
      /**
       * description of option
       */
      description: {
        type: String,
        attribute: 'description'
      },
      /**
       * value of option
       */
      value: {
        type: Number,
        attribute: 'value'
      },
      /**
       * show input for update values
       * @default false
       */
      visibleInput: {
        type: Boolean,
        attribute: 'visible-input'
      },
      /**
       * title button saved
       * @default 'GUARDAR'
       */
      titleButtonSaved: {
        type: String,
        attribute: 'title-button-saved'
      },
      /**
       * natural define if number or time 
       * value to represent this component
       * @default false
       */
      natural: {
        type: Boolean,
        attribute: 'natural'
      }

    }
  }

  static get styles() {
    return [styles]
  }


  constructor() {
    super();
    this.name = 'example';
    this.fase = 'default';
    this.title = 'Prepárate';
    this.description = 'Cuenta atrás antes de empezar';
    this.titleButtonSaved = 'guardar'
    this.value = 0;
    this.visibleInput = false;
    this.natural = false;
  }

  connectedCallback() {
    super.connectedCallback();
  }

  render() {
    return html `
      <div class="container-config-option" >
        <div class="main-config-option" style="${ !this.visibleInput ? 'display:flex' : 'display:none' }" >
          <div class="option-label">
            <div class="option">
              <div class="option-title-color" style=${this.addStyleBackground}></div>
              <div class="option-title">${this.title}</div>
            </div>
            <div class="option-title-description">${this.description}</div>
          </div>
          <div class="option-input" >
            <div class="input-time" @click=${() => this.visibleInput = !this.visibleInput}> 
              ${this.formattedTime} 
            </div>
          </div>
        </div>
        <div class="main-config-option-values" style="${ this.visibleInput ? 'display:flex' : 'display:none' }"  >
          <div class="main-config-option-values-input">
            <input name="option-value-${this.name}" 
                  class="input-time-value"
                  id="input-value" 
                  type="number" 
                  value="${this.value}" 
                  style=${this.addStyleInput}
                  >
            <button class="option-time-save" @click=${ (e) => this._changeValue(e) }>${this.titleButtonSaved}</button>
          </div>
        </div>
      </div>
  `;
  }

  get formattedTime() {
    if (this.natural) {
      return this.value;
    }

    const remaining = this.value * 1000;
    const min = Math.floor(remaining / 60000);
    const sec = pad(min, Math.floor((remaining / 1000) % 60));
    const hun = pad(true, Math.floor((remaining % 1000) / 10));

    const time = min ? min + ':' + sec : ':' + sec;
    return time;
  }

  _changeValue(e) {
    e.preventDefault();
    const newValue = this.renderRoot.querySelector('#input-value').value;
    this.value = Math.abs(newValue)
    this.fireEvent('change-value-option', {
      name: this.name,
      value: newValue
    });
    this.visibleInput = !this.visibleInput;
  }

  get addStyleInput() {
    const color = this._colorNumber[this.fase];
    return css `border: 1px solid ${color};
                color: ${color};
                `
  }

  get addStyleBackground() {
    return css `background-color:${this._colorNumber[this.fase]}`
  }

  get _colorNumber() {
    return {
      default: css `#4EFF00`,
      training: css `#4EFF00`,
      resting: css `#EB0303`,
      preparing: css `#ECF80A`,
      cooling: css `#08E5FF`,
    }
  }
}

customElements.define(ConfigOption.is, ConfigOption);

function pad(pad, val) {
  return pad ? String(val).padStart(2, "0") : val;
}