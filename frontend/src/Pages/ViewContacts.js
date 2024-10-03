import React, {useEffect, useState} from "react";

import {useParams} from "react-router-dom";
import apiService from "../services/api";

const ViewContacts = () => {
    const {contactId} = useParams();
    const [contact, setContact] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchContact = async () => {
            try {
                const data = await apiService(`/contacts/${contactId}`);
                setContact(data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        fetchContact();
    }, [contactId]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div>
            <p>{contactId}</p>
            {contact ? (
                <div>
                    <p>{contact.first_name} {contact.last_name}</p>
                    <p>{contact.email}</p>
                    <p>{contact.address}</p>
                    <p>{contact.comment}</p>
                    <p>{contact.job}</p>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    )
}

export default ViewContacts;