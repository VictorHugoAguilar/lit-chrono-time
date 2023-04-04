import {
  LitElement,
  html,
  css
} from "https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js";

export class RoundComponent extends LitElement {
  static get properties() {
    return {
      mainTitle: {
        type: String,
        attribute: 'main-title',
      },
      times: {
        type: String,
        attribute: 'times',
        reflex: true
      },
    }
  }

  static get styles() {
    return css `
    :host {
      display: inline-block;
    }
    .round-title{
      font-size: 0.5em;
    }
    .round-time {
      font-size: 0.9em;
    }
    .round-exercice {
      color: greenyellow;
    }
    .round-rest {

    }
    .round-stop {

    }
  `;
  }

  constructor() {
    super();
    this.mainTitle = 'RONDAS';
    this.times = '01:30'
  }

  connectedCallback() {
    super.connectedCallback();
  }

  render() {
    return html `
      <div class="round-container">
        <div class="round-main round-exercice">
          <div class="round-title">${this.mainTitle}</div>
          <div class="round-time">${this.times}</div>
          </div>
        </div>
      </div>
    `;
  }

}

customElements.define('round-component', RoundComponent);