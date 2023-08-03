import React from 'react'
import BootstrapTable from 'react-bootstrap-table-next';
import Link from "react-router-dom"


const columns = [{
  dataField: 'id',
  text: 'Product ID'
}, {
  dataField: 'name',
  text: 'Product Name'
}, {
  dataField: 'price',
  text: 'Product Price'
}];

const Table = props => {
    const { history, data, isLoading } = props;

    const columns = [{
      dataField: 'id',
      text: 'Product ID',
      sort: true
    }, {
      dataField: 'name',
      text: 'Product Name',
      sort: true
    }, {
      dataField: 'price',
      text: 'Product Price',
      sort: true
    },
    {
      dataField: "databasePkey",
      text: "Remove",
      formatter: (cellContent, row) => (<Link
        to={`/dashboard/product/edit/${row._id}`}
        // key={index}
        className='d-flex flex-row align-items-center mx-0 mb-3 product-box'
      ><button className="btn btn-danger btn-xs" onClick={() => console.log(row)}>Delete</button></Link>)}
    ];
    
    const defaultSorted = [{
      dataField: 'name',
      order: 'desc'
    }];
    
    return (
<BootstrapTable bootstrap4 keyField='id' data={ data } columns={ columns } />

    )
}  

export default Table