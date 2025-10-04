import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import Swal from 'sweetalert2';

const JobApply = () => {
      const {id} = useParams();
      const {user} = useAuth();
      const navigate = useNavigate();
    //   console.log(id, user);
       const submitJobApplication = e =>{
        e.preventDefault();
        const form = e.target;
        const linkedIn = form.linkedIn.value;
        const github = form.github.value;
        const resume = form.resume.value;

        // console.log(linkedIn,github,resume);

        const jobApplication = {
            job_id: id,
            applicant_email: user.email,
            linkedIn,
            github,
            resume
        }

        fetch('http://localhost:5000/job-applications',{
          method: 'POST',
          headers:{
            'content-type': 'application/json'
          },
          body: JSON.stringify(jobApplication)
        })
        .then(res => res.json())
        .then(data =>{
          if(data.insertedId){
            Swal.fire({
  position: "top-end",
  icon: "success",
  title: "Your work has been saved",
  showConfirmButton: false,
  timer: 1500
});
navigate('/myApplications')
          }
          
        })

       }
    return (
        <div className="hero bg-base-200 min-h-screen">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <div className="card-body">
        <h1 className="text-5xl font-bold text-center">Apply Job and Good Luck!</h1>
        <form className="form-control" onSubmit={submitJobApplication}>
          <label className="label">
            <span className="label-text">LinkedIn URL</span>
          </label>
          <input
            type="url"
            name='linkedIn'
            placeholder="LinkedIn URL"
            className="input input-bordered"
            required
          />

          <label className="label">
            <span className="label-text">Github URL</span>
          </label>
          <input
            type="url"
            name='github'
            placeholder="Github URL"
            className="input input-bordered"
            required
          />
<label className="label">
            <span className="label-text">Resume URL</span>
          </label>
          <input
            type="url"
            name='resume'
            placeholder="Resume URL"
            className="input input-bordered"
            required
          />

          <button type="submit" className="btn btn-neutral mt-4">
            Apply
          </button>
        </form>
      </div>
    </div>
  </div>
</div>

    );
};

export default JobApply;