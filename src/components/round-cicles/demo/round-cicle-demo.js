import {
  LitElement,
  html,
  css,
} from "lit";

// import 'redcockroach-toast-event-lauch/redcockroach-toast-event.js'

export class DemoRoundCicles extends LitElement {
  static get is() {
    return 'demo-cicle-round';
  }

  static get properties() {
    return {}
  };

  static get styles() {
    return css `
      .main{
        display: flex;
        flex-wrap: wrap;
      }

      round-cicles {
        margin: 10px;
      }
    `
  }

  constructor() {
    super();
    // this._events = ['change-status-button-active'];
  }

  connectedCallback() {
    super.connectedCallback();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
  }

  firstUpdated() {}

  updated(changedProperties) {
    super.updated(changedProperties)
    if (changedProperties && changedProperties.get('totalTime')) {
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
        <div class="main">

          <round-cicles
            name="preparing"
            type="preparing"
            round-cicle="1"
            title="rondas restantes"
          ></round-cicles>

          <round-cicles
            name="exercice"
            type="training"
            round-cicle="4"
            title="ciclos restantes"
          ></round-cicles>

          <round-cicles
            name="resting"
            type="resting"
            round-cicle="2"
            title="ciclos restantes"
          ></round-cicles>

          <round-cicles
            name="cooling"
            type="cooling"
            round-cicle="5"
            title="rondas restantes"
          ></round-cicles>

        </div>

        <!-- <redcockroach-toast-event .events=${this._events}></redcockroach-toast-event> -->
      </div>
    `;
  }

}

customElements.define(DemoRoundCicles.is, DemoRoundCicles);