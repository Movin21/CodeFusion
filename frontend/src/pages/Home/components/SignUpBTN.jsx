import { useNavigate } from "react-router-dom";
const SignUpBTN = ({ width, text }) => {
  const navigate = useNavigate(); // Hook to handle navigation

  const handleClick = () => {
    navigate("/signup"); // Replace with your desired path
  };
  return (
    <button
    onClick={handleClick}
      style={{ width: `${width}` }}
      className={`sm:w-[10rem] w-[8rem] bg-light text-white font-semibold font-poppins text-[14px] h-[40px] rounded-md hover:bg-light2`}
    >
      {text}
    </button>
  );
};
export default SignUpBTN;
