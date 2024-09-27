import React, {useState, useEffect} from 'react';
import {EuiBasicTable} from '@elastic/eui';
import columns from './TableColumns';

const ContactTable = ({ contacts, pageIndex, setPageIndex, pageSize, setPageSize }) => {
  


  const onTableChange = (page) => {
    console.log("Page:", page);
    if (page) {
      const { page: { index: newPageIndex, size: newPageSize } = {} } = page;
      if ((pageIndex !==  newPageIndex) && newPageIndex) {
        setPageIndex(newPageIndex);
      }
      if ((pageSize !== newPageSize) && newPageSize) {
        setPageSize(newPageSize);
      }
    }
  };

  const findContacts = (
    contacts,
    pageIndex,
    pageSize,
  ) => {
    let items = contacts; 
    let pageOfItems;

    if (!pageIndex && !pageSize) {
      pageOfItems = items;
    } else {
      const startIndex = pageIndex * pageSize;
      pageOfItems = items.slice(
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
    totalItemCount: totalItemCount,
    pageSizeOptions: [10, 50, 100, 200],
  };

  return (    
    <div>
      <h1>Contact Table</h1>
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