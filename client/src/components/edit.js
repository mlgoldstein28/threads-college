import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function Edit() {
    const [form, setForm] = useState({
        date: "",
        name: "",
        item: "",
        size: "",
        school: "",
        vendor: "",
        paid: "",
        employee: "",
        dateReceived: "",
        contactedCust: "",
        pickedUp: "",
    });
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            const id = params.id;
            const response = await fetch(`https://localhost:5080/records/${params.id.toString()}`);

            if (!response.ok) {
                const message = `an error has occured: ${response.statusText}`;
                window.alert(message);
                return;
            }
            
            const record = await response.json();
            if (!record) {
                window.alert(`Record with id ${id} not found`);
                navigate("/");
                return;
            }

            setForm(record);
        }
        fetchData();

        return;
        }, [params.id, navigate]);

        function updateForm(value) {
            return setForm((prev) => {
                return { ...prev, ...value };
            });
        }

        async function onSubmit(e) {
            e.preventDefault();
            const editedOrder = {
                date: form.date,
                name: form.name,
                item: form.item,
                size: form.size,
                school: form.school,
                vendor: form.vendor,
                paid: form.paid,
                employee: form.employee,
                dateReceived: form.dateReceived,
                contactedCust: form.contactedCust,
                pickedUp: form.pickedUp,
            }
            await fetch(`https://localhost:5080/record/${params.id}`, {
                method: "PATCH",
                body: JSON.stringify(editedOrder),
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            navigate("/")
        }
        return (
            <div className="w-50 m-auto">
              <h3 className="text-center">Update Order</h3>
              <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="date">Date</label>
                    <input
                        type="date"
                        className="form-control"
                        id="date"
                        value={form.date}
                        onChange={(e) => {updateForm({date: e.target.value})}}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="danamete"
                        value={form.name}
                        onChange={(e) => {updateForm({name: e.target.value})}}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="item">Item</label>
                    <input
                        type="text"
                        className="form-control"
                        id="item"
                        value={form.item}
                        onChange={(e) => {updateForm({item: e.target.value})}}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="size">Size</label>
                    <input
                        type="text"
                        className="form-control"
                        id="size"
                        value={form.size}
                        onChange={(e) => {updateForm({size: e.target.value})}}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="school">School</label>
                    <input
                        type="text"
                        className="form-control"
                        id="school"
                        value={form.school}
                        onChange={(e) => {updateForm({school: e.target.value})}}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="vendor">Vendor</label>
                    <input
                        type="text"
                        className="form-control"
                        id="vendor"
                        value={form.vendor}
                        onChange={(e) => {updateForm({vendor: e.target.value})}}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="paid">Paid</label>
                    <input
                        type="text"
                        className="form-control d-none"
                        id="paid"
                        value={form.paid}
                        onChange={(e) => {updateForm({paid: e.target.value})}}
                    />
                </div>
                <div className="form-group">
                  <div className="form-check form-check-inline">
                    <input 
                        className="form-check-input"
                        type="radio"
                        name="paidOptions"
                        id="paidYes"
                        value="Yes"
                        checked={form.paid === "Yes"}
                        onChange={(e) => updateForm({ paid: e.target.value })}
                        />
                        <label htmlFor="paidYes" className="form-check-label">Yes</label>
                  </div>
                    <input 
                        className="form-check-input"
                        type="radio"
                        name="paidOptions"
                        id="paidNo"
                        value="No"
                        checked={form.paid === "No"}
                        onChange={(e) => updateForm({ paid: e.target.value })}
                    />
                    <label htmlFor="paidNo" className="form-check-label">No</label>
                </div>
                <div className="form-group">
                    <label htmlFor="employee">Employee</label>
                    <input
                        type="text"
                        className="form-control"
                        id="employee"
                        value={form.employee}
                        onChange={(e) => {updateForm({employee: e.target.value})}}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="dateReceived">Date Received</label>
                    <input
                        type="date"
                        className="form-control"
                        id="dateReceived"
                        value={form.dateReceived}
                        onChange={(e) => {updateForm({dateReceived: e.target.value})}}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="contactedCust">Contacted Customer</label>
                    <input
                        type="text"
                        className="form-control"
                        id="contactedCust"
                        value={form.contactedCust}
                        onChange={(e) => {updateForm({contactedCust: e.target.value})}}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="pickedUp">Picked Up</label>
                    <input
                        type="text"
                        className="form-control d-none"
                        id="pickedUp"
                        value={form.pickedUp}
                        onChange={(e) => updateForm({ pickedUp: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <div className="form-check form-check-inline">
                        <input 
                            className="form-check-input"
                            type="radio"
                            name="pickedUpOptions"
                            id="pickedUpYes"
                            value="Yes"
                            checked={form.pickedUp === "Yes"}
                            onChange={(e) => updateForm({ pickedUp: e.target.value })}
                        />
                        <label htmlFor="pickedUpYes" className="form-check-label">Yes</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input 
                            className="form-check-input"
                            type="radio"
                            name="pickedUpOptions"
                            id="pickedUpNo"
                            value="No"
                            checked={form.pickedUp === "No"}
                            onChange={(e) => {updateForm({pickedUp: e.target.value})}}
                        />
                        <label htmlFor="pickedUpNo" className="form-check-label">No</label>
                    </div>
                </div>
                <div className="form-group text-center">
                    <input 
                        type="submit"
                        value="Update Order"
                        className="btn btn-primary"
                    />
                </div>
              </form>
            </div>
        )
}