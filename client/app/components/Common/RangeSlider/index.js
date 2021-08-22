/**
 *
 *  Range Slider
 *
 */

import React from 'react';
import Slider, { SliderTooltip } from 'rc-slider';


const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);
const { Handle } = Slider;

const handle = props => {
  const { value, dragging, index, ...restProps } = props;
  return (
    <SliderTooltip
      prefixCls="rc-slider-tooltip"
      overlay={`$${value}`}
      visible={dragging}
      placement="top"
      key={index}
    >
      <Handle value={value} {...restProps} />
    </SliderTooltip>
  );
};


const marks = {
  0:  { style: { color: 'Gold', }, label: <strong>5<i className="fa fa-star fa-1x" style={{display: 'contents'}} aria-hidden="true"></i></strong>,},
  20:  { style: { color: 'Gold', }, label: <strong>4<i className="fa fa-star fa-1x" aria-hidden="true"></i></strong>,},
  40:  { style: { color: 'Gold', }, label: <strong>3<i className="fa fa-star fa-1x" aria-hidden="true"></i></strong>,},
  60:  { style: { color: 'Gold', }, label: <strong>2<i className="fa fa-star fa-1x" aria-hidden="true"></i></strong>,},
  80:  { style: { color: 'Gold', }, label: <strong>1<i className="fa fa-star fa-1x" aria-hidden="true"></i></strong>,},
  100: { style: { color: 'Gold', }, label: <strong>Any</strong>,},
};
const priceMarks = {
  1:  { style: { color: 'Black', }, label: <strong>$1</strong>,},
  500: { style: { color: 'Black', }, label: <strong>$500</strong>,},
};

class RangeSlider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      valueSlider: 50,
      valueRange:[1,500]
    };
  }

  onSliderChange = valueSlier => {
    this.setState({
      valueSlier
    });
  };

  onAfterSliderChange = value => {
    this.props.handleRatingChangeSubmit('rating',this.rating(value));
  };

  onRangeChange = valueRange => {
    this.setState({
      valueRange
    });
  };

  onAfterRangeChange = value => {
    this.props.handlePriceChangeSubmit('price',value);
  };

  rating = v => {
    switch (v) {
      case 100:
          return 0
        break;
      case 80:
          return 1
        break;
      case 60:
          return 2
        break;
      case 40:
          return 3
        break;
      case 20:
          return 4
        break;
      default:0
        return 5
        break;
    }
  }

  render() {
    return (
      <div>
        {this.props.name === 'Range'?(
          <Range
          pushable={100}
          min={1}
          max={500}
          marks={priceMarks}
          handle={handle}
          tipFormatter={value => `$${value}`}
          defaultValue={[1, 500]}
          value={this.state.valueRange}
          onChange={this.onRangeChange}
          onAfterChange={this.onAfterRangeChange}
          />
        ):(
          <Slider
          dots
          reverse
          step={20}
          defaultValue={100}
          marks={marks}
          value={this.state.valueSlier}
          onChange={this.onSliderChange}
          onAfterChange={this.onAfterSliderChange}
          />
        )}
      </div>
    );
  }
}


export default RangeSlider;
