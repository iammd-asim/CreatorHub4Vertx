import React from 'react';

const jobs = [
  { id: 1, title: "Software Engineer", company: "Google", location: "Remote", link: "#" },
  { id: 2, title: "Frontend Developer", company: "Amazon", location: "New York, USA", link: "#" },
  { id: 3, title: "Data Analyst", company: "Facebook", location: "London, UK", link: "#" },
  { id: 4, title: "Project Manager", company: "Microsoft", location: "Berlin, Germany", link: "#" }
];

function JobList() {
  return (
    <div className="job-list">
      {jobs.map(job => (
        <div key={job.id} className="job-card">
          <h2>{job.title}</h2>
          <p><strong>Company:</strong> {job.company}</p>
          <p><strong>Location:</strong> {job.location}</p>
          <a href={job.link} className="apply-btn">Apply Now</a>
        </div>
      ))}
    </div>
  );
}

export default JobList;
