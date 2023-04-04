import {
  LitElement,
  html,
  css
} from "https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js";


import '../button-play-stop.js';

export class DemoButtonPlayStop extends LitElement {
  static get is() {
    return 'demo-button-play-stop';
  }

  static get properties() {
    return {}
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
  }

  connectedCallback() {
    super.connectedCallback();

    // launch demo interval
    // this._demoEvent = this._demo ? setInterval(() => {
    //   this.totalElapsed++
    // }, 1000) : {};
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    // remove demo interval
    // this._demo ? clearInterval(this._demoEvent) : null;
  }

  firstUpdated() {}

  updated(changedProperties) {
    super.updated(changedProperties)
    if (changedProperties && changedProperties.get('totalTime')) {
      this.requestUpdate();
    }
    if (changedProperties && changedProperties.get('totalElapsed')) {
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
        total-elapsed="15"
        @change-status="${ (e) => this._changeStatus(e) }"
        @click-status="${ (e) => this._clickStatus(e)}"
      ></button-play-stop>

      <button-play-stop
        name="demo resting"
        type="resting"
        total-time="90"
        total-elapsed="15"
        @change-status="${ (e) => this._changeStatus(e) }"
        @click-status="${ (e) => this._clickStatus(e)}"
      ></button-play-stop>


      <button-play-stop
        name="demo preparing"
        type="preparing"
        total-time="30"
        total-elapsed="5"
        @change-status="${ (e) => this._changeStatus(e) }"
        @click-status="${ (e) => this._clickStatus(e)}"
      ></button-play-stop>

      <button-play-stop
        name="demo cooling"
        type="cooling"
        total-time="60"
        total-elapsed="50"
        @change-status="${ (e) => this._changeStatus(e) }"
        @click-status="${ (e) => this._clickStatus(e)}"
      ></button-play-stop>

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