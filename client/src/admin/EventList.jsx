import React from 'react';
import AdWrapper from './AdWrapper';

export default function EventList() {
    const head = [
        { key: 'title', label: 'Title' },
        { key: 'Venue', label: 'Venue' },
        { key: 'date', label: 'Date' },
        { key: 'time', label: 'Time' },
        { key: 'Description', label: 'Description' }
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
                    <tr>
                        <td className='px-3'>Event 1</td>
                        <td className='px-3'>Venue 1</td>
                        <td className='px-3'>Date 1</td>
                        <td className='px-3'>Time 1</td>
                        <td className='px-3'>Description 1</td>
                    </tr>
                </tbody>
            </table>
           </AdWrapper>

            </>
    );
}