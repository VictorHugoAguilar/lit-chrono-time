import {
  LitElement,
  html,
  css
} from "lit";

import {
  FireEventMixin,
  MonitoringMixin
} from '../mixins/index.js';

import styles from './footer-component-style.js';

export class FooterComponent extends MonitoringMixin(FireEventMixin(LitElement)) {
  static get is() {
    return 'footer-component';
  }

  static get properties() {
    return {}
  }

  static get styles() {
    return [styles]
  }

  constructor() {
    super();
  }

  connectedCallback() {
    super.connectedCallback();
  }

  render() {
    return html `
    <div class="container-footer">
      <div class="main-footer">
        <round-cicles
          name="round-cicle round"
          title="rondas restantes"
          fase="training"
          round-cicle="4"
        ></round-cicles>
        
        <start-component
          status="empezar"
        ></start-component>
        
        <round-cicles
          name="round-cicle cicle"
          title="ciclos restantes"
          fase="preparing"
          round-cicle="4"
        ></round-cicles>
      </div>
    </div>
  `;
  }

}

customElements.define(FooterComponent.is, FooterComponent);