import CustomInput from './CustomInput';

const TextInput = (props: React.InputHTMLAttributes<HTMLInputElement>) => {
  return <CustomInput {...props} type="text" />;
};

export default TextInput;
