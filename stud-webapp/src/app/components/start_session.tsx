// import React, { useState } from 'react'
// import Modal from 'react-modal'

// function GoalTable() {
//     const [inputs, setInputs] = useState([{ text: '', isChecked: false }]);

//     const handleInputChange = (index: number, text: string) => {
//       const newInputs = [...inputs];
//       newInputs[index] = { text, isChecked: inputs[index].isChecked};
//       setInputs(newInputs);
  
//       if (index === inputs.length - 1 && text.trim() !== '') {
//         setInputs([...newInputs, { text: '', isChecked: false }]);
//       } else if (text.trim() === '' && inputs.length > 1) {
//         newInputs.splice(index, 1);
//         setInputs(newInputs);
//       }
//     };
  
//     const handleCheckboxChange = (index: number) => {
//       const newInputs = [...inputs];
//       newInputs[index].isChecked = !newInputs[index].isChecked;
//       setInputs(newInputs);
//     };
  
//     return (
//         <div>
//             <h2 className="text-center font-semibold text-2xl text-gray-600 mt-8 grid place-content-center">
//                 Add Goals
//             </h2>
//             <p className="grid place-content-center mb-4">
//                 Input what you plan to do in this session to track your progress
//             </p>
//             <div className="overflow-y-auto h-32">
//                 <p className="text-right mr-20">Optional?</p>
//                 <table className="grid place-content-center">
//                     <tbody>
//                     {inputs.map((input, index) => (
//                         <tr key={index}>
//                         <td>
//                             <input
//                             type="text"
//                             value={input.text}
//                             onChange={(e) => handleInputChange(index, e.target.value)}
//                             className="block w-full rounded-md border-0 py-1.5 pl-3 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6" placeholder="Add goal"
//                             />
//                         </td>
//                         <td>
//                             <input
//                             type="checkbox"
//                             checked={input.isChecked}
//                             onChange={() => handleCheckboxChange(index)}
//                             className="ml-2"
//                             />
//                         </td>
//                         </tr>
//                     ))}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// }



// const StartSessionModal = () => {
//    const [isOpen, setIsOpen] = useState(false)
//    const customStyles = {
//       overlay: {
//          backgroundColor: 'rgba(0, 0, 0, 0.6)'
//       },
//       content: {
//          top: '50%',
//          left: '50%',
//          right: 'auto',
//          bottom: 'auto',
//          width: '70%',
//          height: 'auto',
//          marginRight: '-50%',
//          transform: 'translate(-50%, -50%)',
//          borderRadius: '40px',
//          backgroundColor: 'bg-blue-700'
//       }
//    }
//    return (
//       <div>
//          <button onClick={() => setIsOpen(true)} className="p-2 cursor-pointer text-3xl text-white bg-gradient-to-r from-blue-500 to-blue-500 hover:to-teal-400 m-4 rounded-3xl w-52 h-24">Start Session</button>
//          <Modal isOpen={isOpen} onRequestClose={() => setIsOpen(false)} style={customStyles}>
//             <div className="space-y-4">
//                 <h1 className="text-5xl md:text-6xl font-bold leading-tighter tracking-tighter mb-4 grid place-content-center mt-8" data-aos="zoom-y-out">Start Session</h1>
//                 <div className="grid place-content-center">
//                     <GoalTable />
//                 </div>
//                 <div className="py-8 grid place-content-center">
//                     <button id="startSessionButton" value="start" className="p-2 cursor-pointer text-3xl text-white bg-gradient-to-r from-blue-500 to-blue-500 hover:to-teal-400 m-4 rounded-3xl w-52 h-24">Start</button>
//                 </div>
//                 <div className="grid place-content-center pb-8">
//                     <button onClick={() => setIsOpen(false)} className="">Close</button>
//                 </div>
//             </div>
//          </Modal>
//       </div>
//    )
// }
// export default StartSessionModal