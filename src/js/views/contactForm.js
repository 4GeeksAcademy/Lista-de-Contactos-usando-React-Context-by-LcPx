import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

const contactForm = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const { id } = useParams();

    const [contact, setContact] = useState({
        name: "",
        phone: "",
        email: "",
        address: ""
    });

    useEffect(() => {
        if (id) {
            const existingContact = store.contacts.find(contact => contact.id == id);
            if (existingContact) {
                setContact(existingContact);
            }
        }
    }, [id, store.contacts]);

    const handleChange = (e) => {
        setContact({ ...contact, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!id) {
            actions.addContact({ ...contact, agenda_slug: "LcPx" })
        } else {
            actions.editContact(id, contact);
        }
        navigate("/");
    };

    return (
        <div className="container">
            <h1 className="text-center mt-5">{id ? "Edit Contact" : "Add New Contact"}</h1>

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label>Name:</label>
                    <input type="text" name="name" value={contact.name} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label>Address:</label>
                    <input type="text" name="address" value={contact.address} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label>Phone:</label>
                    <input type="tel" name="phone" value={contact.phone} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label>Email:</label>
                    <input type="email" name="email" value={contact.email} onChange={handleChange} required />
                </div>
                <button type="submit" className="btn btn-primary">{id ? "Update Contact" : "Save Contact"}</button>
                <button type="button" className="btn btn-secondary ms-2" onClick={() => navigate("/")}>Cancel</button>
            </form>
        </div>
    );
};

export default contactForm;
