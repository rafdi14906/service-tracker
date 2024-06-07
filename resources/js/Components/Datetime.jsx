import { useEffect, useState } from "react"

export default function Datetime({...props}) {
    const datetime = new Date().toISOString(),
        [today, setDate] = useState(new Date())

        useEffect(() => {
            const timer = setInterval(() => {
                setDate(new Date())
            }, 1000)
            return () => {
                clearInterval(timer)
            }
        })

        console.log(today.toLocaleDateString())
    return (
        <time dateTime={datetime}>{new Date(datetime).toLocaleString()}</time>
    )
}
