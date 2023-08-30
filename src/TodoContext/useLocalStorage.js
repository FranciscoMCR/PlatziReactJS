import React from 'react';

function useLocalStorage(itemName, initialValue) {

    const [item, setItem] = React.useState(initialValue);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(false);

    React.useEffect(() => {
        setTimeout(() => {
            try {
                const localStorageItem = localStorage.getItem(itemName);

                let parsedItem;

                if (!localStorageItem) {
                    localStorage.setItem(itemName, JSON.stringify(initialValue))
                    parsedItem = initialValue;
                } else {
                    parsedItem = JSON.parse(localStorageItem);
                    setItem(parsedItem);
                }

                setLoading(false);
            }
            catch (error) {
                setError(true);
                setLoading(false);
            }
        }, 2000);
        //eslint-disable-next-line
    }, []);

    const saveItem = (newItems) => {
        localStorage.setItem(itemName, JSON.stringify(newItems))
        setItem(newItems);
    };

    return {
        item,
        saveItem,
        loading,
        error,
    };

}

export { useLocalStorage };

// const defaultTodos = [
//   { text: "Cortar cebolla", completed: true },
//   { text: "Cortar tomate", completed: true },
//   { text: "Lavar lechuga", completed: false },
//   { text: "Cortar pimentón", completed: false },
// ];

//localStorage.setItem('TODOS_V1', JSON.stringify(defaultTodos));
//localStorage.removeItem('TODOS_V1');