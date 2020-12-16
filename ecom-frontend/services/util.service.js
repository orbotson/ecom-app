export const utilService = {
    fetcher,
};

//SWR fetch wrapper
function fetcher(...args) {
    return fetch(...args).then(res => res.json());
}
