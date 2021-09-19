import PropTypes from "prop-types";

function DropdownMenu({ options, onOptionClicked }: any) {
  return (
    <form
      className="dropdown"
      onChange={(e: any) => {
        onOptionClicked(e.target.value);
      }}
    >
      <select className="dropdown-select">
        {options.map((option: any) => (
          <option key={option.key} value={option.key}>
            {option.value}
          </option>
        ))}
      </select>
    </form>
  );
}

DropdownMenu.propTypes = {
  options: PropTypes.array,
  onOptionClicked: PropTypes.func,
};

export default DropdownMenu;
