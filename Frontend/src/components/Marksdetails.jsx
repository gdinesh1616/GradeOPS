// import { useState } from "react";
// import "../css/Marksdetails.css";

// function MarksTable() {

//   const initialData = Array.from({ length: 25 }, (_, i) => ({
//     questionNo: i + 1,
//     marks: Math.floor(Math.random() * 10),
//     reason: "Sample reason",
//   }));

//   const [data, setData] = useState(initialData);
//   const [isEditing, setIsEditing] = useState(false);
//   const [currentPage, setCurrentPage] = useState(0);

//   const itemsPerPage = 8;

//   const start = currentPage * itemsPerPage;
//   const currentData = data.slice(start, start + itemsPerPage);

//   const totalPages = Math.ceil(data.length / itemsPerPage);

//   // Handle marks change
//   const handleChange = (index, value) => {
//     const updated = [...data];
//     updated[start + index].marks = value;
//     setData(updated);
//   };

//   const prevPage = () => {
//     setCurrentPage((p) => Math.max(p - 1, 0));
//   };

//   const nextPage = () => {
//     setCurrentPage((p) => Math.min(p + 1, totalPages - 1));
//   };

//   const approveHandler = () => {
//     setIsEditing(false);
//     console.log("Approved Data:", data);
//   };

//   return (
//     <div className="marks-page">
//       <div className="marks-card">

//         <div className="marks-header">
//           📊 Student Evaluation Details
//         </div>

//         <div className="marks-actions">
//           <button className="btn" onClick={() => setIsEditing(true)}>
//             Edit
//           </button>

//           <button className="btn" onClick={approveHandler}>
//             Approve
//           </button>
//         </div>

//         <table className="marks-table">
//           <thead>
//             <tr>
//               <th>Question No</th>
//               <th>Marks</th>
//               <th>Reason</th>
//             </tr>
//           </thead>

//           <tbody>
//             {currentData.map((item, index) => (
//               <tr key={item.questionNo}>
//                 <td>{item.questionNo}</td>

//                 <td>
//                   <input
//                     className="marks-input"
//                     type="number"
//                     value={item.marks}
//                     disabled={!isEditing}
//                     onChange={(e) =>
//                       handleChange(index, e.target.value)
//                     }
//                   />
//                 </td>

//                 <td><a href='#'>View Reason</a></td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         {totalPages > 1 && (
//           <div className="pagination">
//             <button onClick={prevPage}>{"<"}</button>

//             <span>
//               Page {currentPage + 1} of {totalPages}
//             </span>

//             <button onClick={nextPage}>{">"}</button>
//           </div>
//         )}

//       </div>
//     </div>
//   );
// }

// export default MarksTable;