interface InputFieldProps {
    searchValue: string;
    setSearchValue: (value: string) => void;
    placeholder: string
}

const InputField = ({ searchValue, setSearchValue, placeholder }: InputFieldProps) => {
    return (
        <input className='w-full p-2 border rounded'
            placeholder={placeholder}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
        />
    );
};

export default InputField;