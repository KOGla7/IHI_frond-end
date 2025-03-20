import React from "react";
const Body = () => {
  return (
    <div className="w-full  bg-gray-100">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 px-6 py-10">
        <div className="bg-white shadow-md p-6 rounded-lg text-center">
          <h3 className="text-xl font-bold text-gray-600">Find subjects on IHI</h3>
          <p className="text-gray-600 mt-2">
            Find summaries, practice questions, and study documents for all subjects.
          </p>
          <div href="/subjects" className="text-blue-600 mt-2 inline-block">Find my subject →</div>
        </div>
        <div className="bg-white shadow-md p-6 rounded-lg text-center">
          <h3 className="text-xl font-bold text-gray-600">Textbooks</h3>
          <p className="text-gray-600 mt-2">
            Search for study books and find the best summaries and practice exams.
          </p>
          <div href="/textbooks" className="text-blue-600 mt-2 inline-block">Find textbooks →</div>
        </div>
        <div className="bg-white shadow-md p-6 rounded-lg text-center">
          <h3 className="text-xl font-bold text-gray-600">Qualifications</h3>
          <p className="text-gray-600 mt-2">
            Find summaries for specific qualifications to make studying easier.
          </p>
          <div href="/qualifications" className="text-blue-600 mt-2 inline-block">Notes and summaries →</div>
        </div>
      </div>

   
    </div>
  );
};

export default Body;