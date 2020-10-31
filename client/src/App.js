import React from 'react';
// import axios from 'axios';
import logo from './logo.svg';
import './App.css';


class App extends React.Component{

  constructor(props) {
    super(props);
    this.state = { 
      apiResponse: "",
      name: "",
      age: null, 
    };
  }

  callAPI() {
    fetch("http://localhost:9000/testAPI")
        .then(res => res.text())
        .then(res => this.setState({ apiResponse: res }));
  }

  componentDidMount() {
      this.callAPI();
  }

  handleInputChange = (event) => {
    this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit = (event) => {
    
    event.preventDefault();

    const {apiResponse, name, age} = this.state;

    const new_user = {name, age};

    console.log(JSON.stringify(new_user));
    
    // var bodyFormData = new FormData();
    // bodyFormData.append('name', new_user['name']);
    // bodyFormData.append('age', new_user['age']);
    // axios({
    //   method: 'post',
    //   url: 'formSubmit',
    //   data: bodyFormData,
    //   headers: {'Content-Type': 'multipart/form-data' }
    //   })
    //   .then((response) => {console.log(response);})
    //   .catch((response) => {console.log(response);});

    fetch("http://localhost:9000/formSubmit" , {
      method: "POST",
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(this.state)
    })
    .then((result) => result.json())
    .then((info) => { console.log(info); })

    // fetch("http://localhost:9000/formSubmit", {
    //   method: 'POST',
    //   body: JSON.stringify(new_user),
    // }).then(() => {console.log('user created');})
    //   .catch((err) => {console.log(err);})

  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
        <p>{this.state.apiResponse}</p>
        <form onSubmit={this.handleSubmit} method="POST">
          <label htmlFor="name">Nome:</label>
          <input className="form-control" type="text" name="name" onChange={this.handleInputChange} placeholder="Ex.: Fulano da Silva"></input>
          <label htmlFor="name">Idade:</label>
          <input className="form-control" type="number" name="age" onChange={this.handleInputChange} placeholder="Ex.: 42"></input>
          <button className="btn btn-success" type="submit">Enviar</button>
        </form>
      </div>
    );  
  }
}

export default App;
