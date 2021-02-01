/**
 *
 * SubPage
 *
 */

import React from 'react';

import Button from '../../Common/Button';

const SubPage = props => {
  const { title, actionTitle, handleAction, children } = props;

  return (
    <div className='sub-page'>
      <div className='subpage-header'>
        <h2>{title}</h2>
        {actionTitle && (
          <div className='action'>
            <Button variant='none' text={actionTitle} onClick={handleAction} />
          </div>
        )}
      </div>
      <div className='subpage-body'>{children}</div>
    </div>
  );
};

export default SubPage;
