import axios from 'axios'
import React, { useEffect ,useState} from 'react'
import AdWrapper from './AdWrapper'

const AdminMsg = () => {
      const [getMsg, setgetMsg] = useState([])
    
      const FetchingMsg =async()=>{
        try {
          const api=await axios.get('http://localhost:8080/get_msg')
          setgetMsg(api.data.data)
          if(!api.data){
            console.log('data is not fetched')
          } else{
            console.log("msg:",api.data)
          }
        } catch (error) {
          console.log("err fetching msg:",error)
        }
      }

      useEffect(()=>{
        FetchingMsg()
      },[])

  return (
    <>
    <AdWrapper>
                <div className='text-white my-3' >
          <div className="max-w-lg rounded-md  ">
            {getMsg.map((item, index) => (
              <div key={index} className="bg-gray-800 p-6 mb-4 rounded-md">
                <div className="flex justify-between items-center ">
                <p className="text-white">{item.msg}</p>
                <p>{item.person}</p>
                </div>
                <p className='my-3' >{item.time}</p>

                {/* {item.reply && (
                  <div className="mt-2 bg-gray-700 p-2 rounded-md">
                    <p className="text-white">{item.reply}</p>
                  </div>
                )} */}
              </div>
            ))}
          </div>
          </div>
          </AdWrapper>
    </>
  )
}

export default AdminMsg
