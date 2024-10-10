import React from 'react';

function Bids({ bids }) {
    return (
        <div className="flex justify-center items-center p-5">
            <div className="p-5 rounded-lg shadow-lg w-full max-w-5xl bg-opacity-80">
                <table className="table-auto w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-200 bg-opacity-75">
                            <th className="px-4 py-2 border border-black">ID</th>
                            <th className="px-4 py-2 border border-black">Name</th>
                            <th className="px-4 py-2 border border-black">Email</th>
                            <th className="px-4 py-2 border border-black">Amount</th>
                            <th className="px-4 py-2 border border-black">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bids.map((bid, index) => (
                            <tr key={index} className={`${index === 0 ? 'bg-red-200' : 'bg-gray-50'} hover:bg-gray-100 transition duration-200 ease-in-out`}>
                                <td className="px-4 py-2 border border-black">{bid._id}</td>
                                <td className="px-4 py-2 border border-black">{bid.name}</td>
                                <td className="px-4 py-2 border border-black">{bid.email}</td>
                                <td className="px-4 py-2 border border-black">{bid.amount}</td>
                                <td className="px-4 py-2 border border-black">
                                    {index === 0 ? (
                                        <span className="font-bold text-red-600">Current Winner</span>
                                    ) : (
                                        <span>---</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Bids;
