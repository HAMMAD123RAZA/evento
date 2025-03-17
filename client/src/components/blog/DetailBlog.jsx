import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PageWrapper from '../PageWrapper';

const DetailBlog = () => {
    const [Data, setData] = useState({});
    const { id } = useParams();

    const fetchBlogDetail = async () => {
        try {
            const api = await axios.get(`http://localhost:8080/get/blog/${id}`);
            setData(api.data.blog[0]);
            console.log("blog detail client :", api.data.blog);
        } catch (error) {
            console.log("err fetching blog detail client:", error);
        }
    };

    useEffect(() => {
        fetchBlogDetail();
    }, []);

    return (
    <PageWrapper>
        <div className="min-h-screen text-white" >
            
            {/* Blog Image */}
            <div className="w-full h-auto mb-12">
                <img 
                    src={Data?.imgurl} 
                    alt={Data?.title} 
                    className="w-full h-auto object-cover"
                />
            </div>


            {/* Blog Header */}
            <div className="w-full p-4">
                <h1 className="text-5xl font-bold text-gray-400 mb-4">{Data?.title}</h1>
                {/* <h1 className="text-5xl font-bold text-gray-400 mb-4">title tilel title title title </h1> */}

                <p className="text-lg text-gray-400 py-8">
                    Published on {new Date(Data?.date).toLocaleDateString()}
                </p>
            </div>

            {/* Blog Content */}
            <div className="w-full p-3">
                {/* Short Description */}
                <p className="text-xl text-gray-400 mb-8 leading-relaxed">
                    {Data?.shortdesc}
                </p>

                {/* Long Description */}
                <div 
                    className="prose prose-lg text-gray-400"
                    dangerouslySetInnerHTML={{ __html: Data?.longdesc }}
                />
            </div>
        </div>
        </PageWrapper>
    );
};

export default DetailBlog;