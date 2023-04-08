import {
  LitElement,
  html,
  css,
} from "lit";

// import 'redcockroach-toast-event-lauch/redcockroach-toast-event.js'

export class DemoChronoView extends LitElement {
  static get is() {
    return 'demo-chrono-view';
  }

  static get properties() {
    return {}
  };

  static get styles() {
    return css `
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

        <chrono-view
          name="preparing"
          fase="preparing"
          fase-title="Prepárate"
          fase-time="30000"
         ></chrono-view>

         <chrono-view
          name="training"
          fase="training"
          fase-title="Entrenar"
          fase-time="30000"
          reduce
         ></chrono-view>

         <chrono-view
          name="resting"
          fase="resting"
          fase-title="Descansando"
          fase-time="45000"
         ></chrono-view>

         <chrono-view
          name="cooling"
          fase="cooling"
          fase-title="Enfriando"
          fase-time="90000"
          reduce
         ></chrono-view>


        </div>

        <!-- <redcockroach-toast-event .events=${this._events}></redcockroach-toast-event> -->
      </div>
    `;
  }

}

customElements.define(DemoChronoView.is, DemoChronoView);