import React, {useState, useEffect, useCallback} from 'react';
import ContactTable from '../Table/ContactTable';
import './ListContacts.css';

function ListContacts() {
    const [isLoading, setIsLoading] = useState(true);
    const [contacts, setContacts] = useState({items: []});
    const [pageIndex, setPageIndex] = useState(1);
    const [pageSize, setPageSize] = useState(10); 
    
    const callAPI = useCallback(async () => {
        console.log("Calling API...");
        setIsLoading(true);
        fetch(`http://localhost:5000/contacts?page=${pageIndex}&size=${pageSize}`)
            .then(res => res.json())
            .then((result) => {
                console.log("Result:", result);
                setContacts(result);
                setIsLoading(false);
            }, (error) => {
                console.log("Error:", error);
                setIsLoading(false);
            });
    }, [pageIndex, pageSize]);


    useEffect(() => {
        callAPI();
    }, [pageIndex, pageSize, callAPI]);

    useEffect(() => {
        console.log("Page Index:", pageIndex);
        console.log("Page Size:", pageSize);
        console.log("Contacts:", contacts);
        console.log("Is Loading:", isLoading);
    })

    return (
        <div className="PortfolioSummary">
            <h1>Portfolio Summary</h1>

            {contacts?.items.length > 0 ? (
                <ContactTable
                    contacts={contacts?.items}
                    pageIndex={pageIndex}
                    setPageIndex={setPageIndex}
                    pageSize={pageSize}
                    setPageSize={setPageSize}
                />
            ) : (
                <p>Loading...</p>
            )}
        </div>
    )


}

export default ListContacts;