const Url = 'http://localhost:4000/order/'
export async function orderList(queryParams) {
    const token = sessionStorage.getItem('token');

    try {
        let response = await fetch(`${Url}list?${queryParams}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });
        return response.json();

    } catch (err) {
        throw new Error('Network response was not OK');
    }
}

export async function orderGet(id) {
    const token = sessionStorage.getItem('token');

    try {
        let response = await fetch(`${Url}get/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        })
        return response.json();

    } catch (err) {
        throw new Error('Network response was not OK');
    }
}


export async function orderCreate(data) {
    const token = sessionStorage.getItem('token');

    try {
        let response = await fetch(`${Url}create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data),
        })
        return response.json();

    } catch (err) {
        throw new Error('Network response was not OK');
    }
}

export async function orderEdit(data) {
    const token = sessionStorage.getItem('token');

    try {
        let response = await fetch(`${Url}edit`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data),
        })
        return response.json();

    } catch (err) {
        throw new Error('Network response was not OK');
    }
}

export async function orderDelete(id) {
    const token = sessionStorage.getItem('token');

    try {
        let response = await fetch(`${Url}delete/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        })
        return response.json();

    } catch (err) {
        throw new Error('Network response was not OK');
    }
}
