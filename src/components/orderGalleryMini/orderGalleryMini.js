import React from 'react';

import './orderGalleryMini.style.css';

class OrderGalleryMini extends React.Component {
  constructor(props) {
    super(props);

    this.state = { curImgIndex: 0 };
  }

  render() {
    const { curImgIndex } = this.state;
    const { gallery } = this.props;

    return (
      <section className="order-gallery-mini">
        {gallery.length > 1 && (
          <div className="order-gallery-mini__buttons">
            <button
              className="order-gallery-mini__buttons-left"
              onClick={() => this.clickBtnLeft()}
            ></button>
            <button
              className="order-gallery-mini__buttons-right"
              onClick={() => this.clickBtnRight()}
            ></button>
          </div>
        )}

        <img
          alt=""
          src={gallery[curImgIndex]}
          className="order-gallery-mini__img"
        />
      </section>
    );
  }

  clickBtnLeft() {
    let { curImgIndex } = this.state;
    const { length } = this.props.gallery;

    if (curImgIndex > 0) {
      curImgIndex -= 1;
    } else {
      curImgIndex = length - 1;
    }
    this.setState({ curImgIndex });
  }

  clickBtnRight() {
    let { curImgIndex } = this.state;
    const { length } = this.props.gallery;

    if (curImgIndex < length - 1) {
      curImgIndex += 1;
    } else {
      curImgIndex = 0;
    }
    this.setState({ curImgIndex });
  }
}

export default OrderGalleryMini;
