import {
  LitElement,
  html,
  css
} from "lit";

import {
  FireEventMixin,
  MonitoringMixin
} from '../mixins/index.js';

import styles from './start-component-style.js';

/**
 * StartComponent
 * @description StartComponent for show fase
 * @customElement round-cicles
 * 
 * @property { String } name - name of component
 * @property { String } fase - fase default| training | resting | preparing | cooling @default default 
 * @property { String } title - title of fase
 * @property { Number } roundCicle - number of circle or round
 * 
 * @author Victor Hugo Aguilar Aguilar
 */
export class StartComponent extends MonitoringMixin(FireEventMixin(LitElement)) {
  static get is() {
    return 'start-component';
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
      status: {
        type: String,
        attribute: 'status'
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
    this.status = 'empezar';
    this.number = 0

    this.monitor = true;
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
        <div class="container-start-component">
            <button-play-stop 
              total-time=90
              total-elapsed=50
            ></button-play-stop>
        </div>
        <div class="container-start-component-status">
          <div class="status" style=${this._addStyle} >${this.status}</div>
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

customElements.define(StartComponent.is, StartComponent);