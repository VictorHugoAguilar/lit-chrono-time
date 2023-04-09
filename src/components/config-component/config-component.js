import {
  LitElement,
  html,
  css
} from "lit";

import {
  FireEventMixin,
  MonitoringMixin
} from '../mixins/index.js';

import styles from './config-component-style.js';

export class ConfigComponent extends MonitoringMixin(FireEventMixin(LitElement)) {
  static get is() {
    return 'config-component';
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
    <div class="container-config">

    <config-option
      name="option-preparing"
      fase="preparing"
      title="prepárate"
      description="Cuenta atrás antes de empezar"
      title-button-saved="guardar"
    ></config-option>

    <config-option
      name="option-training"
      fase="training"
      title="entrenar"
      description="hacer ejercicios durante este tiempo"
      title-button-saved="guardar"
    ></config-option>

    <config-option
      name="option-resting"
      fase="resting"
      title="descanzar"
      description="descanzar durante este tiempo"
      title-button-saved="guardar"
    ></config-option>

    <config-option
      name="option-cooling"
      fase="cooling"
      title="enfriamiento"
      description="enfriamiento despues del entrenamiento"
      title-button-saved="guardar"
    ></config-option>

    <config-option
      name="option-cooling"
      fase="cooling"
      title="rondas"
      description="una ronda ronda ejercicio + descanso"
      title-button-saved="guardar"
      natural
    ></config-option>
    


      <!-- <div class="container-config-title">
        <p class="title">Configuraciones</p>
      </div>
      <div class="main-config" >
          <div class="options">
            <span class="title-options">Time of exercice </span>
            <input name="time-exercice" class="input-time" type="number" value="${this.timeExercice}" @keyup="${this._changeValue}">
          </div>
          <div class="options">
            <span class="title-options">Time of rest </span>
            <input name="time-rest" class="input-time" type="number" value="${this.timeRest}" @keyup="${this._changeValue}"> 
          </div>
          <div class="options">
            <span class="title-options">Auto-Executing </span>
            <input name="auto-executing" class="input-check" type="checkbox" ?checked="${this.autoRunning}" @change="${this._changeValue}">
          </div>  
        </div> -->
    </div>
  `;
  }

}

customElements.define(ConfigComponent.is, ConfigComponent);