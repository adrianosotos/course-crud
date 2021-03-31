function Input ({ label, onChange, name, type, value, error, onBlur, styleClass }) {
  return (
    <div className={styleClass}>
      <label>{label}:</label>
      <input 
        onChange={(e) => onChange(e)}
        type={type || 'text'}
        name={name}
        value={value}
        onBlur={onBlur}
      />
      <div className='input-error'>{error}</div>
    </div>
  )
}

export default Input
