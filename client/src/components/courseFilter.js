import Select from './select'

function CourseFilter ({ filters, setSelectedFilter }) {
  function handleSelectedFilter (e) {
    const { value } = e.target
    setSelectedFilter(value)
  }
  
  return (
    <div>
      <Select
        label={'Selecione o Curso'}
        onChange={handleSelectedFilter}
      >
          <option value='/'>TODOS</option>
          {filters.map(filter => {
            return (
              <option value={filter.path}>{filter.label}</option>
            )
          })}
      </Select>
    </div>
  )
}

export default CourseFilter