export async function orderList(queryParams) {
    try {
        let response = await fetch(`http://localhost:4000/order/list?${queryParams}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        return response.json();

    } catch (err) {
        throw new Error('Network response was not OK');
    }
}

export async function orderGet(id) {
    try {
        let response = await fetch(`http://localhost:4000/order/get/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        return response.json();

    } catch (err) {
        throw new Error('Network response was not OK');
    }
}


export async function orderCreate(data) {
    try {
        let response = await fetch(`http://localhost:4000/order/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        })
        return response.json();

    } catch (err) {
        throw new Error('Network response was not OK');
    }
}

export async function orderEdit(data) {
    try {
        let response = await fetch(`http://localhost:4000/order/edit`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        })
        return response.json();

    } catch (err) {
        throw new Error('Network response was not OK');
    }
}
