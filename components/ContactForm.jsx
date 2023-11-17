/* ContactForm.jsx */

"use client"; // Add this line at the beginning of the file

import { useState } from "react";

export default function ContactForm() {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState([]);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Full name: ", fullname);
    console.log("Email: ", email);
    console.log("Message: ", message);

    const res = await fetch("api/contact", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        fullname,
        email,
        message,
      }),
    });

    const { msg, success } = await res.json();
    setError(msg);
    setSuccess(success);

    if (success) {
      setFullname("");
      setEmail("");
      setMessage("");
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="py-4 mt-4 border-t bg-glass flex flex-col gap-5 rounded-md p-4 transform hover:scale-105 transition-transform duration-300"
      >
        <div>
          <label htmlFor="fullname" className="text-white">
            Full Name
          </label>
          <input
            onChange={(e) => setFullname(e.target.value)}
            value={fullname}
            type="text"
            id="fullname"
            placeholder="John Doe"
            className="bg-opacity-50 backdrop-filter backdrop-blur-md bg-white px-6 py-2 border border-slate-300 rounded-md text-slate-800 focus:outline-none focus:border-green-500"
          />
        </div>

        <div>
          <label htmlFor="email" className="text-white">
            Email
          </label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="text"
            id="email"
            placeholder="john@gmail.com"
            className="bg-opacity-50 backdrop-filter backdrop-blur-md bg-white px-6 py-2 border border-slate-300 rounded-md text-slate-800 focus:outline-none focus:border-green-500"
          />
        </div>

        <div>
          <label htmlFor="message" className="text-white">
            Your Message
          </label>
          <textarea
            onChange={(e) => setMessage(e.target.value)}
            value={message}
            className="h-32 bg-opacity-50 backdrop-filter backdrop-blur-md bg-white px-6 py-2 border border-slate-300 rounded-md text-slate-800 focus:outline-none focus:border-green-500"
            id="message"
            placeholder="Type your message here..."
          ></textarea>
        </div>

        <button
          className="bg-green-700 bg-opacity-75 hover:bg-opacity-100 p-3 text-white font-bold rounded-md transition duration-300 focus:outline-none"
          type="submit"
        >
          Send
        </button>
      </form>

      <div className="bg-glass flex flex-col mt-4">
        {error &&
          error.map((e, index) => (
            <div
              key={index}
              className={`${
                success ? "text-green-800" : "text-red-600"
              } px-5 py-2 bg-opacity-75 backdrop-filter backdrop-blur-md rounded-md my-2`}
            >
              {e}
            </div>
          ))}
      </div>
    </>
  );
}
