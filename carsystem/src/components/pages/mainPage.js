import React, { useState, useEffect } from "react";
import "./mainPage.css";
import axios from "axios";
import LoadingOverlay from "react-loading-overlay";
import Navbar from './navbar'
// import BounceLoader from 'react-spinners/BounceLoader'

function MainPage() {
  const [unAssigned, setUnAssigned] = useState([]);
  const [QC1, setQC1] = useState([]);
  const [QC2, setQC2] = useState([]);
  const [QC3, setQC3] = useState([]);
  const [QC4, setQC4] = useState([]);
  const [landSide, setLandSide] = useState([]);
  const [houseKeeping, setHouseKeeping] = useState([]);
  const [Rail, setRail] = useState([]);
  const [groupId, setgroupId] = useState(0);
  const [carId, setcarId] = useState(0);
  const [loading, setLoading] = useState(true);
  const changeGroup = async () => {
    console.log(groupId, carId);
    setLoading(true);
    await axios
      .put(`http://localhost:4000/api/?assignType=${groupId}&&id=${carId}`)
      .then(() => {
        apiCall();
      });
  };
  const apiCall = async () => {
    return axios.get("http://localhost:4000/api/get").then((data) => {
      const { unAssigned, QC1, QC2, QC3, QC4, houseKeeping, landSide, Rail } =
        data.data.data;
      setUnAssigned(unAssigned);
      setQC1(QC1);
      setQC2(QC2);
      setQC3(QC3);
      setQC4(QC4);
      setLandSide(landSide);
      setHouseKeeping(houseKeeping);
      setRail(Rail);
      setLoading(false);
    });
  };
  useEffect(() => {
    apiCall();
  }, []);
  return (
    <div>
      {/* <button onClick={groupDetials()}> test</button> */}
      <Navbar/>
      {/* <!-- Modal --> */}
      <LoadingOverlay
        active={loading}
        spinner={true}
        text="Loading your content..."
      >
        {/* <p>Some content or children or something.</p> */}
        <div>
          <div
            class="modal fade"
            id="exampleModal"
            tabindex="-1"
            role="dialog"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h4 class="modal-title" id="exampleModalLabel" style={{color:"rgb(223, 77, 9)"}}>
                    Change Group
                  </h4>

                  <button
                    type="button"
                    class="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  <h5>Kindly select group you want to Assign it to.</h5>
                  <select
                    className="pr-5 pl-5 mr-5 ml-5 mt-3 mb-3 pt-1 pb-1"
                    style={{paddingTop: "0.2rem", paddingBottom:"0.2rem", paddingLeft: "0.4rem", paddingRight: "0.4rem"}}
                    onChange={(e) => {
                      setgroupId(e.target.value);
                    }}
                  >
                    <option>Choose a Group</option>
                    <option value="0">Unassigned</option>
                    <option value="1">QC1</option>
                    <option value="2">QC2</option>
                    <option value="3">QC3</option>
                    <option value="4">QC4</option>
                    <option value="5">landSide</option>
                    <option value="6">houseKeeping</option>
                    <option value="7">Rail</option>
                  </select>
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-danger"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    class="btn btn-success"
                    data-dismiss="modal"
                    onClick={() => changeGroup()}
                  >
                    Save changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="parent_card">
            <div class="card_wrapper">
              {/* <!-- One card --> */}
              <div class="card_margin">
                <div class="full_card bg-dark" >
                  <div class="heading">Unassigned</div>
                  <div class="body_wrapper">
                    {unAssigned.length > 0 &&
                      unAssigned.map((item) => (
                        <div>
                          <div class="item text-center">
                            {item.objectName}
                            <br></br>
                            <button
                              type="button"
                              class="btn btn-outline-secondary"
                              data-toggle="modal"
                              data-target="#exampleModal"
                              onClick={() => {
                                setcarId(item.id);
                              }}
                            >
                              Assign
                            </button>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>

              <div class="card_margin">
                <div class="full_card bg-dark">
                  <div class="heading">QC1</div>
                  <div class="body_wrapper">
                    {QC1.length > 0 &&
                      QC1.map((item) => (
                        <div class="item">
                          {item.objectName}
                          <br></br>
                            <button
                              type="button"
                              class="btn btn-outline-secondary"
                              data-toggle="modal"
                              data-target="#exampleModal"
                              onClick={() => {
                                setcarId(item.id);
                              }}
                            >
                              Assign
                            </button>
                          {/* test data */}
                        </div>
                      ))}
                  </div>
                </div>
              </div>

              <div class="card_margin">
                <div class="full_card bg-dark">
                  <div class="heading">QC2</div>
                  <div class="body_wrapper">
                    {QC2.length > 0 &&
                      QC2.map((item) => (
                        <div class="item">
                          {item.objectName}
                          <br></br>
                            <button
                              type="button"
                              class="btn btn-outline-secondary"
                              data-toggle="modal"
                              data-target="#exampleModal"
                              onClick={() => {
                                setcarId(item.id);
                              }}
                            >
                              Assign
                            </button>
                          {/* test data */}
                        </div>
                      ))}
                  </div>
                </div>
              </div>

              <div class="card_margin">
                <div class="full_card bg-dark">
                  <div class="heading">QC3</div>
                  <div class="body_wrapper">
                    {QC3.length > 0 &&
                      QC3.map((item) => (
                        <div class="item">
                          {item.objectName}
                          <br></br>
                            <button
                              type="button"
                              class="btn btn-outline-secondary"
                              data-toggle="modal"
                              data-target="#exampleModal"
                              onClick={() => {
                                setcarId(item.id);
                              }}
                            >
                              Assign
                            </button>
                          {/* test data */}
                        </div>
                      ))}
                  </div>
                </div>
              </div>

              <div class="card_margin">
                <div class="full_card bg-dark">
                  <div class="heading">QC4</div>
                  <div class="body_wrapper">
                    {QC4.length > 0 &&
                      QC4.map((item) => (
                        <div class="item">
                          {item.objectName}
                          <br></br>
                            <button
                              type="button"
                              class="btn btn-outline-secondary"
                              data-toggle="modal"
                              data-target="#exampleModal"
                              onClick={() => {
                                setcarId(item.id);
                              }}
                            >
                              Assign
                            </button>
                          {/* test data */}
                        </div>
                      ))}
                  </div>
                </div>
              </div>

              <div class="card_margin">
                <div class="full_card bg-dark">
                  <div class="heading">Land Side</div>
                  <div class="body_wrapper">
                    {landSide.length > 0 &&
                      landSide.map((item) => (
                        <div class="item">
                          {item.objectName}
                          <br></br>
                            <button
                              type="button"
                              class="btn btn-outline-secondary"
                              data-toggle="modal"
                              data-target="#exampleModal"
                              onClick={() => {
                                setcarId(item.id);
                              }}
                            >
                              Assign
                            </button>
                          {/* test data */}
                        </div>
                      ))}
                  </div>
                </div>
              </div>

              <div class="card_margin">
                <div class="full_card bg-dark" >
                  <div class="heading">House Keeping</div>
                  <div class="body_wrapper">
                    {houseKeeping.length > 0 &&
                      houseKeeping.map((item) => (
                        <div class="item">
                          {item.objectName}
                          <br></br>
                            <button
                              type="button"
                              class="btn btn-outline-secondary"
                              data-toggle="modal"
                              data-target="#exampleModal"
                              onClick={() => {
                                setcarId(item.id);
                              }}
                            >
                              Assign
                            </button>
                          {/* test data */}
                        </div>
                      ))}
                  </div>
                </div>
              </div>

              <div class="card_margin">
                <div class="full_card bg-dark">
                  <div class="heading">Rail</div>
                  <div class="body_wrapper">
                    {Rail.length > 0 &&
                      Rail.map((item) => (
                        <div class="item">
                          {item.objectName}
                          <br></br>
                            <button
                              type="button"
                              class="btn btn-outline-secondary"
                              data-toggle="modal"
                              data-target="#exampleModal"
                              onClick={() => {
                                setcarId(item.id);
                              }}
                            >
                              Assign
                            </button>
                          {/* test data */}
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LoadingOverlay>
    </div>
  );
}

export default MainPage;
