function FilterRadio({radioName, groupName}) {

  const handleClickRadio = (e) => {
    e.stopPropagation()
  }

  return (
    <label
      className='ml-3'
      htmlFor={radioName}
      onClick={(e) => handleClickRadio(e)}
    >
      <input
        type='radio'
        name={groupName}
      />
      {radioName}
    </label>
  )
}

export default FilterRadio;
