/**
 *
 * ProductFilter
 *
 */

import React from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';

import RangeSlider from '../../Common/RangeSlider';

const priceMarks = {
  1: { label: <p className='fw-1 text-black'>$1</p> },
  5000: { label: <p className='fw-1 text-black'>$5000</p> }
};

const rateMarks = {
  0: {
    label: (
      <strong>
        5
        <i
          className='fa fa-star fa-1x'
          style={{ display: 'contents' }}
          aria-hidden='true'
        ></i>
      </strong>
    )
  },
  20: {
    label: (
      <strong>
        4<i className='fa fa-star fa-1x' aria-hidden='true'></i>
      </strong>
    )
  },
  40: {
    label: (
      <strong>
        3<i className='fa fa-star fa-1x' aria-hidden='true'></i>
      </strong>
    )
  },
  60: {
    label: (
      <strong>
        2<i className='fa fa-star fa-1x' aria-hidden='true'></i>
      </strong>
    )
  },
  80: {
    label: (
      <strong>
        1<i className='fa fa-star fa-1x' aria-hidden='true'></i>
      </strong>
    )
  },
  100: { label: <strong>Any</strong> }
};

const rating = v => {
  switch (v) {
    case 100:
      return 0;
    case 80:
      return 1;
    case 60:
      return 2;
    case 40:
      return 3;
    case 20:
      return 4;
    default:
      0;
      return 5;
  }
};

const ProductFilter = props => {
  const { filterProducts } = props;

  return (
    <div className='product-filter'>
      <Card className='mb-4'>
        <CardHeader tag='h3'>Price</CardHeader>
        <CardBody>
          <div className='mx-2 mb-3'>
            <RangeSlider
              marks={priceMarks}
              defaultValue={[1, 2500]}
              max={5000}
              onChange={v => {
                filterProducts('price', v);
              }}
            />
          </div>
        </CardBody>
      </Card>
      <Card>
        <CardHeader tag='h3'>Rating</CardHeader>
        <CardBody>
          <div className='mx-2 mb-4'>
            <RangeSlider
              type='slider'
              marks={rateMarks}
              step={20}
              defaultValue={[100]}
              onChange={v => {
                filterProducts('rating', rating(v));
              }}
            />
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default ProductFilter;
