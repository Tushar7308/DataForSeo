import { useEffect, useState } from "react";
import AsyncSelect from "react-select/async";
import { getLocations } from "../services/api";
import "../styles/Loading.css";

const LocationSelect = ({ handleChange }) => {
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredOptions, setFilteredOptions] = useState(options);

  const fetchLocations = async (inputValue) => {
    return new Promise((resolve) => {
      getLocations(inputValue).then((response) => {
        let data = response.data.results.map((loc) => ({
          value: loc.location_code,
          label: `${loc.location_name} (${loc.location_code})`,
        }));

        resolve(data);
      });
    });
  };

  const customStyles = {
    control: (provided) => ({
      ...provided,
      borderRadius: "8px",
      boxShadow: "none",
      minHeight: "45px",
    }),
    indicatorsContainer: (provided) => ({
      ...provided,
      display: "none",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "#000",
      fontWeight: "400",
      textAlign: "left",
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#888",
      fontSize: "16px",
      textAlign: "left",
    }),
  };

  return (
    <div className="location-dropdown">
      <AsyncSelect
        name="location"
        placeholder="Search location..."
        loadOptions={fetchLocations}
        onChange={(e) => {
          handleChange({ target: { name: "location", value: e?.value || "" } });
        }}
        styles={customStyles}
        isClearable
      />
    </div>
  );
};

export default LocationSelect;
