import {
  LitElement,
  html,
  css
} from "https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js";


export class HeaderComponent extends LitElement {
  static get properties() {
    return {
      mainTitle: {
        type: String,
        attribute: 'main-title',
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
      height: 65px;
    background-color: rgb(59, 57, 57);
  }
    .title {
      text-align: center;
      font-size: 3em;
      color: white;
      padding: 10px 0px 0px 0px;
    }
  `;
  }

  constructor() {
    super();
    console.log('en el contructor del header')
    this.mainTitle = 'HOLA'
    console.log('this.title', this.mainTitle)
  }

  connectedCallback() {
    super.connectedCallback();
    console.log('connecteCallback this.title', this.mainTitle)

  }

  render() {
    return html `
    <div class="container">
      <div class="title">${this.mainTitle}</div>
    </div>
  `;
  }


}

customElements.define('header-component', HeaderComponent);