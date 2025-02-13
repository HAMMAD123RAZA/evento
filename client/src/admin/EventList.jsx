import React, { useEffect, useState } from 'react';
import AdWrapper from './AdWrapper';
import axios from 'axios';

export default function EventList() {
    const [data, setData] = useState([]);

    const fetchData = async () => {
        try {
            const apiData = await axios.get('http://localhost:8080/get');
            setData(apiData.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const head = [
        { key: 'title', label: 'Title' },
        { key: 'venue', label: 'Venue' },
        { key: 'date', label: 'Date' },
        { key: 'time', label: 'Time' },
        { key: 'description', label: 'Description' }
    ];

    return (
        <>
            <AdWrapper>
                <table className='w-full'>
                    <thead>
                        <tr className='uppercase'>
                            {head.map((item, index) => (
                                <th key={index} className='px-3'>{item.label}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={index}>
                                <td className='px-3'>{item.title}</td>
                                <td className='px-3'>{item.venue}</td>
                                <td className='px-3'>{item.date}</td>
                                <td className='px-3'>{item.time}</td>
                                <td className='px-3'>{item.description}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </AdWrapper>
        </>
    );
}