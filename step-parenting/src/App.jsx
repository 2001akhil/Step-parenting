import { useState, useEffect, useRef, useCallback } from "react";
import "./App.css";
import axiosInstance from "./api/api.instance";

function App() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const snowContainerRef = useRef(null);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = useCallback(async() => {
    if (isSubmitting) return;

    if (!validateEmail(email)) {
      setMessage("❌ Invalid email. Please enter a valid email.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await axiosInstance.post('/users',{email})
      setIsSubmitting(false)
      setMessage(`✅ ${response?.data?.message}` );
    } catch (error) {
      console.log(error)
      setIsSubmitting(false)
      setMessage(`❌ ${error?.response?.data?.message}` );
    }


  }, [email, isSubmitting]);

  useEffect(() => {
    const container = snowContainerRef.current || document.body;

    const createSnowflake = () => {
      const snowflake = document.createElement("div");
      snowflake.className = "snowflake";
      snowflake.innerHTML = "❄";

      snowflake.style.left = Math.random() * window.innerWidth + "px";
      snowflake.style.animationDuration = Math.random() * 3 + 2 + "s";
      snowflake.style.fontSize = Math.random() * 15 + 10 + "px";
      snowflake.style.opacity = Math.random() * 0.8 + 0.2;

      snowflake.addEventListener("mouseover", () => {
        snowflake.classList.add("blast");
        setTimeout(() => snowflake.remove(), 300);
      });

      container.appendChild(snowflake);

      setTimeout(() => {
        if (!snowflake.classList.contains("blast")) snowflake.remove();
      }, 3000);
    };

    const intervalId = setInterval(createSnowflake, 200);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <div ref={snowContainerRef} className="fixed inset-0 pointer-events-none overflow-hidden z-0" />
      <div className="flex justify-center items-center h-screen px-4">
        <div className="bg-white/20 backdrop-blur-lg p-8 rounded-xl text-white shadow-xl max-w-sm w-full">
          <h2 className="text-2xl font-bold mb-4">Enter Your Email</h2>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full p-3 rounded-lg bg-white/30 text-white focus:ring-2 focus:ring-blue-400 outline-none transition ${validateEmail(email) ? 'ring-green-400' : 'ring-red-400'}`}
          />
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-500 mt-4 p-3 rounded-lg text-white font-semibold transition"
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
          {message && <p className="mt-4 text-sm font-semibold">{message}</p>}
        </div>
      </div>
    </>
  );
}

export default App;
