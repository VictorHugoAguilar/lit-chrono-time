import {
  css
} from "lit";


export default css `
  :host {
    display: block;
  }
  
  /* Version normal */
  .container {
    width: 100%;
    height: 350px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
  .container-fase-title{
    height: 30%;
    display: flex;
    justify-content: center;
    align-items: center;
    text-transform: uppercase;
  }
  .title{
    font-size: 3rem;
  }
  .container-fase-time{
    height: 60%;
    display: flex;
    justify-content: center;
    align-items: center;
    
  }
  .fase-time{
    transform:scaleY(1.3);
    font-size: 8rem;
  }

  /* Version reduce */
  .container-reduce  {
    width: 100%;
    height: 150px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
  .container-fase-title-reduce {
    height: 30%;
    display: flex;
    justify-content: center;
    align-items: center;
    text-transform: uppercase;
  }
  .title-reduce {
    font-size: 2rem;
  }
  .container-fase-time-reduce {
    height: 60%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .fase-time-reduce {
    font-size: 5rem;
  }
  
`