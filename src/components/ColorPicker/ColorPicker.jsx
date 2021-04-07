import React, { PureComponent } from 'react';
import './ColorPicker.css';
import classNames from 'classnames';

class ColorPicker extends PureComponent {
  state = { activeOptionIdx: 0 };

  // makeOptionClassName = index => {
  // console.log(clsx);
  // const optionClasses = ['ColorPicker__option'];

  // if (index === this.state.activeOptionIdx) {
  //   optionClasses.push('ColorPicker__option--active');
  // }
  // return optionClasses.join(' ');
  // };

  setActiveIdx = index => {
    this.setState({ activeOptionIdx: index });
  };

  render() {
    const { activeOptionIdx } = this.state;
    const { options } = this.props;
    const { label } = options[activeOptionIdx];

    return (
      <div className="ColorPicker">
        <h2 className="ColorPicker__title">Color Picker</h2>
        <p> {label} choosen</p>

        <div>
          {options.map(({ label, color }, index) => (
            <button
              key={label}
              className={classNames('ColorPicker__option', {
                'ColorPicker__option--active':
                  index === this.state.activeOptionIdx,
              })}
              style={{ backgroundColor: color }}
              onClick={() => this.setActiveIdx(index)}
            ></button>
          ))}
        </div>
      </div>
    );
  }
}

export default ColorPicker;
