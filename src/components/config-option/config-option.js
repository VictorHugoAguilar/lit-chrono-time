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
    this.value = 0;
  }

  connectedCallback() {
    super.connectedCallback();
  }

  render() {
    return html `
    <div class="container-config-option">
      <div class="main-config-option" >
        <div class="option-label">
          <div class="option">
            <div class="option-title-color" style=${this.addStyleBackground}></div>
            <div class="option-title">${this.title}</div>
          </div>
          <div class="option-title-description">${this.description}</div>
        </div>
        <div class="option-input">
          <input name="option-value-${this.name}" 
            class="input-time" 
            type="number" 
            value="${this.value}" 
            @keyup="${this._changeValue}"
            style=${this.addStyleBackground}
            >
        </div>
      </div>
    </div>
  `;
  }

  _changeValue(e) {
    e.preventDefault();
    this.fireEvent('change-value-option', {
      name: this.name,
      value: Math.abs(e.target.value)
    });
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