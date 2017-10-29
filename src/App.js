import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ReactDataGrid from 'react-data-grid';
import init from './config.js';
import axios from 'axios';

class App extends Component {
  constructor(){
    super();
    this.state = {
      columns:[],
      rows:[]
    }
  }

  componentDidMount(){
    let currentComponent = this;
    axios.get(init.baseUrl).then(function(response){
      currentComponent.setState( { rows: response.data.response_list } );
    })
    .catch(function(err){
      alert(err);
    })

  }

  render() {

    const columns = [{ key: 'rank', name: 'Rank' }, { key: 'answer', name: 'Answer' }, { key: 'confidence', name:'Confidence'}];
    const rows = this.state.rows;
    const rowGetter = rowNumber => rows[rowNumber];

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">ECS Demo Sample</h1>
        </header>
        <p className="App-intro">
          Deploy the server code running the command <code>node server.js</code>.
        </p>
        {(this.state.rows.length>0)?
        <ReactDataGrid
          columns={columns || null }
          rowGetter={rowGetter || null}
          rowsCount={rows.length || null}
          minHeight={500} /> : null}
      </div>
    );
  }
}

export default App;
