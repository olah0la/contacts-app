import React, { useState, useEffect, useCallback } from 'react';
import './ListContacts.css';
import ContactTable from '../Table/ContactTable';
import {baseURL} from '../services/api';

function ListContacts() {
    const [isLoading, setIsLoading] = useState(true);
    const [contacts, setContacts] = useState([]);
    const [pageIndex, setPageIndex] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(0);
    const [totalContacts, setTotalContacts] = useState(0);
    const [result, setResult] = useState({});

    const callAPI = useCallback(async () => {
        console.log("Calling API...");
        setIsLoading(true);
        fetch(`${baseURL}/contacts?page=${pageIndex}&size=${pageSize}`)
            .then(res => res.json())
            .then((result) => {
                setResult(result);
            }, (error) => {
                console.log("Error:", error);
            });
    }, [pageIndex, pageSize]);

    useEffect(() => {
        if (result?.items) {
            setTotalPages(result?.pages);
            setTotalContacts(result?.total);
            setContacts(result?.items);
            setIsLoading(false);
        }
    }, [result])

    useEffect(() => {
        callAPI();
    }, [pageIndex, pageSize, callAPI]);
    
    return (
        <div className="PortfolioSummary">
            <h1>Portfolio Summary</h1>

            {!isLoading ? (
                <ContactTable
                    contacts={contacts}
                    pageIndex={pageIndex}
                    setPageIndex={setPageIndex}
                    pageSize={pageSize}
                    setPageSize={setPageSize}
                    totalPages={totalPages}
                    totalContacts={totalContacts}
                />
            ) : (
                <p>Loading...</p>
            )}
        </div>
    )


}

export default ListContacts;