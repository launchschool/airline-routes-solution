import React, { Component } from 'react';

class Table extends Component {
  static defaultProps = {
    columns: [{name: 'header', property: 'value'}],
    rows: [{id: 1, value: 'cell'}],
    format: (property, value) => value,
    perPage: 25,
    className: "table"
  }

  constructor(...args) {
    super(...args);
    this.state = {
      page: 0
    };
  }

  nextPage = (event) => {
    event.preventDefault();
    this.setState({page: this.state.page + 1});
  }

  previousPage = (event) => {
    event.preventDefault();
    this.setState({page: this.state.page - 1});
  }

  componentWillReceiveProps(nextProps) {
    this.setState({page: 0});
  }

  render() {
    const headerCells = this.props.columns.map( (col) => {
      return <th key={col.name}>{ col.name }</th>;
    });

    const start = this.state.page * this.props.perPage;

    const bodyRows = this.props.rows.slice(start, start + this.props.perPage).map( (row) => {
      const rows = this.props.columns.map( (col) => {
        const value = row[col.property];
        return <td key={col.property + value}>{ this.props.format(col.property, value) }</td>
      });
      return <tr key={Object.values(row).join(':')}>
        { rows }
      </tr>
    });

    return (
      <div>
        <table className={this.props.className}>
          <thead>
            <tr>
              { headerCells }
            </tr>
          </thead>
          <tbody>
            { bodyRows }
          </tbody>
        </table>
        <div className="pagination">
          <p>Showing {start + 1 }-{start + bodyRows.length} of {this.props.rows.length} routes.</p>
          <p>
            <button key="previous" disabled={this.state.page === 0} onClick={this.previousPage}>
              Previous Page
            </button>
            <button key="next" disabled={start + this.props.perPage >= this.props.rows.length} onClick={this.nextPage}>
              Next Page
            </button> 
          </p>
        </div>
      </div>
    );
  }
};

export default Table;