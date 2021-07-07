import React, { Fragment } from 'react';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import axios from 'axios';

class ViewPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            array: [],
            open: false,
        }
    }
    handleChangeButton = async (value) => {
        console.log('dcjisioecjiowecj');
        const data = await axios.get('http://localhost:9002/api/sort/', {
            params: {
                objectId: value,
            }
        });

        this.setState({
            array: data.data,
            open: true,
        })

    }
    render() {
        const { open, array } = this.state;
        const id = this.props.match.params.id;
        return (<>
            <Button variant="contained" fullWidth onClick={() => this.handleChangeButton(id)}>
                Version Detail
      </Button>
            <Box marginBottom="20px" marginTop="20px" width="70vw" />
            {open && array.map((element) => {
                return (
                    <Fragment key={element._id}>
                        <li>{element.sortDuration}</li>
                        <Box marginBottom="20px" marginTop="20px" width="70vw" />
                    </Fragment>
                );
            })}
        </>);
    }
}

export default ViewPage;
