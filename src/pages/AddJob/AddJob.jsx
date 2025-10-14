import React from 'react';
import useAuth from '../../hooks/useAuth';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const AddJob = () => {
const {user} = useAuth();
const navigate = useNavigate();
    const handleAddJob= e =>{
        e.preventDefault();
        const formdata = new FormData(e.target);
        const initialData = Object.fromEntries(formdata.entries());
        // console.log(initialData);
        const {min , max , currency, ...newJob} = initialData;
        // console.log(min , max , currency, newJob);
        newJob.salaryRange = { min , max , currency};
        newJob.requirements = newJob.requirements.split('\n');
        newJob.responsibilities = newJob.responsibilities.split('\n');
        console.log(newJob);


        fetch('http://localhost:5000/jobs', {
          method: 'POST',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify(newJob)
        })
        .then(res => res.json())
        .then(data => {
          if(data.insertedId){
                      Swal.fire({
            position: "top-end",
            icon: "success",
            title: "job has been added",
            showConfirmButton: false,
            timer: 1500
          });
          navigate('/myPostedJobs')
                    }
        })
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h2 className="text-3xl font-bold mb-6">Post a New Job</h2>

      <div className="card bg-base-100 w-full max-w-sm shadow-2xl p-6">
        <form className="form-control" onSubmit={handleAddJob}>
          {/* job title */}
          <label className="label">
            <span className="label-text">Job Title</span>
          </label>
          <input
            type="text"
            name='title'
            placeholder="Job Title"
            className="input input-bordered mb-4"
            required
          />

          {/* Job Location */}
          <label className="label">
            <span className="label-text">Job Location</span>
          </label>
          <input
            type="text"
            name='location'
            placeholder="Job Location"
            className="input input-bordered mb-2"
            required
          />
           {/* Job type */}
          <label className="label">
            <span className="label-text">Job Type</span>
          </label>
          <select defaultValue="Pick a Job type" className="select select-ghost">
  <option disabled={true}>Pick a Job type</option>
  <option>Full-time</option>
  <option>Intern</option>
  <option>Part-time</option>
</select>
           {/* Job category */}
          <label className="label">
            <span className="label-text">Job Field</span>
          </label>
          <select defaultValue="Pick a job field" className="select select-ghost">
  <option disabled={true}>Pick a Job Field</option>
  <option>Engineering</option>
  <option>Marketing</option>
  <option>Finance</option>
  <option>Teaching</option>
</select>

{/* salary range */}

<div className='grid grid-cols-1 lg:grid-cols-3 gap-4 items-end'>
    <div>
        <label className="label">
            <span className="label-text mb-2">Salary Range</span>
          </label>
          <input
            type="text"
            name='min'
            placeholder="min"
            className="input input-bordered mb-2"
            required
          />
    </div>
    <div>
          <input
            type="text"
            name='max'
            placeholder="Max"
            className="input input-bordered mb-2"
            required
          />
    </div>
    <div>
          <select name='currency' defaultValue="Pick a Currency" className="select select-ghost">
  <option disabled={true}>Currency</option>
  <option>BDT</option>
  <option>USD</option>
  <option>INR</option>
</select>
    </div>

</div>
{/* job description */}
          <label className="label">
            <span className="label-text">Job Description</span>
          </label>
          <textarea className="textarea" placeholder="Job Description" name='description' required></textarea>
{/* company name */}
          <label className="label">
            <span className="label-text">Company Name</span>
          </label>
          <input
            type="text"
            name='company'
            placeholder="Company Name"
            className="input input-bordered mb-2"
            required
          />
{/* requirements */}
          <label className="label">
            <span className="label-text">Job Requirements</span>
          </label>
          <textarea className="textarea" placeholder="Put each requirements in a new line" name='requirements' required></textarea>
{/* responsibilities */}
          <label className="label">
            <span className="label-text">Job Responsibilities</span>
          </label>
          <textarea className="textarea" placeholder="write each responsibility in a new line" name='responsibilities' required></textarea>
{/* HR Name */}
          <label className="label">
            <span className="label-text">HR Name</span>
          </label>
          <input
            type="text"
            name='hr_name'
            placeholder="HR Name"
            className="input input-bordered mb-2"
            required
          />
{/* HR Email */}
          <label className="label">
            <span className="label-text">HR Email</span>
          </label>
          <input
            type="text"
            defaultValue={user?.email}
            name='hr_email'
            placeholder="HR Email"
            className="input input-bordered mb-2"
            required
          />
          {/* application Deadline */}
          <label className="label">
            <span className="label-text">Deadline</span>
          </label>
          <input
            type="date"
            defaultValue={user?.email}
            name='applicationDeadline'
            placeholder="Deadline"
            className="input input-bordered mb-2"
            required
          />
{/* Company Logo URL */}
          <label className="label">
            <span className="label-text">Company Logo URL</span>
          </label>
          <input
            type="text"
            name='company_logo'
            placeholder="Company Logo URL"
            className="input input-bordered mb-2"
            required
          />



          {/* Submit Button */}
          <button type="submit" className="btn btn-neutral mt-4 w-full">
            Submit
          </button>
        </form>
      </div>
    </div>
    );
};

export default AddJob;