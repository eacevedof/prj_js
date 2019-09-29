import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css';

const {dialog} = window.require("electron").remote

console.log("App.js")
class App extends Component {
  onOpen(){
    console.log(dialog.showOpenDialog({properties:["openFile","openDictionary","multiSelections"]}))
  }

  render() {
    console.log("App.render")
    return (
      <div className="App">
        <h1>React App</h1>
        <button onClick={this.onOpen.bind(this)}>Open</button>
      </div>
    );
  }//render
}

export default App;
