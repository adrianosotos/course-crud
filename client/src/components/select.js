function Select ({children, label, onChange, name, value, error, onBlur}) {
  return (
    <>
      <label>{label}</label>
      <select
        value={value}
        name={name}
        onChange={onChange}
        onBlur={onBlur}
      >
        <option disabled selected={!Boolean(value)}></option>
        { children.map(option => option) }
      </select>
      <div className='input-error'>{error}</div>
    </>
  )
}

export default Select