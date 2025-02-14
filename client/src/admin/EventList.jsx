import React, { useEffect, useState } from 'react';
import AdWrapper from './AdWrapper';
import axios from 'axios';
import { FaTrash } from 'react-icons/fa'; // Add the trash icon for delete functionality

export default function EventList() {
    const [data, setData] = useState([]);
    const [selectedItems, setSelectedItems] = useState(new Set());

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
        { key: 'description', label: 'Description' },
    ];

    const handleCheckboxChange = (event, index) => {
        const updatedSelectedItems = new Set(selectedItems);
        if (event.target.checked) {
            updatedSelectedItems.add(index);
        } else {
            updatedSelectedItems.delete(index);
        }
        setSelectedItems(updatedSelectedItems);
    };

    const handleDelete = () => {
        // Delete logic here, like sending a request to your backend to delete the selected items
        const updatedData = data.filter((_, index) => !selectedItems.has(index));
        setData(updatedData);
        setSelectedItems(new Set()); // Clear selected checkboxes after delete
    };

    return (
        <>
            <AdWrapper>
                <div className="relative mb-4">
                    {/* Delete icon is visible only when there are selected items */}
                    {selectedItems.size > 0 && (
                        <button
                            onClick={handleDelete}
                            className="absolute top-0 right-0 text-red-500 hover:text-red-700 flex items-center"
                        >
                            <FaTrash className="mr-2" />
                            Delete
                        </button>
                    )}
                </div>

                <table className="w-full">
                    <thead>
                        <tr className="uppercase">
                            {head.map((item, index) => (
                                <th key={index} className="px-3">{item.label}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={index}>
                                <td>
                                    <input
                                        type="checkbox"
                                        onChange={(e) => handleCheckboxChange(e, index)}
                                        checked={selectedItems.has(index)}
                                        style={{
                                            visibility: 'visible',
                                            padding: '12px',
                                            opacity: 1,
                                            marginRight: '8px',
                                        }}
                                    />
                                    {item.title}
                                </td>
                                <td className="px-3">{item.venue}</td>
                                <td className="px-3">{item.date}</td>
                                <td className="px-3">{item.time}</td>
                                <td className="px-3">{item.description}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </AdWrapper>
        </>
    );
}
