import React, { useState } from 'react'; 
import AdWrapper from './AdWrapper'; 
import {  
  BtnBold, 
  BtnItalic, 
  BtnUnderline, 
  BtnStrikeThrough, 
  BtnBulletList, 
  BtnNumberedList, 
  Editor, 
  EditorProvider, 
  Toolbar 
} from 'react-simple-wysiwyg'; 
import axios from 'axios'; 
import BlogList from './BlogList';
 
const CreateBlog = () => { 
  const [BlogData, setBlogData] = useState({ 
    title: '', 
    shortdesc: '', 
    longdesc: '', 
    date: '', 
    imgurl: '',
    id: null // Add id field to track if we're editing an existing blog
  }); 

  const [Tab, setTab] = useState('create');
  const [isEditing, setIsEditing] = useState(false);

  const buttons = [
    { label: 'Create', value: 'create' },
    { label: 'List', value: 'list' },
  ];

  const handleSubmit = async (e) => { 
    e.preventDefault(); 
    try { 
      if (isEditing) {
        // If editing, send a PUT request instead
        const api = await axios.put(`http://localhost:8080/update/blog/${BlogData.id}`, BlogData);
        console.log('Blog updated:', api.data);
        resetForm();
      } else {
        // If creating new, send a POST request
        const api = await axios.post('http://localhost:8080/admin/blog', BlogData);  
        console.log('Blog created:', api.data); 
        resetForm();
      }
    } catch (error) { 
      console.log(error); 
    } 
  }; 

  const handleEditorChange = (e) => {
    setBlogData(prev => ({ ...prev, longdesc: e.target.value }));
  };

  const handleEdit = (blog) => {
    // Set the form data to the selected blog's data
    setBlogData({
      title: blog.title,
      shortdesc: blog.shortdesc,
      longdesc: blog.longdesc,
      date: blog.date,
      imgurl: blog.imgurl,
      id: blog.id
    });
    
    setIsEditing(true);
    setTab('create'); // Switch to the create tab which has the form
  };

  const resetForm = () => {
    setBlogData({
      title: '',
      shortdesc: '',
      longdesc: '',
      date: '',
      imgurl: '',
      id: null
    });
    setIsEditing(false);
  };
 
  return ( 
    <> 
      <AdWrapper> 
        <div className="flex justify-center items-center pb-3">
        {buttons.map((item,id)=>{
          return (
            <div key={id}>
              <button 
                onClick={()=>{
                  setTab(item.value);
                  if (item.value === 'list') {
                    resetForm(); // Reset form when switching to list view
                  }
                }} 
                className='px-12 m-3 py-3 bg-gray-700 hover:bg-gray-900 text-white font-bold rounded-md'
              >
                {item.label}
              </button>
            </div>
          )
        })}
        </div>

{Tab==='create' && (
        <form onSubmit={handleSubmit}> 
        <h2 className="text-xl font-bold text-center pb-4">
          {isEditing ? 'Edit Blog' : 'Create New Blog'}
        </h2>
        
        <EditorProvider className="bg-gray-700"> 
          <Editor 
            value={BlogData.longdesc} 
            onChange={handleEditorChange} 
            className="text-white" 
          > 
            <Toolbar className="bg-gray-800 border-b border-gray-300 p-2 flex space-x-2"> 
              <BtnBold className="p-2 hover:bg-gray-200 rounded" /> 
              <BtnItalic className="p-2 hover:bg-gray-200 rounded" /> 
              <BtnUnderline className="p-2 hover:bg-gray-200 rounded" /> 
              <BtnStrikeThrough className="p-2 hover:bg-gray-200 rounded" /> 
              <BtnBulletList className="p-2 hover:bg-gray-200 rounded" /> 
              <BtnNumberedList className="p-2 hover:bg-gray-200 rounded" /> 
            </Toolbar> 
          </Editor> 
        </EditorProvider> 

        <div> 
          <input  
            required  
            placeholder="Title"  
            className="bg-gray-600 py-2 px-8 rounded-md my-3" 
            type="text" 
            value={BlogData.title}  
            onChange={(e) => setBlogData(prev => ({ ...prev, title: e.target.value }))} 
          /> 
        </div> 

        <div> 
          <input  
            required  
            className="bg-gray-600 py-2 px-8 rounded-md my-3" 
            type="date" 
            value={BlogData.date}  
            onChange={(e) => setBlogData(prev => ({ ...prev, date: e.target.value }))} 
          /> 
        </div> 

        <div> 
          <input  
            required  
            placeholder="Image URL"  
            className="bg-gray-600 py-2 px-8 rounded-md my-3" 
            type="text" 
            value={BlogData.imgurl}  
            onChange={(e) => setBlogData(prev => ({ ...prev, imgurl: e.target.value }))} 
          /> 
        </div> 

        <div> 
          <textarea  
            placeholder="Short description" 
            cols={60}  
            rows={8}  
            className="bg-gray-600 rounded-md my-3" 
            value={BlogData.shortdesc}  
            onChange={(e) => setBlogData(prev => ({ ...prev, shortdesc: e.target.value }))} 
          /> 
        </div> 

        <div className="flex gap-4">
          <button 
            type="submit"
            className="bg-red-500 py-2 px-8 rounded-md my-3 hover:bg-red-700 text-white font-bold"
          > 
            {isEditing ? 'Update' : 'Create'} 
          </button>

          {isEditing && (
            <button 
              type="button"
              onClick={resetForm}
              className="bg-gray-500 py-2 px-8 rounded-md my-3 hover:bg-gray-700 text-white font-bold"
            > 
              Cancel
            </button>
          )}
        </div>
      </form> 
) }

{Tab==='list' && (
 <BlogList onEdit={handleEdit} />
)}
    </AdWrapper> 
    </> 
  ); 
}; 
 
export default CreateBlog;