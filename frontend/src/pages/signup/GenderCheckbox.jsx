const GenderCheckbox = ({ handleCheckboxChange, selectedGender }) => {
  return (
    <div className="flex mt-2">
      <div className="form-control">
        <label
          className={`label cursor-pointer ${
            selectedGender === "male" ? "selected" : ""
          }`}
        >
          <span className="label-text pr-1">Male</span>
          <input
            type="checkbox"
            defaultChecked
            className="checkbox"
            checked={selectedGender === "male"}
            onChange={() => {
              handleCheckboxChange("male");
            }}
          />
        </label>
      </div>
      <div className="form-control">
        <label
          className={`label cursor-pointer ${
            selectedGender === "female" ? "selected" : ""
          }`}
        >
          <span className="label-text pr-1">Female</span>
          <input
            type="checkbox"
            className="checkbox"
            checked={selectedGender === "female"}
            onChange={() => {
              handleCheckboxChange("female");
            }}
          />
        </label>
      </div>
    </div>
  );
};

export default GenderCheckbox;
