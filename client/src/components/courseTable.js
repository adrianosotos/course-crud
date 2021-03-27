function CourseTable ({ courses, selectCourse }) {
  return (
    <>
      <table>
        <tr>
          <th>Ativo</th>
          <th>Curso ID</th>
          <th>Nível</th>
          <th>Curso</th>
          <th>Livro</th>
          <th>Editora</th>
          <th>Modalidade</th>
          <th>Carga Horária</th>
        </tr>
        { courses.map(({ level, name, book, bookPublisher, active, modality, duration, courseId}, index) => {
          return (
            <tr
              id={index}
              onClick={selectCourse}
            >
              <th>{active}</th>
              <th>{courseId}</th>
              <th>{level}</th>
              <th>{name}</th>
              <th>{book}</th>
              <th>{bookPublisher}</th>
              <th>{modality}</th>
              <th>{duration}</th>
            </tr>
          )
        }) }
        
      </table>
    </>
  )
}

export default CourseTable