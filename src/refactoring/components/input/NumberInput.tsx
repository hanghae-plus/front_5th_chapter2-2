import CustomInput from './CustomInput';

const NumberInput = (props: React.InputHTMLAttributes<HTMLInputElement>) => {
  return <CustomInput {...props} type="number" />;
};

export default NumberInput;
