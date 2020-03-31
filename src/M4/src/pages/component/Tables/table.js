import React, { Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { CircularProgress } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import { Link } from 'react-router-dom';
import Linktag from '@material-ui/core/Link';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import axios from 'axios';

const useStyles = (theme)=>({
  table: {
    minWidth: 650,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
});

class SimpleTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      array: [],
      open: false,
      sortTime: {},
      loading: false,
      sortAlgorithm: '',
    }
  }

  onHandleChangeButton = async () => {
    const response = await axios.get('http://localhost:9002/api/unsort/');
    this.setState({
      array: response.data,
      open: true
    });

  }

  perticularSortButton = async (value) => {

    const { sortAlgorithm } = this.state;
    if(sortAlgorithm) {
    await axios.put('http://localhost:9002/api/sort/', {
      id: value,
      sortingAlgorithm: sortAlgorithm,
    });
    const objectId = value;
    console.log('objectId',objectId);
    this.setState({
      loading: true,
    });
    const response1 = await axios.get('http://localhost:9002/api/sort/', {
      params: {
        objectId,
      }
    });
    const { loading } = this.state;
    console.log('---------Response Data ----------', response1.data, loading);
    const { sortTime } = this.state;
    this.setState({
      sortTime: {
        ...sortTime,
        [value]: response1.data[0].sortDuration,
      }
    }, () => {
      this.setState({
        loading: false,
      });
    })
  }
  }

  allSortButton = async () => {
    const response = await axios.get('http://localhost:9002/api/unsort/');

    response.data.map((element) => {

      axios.put('http://localhost:9002/api/sort/', {
        id: element.originalId,
      });
      const objectId = element.originalId;
      const response1 = axios.get('http://localhost:9002/api/sort/', {
        params: {
          objectId
        }
      });

    })


  }

  handleSelectChange=(values)=>{
    this.setState({sortAlgorithm: values.target.value},()=>{
      console.log(this.state);
    });
  }


  render() {
    const { match: { url } } = this.props;
    const { array, open, sortTime, loading } = this.state;
    const { classes } = this.props;
    return (
      <>
        <Box marginBottom="20px" marginTop="20px" width="70vw" />
        <Box marginBottom="20px" marginTop="20px" width="70vw" />
        <div align="center"><h2> Generate Objects </h2> </div>
        <Button variant="contained" color="primary" onClick={this.onHandleChangeButton}>
          Generate Table
      </Button>
        {open &&
          <>
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="left">ID</TableCell>
                    <TableCell align="left">Sort Button</TableCell>
                    <TableCell align="left">Sort Duration</TableCell>
                    <TableCell align="left">Sort Algorithm</TableCell>
                    <TableCell align="left">ViewPage</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {
                    array.map((row) => (
                      <>
                        <TableRow key={row.originalId}>
                          <TableCell align="left">{row.originalId}</TableCell>

                          <TableCell align="left">
                            <Button variant="contained" color="primary" onClick={() => { this.perticularSortButton(row.originalId) }}>
                              Sort Object
                </Button>
                            {loading && <CircularProgress />}
                          </TableCell>
                          <TableCell align="left">{sortTime ? sortTime[row.originalId] : 'N/A'}</TableCell>
                          <TableCell align="left">
                            <FormControl variant="outlined" className={classes.formControl}>
                              <InputLabel id="demo-simple-select-outlined-label">Alogrithm</InputLabel>
                              <Select
                                labelId="demo-simple-select-outlined-label"
                                id="demo-simple-select-outlined"
                                label="Algorithm"
                                onChange={this.handleSelectChange}
                              >
                                <MenuItem value="">
                                  <em>None</em>
                                </MenuItem>
                                <MenuItem value="Bubble Sort" >Bubble Sort</MenuItem>
                                <MenuItem value="Selection Sort" >Selection Sort</MenuItem>
                                <MenuItem value="Insertion Sort" >Insertion Sort</MenuItem>
                                <MenuItem value="Merge Sort" >Merge Sort</MenuItem>
                              </Select>
                            </FormControl></TableCell>
                          <TableCell align="left"><Fragment key={row.originalId}><Linktag href="#" component={Link} to={`${url}/${row.originalId}`}> viewpage </Linktag></Fragment></TableCell>
                        </TableRow>

                      </>
                    ))
                  }
                </TableBody>
              </Table>
            </TableContainer>
            <Box marginBottom="20px" width="70vw" />
            <Button align="right" variant="contained" color="primary" onClick={() => { this.allSortButton() }}>
              Sort All Object
                </Button>
          </>
        }
      </>
    );
  }
}

export default withStyles(useStyles)(SimpleTable);
