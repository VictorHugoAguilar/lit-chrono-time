import {
  css
} from "lit";


export default css `
  :host {
    display: inline-block;
  }

  .container{
    width: 120px;
    height: 130px;
    background-color: #474747;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
}

  .container-cicle-round-number{
    display: flex;
    justify-content: center;
  }

  .number{
    font-size: 4em;
  }

  .container-cicle-round-title{
    width: 100%;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .title{
    color: #fff;
    text-transform: uppercase;
    font-size: 0.7rem;
    word-break:break-all;
    transform: scaleY(1.5); 
  }
  
  
`