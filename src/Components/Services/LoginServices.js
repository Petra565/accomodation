const Url = 'http://localhost:4000/'

export async function login(data) {
    try {
        let response = fetch(`${Url}auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })

        return response.json()
    }
    catch (err) {
        throw new Error('Network response was not OK');
    }
}