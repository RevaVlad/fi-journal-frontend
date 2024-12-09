import { useEffect } from "react";

export function SetTitle({ title }) {
    useEffect(() => {
        document.title = title;
    }, [title]);

    return null;
}