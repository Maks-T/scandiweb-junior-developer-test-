import React from 'react';
import './sizePanel.style.css';

class SizePanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = { curSize: '' };
  }

  render() {
    const { sizes } = this.props;
    const { curSize } = this.state;

    return (
      <section className="size-panel">
        <p className="size-panel__title">SIZE:</p>
        <div className="size-panel__sizes">
          {sizes.map((size) => (
            <div
              key={size}
              className={
                size === curSize
                  ? 'size-panel__size selected'
                  : 'size-panel__size'
              }
              onClick={() => this.changeCurSize(size)}
            >
              {size}
            </div>
          ))}
        </div>
      </section>
    );
  }

  changeCurSize(curSize) {
    this.setState({ curSize });
  }
}

export default SizePanel;
