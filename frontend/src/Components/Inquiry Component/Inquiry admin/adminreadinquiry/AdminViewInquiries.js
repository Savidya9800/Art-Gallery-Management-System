import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminViewInquiries(props) {
    const { _id, name, email, date, inquiryType, inquiryMessage } = props.INQUIRY;
    const navigate = useNavigate();

    const displayId = _id.slice(-3);

    return (
        <div className="flex items-center justify-center h-h-3/4"> 
            <div className="rounded-md p-6 border border-gray-300">
                <table className="w-full text-left border-collapse border border-black">
                    <thead>
                        <tr className="bg-white justify-center">
                            <th className="border border-black px-4 py-2">ID</th>
                            <th className="border border-black px-20 py-2">Name</th>
                            <th className="border border-black px-4 py-2">Email</th>
                            <th className="border border-black px-4 py-2">Date</th>
                            <th className="border border-black px-4 py-2">Inquiry Type</th>
                            <th className="border border-black px-30 py-2">Inquiry Message</th>
                            <th className="border border-black px-10 py-2">Actions</th> {/* New column for buttons */}
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-white"> 
                            <td className="border border-black px-4 py-2">{displayId}</td>
                            <td className="border border-black px-4 py-2">{name}</td>
                            <td className="border border-black px-4 py-2">{email}</td>
                            <td className="border border-black px-4 py-2">{date}</td>
                            <td className="border border-black px-4 py-2">{inquiryType}</td>
                            <td className="border border-black px-5 py-2">{inquiryMessage}</td>
                            <td className="border border-black px-4 py-2">
                                <div className="flex space-x-2"> {/* Flexbox for buttons with gap */}
                                    <button
                                        onClick={() => navigate(`/Addresponse/${_id}`)} 
                                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 border border-black transition duration-200">
                                        Response
                                    </button>
                                    <button
                                        onClick={() => navigate(`/ViewResponse/${_id}`,{state:{isAdmin:true}})} 
                                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 border border-black transition duration-200">
                                        Status
                                    </button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}
