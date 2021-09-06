/**
 *
 * ProductFilter
 *
 */

import React from 'react';
import { Card, CardBody, CardHeader, Badge } from 'reactstrap';

import Radio from '../../Common/Radio';
import RangeSlider from '../../Common/RangeSlider';

const ProductFilter = props => {
  const { totalProducts, pageNumber, filterProducts } = props;

  return (
    <div className='product-filter'>
      <Card>
        <CardHeader tag='h3'>Price Range:</CardHeader>
        <CardBody>
          <RangeSlider
            name={'Range'}
            handlePriceChangeSubmit={(n, v) => {
              filterProducts(n, v);
            }}
          />
        </CardBody>
      </Card>
      <Card>
        <CardHeader tag='h3'>Customer Rating:</CardHeader>
        <CardBody>
          <RangeSlider
            name={'Slider'}
            handleRatingChangeSubmit={(n, v) => {
              filterProducts(n, v);
            }}
          />
        </CardBody>
      </Card>
    </div>
  );
};

export default ProductFilter;
