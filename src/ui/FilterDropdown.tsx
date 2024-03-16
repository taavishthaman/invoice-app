import styled from "styled-components";
import IconDown from "../assets/dropdown_icon_down.svg";
import Select from "react-dropdown-select";

interface FilterProps {
  setSelectedType: (type: string) => void;
}

const Dropdown = styled.div`
  display: flex;
  gap: 1.4rem;
`;

const Title = styled.div`
  color: var(--08, #0c0e16);
  font-family: "League Spartan";
  font-size: 15px;
  font-style: normal;
  font-weight: 700;
  line-height: 15px; /* 100% */
  letter-spacing: -0.25px;
`;

const DropdownIcon = styled.img``;

const StyledSelect = styled(Select)`
  border: none !important;
  color: var(--08, #0c0e16);
  font-family: "League Spartan" !important;
  font-size: 15px !important;
  font-style: normal;
  font-weight: 700 !important;
  line-height: 15px; /* 100% */
  letter-spacing: -0.25px;
  ::placeholder {
    font-family: "League Spartan" !important;
    color: var(--08, #0c0e16);
    font-size: 15px !important;
    font-style: normal;
    font-weight: 700 !important;
    line-height: 15px; /* 100% */
    letter-spacing: -0.25px;
  }
`;

const FilterDropdown: React.FC<FilterProps> = ({ setSelectedType }) => {
  const options = [
    {
      value: 1,
      label: "pending",
    },
    {
      value: 2,
      label: "paid",
    },
    {
      value: 3,
      label: "draft",
    },
  ];

  return (
    <Dropdown>
      <StyledSelect
        placeholder="Filter by status"
        options={options}
        values={[]}
        onChange={(values: any) => {
          if (values.length) setSelectedType(values[0].label);
          else setSelectedType("");
        }}
      ></StyledSelect>
    </Dropdown>
  );
};

export default FilterDropdown;
