/**
 *
 * SubPage
 *
 */

import React from 'react';

const SubPage = props => {
  const { title, isMenuOpen, toggleMenu, children } = props;

  return (
    <div className='sub-page'>
      <div className='subpage-header'>
        <h1>{title}</h1>
        {isMenuOpen !== null && (
          <div className='action'>
            {isMenuOpen ? (
              <div className='back' onClick={toggleMenu}>
                <i className='fa fa-ellipsis-h' />
              </div>
            ) : (
              <div className='add' onClick={toggleMenu}>
                <i className='fa fa-ellipsis-v' />
              </div>
            )}
          </div>
        )}
      </div>
      <div className='subpage-body'>{children}</div>
    </div>
  );
};

export default SubPage;
