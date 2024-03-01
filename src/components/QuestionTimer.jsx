import { useState, useEffect } from "react";

// eslint-disable-next-line react/prop-types
export default function QuestionTimer({ timeout, onTimeout }) {
    const [remainingTime, setRemainingTime] = useState(timeout);

    useEffect(() => {
        console.log("SET TIMEOUT");
        const timeoutID = setTimeout(onTimeout, timeout);

        return () => clearTimeout(timeoutID);
    }, [timeout, onTimeout]);

    useEffect(() => {
        console.log("SET INTERVAL")
        const interval = setInterval(() => {
            setRemainingTime(prev => prev - 100);
        }, 100);

        return () => {
            clearInterval(interval);
        }

    }, []);



    return (
        <progress id="" max={timeout} value={remainingTime}/>
    )
}