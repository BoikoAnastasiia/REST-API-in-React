const Filter = ({ value, onChange }) => (
  <label>
    todo Filter
    <input type="text" value={value} onChange={onChange} />
  </label>
);
export default Filter;
