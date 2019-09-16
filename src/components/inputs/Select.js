import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    // margin: theme.spacing(1),
    width: '100%',
    minWidth: 200,
    marginBottom: 20,
    marginTop: 20,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function SimpleSelect({
  name,
  value,
  label = '',
  items = [],
  handleChange,
}) {
  // const [values, setValues] = React.useState({
  //     age: '',
  //     name: 'hai',
  // });

  // const inputLabel = React.useRef(null);
  // const [labelWidth, setLabelWidth] = React.useState(0);
  // React.useEffect(() => {
  //     setLabelWidth(inputLabel.current.offsetWidth);
  // }, []);

  // function handleChange(event) {
  //     setValues(oldValues => ({
  //     ...oldValues,
  //     [event.target.name]: event.target.value,
  //     }));
  // }
  const classes = useStyles();

  return (
    <FormControl variant="filled" className={classes.formControl}>
      <InputLabel htmlFor="filled-age-simple"> {label} </InputLabel>
      <Select
        value={value}
        onChange={handleChange}
        input={<FilledInput name={name} id="filled-age-simple" />}
      >
        <MenuItem key="A" value="">
          <em>None</em>
        </MenuItem>
        {items.map((item, index) => (
          <MenuItem key={index} value={item.id}>
            {item.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
