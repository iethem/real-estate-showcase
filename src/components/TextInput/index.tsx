import PropTypes from "prop-types";

export function TextInput({
  id,
  name,
  value,
  defaultValue,
  onChange,
  placeholder,
  ...rest
}: any) {
  function handleChange(e: any) {
    onChange(e.target.value);
  }

  return (
    <input
      type="text"
      id={id}
      name={name}
      value={value}
      defaultValue={defaultValue}
      onChange={handleChange}
      placeholder={placeholder}
      {...rest}
    />
  );
}

TextInput.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  defaultValue: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
};

export default TextInput;
