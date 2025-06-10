const Url = 'http://localhost:4000/'

export async function login(data) {
    try {
        let response = await fetch(`${Url}auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        const dataJson = await response.json();

        return dataJson
    }
    catch (err) {
        console.log(err)
        throw new Error('Network response was not OK');
    }
}