import React from 'react';
import PropTypes from 'prop-types';

/**
 * Button used to display an icon and text. Should be updated with an svg
 * instead of font icon.
 * @extends {React}
 */
class PillButton extends React.Component {
  /**
   * constructor
   * @param {object} props
   */
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }

  /**
   * Handle click event on the button. Triggers the `onClick` function
   * that is passed to this component.
   * @param {string} value - A boolean or string value passed to the
   * Alt Actions.
   */
  onClick(value) {
    this.props.onClick(value);
  }

  /**
   * Renders the component.
   */
  render() {
    return (
      <button
        className={`PillButton ${this.props.className} ${this.props.value}`}
        onClick={() => this.onClick(this.props.value)}
      >
        {this.props.icon}
        <span className="PillButton-title">{this.props.title}</span>
        <span className={`${this.props.iconClass} icon`}></span>
      </button>
    );
  }
}

PillButton.propTypes = {
  onClick: PropTypes.func,
  className: PropTypes.string,
  value: PropTypes.any,
  iconClass: PropTypes.string,
  icon: PropTypes.object,
  title: PropTypes.string,
};

export default PillButton;
