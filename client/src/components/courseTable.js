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
              <td>{active}</td>
              <td>{courseId}</td>
              <td>{level}</td>
              <td>{name}</td>
              <td>{book}</td>
              <td>{bookPublisher}</td>
              <td>{modality}</td>
              <td>{duration}</td>
            </tr>
          )
        }) }
        
      </table>
    </>
  )
}

export default CourseTable