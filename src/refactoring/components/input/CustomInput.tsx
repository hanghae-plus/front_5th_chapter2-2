const CustomInput = (props: React.InputHTMLAttributes<HTMLInputElement>) => {
  //className 병합 필요
  return <input {...props} className="w-full p-2 border rounded" />;
};

export default CustomInput;
