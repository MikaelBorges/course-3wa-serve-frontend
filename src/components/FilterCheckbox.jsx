import { starIcon } from '../constants/icons'
function FilterCheckbox({checkboxName, groupName}) {

  const handleClickCheckbox = (e) => {
    e.stopPropagation()
  }

  return (
    <label
      className='ml-3'
      htmlFor={checkboxName}
      onClick={(e) => handleClickCheckbox(e)}
    >
      <input
        type='checkbox'
        name={groupName}
      />
      {checkboxName}{starIcon}
    </label>
  )
}

export default FilterCheckbox;
