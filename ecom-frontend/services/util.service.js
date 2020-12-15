export const utilService = {
    fetcher,
};

//SWR fetch wrapper
const fetcher = (...args) => fetch(...args).then(res => res.json());
