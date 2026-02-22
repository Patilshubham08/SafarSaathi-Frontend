import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";

export default function Register() {
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        userRole: "CUSTOMER"
    });

    const navigate = useNavigate();

    const handleRegister = async () => {
        setError(null);
        setLoading(true);

        try {
            await api.post('/auth/register', formData);
            setSuccess(true);

            setTimeout(() => {
                navigate("/login");
            }, 1500);
        } catch (err) {
            setError(err.response?.data?.message || "Registration failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={page}>
            <div style={overlay}></div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                style={card}
            >
                {!success ? (
                    <>
                        <h2 style={title}>Create Account</h2>
                        <p style={subtitle}>Join Safarsathi and start your journey</p>

                        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                            <div
                                style={formData.userRole === 'CUSTOMER' ? activeRoleBtn : roleBtn}
                                onClick={() => setFormData({ ...formData, userRole: 'CUSTOMER' })}
                            >
                                Traveler
                            </div>
                            <div
                                style={formData.userRole === 'VENDOR' ? activeRoleBtn : roleBtn}
                                onClick={() => setFormData({ ...formData, userRole: 'VENDOR' })}
                            >
                                Organizer
                            </div>
                        </div>

                        {error && <p style={errorStyle}>{error}</p>}

                        <div style={field}>
                            <input
                                required
                                style={input}
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                placeholder=" "
                            />
                            <label style={formData.name ? { ...label, ...activeLabel } : label}>Full Name</label>
                        </div>

                        <div style={field}>
                            <input
                                type="email"
                                required
                                style={input}
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                placeholder=" "
                            />
                            <label style={formData.email ? { ...label, ...activeLabel } : label}>Email Address</label>
                        </div>

                        <div style={field}>
                            <input
                                type="password"
                                required
                                style={input}
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                placeholder=" "
                            />
                            <label style={formData.password ? { ...label, ...activeLabel } : label}>Create Password</label>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            style={button}
                            onClick={handleRegister}
                            disabled={loading}
                        >
                            {loading ? "Creating Account..." : "Sign Up"}
                        </motion.button>

                        <p style={footer}>
                            Already have an account? <span style={link} onClick={() => navigate('/login')}>Login</span>
                        </p>
                    </>
                ) : (
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.8 }}
                        style={successBox}
                    >
                        Registration Successful
                        <br />
                        <span style={{ fontSize: "14px" }}>Redirecting to Login...</span>
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
        "url(https://images.unsplash.com/photo-1469854523086-cc02fe5d8800)",
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
        "linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0.8))",
};

const card = {
    position: "relative",
    zIndex: 2,
    width: "420px",
    padding: "40px",
    borderRadius: "24px",
    background: "rgba(255,255,255,0.12)",
    backdropFilter: "blur(25px)",
    boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
    color: "white",
    border: "1px solid rgba(255,255,255,0.1)",
};

const title = {
    fontSize: "30px",
    textAlign: "center",
    marginBottom: "5px",
    fontWeight: "700",
};

const subtitle = {
    textAlign: "center",
    fontSize: "14px",
    opacity: 0.8,
    marginBottom: "30px",
};

const field = {
    position: "relative",
    marginBottom: "20px",
};

const input = {
    width: "100%",
    padding: "14px 18px",
    borderRadius: "15px",
    border: "1px solid rgba(255,255,255,0.3)",
    background: "rgba(0,0,0,0.2)",
    color: "white",
    outline: "none",
    fontSize: "14px",
    transition: "all 0.3s ease",
};

const label = {
    position: "absolute",
    top: "50%",
    left: "18px",
    transform: "translateY(-50%)",
    fontSize: "14px",
    color: "rgba(255,255,255,0.6)",
    pointerEvents: "none",
    transition: "all 0.3s ease",
};

const activeLabel = {
    top: "-10px",
    left: "10px",
    background: "#008cff",
    padding: "2px 10px",
    borderRadius: "6px",
    fontSize: "11px",
    color: "white",
    fontWeight: "700",
};

const button = {
    width: "100%",
    padding: "15px",
    borderRadius: "15px",
    border: "none",
    background: "linear-gradient(to right, #008cff, #005eff)",
    color: "white",
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: "1px",
    cursor: "pointer",
    fontSize: "15px",
    marginTop: "15px",
    boxShadow: "0 10px 20px rgba(0, 140, 255, 0.3)",
};

const footer = {
    textAlign: "center",
    fontSize: "14px",
    marginTop: "25px",
    opacity: 0.9,
};

const link = {
    color: "#008cff",
    fontWeight: "800",
    cursor: "pointer",
    textDecoration: "none",
};

const successBox = {
    textAlign: "center",
    fontSize: "22px",
    fontWeight: "600",
};

const errorStyle = {
    color: "#ff6b6b",
    textAlign: "center",
    marginBottom: "20px",
    fontSize: "14px",
    background: "rgba(255,107,107,0.1)",
    padding: "10px",
    borderRadius: "12px",
    border: "1px solid rgba(255,107,107,0.2)",
};

const roleBtn = {
    flex: 1,
    padding: "12px",
    background: "rgba(255,255,255,0.05)",
    textAlign: "center",
    borderRadius: "12px",
    cursor: "pointer",
    fontSize: "13px",
    border: "1px solid rgba(255,255,255,0.1)",
    transition: "all 0.3s ease",
    color: "white",
};

const activeRoleBtn = {
    ...roleBtn,
    background: "#008cff",
    color: "white",
    fontWeight: "700",
    border: "1px solid #008cff",
};
