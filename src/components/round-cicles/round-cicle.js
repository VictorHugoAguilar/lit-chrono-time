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
 * RoundCicles
 * @description RoundCicles for show fase
 * @customElement round-cicles
 * 
 * @property { String } name - name of component
 * @property { String } fase - fase default| training | resting | preparing | cooling @default default 
 * @property { String } title - title of fase
 * @property { Number } roundCicle - number of circle or round
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
       * fase of round or cicle default | training | resting | preparing | cooling
       * @default default
       */
      fase: {
        type: String,
        attribute: 'fase'
      },
      /**
       * Title of fase
       */
      title: {
        type: String,
        attribute: 'title'
      },
      /**
       * Round or cicle of fase
       */
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
    this.fase = 'default';
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
    this.monitoring('type of components round-cicle ', 'default', this.fase);
  }

  updated(changedProperties) {
    super.updated(changedProperties)
    if (changedProperties && changedProperties.get('roundCicle')) {
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
    return css `color: ${this._colorNumber[this.fase]}`;
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