import React, { useState, useEffect } from "react";
import axios from "axios";
const Feedback = () => {

    // State to store the response data
    const [data, setData] = useState(null);
    // State to store loading and error states
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Function to fetch data from the API
        const fetchData = async () => {
            try {
                const response = await axios.get('https://us-central1-sample-311412.cloudfunctions.net/getPolarity');
                setData(response.data['body']); // Update state with the response data
                console.log('response', response.data['body'])
                setLoading(false); // Set loading to false after fetching
            } catch (error) {
                setError(error); // Set error if there's an issue
                setLoading(false); // Set loading to false after error
            }
        };
        console.log(typeof(data))
        fetchData(); // Call the function to fetch data
    }, []); // Empty dependency array means this useEffect runs once after the initial render

    // Render loading, error, or data based on state
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
    return (
        <div>
    <h1>Feedback</h1>
    <table border="1" cellPadding="10" cellSpacing="0">
                <thead>
                    <tr>
                        <th>Booking Reference</th>
                        <th>Feedback</th>
                        <th>Sentiment Polarity</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            <td>{item.bookingref}</td>
                            <td>{item.feedback}</td>
                            <td>{item.sentiment_category}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
    );
}
export default Feedback;