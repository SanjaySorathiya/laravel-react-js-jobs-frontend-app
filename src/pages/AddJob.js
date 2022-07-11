
import React, {useState, useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';

function AddJob() {

    const [properties, setProperties] = useState([])

    useEffect(() => {
        setProperties([]);
        axios.get(`/api/get_property_list`).then(res=>{
            if(res.status === 200)
            {
                setProperties(res.data.data)
            }
        });

    }, []);

    const navigate = useNavigate();

    const [summary , setSummary] = useState('')
    const [description , setDescription] = useState('')
    const [property_id , setPropertyID] = useState(0)
    const [error_list , setError_list] = useState([])

    function handleSelectChange(event) {
        setPropertyID(event.target.value)
    }

    const saveJob = (e) => {
        e.preventDefault();

        const data = {
            summary:summary,
            description:description,
            property_id:property_id
        }

        axios.post(`/api/jobs`, data).then(res => {
            var errors = JSON.stringify(res.data.msg);
            if(errors) {
                swal("Errors!",errors,"error");
            } else if(res.status === 200) {
                swal("Success!",res.data.message,"success");
                setSummary('')
                setPropertyID(0)
                setDescription('')
                setError_list('')
                navigate('/');
            }
        });
    }

    return (
        <div>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header">
                                <h4>Log a Job
                                    <Link to={'/'} className="btn btn-danger btn-sm float-end"> BACK</Link>
                                </h4>
                            </div>
                            <div className="card-body">
                                
                                <form onSubmit={saveJob} >
                                    <div className="form-group mb-3">
                                        <label>Summary</label>
                                        <input type="text" name="summary" onChange={(e) => { setSummary(e.target.value) }} value={summary} className="form-control" />
                                    </div>

                                    <div className="form-group mb-3">
                                        <label>Description</label>
                                            <textarea
                                                name="description" onChange={(e)=>{setDescription(e.target.value)}} value={description}  className="form-control" rows={5} cols={5} 
                                            />                                        
                                    </div>

                                    <div className="form-group mb-3">
                                        <label>Property</label>
                                        <select type="text" name="property" onChange={(handleSelectChange)} value={property_id} className="form-control">
                                        <option value="">--Select Property--</option>
                                            {properties.map((e)=>{
                                                return(
                                                    <option value={e.id}>{e.name}</option>
                                                )
                                            })}      
                                            </select>
                                    </div>                                    

                                    <div className="form-group mb-3">
                                        <button type="submit" className="btn btn-primary">Save Job</button>
                                    </div>
                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default AddJob;