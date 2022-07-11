import React, {useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';

function ListJobs() {

    const [loading, setLoading] = useState(true);
    const [jobs, setJobs] = useState([]);

    useEffect(() => {

        axios.get(`/api/jobs`).then(res=>{
            if(res.status === 200)
            {
                setJobs(res.data.data)
                setLoading(false);
            }
        });

    }, []);

    if(loading)
    {
        return <h4>Loading ...</h4>
    }
    else
    {
        var listHtmlTable = "";
       
        listHtmlTable = jobs.map( (item, index) => {
            return (
                <tr key={index}>
                    <td>{item.id}</td>
                    <td>{item.summary}</td>
                    <td>{item.status}</td>
                    <td>{item.name}</td>
                    <td>John Doe</td>
                </tr>
            );
        });
    }

    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header">
                                <h4>Jobs List
                                    <Link to={'add-job'} className="btn btn-primary btn-sm float-end">+ Log Job</Link>
                                </h4>
                            </div>
                            <div className="card-body">
                                
                                <table className="table table-bordered table-striped">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Summary</th>
                                            <th>Status</th>
                                            <th>Property Name</th>
                                            <th>Raised By</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {listHtmlTable}
                                    </tbody>
                                </table>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default ListJobs;