import { useEffect, useState } from "react";
import Select from "react-select";
import { colorStyles } from "../../constant";
import { handleTags } from "../../utils/helperFunctions";

const MultiSelectComponent = ({ options, title, handleSearch }) => {
  const option = handleTags(options);

  const [selected, setSelected] = useState([]);
  const handleSelect = (data) => {
    setSelected(data);
  };
  useEffect(() => {
    const value = selected.map((search) => {
      return search.value;
    });
    let target;
    if (title == "Department") {
      target = "departmentName";
    } else {
      const t = title;
      target = t.toLowerCase();
    }
    handleSearch(target, value);
  }, [selected]);

  return (
    <div className="flex ">
      <label className="p-2 text-xl">{title} : </label>
      <Select
        options={option}
        className="  indent-3 "
        placeholder={`Select a ${title}`}
        value={selected}
        onChange={handleSelect}
        styles={colorStyles}
        isSearchable={true}
        isMulti
      />
    </div>
  );
};

export default MultiSelectComponent;
