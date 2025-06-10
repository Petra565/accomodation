const Url = 'http://localhost:4000/checkIn/'

export async function orderEditState(data) {
    try {
        let response = await fetch(`${Url}markAsFinishedByHost`, {
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
export async function checkInGet(id) {
    try {
        let response = await fetch(`${Url}get/${id}`, {
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
        let response = await fetch(`${Url}create`, {
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