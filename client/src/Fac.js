import React, { Component } from 'react';
import axios from 'axios';

class Fac extends Component {
  state = {
    seenIndexes: [],
    values: {},
    index: ''
  };

  componentDidMount() {
    this.fetchValues();
    this.fetchIndexes();
  }

  async fetchValues() {
    const values = await axios.get('/api/values/current');
    this.setState({ values: values.data });
  }

  async fetchIndexes() {
    const seenIndexes = await axios.get('/api/values/all');
    this.setState({
      seenIndexes: seenIndexes.data
    });
  }

  handleSubmit = async event => {
    event.preventDefault();

    await axios.post('/api/values', {
      index: this.state.index
    });
    this.setState({ index: '' });
  };

  renderSeenIndexes() {
    return this.state.seenIndexes.map(({ number }) => {
      return (<span className="seenIndexes" key={number}>{number}</span>)
    });
  }

  renderValues() {
    const entries = [];

    for (let key in this.state.values) {
      entries.push(
        <tr key={key}>
          <td>{key}</td>
          <td>{this.state.values[key]}</td>
        </tr>
      );
    }


    return <table>
      <thead><tr>
        <th>Index</th>
        <th>Caculated Value</th>
      </tr></thead>
      <tbody>
      {entries}
      </tbody>
    </table>
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit} className="factor-form">
          <label>Enter your index</label>
          <input
            value={this.state.index}
            onChange={event => this.setState({ index: event.target.value })}
          />
          <button>Submit</button>
        </form>

        <h3>Recent Calculations</h3>
        {this.renderSeenIndexes()}

        <h3>All Calculated Values</h3>
        {this.renderValues()}
      </div>
    );
  }
}

export default Fac;
