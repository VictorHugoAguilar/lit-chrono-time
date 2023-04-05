import { LitElement, html, css, } from "lit";

// import 'redcockroach-toast-event-lauch/redcockroach-toast-event.js'

export class DemoButtonActive extends LitElement {
  static get is() {
    return 'demo-button-active';
  }

  static get properties() {
    return {}
  };

  static get styles() {
    return css ``
  }

  constructor() {
    super();
    this._events = ['change-status-button-active'];
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

          <button-active 
            name="test" 
            @change-status-button-active="${ (e) => this._listenEvent(e)}"
          ></button-active>
          
          <button-active 
            name="test-01" 
            activated
            @change-status-button-active="${ (e) => this._listenEvent(e)}" 
          ></button-active>

          <button-active 
            name="test-02" 
            size="medium" 
            type="preparing" 
            @change-status-button-active="${ (e) => this._listenEvent(e)}" 
          ></button-active>

          <button-active 
            name="test-03" 
            size="medium" 
            type="preparing" 
            activated
            @change-status-button-active="${ (e) => this._listenEvent(e)}" 
          ></button-active>

          <button-active 
            name="test-04" 
            size="medium" 
            type="cooling"
            @change-status-button-active="${ (e) => this._listenEvent(e)}" 
          ></button-active>
          
          <button-active 
            name="test-05" 
            size="medium" 
            type="cooling" 
            activated
            @change-status-button-active="${ (e) => this._listenEvent(e)}"
          >
          </button-active>

          <button-active 
            name="test-04" 
            size="large" 
            type="resting"
            @change-status-button-active="${ (e) => this._listenEvent(e)}" 
          ></button-active>
          
          <button-active 
            name="test-05" 
            size="large" 
            type="resting" 
            activated
            @change-status-button-active="${ (e) => this._listenEvent(e)}" 
          ></button-active>

        </div>

        <!-- <redcockroach-toast-event .events=${this._events}></redcockroach-toast-event> -->
      </div>
    `;
  }

  _listenEvent(e) {
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

customElements.define(DemoButtonActive.is, DemoButtonActive);