import React from 'react';

export default class LabeledInput extends React.Component {
  // static propTypes = {
  //   type: React.PropTypes.string.isRequired,
  //   label: React.PropTypes.string.isRequired,
  //   className: React.PropTypes.string
  // };

  render() {
    const {type, label, className, onChange} = this.props;

    return (
      <div className={`labeled-input ${className}`}>
        <label>
          {`${label}:`}
          <input
            type={type}
            onChange={event => {
              onChange(event.target.value);
            }}
          />
        </label>
      </div>
    );
  }
}
