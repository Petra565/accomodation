const Url = 'http://localhost:4000/stats/'
export async function getChartsSummary() {
    const token = sessionStorage.getItem('token');
    try {
        let response = await fetch(`${Url}getChartsSummary`, {
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

export async function getTableSummary() {
    const token = sessionStorage.getItem('token');
    try {
        let response = await fetch(`${Url}getTableSummary`, {
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

