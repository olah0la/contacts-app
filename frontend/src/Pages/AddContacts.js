import React, {useState, useEffect, useCallback} from 'react';
import {
    EuiFlexGroup,
    EuiFlexItem,
    EuiForm,
    EuiFormRow,
    EuiButton,
    EuiFieldText,
    EuiTextArea,
    EuiFieldNumber,
    EuiAvatar,
} from '@elastic/eui';
import {baseURL} from '../services/api';
import './AddContacts.css';

function AddContacts() {
    // id,first_name,last_name,email,address,comment,job
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [comment, setComment] = useState('');
    const [job, setJob] = useState('');

    const handleSubmit = useCallback(async () => {
        console.log("Submitting...");
        fetch(`${baseURL}/contacts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                first_name: firstName,
                last_name: lastName,
                email: email,
                address: address,
                comment: comment,
                job: job,
            })
        }).then(res => {
            console.log("Submitted!");
        }, (error) => {
            console.log("Error:", error);
        });
    }, [firstName, lastName, email, address, comment, job]);

    return (
        <div className="PortfolioForm">
            <p>
                Add a new contact
            </p>
            <EuiForm>
                <EuiFlexGroup>
                    <EuiFlexItem>
                        <EuiFormRow label="First Name">
                            <EuiFieldText onChange={(e) => setFirstName(e.target.value)}/>
                        </EuiFormRow>
                    </EuiFlexItem>
                    <EuiFlexItem>
                        <EuiFormRow label="Last Name">
                            <EuiFieldText onChange={(e) => setLastName(e.target.value)}/>
                        </EuiFormRow>
                    </EuiFlexItem>
                </EuiFlexGroup>
                <EuiFlexGroup>
                    <EuiFlexItem>
                        <EuiFormRow label="Email">
                            <EuiFieldText onChange={(e) => setEmail(e.target.value)} />
                        </EuiFormRow>
                    </EuiFlexItem>
                    <EuiFlexItem>
                        <EuiFormRow  label="Address">
                            <EuiFieldText onChange={(e) => setAddress(e.target.value)}/>
                        </EuiFormRow>
                    </EuiFlexItem>
                </EuiFlexGroup>
                <EuiFlexGroup>
                    <EuiFlexItem>
                        <EuiFormRow label="Comment">
                            <EuiTextArea onChange={(e) => setComment(e.target.value)} />
                        </EuiFormRow>
                    </EuiFlexItem>
                    <EuiFlexItem>
                        <EuiFormRow label="Job">
                            <EuiFieldText onChange={(e) => setJob(e.target.value)}/>
                        </EuiFormRow>
                    </EuiFlexItem>
                </EuiFlexGroup>
                <EuiFlexGroup>
                    <EuiFlexItem grow={false}>
                        <EuiFormRow hasEmptyLabelSpace display="center">
                            <EuiButton onClick={handleSubmit}>Submit</EuiButton>
                        </EuiFormRow>
                    </EuiFlexItem>
                </EuiFlexGroup>
            </EuiForm>

            <p><a href="/">Take me back home!</a></p>


        </div>
    );
}

export default AddContacts;