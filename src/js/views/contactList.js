import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";


const ContactList = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    useEffect(() => {
        // if (actions.loadContacts) {
        actions.loadContacts();

        // } else {
        //     console.error("Erro: 'actions.loadContacts' não está definido!");
        // }
    }, []);

    return (
        <div className="container contact-list">
            <h1 className="text-center mt-5">Contact List</h1>
            <button className="add-contact-button" onClick={() => navigate("/addContact")}>
                ➕ Add New Contact
            </button>

            <div className="list-group mt-4">
                {store.contacts && store.contacts.length > 0 ? (
                    store.contacts.map((contact, index) => (
                        <div key={index} className="contact-card">
                            <img src={contact.avatar || "https://i.pravatar.cc/80"} alt="Avatar" />
                            <div className="contact-details">
                                <h5>{contact.name}</h5>
                                <p>📍 {contact.address}</p>
                                <p>📞 {contact.phone}</p>
                                <p>📧 {contact.email}</p>
                            </div>
                            <div className="contact-actions">
                                <button className="edit" onClick={() => navigate(`/editContact/${contact.id}`)}>✏️</button>
                                <button className="delete" onClick={() => actions.deleteContact(contact.id)}>🗑️</button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center">No contacts available.</p>
                )}
            </div>
        </div>
    );
};

export default ContactList;