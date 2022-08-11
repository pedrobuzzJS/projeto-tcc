import axios, { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";
import api from "../services/api";

export function useFetch<T = unknown>(url: string, options?: AxiosRequestConfig) {
    const [ data, setData ] = useState<T | null>(null);
    const [ isFetching, setIsFetching ] = useState<Boolean>(true);
    const [ error, setError] = useState<Error | null>(null);

    useEffect( () => {
        api.get(url)
        .then( response => {
            setData(response.data);
        } )
        .catch( err => {
            setError(err);
        } )
        .finally( () => {
            setIsFetching(false);
        })
    }, [url] )

    return [ data, error, isFetching ];
}