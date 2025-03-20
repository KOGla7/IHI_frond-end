import React from "react";

const Foot = () =>{
  return (
    <div className="text-center md:px-20 bg-gray-100">
      <div className="text-center py-10 px-6">
        <h2 className="text-3xl font-bold text-blue-600">Sell your summaries in an instant</h2>
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div className="bg-white shadow-md p-6 rounded-lg">
            <img src="/summary1.jpg" alt="Make Money by selling summaries" className="w-full h-40 object-cover rounded" />
            <h3 className="text-lg font-bold mt-4 text-blue-600">Make money quickly</h3>
          </div>
          <div className="bg-white shadow-md p-6 rounded-lg">
            <img src="/summary2.jpg" alt="Easily upload study materials" className="w-full h-40 object-cover rounded" />
            <h3 className="text-lg font-bold mt-4 text-blue-600">Easy uploading</h3>
          </div>
          <div className="bg-white shadow-md p-6 rounded-lg">
            <img src="/summary3.jpg" alt="Win rewards for top summaries" className="w-full h-40 object-cover rounded" />
            <h3 className="text-lg font-bold mt-4 text-blue-600">Nothing to lose, only to win</h3>
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-center gap-4">
        <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg">
          Start selling
        </button>
        <button className="border border-blue-500 text-blue-500 px-6 py-2 rounded-lg">
          Tell me more
        </button>
      </div>
    </div>
  );
}
export default Foot;