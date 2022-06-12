import React from 'react';
import './colorPanelMini.style.css';

class ColorPanelMini extends React.Component {
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
      <section className="color-panel-mini">
        <p className="color-panel-mini__title">color:</p>
        <div className="color-panel-mini__colors">
          {colors.map((color) => (
            <div
              key={color.title}
              className={
                color.value === curColor
                  ? 'color-panel-mini__size--wrapper selected'
                  : 'color-panel-mini__size--wrapper'
              }
            >
              <div
                key={color.title}
                title={color.title}
                className="color-panel-mini__size"
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

export default ColorPanelMini;
