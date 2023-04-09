import {
  css
} from "lit";

export default css `
  :host {
    display: block;
  }
  
  .container-footer {
    width: 100%;
    border: thin solid green;
    background-color: #474747;
  }

  .main-footer {
    display: flex;
    justify-content: space-evenly
  }
  
`