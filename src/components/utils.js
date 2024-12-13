import {useEffect, useState} from "react";

export function SetTitle({ title }) {
    useEffect(() => {
        document.title = title;
    }, [title]);

    return null;
}

export function useWaitFor(condition, intervalMs) {
    const [counter, setCounter] = useState(0);
    const [isCompleted, setIsCompleted] = useState(false);

    useEffect(() => {
        if (isCompleted) return;

        const intervalId = setInterval(() => {
            setIsCompleted(condition());
            setCounter(counter + 1)
        }, intervalMs);

        return () => clearInterval(intervalId);
    }, [isCompleted]);

    return isCompleted
}