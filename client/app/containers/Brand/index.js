/*
 *
 * Brand
 *
 */

import React from 'react';
import { connect } from 'react-redux';

import actions from '../../actions';

import AddBrand from '../../components/AddBrand';
import Table from '../../components/Table';
import SubPage from '../../components/SubPage';

class Brand extends React.PureComponent {
  componentDidMount() {
    this.props.fetchBrands();
  }

  render() {
    const {
      brandFormData,
      brandChange,
      formErrors,
      addBrand,
      isBrandAddOpen,
      brands,
      columns,
      toggleAddBrand,
      deleteBrand
    } = this.props;

    return (
      <div className='brand-dashboard'>
        <SubPage
          title={isBrandAddOpen ? 'Add Brand' : 'Brand List'}
          isMenuOpen={isBrandAddOpen}
          toggleMenu={toggleAddBrand}
        >
          {isBrandAddOpen ? (
            <AddBrand
              brandFormData={brandFormData}
              formErrors={formErrors}
              brandChange={brandChange}
              addBrand={addBrand}
            />
          ) : (
            <Table
              data={brands}
              columns={columns}
              striped={true}
              hover={true}
              condensed={true}
              csv={true}
              search={true}
              isRowEvents={true}
              clickAction={(id, index) => deleteBrand(id, index)}
            />
          )}
        </SubPage>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    brandFormData: state.brand.brandFormData,
    isBrandAddOpen: state.brand.isBrandAddOpen,
    brands: state.brand.brands,
    formErrors: state.brand.formErrors,
    columns: state.brand.columns
  };
};

export default connect(mapStateToProps, actions)(Brand);
