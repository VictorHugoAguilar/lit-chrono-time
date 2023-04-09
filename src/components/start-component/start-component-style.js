import {
  css
} from "lit";


export default css `
  :host {
    display: inline-block;
  }

  .container {
    height: 150px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
  }

  .container-start-component{
  }

  .container-start-component-status{}

  .status{
    font-size: 1.2rem;
    text-transform: uppercase;
  }

`