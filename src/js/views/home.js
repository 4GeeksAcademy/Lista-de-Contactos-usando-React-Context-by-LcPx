import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/contactList.css";

export const Home = () => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        if (actions && actions.loadContacts) {
            actions.loadContacts();
        } else {
            console.error("Error: 'actions.loadContacts' is not available!");
        }
    }, [actions]);

    return (
        <div className="container contact-list">
            <h1 className="text-center mt-5">Contact List</h1>
            
            <button className="add-contact-button" 
                onClick={() => {
                    actions.addContact({
                        name: "New Contact",
                        address: "Fake Street 123",
                        phone: "123-456-789",
                        email: "new@contact.com"
                    });
                }}>
                    ➕ Add New Contact
            </button>

            <div className="list-group mt-4">
                {store.contacts && store.contacts.length > 0 ? (
                    store.contacts.map((contact, index) => (
                        <div key={index} className="contact-card">
                            <img src="https://i.pravatar.cc/80" alt="Avatar" />
                            <div className="contact-details">
                                <h5>{contact.name}</h5>
                                <p>📍 {contact.address}</p>
                                <p>📞 {contact.phone}</p>
                                <p>📧 {contact.email}</p>
                            </div>
                            <div className="contact-actions">
                                <button className="edit" onClick={() => actions.editContact(contact.id, contact)}>✏️</button>
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
