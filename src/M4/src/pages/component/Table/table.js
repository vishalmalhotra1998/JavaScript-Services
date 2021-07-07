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
import { Link } from 'react-router-dom';
import Linktag from '@material-ui/core/Link';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = (theme) => ({
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
    this.state = {}
  }

  render() {
    const { 
      classes, column, array, sortTime, perticularSortButton, handleSelectChange,
      sortAlgorithm, allSortButton, allUnSortButton, loading, url
     } = this.props;

    return (
      <>

        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                {
                  column.map((element) => (
                    <TableCell align="left">{element}</TableCell>
                  ))
                }
              </TableRow>
            </TableHead>
            <TableBody>
              {
                array.map((row) => (
                  <>
                    <TableRow key={row.originalId}>
                      <TableCell align="left">{row.originalId}</TableCell>
                      <TableCell align="left">{row.keyCount}</TableCell>
                      <TableCell align="left">{row.depth}</TableCell>
                      <TableCell align="left">{row.generationTime}</TableCell>
                      <TableCell align="left">
                        <Button variant="contained" color="primary" onClick={() => { perticularSortButton(row.originalId) }}>
                          Sort Object
                </Button>
                        {loading && <CircularProgress />}
                      </TableCell>
                      <TableCell align="left">{sortTime[row.originalId]}</TableCell>
                      <TableCell align="left"><Fragment key={row.originalId}><Linktag href="#" component={Link} to={`${url}/${row.originalId}`}> viewpage </Linktag></Fragment></TableCell>
                    </TableRow>

                  </>
                ))
              }
              <TableRow>
                <TableCell><Button align="right" variant="contained" color="primary" onClick={allSortButton}>
                  Sort All Object
                </Button></TableCell><TableCell><Button align="right" variant="contained" color="primary" onClick={allUnSortButton}>
                  Sort unsort object
                </Button></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell> <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel id="demo-simple-select-outlined-label">Alogrithm</InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    label="Algorithm"
                    value={sortAlgorithm}
                    onChange={handleSelectChange}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value="Bubble Sort" >Bubble Sort</MenuItem>
                    <MenuItem value="Selection Sort" >Selection Sort</MenuItem>
                    <MenuItem value="Insertion Sort" >Insertion Sort</MenuItem>
                    <MenuItem value="Merge Sort" >Merge Sort</MenuItem>
                  </Select>
                </FormControl>
                </TableCell>

              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </>
    );
  }
}

export default withStyles(useStyles)(SimpleTable);