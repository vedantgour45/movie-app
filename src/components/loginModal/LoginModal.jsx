import toast from "react-hot-toast";
import "./style.scss";

const LoginModal = ({ show, setShow }) => {
  const handleLogin = async () => {
    try {
      await signInWithGoogle();
      toast.success("Welcome back!");
      setShow(false);
    } catch (error) {
      console.error("Login failed", error);
      toast.error("Failed to sign in");
    }
  };

  if (!show) return null;

  return (
    <div className={`loginModal ${show ? "visible" : ""}`}>
      <div className="opacityLayer" onClick={() => setShow(false)}></div>
      <div className="modalContent">
        <span className="closeBtn" onClick={() => setShow(false)}>
          <VscChromeClose />
        </span>
        <div className="textSection">
          <h2 className="title">Join MoviePulse</h2>
          <p className="description">
            Sign in to track your favorite movies, build your watchlist, and get personalized recommendations.
          </p>
        </div>
        <button className="googleBtn" onClick={handleLogin}>
          <FcGoogle className="icon" />
          <span>Continue with Google</span>
        </button>
      </div>
    </div>
  );
};

export default LoginModal;
