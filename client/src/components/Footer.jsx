// import React from "react";
// import { FaLinkedin } from "react-icons/fa";
// import { FaTwitter } from "react-icons/fa";
// import { FaFacebookF } from "react-icons/fa";
// import { FaInstagram } from "react-icons/fa";
// import { FaDiscord } from "react-icons/fa6";

// const footerData = {
//   help: {
//     title: "HELP",
//     links: [
//       "How to Make an Order?",
//       "Delivery Terms",
//       "My Orders",
//       "Returns",
//       "Terms and Conditions",
//     ],
//   },
//   customerService: {
//     title: "CUSTOMER SERVICE",
//     links: ["Product Simple", "Product Extended", "Your Cart", "Wishlist", "Shop"],
//   },
//   sportStore: {
//     title: "SPORT STORE",
//     links: ["New Collection", "Women", "Men", "Our Blog", "Contacts"],
//   },
//   quickLinks: {
//     title: "QUICK LINKS",
//     links: ["Facebook", "Instagram", "YouTube", "Pinterest", "Twitter"],
//   },
// };

// const Footer = () => {
//   return (
//     <footer className="bg-black text-white py-10">
//       <div className="max-w-7xl mx-auto px-6">
//         {/* Logo & Social Icons */}
//         <div className="text-center pb-6">
//           <h2 className="text-2xl font-bold">SPORT STORE</h2>
//           <div className="flex justify-center gap-4 mt-3">
//             <span className="text-gray-400 cursor-pointer hover:text-white"><FaLinkedin/></span>
//             <span className="text-gray-400 cursor-pointer hover:text-white"><FaFacebookF/></span>
//             <span className="text-gray-400 cursor-pointer hover:text-white"><FaInstagram/></span>
//             <span className="text-gray-400 cursor-pointer hover:text-white"><FaTwitter/></span>
//             <span className="text-gray-400 cursor-pointer hover:text-white"><FaDiscord/></span>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-gray-400">
//           {Object.values(footerData).map((section, index) => (
//             <div key={index} className="py-3">
//               <h3 className="text-white py-3 font-semibold mb-3">{section.title}</h3>
//               <ul className="py-3">
//                 {section.links.map((link, idx) => (
//                   <li key={idx} className="hover:text-white  cursor-pointer">
//                     {link}
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           ))}
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;


import React from 'react'
import { FaLinkedin } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaDiscord } from "react-icons/fa6";

const footerData={
    Guide:{
        title:"Guide",
        links:[
      "How to Make an Order?",
      "Delivery Terms",
      "My Orders",
      "Returns",
      "Terms and Conditions",
        ]
    },
      customerService: {
    title: "CUSTOMER SERVICE",
    links: ["Product Simple", "Product Extended", "Your Cart", "Wishlist", "Shop"],
  },
  sportStore: {
    title: "SPORT STORE",
    links: ["New Collection", "Women", "Men", "Our Blog", "Contacts"],
  },
  quickLinks: {
    title: "QUICK LINKS",
    links: ["Facebook", "Instagram", "YouTube", "Pinterest", "Twitter"],
  },

}

const Footer = () => {
  return (
    <>
    <div className="bg-gray-950 max-w-7xl mx-auto h-full py-10 text-gray-400"> 
{/* logo */}
<h2 className="text-2xl font-bold text-center my-2 ">SPORT STORE</h2>

        <div className='flex justify-center gap-3 items-center py-8' >

    <FaLinkedin/>
    <FaDiscord/>
    <FaTwitter/>
    <FaFacebookF/>
    <FaInstagram/>

        </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  px-3">
         {Object.values(footerData).map((section,id)=>{
            return (
                <div key={id} >
                    <h1 className='font-bold text-white py-4' >{section.title}</h1>
                    <ul>
                        {section.links.map((item,id)=>{
                            return (
                                <div key={id} >
                                <li className='text-white cursor-pointer ' >{item}</li>
                                </div>
                            )
                        })}
                    </ul>
                </div>
            )
         })}
      </div>
      </div>
    </>
  )
}

export default Footer
