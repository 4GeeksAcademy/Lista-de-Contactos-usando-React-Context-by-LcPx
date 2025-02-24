const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            contacts: [],
        },

        actions: {
            createUser: () => {
                fetch("https://playground.4geeks.com/contact/agendas/LcPx", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" }
                })
                .then(response => response.json())
                .then(data => {
                    console.log("User created:", data);
                    getActions().loadContacts();
                })
                .catch(error => console.error("Error creating user:", error));
            },

            loadContacts: () => {
                console.log("🔄 A carregar contactos...");
            
                fetch("https://playground.4geeks.com/contact/agendas/LcPx/contacts", {
                    method: "GET"
                })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("❌ Falha ao obter contactos da API");
                    }
                    return response.json();
                })
                .then((data) => {
                    console.log("📥 Contactos carregados:", data);
                    setStore({ contacts: data.contacts || [] }); // 🔹 Garante que é um array
                })
                .catch((error) => console.error("Erro ao carregar contactos:", error));
            },

            addContact: (contact) => {
                fetch("https://playground.4geeks.com/contact/agendas/LcPx/contacts", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ 
                        ...contact, 
                        agenda_slug: "LcPx",
                        avatar: "https://i.pravatar.cc/80?u=" + contact.email // 🔹 Associa o avatar ao e-mail
                    }),
                })
                .then(response => response.json())
                .then(data => {
                    console.log("Contact added:", data);
                    getActions().loadContacts();
                })
                .catch(error => console.error("Error adding contact:", error));
            },

            editContact: (id, updatedContact) => {
                fetch(`https://playground.4geeks.com/contact/agendas/LcPx/contacts/${id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(updatedContact),
                })
                .then(response => response.json())
                .then(() => getActions().loadContacts())
                .catch(error => console.error("Error editing contact:", error));
            },

            deleteContact: (id) => {
                console.log(`🗑️ Tentando eliminar contacto com ID: ${id}`);
            
                const store = getStore();
                
                // if (!store.contacts || !Array.isArray(store.contacts)) {
                //     console.error("Erro: store.contacts está indefinido ou não é um array");
                //     return;
                // }
            
                // // Remove o contacto da UI imediatamente
                // setStore({ contacts: store.contacts.filter(contact => contact.id !== id) });
            
                // Faz o pedido DELETE na API
                fetch(`https://playground.4geeks.com/contact/agendas/LcPx/contacts/${id}`, {
                    method: "DELETE",
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`❌ Erro ao eliminar contacto ${id}`);
                    }
                    return response.json();
                })
                .then(() => {
                    console.log(`✅ Contacto ${id} eliminado com sucesso`);
                    getActions().loadContacts(); // Confirmação de atualização na API
                })
                .catch(error => console.error("❌ Erro ao eliminar contacto:", error));
            }
            
        },
    };
};

export default getState;