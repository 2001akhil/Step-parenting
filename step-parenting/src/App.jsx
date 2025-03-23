import { useState, useEffect } from "react";
import "./App.css";

/**
 * The main App component of the application.
 * Handles email input, email validation, submission, and snowflake effects.
 * @returns {JSX.Element} The rendered component.
 */
function App() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  /**
   * Validates the format of an email address.
   * @param {string} email - The email address to validate.
   * @returns {boolean} True if the email is valid, false otherwise.
   */
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  /**
   * Handles the form submission for the email.
   * Validates the email and provides feedback messages.
   */
  const handleSubmit = () => {
    if (isSubmitting) return;

    if (!validateEmail(email)) {
      setMessage("❌ Invalid email. Please enter a valid email.");
      return;
    }

    setIsSubmitting(true);
    setMessage("✅ Email submitted successfully! Please check your inbox.");

    setTimeout(() => {
      setMessage("");
      setIsSubmitting(false);
    }, 3000);
  };

  /**
   * Creates and animates snowflakes on the screen.
   * Adds a hover effect for a "blast" animation.
   */
  useEffect(() => {
    const createSnowflake = () => {
      const snowflake = document.createElement("div");
      snowflake.className = "snowflake";
      snowflake.innerHTML = "❄";

      snowflake.style.left = Math.random() * window.innerWidth + "px";
      snowflake.style.animationDuration = Math.random() * 3 + 2 + "s";
      snowflake.style.fontSize = Math.random() * 15 + 10 + "px";
      snowflake.style.opacity = Math.random() * 0.8 + 0.2;

      // Adding a "blast" effect on hover
      snowflake.addEventListener("mouseover", () => {
        snowflake.classList.add("blast");
        setTimeout(() => snowflake.remove(), 300);
      });

      document.body.appendChild(snowflake);

      // Remove snowflakes after animation ends
      setTimeout(() => {
        if (!snowflake.classList.contains("blast")) snowflake.remove();
      }, 3000);
    };

    const interval = setInterval(createSnowflake, 200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container">
      <div className="glass-box">
        <h2>Enter Your Email</h2>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={validateEmail(email) ? "valid" : "invalid"}
        />
        <button onClick={handleSubmit} disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>

        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
}

export default App;
