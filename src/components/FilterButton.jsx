//import FilterRadio from './FilterRadio'
import { useState } from 'react'

/* const filterElementsRadio = ['oui', 'non']
const filterElementsCheckbox = ['1', '2', '3', '4', '5'] */

function FilterButton({filterButtonName, children}) {
  const [isFilterOpen, setIsFilterOpen] = useState(true)

  const handleClickLocationFilter = () => {
    setIsFilterOpen(!isFilterOpen)
  }

  return (
    <button
      className={`
        px-3
        mr-2
        h-full
        border
        last:mr-0
        rounded-3xl
        border-solid
        border-black
        dark:border-white
      `}
      onClick={handleClickLocationFilter}
    >
      {filterButtonName}
      <div className={isFilterOpen ? 'inline-block' : 'hidden'}>
        {children}
      </div>
    </button>
  )
}

export default FilterButton;
