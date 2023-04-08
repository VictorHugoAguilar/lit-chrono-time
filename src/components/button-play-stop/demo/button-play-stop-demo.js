import { LitElement, html, css } from "lit";

// import 'redcockroach-toast-event-lauch/redcockroach-toast-event.js'
import '../button-play-stop.js';

export class DemoButtonPlayStop extends LitElement {
  static get is() {
    return 'demo-button-play-stop';
  }

  static get properties() {
    return {
      _timeDemo: {
        type: Number
      },
    }
  };

  static get styles() {
    return css `
      .container{
        display: flex;
        flex-direction: row;
        justify-content:space-around;
        flex-wrap:wrap;
      }
      button-play-stop {
        margin: 20px;
      }
    `
  }

  constructor() {
    super();
    // this._events = ['click-status', 'change-status']
    this._demoEvent = null;
    this._timeDemo = 0;
  }

  connectedCallback() {
    super.connectedCallback();

    // set demo interval
    this._demoEvent = setInterval(() => {
      this._timeDemo += 1;
    }, 1000);
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    // remove demo interval
    clearInterval(this._demoEvent);
  }

  firstUpdated(changedProps) {
    super.firstUpdated && super.firstUpdated(changedProps);
  }

  updated(changedProperties) {
    super.updated(changedProperties)
    if (changedProperties && changedProperties.get('_timeDemo')) {
      this.requestUpdate();
    }
  }

  shouldUpdate() {
    super.shouldUpdate();
    return true
  }

  render() {
    return html `<div class = "container">
      <button-play-stop
        name="demo without type"
        total-time="30"
        total-elapsed=${this._timeDemo}
        @change-status="${ (e) => this._changeStatus(e) }"
        @click-status="${ (e) => this._clickStatus(e)}"
      ></button-play-stop>

      <button-play-stop
        name="demo resting"
        type="resting"
        total-time="90"
        total-elapsed=${this._timeDemo}
        @change-status="${ (e) => this._changeStatus(e) }"
        @click-status="${ (e) => this._clickStatus(e)}"
      ></button-play-stop>


      <button-play-stop
        name="demo preparing"
        type="preparing"
        total-time="30"
        total-elapsed=${this._timeDemo}
        @change-status="${ (e) => this._changeStatus(e) }"
        @click-status="${ (e) => this._clickStatus(e)}"
      ></button-play-stop>

      <button-play-stop
        name="demo cooling"
        type="cooling"
        total-time="60"
        total-elapsed=${this._timeDemo}
        @change-status="${ (e) => this._changeStatus(e) }"
        @click-status="${ (e) => this._clickStatus(e)}"
      ></button-play-stop>

      <!-- <redcockroach-toast-event .events=${this._events}></redcockroach-toast-event> -->
    </div>`;
  }

  _changeStatus(e) {
    console.log('event listener => ', {
      e: e,
      nameComponent: e.detail.name,
      nameEvent: e.nameEvent || e.type,
      composed: e.composed,
      bubbles: e.bubbles,
      cancelable: e.cancelable,
      detail: e.detail
    })
  }

  _clickStatus(e) {
    console.log('event listener => ', {
      e: e,
      nameComponent: e.detail.name,
      nameEvent: e.nameEvent || e.type,
      composed: e.composed,
      bubbles: e.bubbles,
      cancelable: e.cancelable,
      detail: e.detail
    })
  }
}

customElements.define(DemoButtonPlayStop.is, DemoButtonPlayStop);