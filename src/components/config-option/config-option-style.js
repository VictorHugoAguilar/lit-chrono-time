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
  align-items: center
}

.main-config-option {
  margin-left: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.option-label {
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
  background-color: greenyellow;
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
  width: 90%;
  height: 30px;
  border: none;
  border-radius: 10px;
  background-color: greenyellow;
  font-weight: 900;
  font-size: 1.5rem;
  text-align: center;
}
`