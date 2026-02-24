import axios from "axios";

export function getCityData(pid: string | undefined): Promise<string[]> {
    return new Promise((resolve, reject) => {
        if (!pid) return resolve([]);
        const request = {pid};
        axios.post('/api/search', request).then((response) => {
            const { data } = response.data;
            if (data) 
                return resolve(data);
            return resolve([]);

        }).catch(error => {
            return resolve([]);
        })
    })
}