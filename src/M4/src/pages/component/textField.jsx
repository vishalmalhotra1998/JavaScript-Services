import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import Box from '@material-ui/core/Box';
import querystring from 'query-string';

class TextFields extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keyCount: '',
      depth: '',
      dataObject: {}
    }
  }

  hanldeKeyCountChange = (values) => {
    this.setState({
      keyCount: values.target.value,
    }, () => { console.log('working ', this.state) });

  }

  handleDepthChange = (values) => {
    this.setState({
      depth: values.target.value
    });
  }
  handleOnClick = async () => {
    const { keyCount, depth } = this.state;
    console.log('----no fight');
    const unsortData = await axios.post('http://localhost:9002/api/unsort/', {
      keyCount,
      depth
    });

    const { data } = unsortData.data;
    const parsedObject = JSON.parse(JSON.stringify(data));

    this.setState({
      dataObject: parsedObject,
    });
  }

  render() {
    const { dataObject } = this.state;
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
          onChange={this.hanldeKeyCountChange}
          fullWidth
        />
        <Box marginBottom="20px" marginTop="20px" width="70vw" />
        <TextField
          id="outlined-number"
          label="Depth"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          onChange={this.handleDepthChange}
          fullWidth
        />
        <Box marginBottom="20px" width="70vw" />
        <Button variant="contained" color="primary" onClick={() => this.handleOnClick()}>
          Submit
      </Button>
        <Box marginBottom="20px" width="70vw" />
        {Boolean(Object.keys(dataObject).length) &&
          Object.keys(dataObject).map((element) => {
            if (typeof (dataObject[element]) !== 'object' || Array.isArray(dataObject[element])) {
              return (<h4>{element}{'  :  '}{dataObject[element]}</h4>)
            }
          })}

      </>
    );
  }
}

export default TextFields;
