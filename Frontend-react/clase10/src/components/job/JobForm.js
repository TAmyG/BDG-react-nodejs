import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { useForm } from "../../hooks/useForm";
import { acCreateJob } from "../../actions/jobAction";
import { acLoadCompanies, acSetCompanyId } from "../../actions/companyAction";

export const JobForm = () => {
  const navigate = useNavigate(); //hook for navbar
  const [values, handleInputChange, reset] = useForm({
    title: "",
    description: "",
  });

  const { title, description } = values;

  const dispatch = useDispatch();
  const { companies, companyId } = useSelector((state) => state.company);

  useEffect(() => {
    load();

    async function load() {
      dispatch(acLoadCompanies());
    }
  }, [dispatch]);

  //Handles----------------------------------------------------------

  const handleSelectChange = async (e) => {
    dispatch(acSetCompanyId(e.target.value));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    if (!title || !description) {
      console.log("Check form values");
      return;
    }

    const jobAdded = await dispatch(acCreateJob(title, description, companyId));
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
