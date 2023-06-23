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
                    onClick={() => {document.getElementById('question').style.display = 'block';
                    }}>Delete
            </button>
            <div id="question" className="bg-light me-3" style={{display: "none", border: "2px solid black"}}>
                <p className="text-dark text-center">Delete this order?</p>
                <div className="d-flex p-3">
                    <button className="btn btn-danger h-25 m-auto" onClick={() => {
                    props.deleteRecord(props.record._id);
                    }}>Yes</button>
                     <button className="btn btn-success m-auto" onClick={() => {document.getElementById('question').style.display = 'none'}}>
                        No</button>
                </div>
            </div>
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
            <h3>Current Orders</h3>
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