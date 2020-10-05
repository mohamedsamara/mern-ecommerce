/**
 *
 * Table
 *
 */

import React from 'react';

import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, {
  CSVExport,
  Search
} from 'react-bootstrap-table2-toolkit';

const indication = () => {
  return 'Oops! No data now! Please try again!';
};

const { ExportCSVButton } = CSVExport;
const { SearchBar } = Search;

const Table = props => {
  const {
    data,
    columns,
    striped,
    hover,
    condensed,
    csv,
    search,
    clickAction,
    isRowEvents
  } = props;

  const rowEvents = {
    onClick: (e, row, rowIndex) => {
      clickAction(row._id, rowIndex);
    }
  };

  return (
    <ToolkitProvider
      keyField='_id'
      data={data}
      columns={columns}
      exportCSV={csv}
      search={search}
    >
      {props => (
        <div className='table-section'>
          {csv && (
            <div className='csv'>
              <ExportCSVButton
                className='input-btn custom-btn-primary'
                {...props.csvProps}
              >
                Export CSV
              </ExportCSVButton>
            </div>
          )}
          {search && (
            <div className='search'>
              <SearchBar {...props.searchProps} />
            </div>
          )}
          <BootstrapTable
            {...props.baseProps}
            keyField='_id'
            data={data}
            columns={columns}
            striped={striped}
            hover={hover}
            condensed={condensed}
            noDataIndication={indication}
            // rowEvents={isRowEvents ? rowEvents : null}
          />
        </div>
      )}
    </ToolkitProvider>
  );
};

export default Table;
