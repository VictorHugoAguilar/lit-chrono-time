import { css } from "lit";

export default css `
  :host {
    display: inline-block;
  }
  .container{
    width: 100%;
  }
  .progress-bar {
    z-index: 1;
    position: absolute;
  }
  .main-icon{
    z-index: 2;
  }
  .icon {
    z-index: 3;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`