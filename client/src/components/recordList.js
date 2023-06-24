import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Record = (props) => (
    <tr>
        <td>{props.record.date}</td>
        <td>{props.record.name}</td>
        <td>{props.record.item}</td>
        <td>{props.record.size}</td>
        <td>{props.record.school}</td>
        <td>{props.record.vendor}</td>
        <td>{props.record.paid}</td>
        <td>{props.record.employee}</td>
        <td>{props.record.dateReceived}</td>
        <td>{props.record.contactedCust}</td>
        <td>{props.record.pickedUp}</td>
        <td>
            <Link className="btn btn-link" to={`/edit/${props.record._id}`}>Edit</Link> |
            <button className="btn btn-link"
                    onClick={() => {props.deleteRecord(props.record._id)}}
                    >Delete
            </button>
        </td>
    </tr>
)

export default function RecordList() {
    const [records, setRecords] = useState([]);

    useEffect(() => {
        async function getRecords() {
            const response = await fetch(`http://localhost:5080/record/`);

            if (!response.ok) {
                const message = `An error occured: ${response.statusText}`;
                window.alert(message);
                return;
            }

            const records = await response.json();
            setRecords(records);
        }

        getRecords();
        return;
    }, [records.length]);

    async function deleteRecord(id) {
        await fetch(`http://localhost:5080/record/${id}`, {
            method: "DELETE"
        });
        
        const newRecords = records.filter((el) => el._id !== id);
        setRecords(newRecords)
    }

    // This method will map out the records
    function recordList() {
        return records.map((record) => {
            return (
                <Record
                    record={record}
                    deleteRecord={() => {deleteRecord(record._id)}}
                    key={record._id}
                />
            )
        });
    }
    return (
        <div>
            <h3 className="mt-3 ms-3">Current Orders</h3>
            <table className="table table-striped mt-3">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Name</th>
                        <th>Item</th>
                        <th>Size</th>
                        <th>School</th>
                        <th>Vendor</th>
                        <th>Paid</th>
                        <th>Employee</th>
                        <th>Date Received</th>
                        <th>Contacted Customer</th>
                        <th>Picked Up</th>
                    </tr>
                </thead>
                <tbody>{recordList()}</tbody>
            </table>
        </div>
    )
}