import {
  css
} from "lit";

export default css `
  :host {
  display: inline-block;
}

.container-config-option {
  width: 400px;
  height: 80px;
  background-color: #474747;
  text-transform: uppercase;
  display: flex;
  align-items: center;
}

.main-config-option {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  animation: moveToRight 0.6s ease-out;
  /* animation-delay: 1000ms; */
}

.option-label {
  margin-left: 10px;
  width: 60%;
}

.option {
  display: flex;
  margin-left: 5px;
  margin-bottom: 5px;
  align-items: center;
  justify-content: flex-start;
}

.option-title-color {
  width: 20px;
  height: 20px;
  border-radius: 100%;
  background-color: #4EFF00;
}

.option-title {
  margin-left: 5px;
  font-size: 1.2em;
  color: #e7dfdf;
}

.option-title-description {
  font-size: 0.7rem;
  color: #a6a2a2;
}

.option-input {
  width: 20%;
  margin-right: 10px;
}

.input-time {
  width: 100%;
  height: 30px;
  border-radius: 10px;
  border: 1px solid #fff;
  /* background-color: #4EFF00; */
  color: #ffffff;
  font-weight: 900;
  font-size: 1.5rem;
  text-align: center;
}

.main-config-option-values{
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  animation: moveToLeft 0.6s ease-out;
  /* animation-delay: 1000ms; */
}

.main-config-option-values-input{
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}

.input-time-value {
  width: 50%;
  height: 30px;
  border-radius: 10px;
  font-weight: 900;
  font-size: 1.5rem;
  text-align: center;
  background-color: transparent;
}

.option-time-save{
  width: 40%;
  height: 35px;
  background-color: transparent;
  border: 1px solid #fff;
  color: #fff;
  border-radius: 10px;
  font-weight: bold;
  font-size: 1.2rem;
  text-transform: uppercase;
}

.option-time-save:hover{
  box-shadow: 0px 10px 15px -3px rgba(0,0,0,0.1),0px 10px 15px -3px rgba(0,0,0,0.1);
}

.option-time-save:active{
  box-shadow: none;
}

@keyframes moveToLeft {
  0% {
    transform: translateX(400px);
  }
  100% {
    transform: translateX(0px);
  }
}

@keyframes moveToRight {
  0% {
    transform: translateX(400px);
  }
  100% {
    transform: translateX(0px);
  }
}

`