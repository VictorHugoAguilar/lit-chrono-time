import {
  LitElement,
  html,
  css
} from "https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js";

import {
  config
} from "./icons.js";

export class HeaderComponent extends LitElement {
  static get properties() {
    return {
      mainTitle: {
        type: String,
        attribute: 'main-title',
      },
      hiddenConfig: {
        type: Boolean,
        attribute: 'hidden-config',
        reflex: true
      }
    }
  }

  static get styles() {
    return css `
    :host {
      display: inline-block;
      user-select: none;
      width: 100%;
    }
    .container {
      // border: thin solid yellow;
      display: flex;
      background-color: rgb(59, 57, 57);
      flex-direction: column;
    }
    
    .main{
      padding: 10px 0px;
      height: 50px;
      display: flex;
      flex-direction: row;
      align-items: center;
      // border: thin solid red;
    }
    
    .title {
      width: 90%;
      text-align: center;
      font-size: 2.5em;
      color: white;
      // border: thin solid red;
    }
    .icon{
      width: 10%;
      // border: thin solid red;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    
    .icon-config{
      color: greenyellow;
    }

    .config{
      height: 90px;
      background-color: rgb(150, 148, 148);
    }

    .main-config {
      display: flex;
      flex-direction: column;
      justify-content:  space-around;
      align-items: start;
      padding: 10px;
    }

    .input-time {
      border-radius: 10px;
      width: 30px;
      height: 20px;
      background-color: greenyellow;
    }

    .input-check {
      background-color: greenyellow;
    }
  
  `;
  }

  constructor() {
    super();
    this.mainTitle = ''
    this.hiddenConfig = true;
  }

  connectedCallback() {
    super.connectedCallback();
  }

  render() {
    return html `
    <div class="container">
      <div class="main">
        <div class="title">${this.mainTitle}</div>
        <div class="icon"><span class="icon-config" @click="${ () => this._hiddenConfig() }">${config}</span></div>
      </div>
      <div class="config" ?hidden=${!this.hiddenConfig}>
        <div class="main-config" >
          <div class="options">
            Time of exercice <input class="input-time" type="number" value="30">
          </div>
          <div class="options">
            Time of rest <input class="input-time" type="number" value="90"> 
          </div>
          <div class="options">
            Auto-Executing <input class="input-check" type="checkbox" checked>
          </div>  
        </div>
      </div>
    </div>
  `;
  }

  _hiddenConfig() {
    this.hiddenConfig = !this.hiddenConfig
  }


}

customElements.define('header-component', HeaderComponent);