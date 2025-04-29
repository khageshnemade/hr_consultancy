import React, { useState, useEffect } from 'react';
import makeRequest from '../../axios';
import { Link } from 'react-router-dom';

const JobListings = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const fetchJobs = async () => {
        try {
            const response = await makeRequest.get('employer/getalljobs/');
            setJobs(response.data);
        } catch (error) {
            setError('Failed to fetch job listings.');
        } finally {
            setLoading(false);
        }
    };
    const handleDelete = async (jobId) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this job posting?');
        if (!confirmDelete) return;
      
        try {
          await makeRequest.delete(`employer/jobdetails/${jobId}/`);
          fetchJobs()
          alert('Job deleted successfully');
        } catch (error) {
          console.error('Delete error:', error);
          alert('Failed to delete the job.');
        }
      };

    useEffect(() => {
        

        fetchJobs();
    }, []);

    return (
        <div className="max-w-5xl mx-auto mt-10 p-6 rounded-lg shadow-lg bg-white">
            <h2 className="text-3xl font-bold mb-6 text-red-600">Job Listings</h2>

            {/* Error message */}
            {error && <p className="text-red-500 mb-4">{error}</p>}

            {/* Loading Spinner */}
            {loading ? (
                <div className="flex justify-center items-center">
                    <div className="spinner-border text-red-600" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                    {jobs.map((job) => (
                        <div
                            key={job.id}
                            className="p-4 rounded-md bg-red-100 hover:bg-red-200 transition duration-200"
                        >
                            <h3 className="text-xl font-semibold text-red-700">{job.title}</h3>
                            <p className="text-gray-600 text-sm">{job.role}</p>
                            <div className="mt-2 text-gray-700">
                                <span className="font-bold">Location:</span> {job.location}
                            </div>
                            <div>
                                <span className="font-bold">Salary:</span> {job.salary}
                            </div>
                            <div>
                                <span className="font-bold">Deadline:</span> {new Date(job.last_date_of_apply).toLocaleDateString()}
                            </div>
                            <div className="mt-2">
                                <span className="font-bold">Skills Required:</span> {job.skills_required}
                            </div>
                            <div className="mt-2">
                                <span className="font-bold">Contact:</span> {job.contact_email}
                            </div>
                            <div className="mt-3 flex justify-between items-center">
                                <span
                                    className={`${job.is_active ? 'bg-green-300 text-green-800' : 'bg-red-300 text-red-800'
                                        } px-2 py-1 text-xs font-semibold rounded-full`}
                                >
                                    {job.is_active ? 'Active' : 'Inactive'}
                                </span>

                              {/* View Details Button */}
<Link 
  to={`/employer/jobs/${job.job_id}`} 
  className="px-4 py-2 bg-red-400 text-white rounded-lg hover:bg-red-500 transition duration-200"
>
  View Details
</Link>

{/* Apply Now Button */}
<Link 
  to={`/apply-now/${job.job_id}`}  
  className="px-4 py-2 bg-red-400 text-white rounded-lg hover:bg-red-500 transition duration-200"
>
  Apply Now
</Link>

{/* Update Job Button */}
<Link 
  to={`/employer/jobs/update/${job.job_id}`} 
  className="px-4 py-2 bg-red-400 text-white rounded-lg hover:bg-red-500 transition duration-200"
>
  Update
</Link>
<button
  onClick={() => handleDelete(job.job_id)}
  className="px-4 py-2 bg-red-300 text-white rounded-lg hover:bg-red-400 transition duration-200"
>
  Delete
</button>



                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>


    );
};

export default JobListings;
