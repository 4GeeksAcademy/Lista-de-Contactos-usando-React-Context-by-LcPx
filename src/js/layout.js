import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ContactList from "./views/contactList";
import ContactForm from "./views/contactForm";
import injectContext from "./store/appContext";

const Layout = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<ContactList />} />
                <Route path="/addContact" element={<ContactForm />} />
                <Route path="/editContact/:id" element={<ContactForm />} />
                <Route path="*" element={<h1>Not Found</h1>} />
            </Routes>
        </BrowserRouter>
    );
};

export default injectContext(Layout);
