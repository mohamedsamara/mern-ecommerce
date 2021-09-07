/**
 *
 * Pagination
 *
 */

import React from 'react';
import {
  Pagination as RPagination,
  PaginationItem,
  PaginationLink
} from 'reactstrap';

let prev = 0;
let next = 0;
let last = 0;
let first = 0;

class Pagination extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      productsPerPage: 8
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    event.preventDefault();
    this.setState({
      currentPage: Number(event.target.id)
    });
    this.props.handlePagenationChangeSubmit('pagination', event.target.id);
  }

  render() {
    let { currentPage } = this.state;

    prev = currentPage > 0 ? currentPage - 1 : 0;
    last = this.props.pages;
    next = last === currentPage ? currentPage : currentPage + 1;

    let pageNumbers = [];
    for (let i = 1; i <= last; i++) {
      pageNumbers.push(i);
    }

    return (
      <RPagination className='pagination'>
        <PaginationItem>
          {prev === 0 ? (
            <PaginationLink disabled>Prev</PaginationLink>
          ) : (
            <PaginationLink onClick={this.handleClick} id={prev} href={prev}>
              Prev
            </PaginationLink>
          )}
        </PaginationItem>
        {pageNumbers.map((number, i) => (
          <RPagination key={i}>
            <PaginationItem
              active={pageNumbers[currentPage - 1] === number ? true : false}
            >
              <PaginationLink
                onClick={this.handleClick}
                href={number}
                key={number}
                id={number}
              >
                {number}
              </PaginationLink>
            </PaginationItem>
          </RPagination>
        ))}

        <PaginationItem>
          {currentPage === last ? (
            <PaginationLink disabled>Next</PaginationLink>
          ) : (
            <PaginationLink
              onClick={this.handleClick}
              id={pageNumbers[currentPage]}
              href={pageNumbers[currentPage]}
            >
              Next
            </PaginationLink>
          )}
        </PaginationItem>
      </RPagination>
    );
  }
}

export default Pagination;
