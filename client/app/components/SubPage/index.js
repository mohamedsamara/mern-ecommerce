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
                <i className='fa fa-chevron-left' />
              </div>
            ) : (
              <div className='add' onClick={toggleMenu}>
                <i className='fa fa-chevron-right' />
              </div>
            )}
          </div>
        )}
      </div>
      {children}
    </div>
  );
};

export default SubPage;
