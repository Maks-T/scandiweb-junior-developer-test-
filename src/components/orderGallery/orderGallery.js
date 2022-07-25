import React from 'react';

import './orderGallery.style.css';

class OrderGallery extends React.Component {
  constructor(props) {
    super(props);

    this.state = { curImgIndex: 0 };
  }

  render() {
    const { curImgIndex } = this.state;
    const { gallery } = this.props;

    return (
      <section className="order-gallery">
        {gallery.length > 1 && (
          <div className="order-gallery__buttons">
            <button
              className="order-gallery__buttons-left"
              onClick={() => this.clickBtnLeft()}
            ></button>
            <button
              className="order-gallery__buttons-right"
              onClick={() => this.clickBtnRight()}
            ></button>
          </div>
        )}

        <img alt="" src={gallery[curImgIndex]} className="order-gallery__img" />
      </section>
    );
  }

  clickBtnLeft() {
    let { curImgIndex } = this.state;
    const { length } = this.props.gallery;

    if (curImgIndex > 1) {
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

export default OrderGallery;
