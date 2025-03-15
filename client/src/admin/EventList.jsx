import React, { useEffect, useState } from 'react';
import AdWrapper from './AdWrapper';
import axios from 'axios';
import { FaTrash } from 'react-icons/fa'; // Add the trash icon for delete functionality
import { useNavigate } from 'react-router-dom';

export default function EventList() {
    const [data, setData] = useState([]);
    const [selectedItems, setSelectedItems] = useState(new Set());
    const navigate=useNavigate()

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
        { key: 'venue', label: 'venue' },
        { key: 'date', label: 'Date' },
        { key: 'time', label: 'Time' },
        { key: 'description', label: 'Description' },
        { key: 'Action', label: 'Action' }
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

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/admin/delete/${id}`);
            fetchData();
        } catch (error) {
            console.log('uff something went wrong:', error);
        }
    };

    const handleEdit=(item)=>{
        navigate('/admin/event/create',{state:{event:item}})
    }

    return (
        <>
            <AdWrapper>
                <table className="w-full text-white">
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
                               
                                    {item.title}
                                </td>
                                <td className="px-3">{item.venue}</td>
                                <td className="px-3">{item.date}</td>
                                <td className="px-3">{item.time}</td>
                                <td className="px-3">{item.description}</td>
                                <td className="px-3 flex gap-3">
                                    <button
                                        onClick={() => handleDelete(item.id)}
                                        className='font-bold py-3 px-5 my-3 text-white bg-red-500 hover:bg-white hover:text-red-500 rounded-lg border-2 border-red-500'
                                    >
                                        Delete
                                    </button>
                                    <button 
                                    onClick={()=>handleEdit(item)}
                                    className='font-bold py-3 px-5 my-3 text-white bg-gray-500 hover:bg-white hover:text-gray-500 rounded-lg border-2 border-gray-500'>
                                        Edit
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </AdWrapper>
        </>
    );
}