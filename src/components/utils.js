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

export function useCountdown(initialTimeSeconds) {
    const [isFinished, setIsFinished] = useState(initialTimeSeconds === 0);
    const [timeRemaining, setTimeRemaining] = useState(initialTimeSeconds);

    useEffect(() => {
        const timerInterval = setInterval(() => {
            setTimeRemaining((prevTime) => {
                if (prevTime <= 0) {
                    clearInterval(timerInterval);
                    setIsFinished(true);
                    return 0;
                } else {
                    if (isFinished)
                        setIsFinished(false);
                    return prevTime - 1;
                }
            });
        }, 1000)

        return () => clearInterval(timerInterval);
    }, [timeRemaining])

    return [isFinished, timeRemaining, setTimeRemaining];
}

export function truncateString(string, length, end = "..."){
    return (string.length > length) ? string.slice(0, length - end.length) + end : string;
}