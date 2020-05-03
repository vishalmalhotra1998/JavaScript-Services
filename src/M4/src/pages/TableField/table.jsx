import React, { Component } from 'react';
import axios from 'axios';
import SimpleTable1 from '../component/Table';

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      responseData: [],
      loader: true,
      array: [],
      open: false,
      sortTime: {},
      loading: false,
      sortAlgorithm: '',
      sort: ''
    }
  }

  componentDidMount = () => {
    console.log('------------Componenet Did Mount----------------');
    axios.get('http://localhost:9002/api/unsort/').then(async (response) => {
      this.setState({
        responseData: response.data,
        loader: false,
      });
      await this.Mapping(response);
    });


  }
  Mapping = async (response) => {
    const parsedError = {}
    response.data.forEach(async (element) => {
      const response1 = await axios.get('http://localhost:9002/api/sort/', {
        params: {
          objectId: element.originalId,
        }
      });
      if (!response1.data.length) {
        parsedError[element.originalId] = 'N/A';
      }
      else {
        parsedError[element.originalId] = response1.data[0].sortDuration;
      }
      this.setState({
        sortTime: parsedError,
      });
    })
  }

  perticularSortButton = async (value) => {
    console.log('Perticular Sort', value);
    const { sortAlgorithm } = this.state;
    if (sortAlgorithm) {
      console.log('-----sortAlgorithm-----');
      await axios.put('http://localhost:9002/api/sort/', {
        id: value,
        sortingAlgorithm: sortAlgorithm,
      });
      const objectId = value;
      this.setState({
        loading: true,
      });
      const response1 = await axios.get('http://localhost:9002/api/sort/', {
        params: {
          objectId,
        }
      });
      const { sortTime } = this.state;
      this.setState({
        sortTime: {
          ...sortTime,
          [value]: response1.data[0].sortDuration,
        },
        sortAlgorithm: '',
      }, () => {
        this.setState({
          loading: false,
        });
      });
    }
  }

  allSortButton = async () => {
    const { sortAlgorithm } = this.state;
    if (sortAlgorithm) {
      const response = await axios.get('http://localhost:9002/api/unsort/');
      const parsedvalues = {};
      response.data.forEach(async (element) => {

        await axios.put('http://localhost:9002/api/sort/', {
          id: element.originalId,
          sortingAlgorithm: sortAlgorithm,
        });
        const objectId = element.originalId;
        console.log('objectId', objectId);
        const sortObjects = await axios.get('http://localhost:9002/api/sort/', {
          params: {
            objectId,
          }
        });
        parsedvalues[objectId] = sortObjects.data[0].sortDuration;

        this.setState({
          sortTime: parsedvalues,
        });

      });
    }
  }


  allSortButton = async () => {
    const { sortAlgorithm } = this.state;
    if (sortAlgorithm) {
      const response = await axios.get('http://localhost:9002/api/unsort/');
      const parsedvalues = {};
      response.data.forEach(async (element) => {

        await axios.put('http://localhost:9002/api/sort/', {
          id: element.originalId,
          sortingAlgorithm: sortAlgorithm,
        });
        const objectId = element.originalId;
        const sortObjects = await axios.get('http://localhost:9002/api/sort/', {
          params: {
            objectId,
          }
        });
        parsedvalues[objectId] = sortObjects.data[0].sortDuration;

        this.setState({
          sortTime: parsedvalues,
        });

      });
    }
  }

  allUnSortButton = async () => {
    const { sortAlgorithm } = this.state;
    if (sortAlgorithm) {
      const response = await axios.get('http://localhost:9002/api/unsort/');
      const parsedvalues = {};
      response.data.forEach(async (element) => {
        const sortObjects = await axios.get('http://localhost:9002/api/sort/', {
          params: {
            objectId: element.originalId,
          }
        });

        if (!sortObjects.data.length) {
          await axios.put('http://localhost:9002/api/sort/', {
            id: element.originalId,
            sortingAlgorithm: sortAlgorithm,
          });
          const sortObjects = await axios.get('http://localhost:9002/api/sort/', {
            params: {
              objectId: element.originalId,
            }
          });
          parsedvalues[element.originalId] = sortObjects.data[0].sortDuration;

          this.setState({
            sortTime: parsedvalues,
          })
        }
        else {
          parsedvalues[element.originalId] = sortObjects.data[0].sortDuration;

          this.setState({
            sortTime: parsedvalues,
          });
        }
      })
    }
  }

  handleSelectChange = (values) => {
    this.setState({ sortAlgorithm: values.target.value }, () => {
      console.log('HandleChange', this.state);
    });
  }

  render() {
    const { loader, loading, responseData, sortTime, sortAlgorithm } = this.state;
    const { match: { url } } = this.props;
    const ColumnName = ['ID', 'KeyCount', 'Depth', 'GenerationTime', 'Sort Button', 'Sort Duration', 'ViewPage']
    if (!loader) {
      if (responseData.length) {

        return (<>
          <SimpleTable1 column={ColumnName} array={responseData} sortAlgorithm={sortAlgorithm} sortTime={sortTime} perticularSortButton={this.perticularSortButton}
            handleSelectChange={this.handleSelectChange} allSortButton={this.allSortButton} allUnSortButton={this.allUnSortButton}
            loading={loading} url={url} />
        </>);
      }
      return (<>
        <p>No Data to return </p>
      </>)
    }
    return (<>
      <p>...loading</p>
    </>);
  }
}

export default Table;
