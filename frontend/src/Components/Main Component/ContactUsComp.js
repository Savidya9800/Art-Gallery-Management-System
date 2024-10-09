import NavigationBar from '../Nav Component/NavigationBar'
import FooterComp from '../Nav Component/FooterComp'
import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';

function ContactUsComp() {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_c84oxij', 'template_41a25tq', form.current, {
        publicKey: 'GGL5BaClqJIyvIlVk',
      })
      .then(
        () => {
          console.log('SUCCESS!');
          alert('Message sent successfully!');
        },
        (error) => {
          console.log('FAILED...', error.text);
        },
      );
  };

  return (
    <div className="flex flex-col min-h-screen">
      <NavigationBar />
      
      <div className="flex-grow container mx-auto px-4 py-8">
        <h6 className="text-center text-2xl font-semibold mb-6">Contact Us</h6>
        
        <form ref={form} onSubmit={sendEmail} className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg">
          <div className="mb-4 bg-white">
            <label className="bg-white block text-gray-700 font-bold mb-2">Name</label>
            <input 
              type="text" 
              name="user_name" 
              className="bg-white w-full p-2 border border-gray-800 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>
          
          <div className="mb-4 bg-white">
            <label className="bg-white block text-gray-700 font-bold mb-2">Email</label>
            <input 
              type="email" 
              name="user_email" 
              className="bg-white w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>
          
          <div className="mb-4 bg-white">
            <label className="bg-white block text-gray-700 font-bold mb-2">Message</label>
            <textarea 
              name="message" 
              className="bg-white w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>
          
          <div className="text-center bg-white">
            <input 
              type="submit" 
              value="Send" 
              className="bg-green-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50"
            />
          </div>
        </form>
      </div>

      <FooterComp />
    </div>
  )
}

export default ContactUsComp;
