import React from 'react';
import PropTypes from 'prop-types';
import { map as _map } from 'underscore';

import FilterListItem from './FilterListItem.jsx';

import { trackNewArrivals } from '../../utils/utils.js';

// Only select one filter per category
class FilterList extends React.Component {
  constructor(props) {
    super(props);

    this.setActive = this.setActive.bind(this);
  }

  setActive(item) {
    const title = this.props.list.title;
    const anyId = `Any${title}`;
    let gaAction = 'Select: ';

    if (this.props.list.active === item) {
      this.props.manageSelected({
        filter: title,
        selected: anyId,
      });

      this[anyId].refs[anyId].focus();
      gaAction = 'Unselect: ';
    } else {
      this.props.manageSelected({
        filter: title,
        selected: item,
      });
    }

    trackNewArrivals(gaAction, `${title} - ${item}`);
  }

  renderDivider() {
    return (<div className="subdivider" key="divider"></div>);
  }

  renderList(list) {
    const activeItem = this.props.list.active;
    const returnedList = _map(list, (item, i) => {
      const itemIdWithoutSpaces = (item.id).replace(/\s+/g, '');

      return (
        <FilterListItem
          ref={(ref) => this[itemIdWithoutSpaces] = ref}
          item={item}
          filter={this.props.list.title}
          active={activeItem === item.id}
          key={i}
          onClick={() => this.setActive(item.id)}
        />
      );
    });

    if (this.props.list.title === this.props.dividerTitle) {
      returnedList.splice(this.props.dividerIndex, 0, this.renderDivider());
    }

    return returnedList;
  }

  renderGenreList(list) {
    const activeItem = this.props.list.active;
    let fictionList, nonFictionList;
    nonFictionList = (
      <div className="nonFictionList">
        {
          _map(list.slice(0, this.props.dividerIndex), (item, i) => {
            const itemIdWithoutSpaces = (item.id).replace(/\s+/g, '');

            return (
              <FilterListItem
                ref={(ref) => this[itemIdWithoutSpaces] = ref}
                item={item}
                filter={this.props.list.title}
                active={activeItem === item.id}
                key={i}
                onClick={() => this.setActive(item.id)}
              />
            );
          })
        }
        {this.renderDivider()}
      </div>
    );

    fictionList = (
      <div className="fictionList">
        {
          _map(list.slice(this.props.dividerIndex), (item, i) => {
            const itemIdWithoutSpaces = (item.id).replace(/\s+/g, '');

            return (
              <FilterListItem
                ref={(ref) => this[itemIdWithoutSpaces] = ref}
                item={item}
                filter={this.props.list.title}
                active={activeItem === item.id}
                key={i}
                onClick={() => this.setActive(item.id)}
              />
            );
          })
        }
      </div>
    );

    return (<div>{nonFictionList}{fictionList}</div>);
  }

  render() {
    let list = this.renderList(this.props.list.data);

    if (this.props.list.title === this.props.dividerTitle) {
      list = this.renderGenreList(this.props.list.data);
    }

    return (
      <fieldset tabIndex="0" className="filterList">
        <legend className="title">{this.props.list.title}</legend>
        {list}
      </fieldset>
    );
  }
}

FilterList.propTypes = {
  manageSelected: PropTypes.func,
  list: PropTypes.object,
  dividerTitle: PropTypes.string,
  dividerIndex: PropTypes.number,
};

FilterListItem.defaultProps = {
  dividerTitle: '',
  dividerIndex: 0,
};

export default FilterList;
