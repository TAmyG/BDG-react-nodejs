import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { createJob, loadCompanies } from "../../helpers/requestOPT";
import { useForm } from "../../hooks/useForm";

export const JobForm = () => {
  const navigate = useNavigate(); //hook for navbar
  const [companies, setCompanies] = useState([]);
  const [companyId, setCompanyId] = useState();
  const [values, handleInputChange, reset] = useForm({
    title: "",
    description: "",
  });

  const { title, description } = values;

  useEffect(() => {
    load();

    async function load() {
      const companies = await loadCompanies();
      setCompanies(companies);
      setCompanyId(companies[0].id);
    }
  }, []);

  //Handles----------------------------------------------------------

  const handleSelectChange = async (e) => {
    setCompanyId(e.target.value);
  };

  const handleClick = async (e) => {
    e.preventDefault();

    if (!title || !description) {
      console.log("Check form values");
      return;
    }

    const jobAdded = await createJob({ title, description, companyId });
    reset();
    navigate(`/jobs/${jobAdded.id}`); // replace true prevent to back to previous page
  };

  return (
    <div>
      <h1 className="title">New Job</h1>
      <div className="box">
        <form>
          <div className="field">
            <label className="label">Title</label>
            <div className="control">
              <input
                className="input"
                type="text"
                name="title"
                value={title}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Description</label>
            <div className="control">
              <textarea
                className="input"
                style={{ height: "10em" }}
                type="text"
                name="description"
                value={description}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="field mb-2">
            <label className="label">Company</label>
            <div className="control">
              <select
                className="form-select"
                name="company"
                onChange={handleSelectChange}
              >
                {companies.map((company, i) => (
                  <option key={i} value={company.id}>
                    {company.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="field ">
            <div className="control">
              <button className="button is-link " onClick={handleClick}>
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
