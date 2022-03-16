import React from 'react';
import PropTypes from 'prop-types';

// libs
import {Request} from 'libs/'

// hooks
import {useStorage} from 'hooks/'

// styles
import {styled} from 'styles/snippets'

// material
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';



const FormList = styled.ul(theme => ({
  '& > li': {
    marginBottom: theme.spacing(2),
  }
}))


const SelectField = () => {
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">Age</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={age}
        label="Age"
        onChange={handleChange}
      >
        <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
        <MenuItem value={30}>Thirty</MenuItem>
      </Select>
    </FormControl>
  )
}


function FormDialog(props) {
  const storage = useStorage()

  const [disabled, setDisabled] = React.useState(false)
  const [data, setData] = React.useState({
    name: '',
    email: '',
    message: '',
  })

  React.useEffect(() => {

    const stored_data = storage.getItem(props.storageKey, 'local')
    if(typeof stored_data === 'object') {
      setData(stored_data)
    }

  }, [])

  const handleChange = (key) => (event) => {
    const value = event.target.value
    setData(c => ({...c, [key]: value}))
  }

  const onSubmitForm = async (event) => {
    event.stopPropagation()
    event.preventDefault()

    const body = {
      ...data,
      phone: '00000000',
      url: document.location.href,
    }

    setDisabled(true)

    const apiUrl = 'https://api.unrealos.com/api/contacts/send_message/'
    await Request.POST(apiUrl, body)
    .then(res => {
      if(res.status === 200) {

        storage.setItem(props.storageKey, {
          name: data.name,
          email: data.email,
        }, 'local')

        props.onDialogClose()
      } else {
        alert('Fields filled with errors')
      }
    })
    .catch(err => {
      alert('Undefined error')
      console.error(err);
      props.onDialogClose()
    })

    setDisabled(false)
  }

  return (
    <div>

      <Typography variant="h6" sx={{mb: 3}}>
        Tell us about yourself:
      </Typography>

      <form onSubmit={onSubmitForm}>

        <FormList>
          <li>
            <TextField
              disabled={disabled}
              value={data.name}
              onChange={handleChange('name')}
              label="Name"
              type="text"
              fullWidth
              required
            />
          </li>
          <li>
            <TextField
              disabled={disabled}
              value={data.email}
              onChange={handleChange('email')}
              label="Email"
              type="email"
              fullWidth
              required
            />
          </li>
          <li>
            <TextField
              disabled={disabled}
              value={data.message}
              onChange={handleChange('message')}
              label="Where do you work?"
              type="text"
              multiline
              minRows={2}
              maxRows={8}
              fullWidth
              required
            />
          </li>
          {/*
            <li>
              <SelectField />
            </li>
            */}
        </FormList>

        <Button
          sx={{mt: 2}}
          disabled={disabled}
          type="submit"
          fullWidth
          color="primary"
          size="large"
          variant="contained">
          Done
        </Button>

      </form>

    </div>
  );
}

FormDialog.propTypes = {
  storageKey: PropTypes.string.isRequired,
  onDialogClose: PropTypes.func.isRequired,
};

export default FormDialog
