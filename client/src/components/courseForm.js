import { useState, useEffect } from 'react'
import Input from './input'
import Select from  './select'

function CourseForm ({ cleanSelectedCourse, selectedCourse, updateCourse, deleteCourse, submitCourse }) {
  let coursePayload = {
    level: '',
    name: '',
    book: '',
    bookPublisher: '',
    active: '',
    modality: '',
    duration: '',
    courseId: ''
  }

  const [course, setCourse] = useState(coursePayload)
  const [errors, setErrors] = useState(coursePayload)

  useEffect(() => {
    if (selectedCourse && Object.keys(selectedCourse).length != 0) {
      setErrors(coursePayload)
      setCourse(selectedCourse)
    } else {
      setCourse(coursePayload)
    }
  }, [selectedCourse])

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
    return Object.values(course).some(data => data !== 0 && !data)
  }

  function getEmpty(courseData) {
    return Object.keys(courseData).reduce((obj, data) => {
      if (data !== '_id' && data!== '__v' && !course[data]) {
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
    getEmptyFields()
    if (hasEmptyData()) {
      return alert(`Corrija os campos destacados`)
    }

    try {
      submitCourse(course)
      return resetInputs()
    } catch (error) {
      console.log(error)
    }
  }

  function handleUpdateCourse () {
    getEmptyFields()
    if (hasEmptyData()) {
      return alert(`Corrija os campos destacados`)
    }

    updateCourse({
      ...selectedCourse,
      ...course
    })
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

        <Input 
          label={'Curso ID'}
          onChange={handleChange}
          name={'courseId'}
          value={course.courseId || ''}
          onBlur={onBlur}
          error={errors.courseId}
        />
      </form>
      <button onClick={handleSubmit}>Salvar</button>
      <button onClick={handleUpdateCourse}>Alterar</button>
      <button onClick={() => deleteCourse(course)}>Deletar</button>
      <button onClick={cleanSelectedCourse}>Limpar</button>
    </>
  )
}

export default CourseForm