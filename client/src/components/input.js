function Input ({ label, onChange, name, type, value, error, onBlur}) {
  return (
    <div className='input-wrapper'>
      <label>{label}:</label>
      <input 
        onChange={(e) => onChange(e)}
        name={name}
        type={type}
        value={value}
        onBlur={onBlur}
      />
      <div className='input-error'>{error}</div>
    </div>
  )
}

export default Input
