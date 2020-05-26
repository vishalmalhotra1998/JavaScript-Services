import React, { Component } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import SimpleTable from '../component/Table';

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
      sort: '',
      start: 0,
      last: 10,
    }
  }

  componentDidMount = () => {
    console.log('------------Componenet Did Mount----------------');
    const { start, last } = this.state;
    axios.get('http://localhost:9002/api/unsort', {
      params: {
        skip: start,
        limit: last
      }
    }).then(async (response) => {
      this.setState({
        responseData: response.data,
        loader: false,
      });
      await this.Mapping(response.data);
    });

    this.setState({
      start: (start + last) + 1,
    })
  }


  fetchData = async () => {
    const { start, last, responseData } = this.state;
    this.setState({
      start: (start + last) + 1,
    });
    await axios.get('http://localhost:9002/api/unsort/', {
      params: {
        skip: start,
        limit: last
      }
    }).then(async (response) => {
      this.setState({
        responseData: responseData.concat(response.data),
      });
      await this.Mapping(responseData);
    });
  }

  Mapping = async (response) => {
    const parsedError = {}
    response.forEach(async (element) => {
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
    const { sortAlgorithm , start } = this.state;
    if (sortAlgorithm) {
      const response = await axios.get('http://localhost:9002/api/unsort/', {
        params: {
          skip: 0,
          limit: start
        }
      });
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
    const { sortAlgorithm, start } = this.state;
    if (sortAlgorithm) {
      const response = await axios.get('http://localhost:9002/api/unsort/', {
        params: {
          skip: 0,
          limit: start
        }
      });
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
         <h1 align="center">Object Table</h1>
          <InfiniteScroll
            dataLength={responseData.length}
            next={this.fetchData}
            hasMore={true}
            loader={<h4>load...</h4>}
            endMessage={
              <p>...Endgame</p>
            }
          >
            <SimpleTable column={ColumnName} array={responseData} sortAlgorithm={sortAlgorithm} sortTime={sortTime} perticularSortButton={this.perticularSortButton}
              handleSelectChange={this.handleSelectChange} allSortButton={this.allSortButton} allUnSortButton={this.allUnSortButton}
              loading={loading} url={url} />

          </InfiniteScroll>
        </>

        );
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
