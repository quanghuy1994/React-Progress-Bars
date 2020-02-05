import React, { Component } from 'react';
import './App.css';
import ProgressBar from './components/progressbar/ProgressBar.js';

class App extends Component {
  state = {
    loading: true,
    bars: [],
    buttons: [],
    limit: [],
    progressbarvalue: 0,
  }
  //fetch data 
  async componentDidMount() {
    const url = "http://pb-api.herokuapp.com/bars";
    const response = await fetch(url);
    const data = await response.json();
    this.setState({ bars: data.bars });
    this.setState({ buttons: data.buttons });
    this.setState({ limit: data.limit });
    console.log(data);
  }

  //change progress value bar base on select funtion value

  ChangeProgressBar = (event) => {
    this.setState({ progressbarvalue: event.target.value });
  }

  //change bar base on value on button and the bar selected
  ChangeSize = (value, bar) => {
    let newarray = this.state.bars;
    let totalvalue;
    totalvalue = this.state.bars[bar] + this.state.buttons[value];
    //if value <0 then  value = 0
    if (totalvalue < 0) {
      totalvalue = 0;
    }
    // if value > limit value -> value = limit
    if (totalvalue > this.state.limit) {
      totalvalue = this.state.limit
    }
    newarray[bar] = totalvalue;
    this.setState({ bars: newarray });
  }

  //check and render bars base on number of bars in json since that number can range from 2-5
  loopbars = (props) => {
    let divbars=[];
    let ukey=0;
    for (let i = 0; i <= props-1; i++) {
      divbars.push(<label key={ukey+1}>Progress Bar {i+1}</label>);
      ukey+=1;
      divbars.push(<ProgressBar label key={ukey+1} Done={this.state.bars[i]} Limit={this.state.limit} ></ProgressBar>);
      ukey+=1;
      divbars.push(<br key={ukey+1} ></br>);
      ukey+=1;
    }
    return divbars;
  }

  //check and render bars base on number of bars in json since that number can range from 2-5
  loopselect =(props)=>{
    let  selectdiv=[];
    let ukey=0;
    for (let i = 0; i <= props-1; i++) {
      selectdiv.push(<option key={ukey+1} value={i}>Progress {i+1}</option>);
      ukey+=1;

    }
    return selectdiv;
  }
//check and render bars base on number of buttons in json since that number can range from 4-6
  loopbutton =(props,barvalue)=>{
    let  buttondiv=[];
    let ukey=0;
    for (let i = 0; i <= props-1; i++) {
      buttondiv.push(<button key={ukey+1} onClick={() => this.ChangeSize(i, barvalue)}>{this.state.buttons[i]}</button>);
      ukey+=1;
    }
    return buttondiv;
  }

  //render
  render() {
    const barvalue = this.state.progressbarvalue;
    return (
      <div className="container">
        <h1>Front End Assignment - Progress Bars</h1>
        <hr></hr>
        {this.loopbars(this.state.bars.length)};
        <hr></hr>
        <select className="select-content" onChange={this.ChangeProgressBar}>
        {this.loopselect(this.state.bars.length)};
        </select>
        <div className="button-container">
        {this.loopbutton(this.state.buttons.length,barvalue)}
        </div>
      </div>
    )
  }
}

export default App;
