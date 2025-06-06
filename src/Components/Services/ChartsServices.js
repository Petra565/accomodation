const Url = 'http://localhost:4000/stats/'
export async function getChartsSummary() {
    try {
        let response = await fetch(`${Url}getChartsSummary`, {
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

export async function getTableSummary() {
    try {
        let response = await fetch(`${Url}getTableSummary`, {
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

