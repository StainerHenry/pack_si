import React from 'react'
import PropTypes from 'prop-types'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import FormHelperText from '@mui/material/FormHelperText'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Slider from '@mui/material/Slider'
import styles from './styles.module.scss'
import FileField from 'components/FileField'

const formikMuiErrors = (formik, name) => ({
  error: Boolean(formik.errors[name]),
  helperText: formik.errors[name]
})

FormikTextField.propTypes =
FormikAutocomplete.propTypes =
FormikCheckbox.propTypes =
FormikImageField.propTypes =
{
  name: PropTypes.string,
  formik: PropTypes.object
}

export function FormikTextField(props) {
  const { name, formik, ...fieldProps } = props

  const handleChange = e => {
    formik.handleChange(e)
    formik.setTouched({ ...formik.touched, [name]: true })
  }

  return (
    <TextField
      name={name}
      value={formik.values[name]}
      onChange={handleChange}
      {...formikMuiErrors(formik, name)}
      {...fieldProps}
    />
  )
}


export function FormikAutocomplete(props) {
  const { formik, name, ...field } = props
  const textFieldRef = React.useRef()
  const [inputValue, setInputValue] = React.useState('')

  const handleChange = (_, value) => {
    formik.setFieldValue(name, value)
    formik.setTouched({ ...formik.touched, [name]: true })
  }

  let value = formik.values[name] ?? []
  if(value.length === 1 && value[0] === '') value = []

  const handleInputChange = (event, value) => {
    if(!event) return
    if(value.slice(-1) === ',') {
      addItem()
    } else {
      setInputValue(value)
    }
  }

  const handleKeyDown = e => {
    if(e.key === 'Enter') {
      e.preventDefault()
    } else if(e.key === ',') { // (for mobile)
      addItem()
      e.preventDefault()
    }
  }

  const addItem = () => {
    setInputValue('')
    handleChange(null, value.concat(inputValue))
  }

  return (
    <Autocomplete
      {...field}
      multiple
      options={props.options ?? []}
      value={value}
      getOptionLabel={(option) => option}
      freeSolo clearOnBlur={true}
      onChange={handleChange}
      inputValue={inputValue}
      onInputChange={handleInputChange}
      ref={textFieldRef}
      renderInput={props => (
        <TextField
          {...field}
          {...props}
          {...formikMuiErrors(formik, name)}
          placeholder={'Нажмите Enter или запятую, чтобы добавить'}
          onKeyDown={handleKeyDown}
          tabIndex={-1}
        />
      )}
    />
  )
}

FormikSelect.propTypes = { ...FormikTextField.propTypes, options: PropTypes.object }
export function FormikSelect(props) {
  const { formik, name, options, ...field } = props
  const error = { error: Boolean(formik.errors[name]) }

  const handleChange = e => {
    formik.handleChange(e)
    formik.setTouched({ ...formik.touched, [name]: true })
  }

  return (
    <FormControl fullWidth>
      <InputLabel {...error}>{props.label}</InputLabel>
      <Select
        {...field}
        name={name}
        value={formik.values[name]}
        onChange={handleChange}
        {...error}
      >
        {Object.entries(options).map(([id, label]) => <MenuItem value={id} key={id}>{label}</MenuItem>)}
      </Select>
      <FormHelperText error>{formik.errors[name] && formik.errors[name]}</FormHelperText>
    </FormControl>
  )
}

export function FormikCheckbox(props) {
  const { formik, name, ...field } = props

  const handleChange = e => {
    formik.handleChange(e)
    formik.setTouched({ ...formik.touched, [name]: true })
  }

  return (
    <FormControlLabel
      control={
        <Checkbox
          name={name}
          checked={formik.values[name]}
          onChange={handleChange}
        />
      }
      {...field}
    />
  )
}

FormikSlider.propTypes = {
  ...FormikTextField.propTypes,
  defaultValue: PropTypes.number,
}
export function FormikSlider(props) {
  const { formik, name, ...field } = props
  const [value, setValue] = React.useState(formik.values[name])

  const handleChange = value => {
    setValue(value)
    formik.setTouched({ ...formik.touched, [name]: true })
  }

  React.useEffect(() => formik.setFieldValue(name, value), [value])

  return (
    <div className={styles.slider}>
      <span>{field.label}</span>
      <Slider
        name={name}
        value={value}
        onChange={e => requestAnimationFrame(() => handleChange(e.target.value))}
        valueLabelDisplay='auto'
        marks
        {...field}
      />
    </div>
  )
}

export function FormikImageField(props) {
  const { formik, name, ...field } = props

  const handleChange = fileURI => {
    formik.setFieldValue(name, fileURI ?? '')
    let touched = { ...formik.touched }
    if(fileURI !== undefined || formik.initialValues[name] !== (fileURI ?? '')) {
      touched = { ...formik.touched, [name]: true }
    } else {
      const formikTouched = { ...formik.touched }
      delete formikTouched[name]
      touched = formikTouched
    }
    formik.setTouched(touched)
  }

  return (
    <FileField
      {...field}
      type='image'
      value={formik.values[name]}
      onChange={handleChange}
    />
  )
}
