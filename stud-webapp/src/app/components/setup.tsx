// import React, { useState } from 'react'


// function DownloadButton() {
//     const downloadTxtFile = () => {
//         // text content
//         const texts = ["line 1", "line 2", "line 3"]
//         // file object
//         const file = new Blob(texts, {type: 'text/plain'});
//         // anchor link
//         const element = document.createElement("a");
//         element.href = URL.createObjectURL(file);
//         element.download = "100ideas-" + Date.now() + ".txt";
//         // simulate link click
//         document.body.appendChild(element); // Required for this to work in FireFox
//         element.click();
//     }
//     return <button id="downloadButton" onClick={downloadTxtFile} value="download" className="p-2 cursor-pointer text-3xl text-white bg-gradient-to-r from-blue-500 to-blue-500 hover:to-teal-400 m-4 rounded-3xl w-52 h-24">Download</button>
// }

// const SetupModal = () => {
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
//          borderRadius: '40px'
//       }
//    }
//    return (
//       <div>
//          <button onClick={() => setIsOpen(true)} className="p-2 cursor-pointer text-white bg-gradient-to-r from-blue-500 to-blue-500 hover:to-teal-400 m-4 rounded-xl">Add Chrome Extension</button>
//          <Modal isOpen={isOpen} onRequestClose={() => setIsOpen(false)} style={customStyles}>
//             <div className="space-y-4">
//                 <h1 className="text-5xl md:text-6xl font-bold leading-tighter tracking-tighter mb-4 grid place-content-center mt-8" data-aos="zoom-y-out">Set up Chrome Extension</h1>
//                 <div className="place-content-center">
//                     <h2 className="text-center text-xl text-gray-600 mb-8 mt-8 grid place-content-center">
//                         Click the button below to download the  <span className="bg-clip-text font-bold text-transparent bg-gradient-to-r from-blue-500 to-teal-400">stud chrome extension</span>
//                     </h2>
//                     <div className="space-y-4 grid place-content-center">
//                         <h3 className="text-xl text-gray-600 font-semibold mb-1 text-left">
//                             What is it?
//                         </h3>
//                         <ul role="list" className="marker:text-gray-600 list-disc pl-5 space-y-1 text-gray-600">
//                             <li>
//                                 Description.
//                             </li>
//                             <li>
//                                 Some more description.
//                             </li>
//                         </ul>
//                     </div>
//                 </div>
//                 <div className="py-8 grid place-content-center">
//                     <DownloadButton/>
//                 </div>
//                 <div className="grid place-content-center pb-8">
//                     <button onClick={() => setIsOpen(false)} className="">Close</button>
//                 </div>
//             </div>
//          </Modal>
//       </div>
//    )
// }
// export default SetupModal