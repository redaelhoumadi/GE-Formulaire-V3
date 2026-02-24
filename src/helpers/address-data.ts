import axios from "axios";

export function getAddressData(pid: string | undefined): Promise<string[]> {
    return new Promise((resolve, reject) => {
        if (!pid) return resolve([]);
        axios.get('https://api-adresse.data.gouv.fr/search/?q=' + encodeURIComponent(pid)).then((response) => {
            const { features } = response.data;
            const data = features.map((address: { properties: { label: any; }; }) => address.properties.label)
            if (data)
                return resolve(data);
            return resolve([]);

        }).catch(error => {
            return resolve([]);
        })
    })
}