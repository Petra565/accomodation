export async function orderEditState(data) {
    try {
        let response = await fetch(`http://localhost:4000/checkIn/markAsFinishedByHost`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        return response.json();

    } catch (err) {
        throw new Error('Network response was not OK');
    }
}
export async function checkInGetId(id) {
    try {
        let response = await fetch(`http://localhost:4000/order/get/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        return response.json();

    } catch (err) {
        throw new Error('Network response was not OK');
    }
}
export async function checkInCreate(data) {
    try {
        let response = await fetch(`http://localhost:4000/checkIn/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        return response.json();

    } catch (err) {
        throw new Error('Network response was not OK');
    }
}