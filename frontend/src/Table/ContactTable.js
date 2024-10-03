import React, {useState, useEffect} from 'react';
import {EuiBasicTable, EuiSpacer, EuiText, EuiHorizontalRule} from '@elastic/eui';
import columns from './TableColumns';

const ContactTable = ({ contacts, pageIndex, setPageIndex, pageSize, setPageSize, totalContacts, totalPages}) => {
  
  const onTableChange = (page) => {
    if (page) {
      const { page: { index: newPageIndex, size: newPageSize } = {} } = page;
      if (newPageIndex <= totalPages) {
        if ((pageIndex !==  newPageIndex) && newPageIndex) {
          setPageIndex(newPageIndex);
        }
      }
      if ((pageSize !== newPageSize) && newPageSize) {
        setPageIndex(1);
        setPageSize(newPageSize);
      }
    }
  };

  const findContacts = (
    contacts,
    pageIndex,
    pageSize,
  ) => {
    let pageOfItems;

    if (!pageIndex && !pageSize) {
      pageOfItems = contacts;
    } else {
      const startIndex = pageIndex * pageSize;
      pageOfItems = contacts.slice(
        startIndex,
        Math.min(startIndex + pageSize, contacts.length)
      );
    }

    return {
      pageOfItems,
      totalItemCount: contacts.length,
    };
  };
  
  const {totalItemCount} = findContacts(
    contacts,
    pageIndex,
    pageSize,
  );

  const pagination = {
    pageIndex: pageIndex,
    pageSize: pageSize,
    totalItemCount: totalContacts,
    pageSizeOptions: [10, 50, 100, 200],
  };

  const resultsCount = pageSize === 0 ? (
    <strong>All</strong>
  ) : (
    <>
      <strong>
        {(pageSize * pageIndex + 1) - pageSize }-{pageSize * pageIndex}
      </strong>{' '}
      of {totalContacts}
    </>
  );

  return (    
    <div>
      <h1>Contact Table</h1>
      <EuiSpacer size="xl" />
      <EuiText size="xs">
        Showing {resultsCount} <strong>Users</strong>
      </EuiText>
      <EuiSpacer size="s" />
      <EuiHorizontalRule margin="none" style={{ height: 2 }} />
        <EuiBasicTable
          items={contacts}
          rowHeader='first_name'
          columns={columns}
          pagination={pagination}
          onChange={onTableChange}
        />
    </div>
  );
}

export default ContactTable;