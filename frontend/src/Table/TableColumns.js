import {EuiLink} from '@elastic/eui';

// id,first_name,last_name,email,address,comment,job
const columns = [
    {
        field: 'id',
        name: 'ID',
        truncateText: true,
        sortable: true,
        width: '100%',
    },
    {
        field: 'first_name',
        name: 'First Name',
        truncateText: true,
        sortable: true,
        width: '100%',
    },
    {
        field: 'last_name',
        name: 'Last Name',
        truncateText: true,
        sortable: true,
        width: '100%',
    },
    {
        field: 'email',
        name: 'Email',
        truncateText: true,
        sortable: true,
        width: '100%',
    },
    {
        field: 'address',
        name: 'Address',
        truncateText: true,
        sortable: true,
        width: '100%',
    },
    {
        field: 'comment',
        name: 'Comment',
        truncateText: true,
        width: '100%',
    },
    {
        field: 'job',
        name: 'Job',
        truncateText: true,
        sortable: true,
        width: '100%',
        render: (job) => (
            <EuiLink href={`http://localhost:5000/jobs/${job}`} target="_blank">
                {job}
            </EuiLink>
        )
    },
]

export default columns;