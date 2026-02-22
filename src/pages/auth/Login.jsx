import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userRole, setUserRole] = useState("CUSTOMER");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async () => {
    setError(null);
    setLoading(true);

    try {
      const result = await login(email, password);

      if (!result.success) {
        throw new Error("Invalid email or password");
      }

      if (result.userRole !== userRole) {
        throw new Error(`This account is registered as ${result.userRole}. Please switch tab.`);
      }

      setSuccess(true);

      setTimeout(() => {
        if (result.userRole === 'VENDOR') {
          navigate("/vendor");
        } else {
          navigate("/packages");
        }
      }, 1500);

    } catch (err) {
      setError(err?.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={page}>
      <div style={overlay}></div>

      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        style={card}
      >
        {!success ? (
          <>
            <h2 style={title}>Welcome Back</h2>
            <p style={subtitle}>Continue your Safar with us</p>

            <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
              <div
                style={userRole === 'CUSTOMER' ? activeRoleBtn : roleBtn}
                onClick={() => setUserRole('CUSTOMER')}
              >
                Customer
              </div>
              <div
                style={userRole === 'VENDOR' ? activeRoleBtn : roleBtn}
                onClick={() => setUserRole('VENDOR')}
              >
                Vendor
              </div>
            </div>

            {error && <p style={errorStyle}>{error}</p>}

            <div style={field}>
              <input
                required
                style={input}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder=" "
              />
              <label style={email ? { ...label, ...activeLabel } : label}>Email</label>
            </div>

            <div style={field}>
              <input
                type={showPassword ? "text" : "password"}
                required
                style={input}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder=" "
              />
              <label style={password ? { ...label, ...activeLabel } : label}>Password</label>
              <span
                style={eye}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </span>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={button}
              onClick={handleLogin}
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </motion.button>

            <div style={divider}>OR</div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              style={googleBtn}
            >
              Continue with Google
            </motion.button>

            <p style={footer}>
              New here? <span style={link} onClick={() => navigate('/register')}>Create Account</span>
            </p>
          </>
        ) : (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8 }}
            style={successBox}
          >
            Login Successful
            <br />
            <span style={{ fontSize: "14px" }}>Welcome to Safarsathi</span>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}


const page = {
  minHeight: "100vh",
  paddingTop: "100px",
  paddingBottom: "40px",
  backgroundImage:
    "url(https://images.unsplash.com/photo-1500530855697-b586d89ba3ee)",
  backgroundSize: "cover",
  backgroundPosition: "center",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "relative",
};

const overlay = {
  position: "absolute",
  inset: 0,
  background:
    "linear-gradient(to bottom, rgba(0,0,0,0.45), rgba(0,0,0,0.75))",
};

const card = {
  position: "relative",
  zIndex: 2,
  width: "380px",
  padding: "40px",
  borderRadius: "22px",
  background: "rgba(255,255,255,0.15)",
  backdropFilter: "blur(20px)",
  boxShadow: "0 12px 40px rgba(0,0,0,0.4)",
  color: "white",
};

const title = {
  fontSize: "32px",
  textAlign: "center",
  marginBottom: "5px",
};

const subtitle = {
  textAlign: "center",
  fontSize: "14px",
  opacity: 0.9,
  marginBottom: "25px",
};

const field = {
  position: "relative",
  marginBottom: "22px",
};

const input = {
  width: "100%",
  padding: "14px 16px",
  borderRadius: "30px",
  border: "1px solid rgba(255,255,255,0.4)",
  background: "transparent",
  color: "white",
  outline: "none",
  fontSize: "14px",
};

const label = {
  position: "absolute",
  top: "50%",
  left: "16px",
  transform: "translateY(-50%)",
  fontSize: "13px",
  color: "#ddd",
  pointerEvents: "none",
  transition: "all 0.3s ease",
};

const activeLabel = {
  top: "-10px",
  left: "10px",
  background: "#008cff",
  padding: "0 8px",
  borderRadius: "4px",
  fontSize: "11px",
  color: "white"
};

const eye = {
  position: "absolute",
  right: "18px",
  top: "50%",
  transform: "translateY(-50%)",
  cursor: "pointer",
};

const button = {
  width: "100%",
  padding: "14px",
  borderRadius: "30px",
  border: "none",
  background: "linear-gradient(to right, #008cff, #005eff)",
  color: "white",
  fontWeight: "800",
  textTransform: "uppercase",
  letterSpacing: "1px",
  cursor: "pointer",
  fontSize: "15px",
  marginTop: "10px",
  boxShadow: "0 4px 15px rgba(0, 140, 255, 0.4)"
};

const divider = {
  textAlign: "center",
  margin: "20px 0",
  fontSize: "12px",
  opacity: 0.8,
};

const googleBtn = {
  width: "100%",
  padding: "13px",
  borderRadius: "30px",
  border: "1px solid rgba(255,255,255,0.4)",
  background: "transparent",
  color: "white",
  cursor: "pointer",
};

const footer = {
  textAlign: "center",
  fontSize: "13px",
  marginTop: "18px",
};

const link = {
  color: "#008cff",
  fontWeight: "bold",
  cursor: "pointer",
};

const successBox = {
  textAlign: "center",
  fontSize: "22px",
  fontWeight: "600",
};

const errorStyle = {
  color: "#ff6b6b",
  textAlign: "center",
  marginBottom: "15px",
  fontSize: "14px",
  background: "rgba(0,0,0,0.3)",
  padding: "8px",
  borderRadius: "8px"
};

const roleBtn = {
  flex: 1,
  padding: "10px",
  background: "rgba(255,255,255,0.1)",
  textAlign: "center",
  borderRadius: "10px",
  cursor: "pointer",
  fontSize: "14px",
  border: "1px solid rgba(255,255,255,0.2)",
  transition: "all 0.3s ease",
  fontWeight: "500",
  color: "#ccc"
};

const activeRoleBtn = {
  ...roleBtn,
  background: "#008cff",
  color: "white",
  fontWeight: "bold",
  border: "1px solid #008cff",
  boxShadow: "0 4px 12px rgba(0, 140, 255, 0.3)"
};
