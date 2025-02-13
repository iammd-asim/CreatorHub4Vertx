import React, { useEffect, useState } from 'react';

function JobList() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://naukrikart-backend.onrender.com/api/jobs")  // Your backend API URL
      .then(response => {
        if (!response.ok) {
          throw new Error("Failed to fetch jobs");
        }
        return response.json();
      })
      .then(data => {
        setJobs(data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching jobs:", error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading jobs...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="job-list">
      {jobs.map(job => (
        <div key={job._id} className="job-card">
          <h2>{job.title}</h2>
          <p><strong>Company:</strong> {job.company}</p>
          <p><strong>Location:</strong> {job.location}</p>
          <a href={job.link} className="apply-btn" target="_blank" rel="noopener noreferrer">
            Apply Now
          </a>
        </div>
      ))}
    </div>
  );
}

export default JobList;
