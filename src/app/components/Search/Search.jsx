import React from 'react';
import Radium from 'radium';

class Dropdown extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      listVisible: false,
      selected: this.props.selected,
    };

    this.select = this.select.bind(this);
    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
  }

  select(item) {
    this.state.selected = item;
  }

  show() {
    this.setState({ listVisible: true });
    document.addEventListener('click', this.hide);
  }

  hide() {
    this.setState({ listVisible: false });
    document.removeEventListener('click', this.hide);
  }

  renderListItems() {
    return this.props.list.map((item, i) => {
      return (
        <div key={i} onClick={this.select.bind(this, item)}>
          <span>{item.name}</span>
        </div>
      );
    });
  }

  render() {
    return (<div className={"dropdown-container search-select " + (this.state.listVisible ? " show" : "")}>
        <div className={"dropdown-display" + (this.state.listVisible ? " clicked": "")} onClick={this.show}>
          <span style={{ color: this.state.selected.hex }}>{this.state.selected.name}</span>
        </div>
        <div className="dropdown-list">
          <div>
            {this.renderListItems()}
          </div>
        </div>
      </div>);
  }
}

var colours = [{
    name: "Red",
    hex: "#F21B1B"
}, {
    name: "Blue",
    hex: "#1B66F2"
}, {
    name: "Green",
    hex: "#07BA16"
}];


class Search extends React.Component {
  constructor(props) {
    super(props);
  }

  _onClick(toggleValue) {
    this.props.onClick(toggleValue);
  }

  render() {
    const dropdown = <Dropdown list={colours} selected={colours[0]} />;
    const select = <select value="books" className="search-select">
              <option value="books">Books</option>
              <option value="dvds">DVDs</option>
              <option value="music">Music</option>
            </select>;
    return (
      <div className="search-container">
        <h3>I want to browse...</h3>

        <div className="search-form">
          <div className="inputs">
            {dropdown}
            
            <input placeholder="Search the catalog" className="search-field"/>
          </div>

          <button
            className="search-button">
            Search
          </button>
        </div>

        <p className="advanceSearch"><a href="#">Advance Search ></a></p>

      </div>
    );
  }
}

export default Radium(Search);
