import React from 'react';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import axios from 'axios';
import Box from '@material-ui/core/Box';

const schema = yup.object().shape({
  keyCount: yup
    .string()
    .matches(/^([2-9]|1[0])$/, 'KeyCount is invalid')
    .required('keyCount is required')
    .label('KeyCount')
  ,
  depth: yup
    .string()
    .matches(/^([2-9]|1[0])$/, 'KeyCount is invalid')
    .required()
    .label('Depth')
  ,
})

const useStyles = (theme) => ({
  table: {
    minWidth: 650,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
});

class TextFields extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keyCount: '',
      depth: '',
      dataObject: {},
      errorMessage: {},
      touched: {},
      isValid: false,

    }
  }

  hasError = () => {
    const { keyCount, depth, touched } = this.state;
    const parsedError = {};
    schema.validate({ keyCount, depth }
      , { abortEarly: false }).then(() => {

        this.setState({
          errorMessage: {},
          isValid: true,
        })

      }).catch((error) => {
        console.log(error);
        error.inner.forEach((element) => {
          if (touched[element.path]) {
            parsedError[element.path] = element.message;
          }
          this.setState({
            errorMessage: parsedError,
            isValid: false
          })
        });
      })

  }

  isTouched = (value) => {

    const { touched } = this.state;
    console.log(value);
    this.setState({
      touched: {
        ...touched,
        [value]: true,
      }
    }, () => { this.hasError() })

  }

  hanldeKeyCountChange = (values) => {
    this.setState({
      keyCount: values.target.value,
    }, () => { this.hasError() });

  }

  handleDepthChange = (values) => {
    this.setState({
      depth: values.target.value
    }, () => { this.hasError() });
  }
  handleOnClick = async () => {
    const { keyCount, depth } = this.state;
    const unsortData = await axios.post('http://localhost:9002/api/unsort/', {
      keyCount,
      depth
    });

    const { data } = unsortData;
    const parsedObject = JSON.parse(JSON.stringify(data));

    this.setState({
      dataObject: parsedObject,
    });
  }

  render() {
    const { dataObject, errorMessage, isValid } = this.state;
    const { classes } = this.props;
    return (
      <>
        <Box marginBottom="20px" marginTop="20px" width="70vw" />
        <Box marginBottom="20px" marginTop="20px" width="70vw" />
        <div align="center"><h2> Create Objects</h2> </div>
        <Box marginBottom="20px" marginTop="20px" width="70vw" />
        <TextField
          id="outlined-number"
          label="KeyCount"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          error={errorMessage.keyCount}
          helperText={errorMessage.keyCount}
          onChange={this.hanldeKeyCountChange}
          onBlur={() => { this.isTouched('keyCount') }}
          fullWidth
        />
        <Box marginBottom="20px" marginTop="20px" width="70vw" />
        <TextField
          id="outlined-number"
          label="Depth"
          type="number"
          error={errorMessage.depth}
          helperText={errorMessage.depth}
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          onChange={this.handleDepthChange}
          onBlur={() => { this.isTouched('depth') }}
          fullWidth
        />
        <Box marginBottom="20px" width="70vw" />
        <Button variant="contained" color="primary" disabled={!isValid} onClick={() => this.handleOnClick()}>
          Submit
      </Button>
        <Box marginBottom="20px" width="70vw" />
        {Boolean(Object.keys(dataObject).length) &&
          <div>
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="left">ID</TableCell>
                    <TableCell align="left">keyCount</TableCell>
                    <TableCell align="left">Depth</TableCell>
                    <TableCell align="left">Generation Time</TableCell>
                    <TableCell align="left">size</TableCell>

                  </TableRow>
                </TableHead>
                <TableBody>
                  <>
                    <TableRow key={dataObject.originalId}>
                      <TableCell align="left">{dataObject.originalId}</TableCell>
                      <TableCell align="left">{dataObject.keyCount}</TableCell>
                      <TableCell align="left">{dataObject.depth}</TableCell>
                      <TableCell align="left">{dataObject.generationTime}</TableCell>
                      <TableCell align="left">{dataObject.size}</TableCell>
                    </TableRow>
                  </>
                </TableBody>
              </Table>
            </TableContainer>
            <Box marginBottom="20px" width="70vw" />
            <Button variant="contained" color="primary" component={Link} to="objecttable">
              All object
            </Button>
          </div>
        }
      </>
    );
  }
}

export default withStyles(useStyles)(TextFields);
