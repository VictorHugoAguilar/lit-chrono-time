import {
  LitElement,
  html,
  css
} from "lit";

import {
  FireEventMixin,
  MonitoringMixin
} from '../mixins/index.js';

import styles from './round-cicle-style.js';

/**
 * Buttons actived
 * @description Buttons for actived or disable
 * @customElement button-play-stop
 * 
 * @property { String } name - name of buttons
 * @property { String } type - name of buttons posibility default| training | resting | preparing | cooling @default default 
 * @property { String } status - status of buttons @default disable
 * @property { Boolean } activate - activated or not button @default false
 * @property { String } size - sizr of buttons @default small
 * 
 * @fire change-status-button-active#click - launch event with new status
 * 
 * @author Victor Hugo Aguilar Aguilar
 */
export class RoundCicles extends MonitoringMixin(FireEventMixin(LitElement)) {
  static get is() {
    return 'round-cicles';
  }

  static get properties() {
    return {
      /**
       * Name of components
       */
      name: {
        type: String,
        attribute: 'name',
      },
      /**
       * Type buttons type: default | training | resting | preparing | cooling
       * @description property name the button to show
       * @enum default | training | resting | preparing | cooling
       * @default default
       */
      type: {
        type: String,
        attribute: 'type'
      },
      title: {
        type: String,
        attribute: 'title'
      },
      roundCicle: {
        type: Number,
        attribute: 'round-cicle',
      }
    }
  };

  static get styles() {
    return [styles]
  }

  constructor() {
    super();
    this.name = '';
    this.type = 'default';
    this.title = '';
    this.number = 0

    // this.monitor = true;
  }

  connectedCallback() {
    super.connectedCallback();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
  }

  firstUpdated() {
    this.monitoring('type of components round-cicle ', 'default', this.type);
  }

  updated(changedProperties) {
    super.updated(changedProperties)
    if (changedProperties && changedProperties.get('number')) {
      this.requestUpdate();
    }
  }

  shouldUpdate() {
    super.shouldUpdate();
    return true
  }

  render() {
    return html `
      <div class="container">
        <div class="container-cicle-round-number">
          <div class="number" style=${this._addStyle} >${this.roundCicle}</div>
        </div>
        <div class="container-cicle-round-title">
          <div class="title">${this.title}</div>
        </div>
      </div>
    `;
  }

  get _addStyle() {
    return css `color: ${this._colorNumber[this.type]}`;
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

customElements.define(RoundCicles.is, RoundCicles);