import { useState } from 'react'
import Input from './input'
import Select from  './select'

function CourseForm () {
  const coursePayload = {
    level: '',
    name: '',
    book: '',
    bookPublisher: '',
    active: '',
    modality: '',
    duration: ''
  }

  const [course, setCourse] = useState(coursePayload);

  const [errors, setErrors] = useState(coursePayload);

  function handleChange(e) {
    const { name, value } = e.target

    setCourse({
      ...course,
      [name]: value
    })
  }

  function onBlur (e) {
    const { name, value } = e.target

    if (value) {
      setErrors({
        ...errors,
        [name]: ''
      })
    }
  }

  function hasEmptyData() {
    return Object.values(course).some(data => !data)
  }

  function getEmpty(courseData) {
    return Object.keys(courseData).reduce((obj, data) => {
      if (!course[data]) {
        obj[data] = `Preenchimento obrigatorio`
      }
      return obj
    }, {})
  }

  function getEmptyFields() {
    setErrors({
      ...errors,
      ...getEmpty(course)
    })
  }

  function resetInputs() {
    setCourse(coursePayload)
    setErrors(coursePayload)
  }

  function handleSubmit() {
    debugger
    getEmptyFields()
    if (hasEmptyData()) {
      return alert(`Corrija os campos destacados`)
    }

    console.log(course)
    resetInputs()
  }

  return (
    <>
      <form>
        <Input
          label={'Nível'}
          onChange={handleChange}
          name={'level'}
          value={course.level || ''}
          onBlur={onBlur}
          error={errors.level}
        />
        
        <Input 
          label={'Curso'}
          onChange={handleChange}
          name={'name'}
          value={course.name || ''}
          onBlur={onBlur}
          error={errors.name}
        />

        <Input 
          label={'Livro'}
          onChange={handleChange}
          name={'book'}
          value={course.book || ''}
          onBlur={onBlur}
          error={errors.book}
        />

        <Input 
          label={'Editora'}
          onChange={handleChange}
          name={'bookPublisher'}
          value={course.bookPublisher || ''}
          onBlur={onBlur}
          error={errors.bookPublisher}
        />

        <Select
          label={'Ativo'}
          onChange={handleChange}
          name={'active'}
          value={course.active || ''}
          onBlur={onBlur}
          error={errors.active}
        >
          <option value="yes">Sim</option>
          <option value="no">Não</option>
        </Select>

        <Select
          label={'Modalidade'}
          onChange={handleChange}
          name={'modality'}
          value={course.modality || ''}
          onBlur={onBlur}
          error={errors.modality}
        >
          <option value="inPerson">Presencial</option>
          <option value="online">À Distância</option>
        </Select>

        <Input 
          label={'Carga Horária'}
          onChange={handleChange}
          name={'duration'}
          value={course.duration || ''}
          onBlur={onBlur}
          error={errors.duration}
        />
      </form>
      <button onClick={handleSubmit}>Salvar</button>
    </>
    
  )
}

export default CourseForm