import React from 'react';
import './colorPanel.style.css';

class ColorPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.state = {
      curColor: props.curColor || props.colors[0].value,
      readonly: props.readonly || false,
    };
  }

  render() {
    const { colors } = this.props;
    const { curColor } = this.state;

    return (
      <section className="color-panel">
        <p className="color-panel__title">color:</p>
        <div className="color-panel__colors">
          {colors.map((color) => (
            <div
              key={color.title}
              className={
                color.value === curColor
                  ? 'color-panel__size--wrapper selected'
                  : 'color-panel__size--wrapper'
              }
            >
              <div
                key={color.title}
                title={color.title}
                className="color-panel__size"
                style={{ backgroundColor: color.value }}
                onClick={() => this.changeCurColor(color.value)}
              ></div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  changeCurColor(curColor) {
    if (!this.state.readonly) this.setState({ curColor });
  }
}

export default ColorPanel;
