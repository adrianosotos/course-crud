import { useEffect, useState } from 'react'
import Axios from 'axios'
import CourseFilter from '../components/courseFilter'
import CourseForm from '../components/courseForm'
import CourseTable from '../components/courseTable'

function Dashboard () {
  const [courses, setCourses] = useState([])
  const [filters, setFilters] = useState([])
  const [selectedFilter, setSelectedFilter] = useState()
  const [selectedCourse, setSelectedCourse] = useState()

  useEffect(() => {
    fetchCourses()
  }, [selectedFilter])

  function fetchCourses () {
    const url = 'http://localhost:5000/api/courses'
    const params = selectedFilter || ''

    Axios.get(`${url}${params}`)
    .then(result => {
      setCourses(result.data.payload.courses)
      setFilters(result.data.payload.filters)
    })
    .catch(error => console.log(error))
  }

  function selectCourse (e) {
    const courseIndex = e.target?.parentElement?.id
    setSelectedCourse(courses[courseIndex])
  }

  function cleanSelectedCourse () {
    setSelectedCourse({})
  }

  function submitCourse (course) {
    Axios.post('http://localhost:5000/api/courses', {
      ...course
    })
  }

  function updateCourse (course) {
    Axios.patch('http://localhost:5000/api/courses', course)
    .then(() => fetchCourses())
    .catch((error) => console.log(error))
  }

  function deleteCourse (course) {
    Axios.delete('http://localhost:5000/api/courses', { 
      data: { id: course._id },
      headers: { "Authorization": "***" }
    })
    .then(() => fetchCourses())
    .catch((error) => console.log(error))
  }

  return (
    <div>
      <CourseFilter 
        filters={filters}
        setSelectedFilter={setSelectedFilter}
      />
      <CourseForm 
        cleanSelectedCourse={cleanSelectedCourse}
        selectedCourse={selectedCourse}
        updateCourse={updateCourse}
        deleteCourse={deleteCourse}
        submitCourse={submitCourse}
      />
      <CourseTable 
        courses={courses}
        selectCourse={selectCourse}
      />
    </div>
  )
}

export default Dashboard