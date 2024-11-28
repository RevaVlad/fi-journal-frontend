import {GroupInfo, TableInfo, UserInfo} from "../UserInfo";
import {
    createGetGroupInfoFetcher,
    createGetTableInfoFetcher,
    createGetUserPointInTableFetcher,
    createGetUserInfoFetcher
} from "./fetchers";
import {useEffect, useState} from "react";

const useFetchedData = (fetcherCreator, args, dataProcessor) => {
    const [loading, setLoading] = useState(true);
    const [loadedData, setLoadedData] = useState(undefined);
    const [status, setStatus] = useState(undefined);

    useEffect(() => {
        const controller = new AbortController();

        const temp = async () => {
            const response = await fetcherCreator(...args, controller.signal)
            setLoadedData(response[0])
            setStatus(response[1])
            setLoading(false);
        }

        temp()

        return () => controller.abort()
    }, [])

    if ((!loading) && status === 200) {
        return [dataProcessor(loadedData), status, loading]
    }

    return [loadedData, status, loading]
}

export const useUserInfo = () => {
    const dataProcessor = (data) => new UserInfo(data)
    return  useFetchedData(createGetUserInfoFetcher, [], dataProcessor)
}

export const useGroupInfo = (groupId) => {
    const dataProcessor = (data) => new GroupInfo(data)
    return useFetchedData(createGetGroupInfoFetcher, [groupId], dataProcessor)
}

export const useTableInfo = (tableId) => {
    const dataProcessor = (data) => new TableInfo(data)
    return  useFetchedData(createGetTableInfoFetcher, [tableId], dataProcessor)
}

export const useTablePoints = (userId, tableId) => {
    const dataProcessor = (data) =>
        Object.entries(data).map(([key, value]) => [key, value])
    return useFetchedData(createGetUserPointInTableFetcher, [userId, tableId], dataProcessor)
}