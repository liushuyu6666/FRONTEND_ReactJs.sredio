export const post = (url, body) => {
    const request = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    }
    return fetch(url, request)
            .then(response => {
                if(response.ok){
                    return response.json();
                }
                else{
                    throw request.json();
                }
            })
}

export const get = (url) => {
    const request = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    }
    return fetch(url, request)
            .then(response => {
                if(response.ok){
                    return response.json();
                }
                else{
                    throw request.json();
                }
            })
}

export const urlPreifx = "/v1/sredio";