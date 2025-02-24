import React, { useState, useEffect } from "react";
import getState from "./flux.js";

export const Context = React.createContext(null);

const injectContext = (PassedComponent) => {
    const StoreWrapper = (props) => {
        const [state, setState] = useState({
            store: {},
            actions: {}
        });

        useEffect(() => {
            const stateFunctions = {
                getStore: () => state.store,
                getActions: () => state.actions,
                setStore: (updatedStore) =>
                    setState((prevState) => ({
                        store: { ...prevState.store, ...updatedStore },
                        actions: { ...prevState.actions }
                    })),
            };
        
            const initialState = getState(stateFunctions);
        
            setState((prevState) => ({
                store: { ...prevState.store, ...initialState.store },
                actions: { ...prevState.actions, ...initialState.actions },
            }));
        
            if (initialState.actions.createUser) {
                initialState.actions.createUser();
            }
        }, []);

        return (
            <Context.Provider value={state}>
                <PassedComponent {...props} />
            </Context.Provider>
        );
    };

    return StoreWrapper;
};

export default injectContext;

