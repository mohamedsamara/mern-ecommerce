/**
 *
 * SubPage
 *
 */

import React from 'react';

import Button from '../Button';

const SubPage = props => {
  const { title, isMenuOpen, toggleMenu, children } = props;

  return (
    <div className='sub-page'>
      <div className='subpage-header'>
        <h2>{title}</h2>
        {isMenuOpen !== null && (
          <div className='action'>
            {isMenuOpen ? (
              <Button
                ariaLabel='add form view'
                ariaExpanded='true'
                icon={<i className='fa fa-ellipsis-h' aria-hidden='true' />}
                onClick={toggleMenu}
              />
            ) : (
              <Button
                ariaLabel='default view'
                ariaExpanded='false'
                icon={<i className='fa fa-ellipsis-v' aria-hidden='true' />}
                onClick={toggleMenu}
              />
            )}
          </div>
        )}
      </div>
      <div className='subpage-body'>{children}</div>
    </div>
  );
};

export default SubPage;
