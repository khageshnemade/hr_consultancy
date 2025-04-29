import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react'; // Import the left arrow icon
import makeRequest from '../../axios';

const JobDetails = () => {
  const { job_id } = useParams(); // Get job_id from the URL
  console.log("JobId",job_id);
  
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
const navigate=useNavigate()
  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await makeRequest.get(`employer/jobdetails/${job_id}/`);
        const data = response.data;
        setJob(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch job details');
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [job_id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 rounded-lg shadow-lg bg-white">
      <h2 className="text-3xl font-bold mb-6 text-red-600">{job.title}</h2>
      <div className="text-gray-600 text-sm">{job.role}</div>
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
      <div className="mt-4">
        <span className="font-bold">Description:</span> {job.description}
      </div>

      {/* Back button */}
      <Link  onClick={() => navigate(-1)}
       className="mt-4 text-red-600 flex items-center">
        <ArrowLeft className="mr-2" />
        Back to Job Listings
      </Link>
    </div>
  );
};

export default JobDetails;
