const SignUpBTN = ({ width, text }) => {
  return (
    <button
      style={{ width: `${width}` }}
      className={`sm:w-[10rem] w-[8rem] bg-green-600 text-white font-semibold font-poppins text-[14px] h-[40px] rounded-md`}
    >
      {text}
    </button>
  );
};
export default SignUpBTN;
