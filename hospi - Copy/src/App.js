
import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import HospitalDashboard from './components/HospitalDashboard/HospitalDashboard';
import DrugInventoryTable from './components/HospitalDashboard/DrugInventoryTable';
import DrugOrders from './components/HospitalDashboard/DrugOrders';
import PatientInfo from './components/HospitalDashboard/PatientInfo';
import ChatBotIframe from './components/Chatbot'; // Import ChatBotIframe


const App = () => {
  const [showChatBot, setShowChatBot] = useState(false); // State to control chatbot visibility

  // Function to toggle chatbot visibility
  const toggleChatBot = () => {
    setShowChatBot((prevShow) => !prevShow);
  };

  return (
    <>
    <Routes>
      <Route path="/" element={<HospitalDashboard />} />
      <Route path="/inventory" element={<DrugInventoryTable drugsPerPage={10} />} />
      <Route path="/orders" element={<DrugOrders />} />
      <Route path="/patients" element={<PatientInfo />} />

    </Routes>
     {/* Include the ChatBotIframe component */}
     <ChatBotIframe show={showChatBot} onClose={toggleChatBot} />

     {/* Chatbot toggle button */}
     <button
       onClick={toggleChatBot}
       style={{
         position: 'fixed',
         bottom: '20px',
         right: '20px',
         backgroundColor: '#007bff',
         color: 'white',
         border: 'none',
         borderRadius: '50%',
         width: '60px',
         height: '60px',
         cursor: 'pointer',
         zIndex: '1001',
       }}
     >
       {showChatBot ? 'Close' : 'Chat'}
     </button>
   </>
 );
};



export default App;
