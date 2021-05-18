import React, { useState, useEffect, useCallback } from "react";
import "./mainPage.css";
import axios from "axios";

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
  const changeGroup = useCallback(async () => {
    console.log(groupId, carId);
    let removedItem = unAssigned.find((obj) => {
      return obj.id === carId;
    });
    setUnAssigned(unAssigned.filter((item) => item.id !== carId));

    if (groupId === "1") {
      setQC1(...QC1, removedItem);
    } else if (groupId === "2") {
      setQC2(...QC2, removedItem);
    } else if (groupId === "3") {
      setQC3(...QC3, removedItem);
    } else if (groupId === "4") {
      setQC4(...QC4, removedItem);
    } else if (groupId === "5") {
      setLandSide(...landSide, removedItem);
    } else if (groupId === "6") {
      setHouseKeeping(...houseKeeping, removedItem);
    } else if (groupId === "7") {
      setRail(...Rail, removedItem);
    }
    await axios.put(
      `http://localhost:4000/api/?assignType=${groupId}&&id=${carId}`
    );

    // console.log(data.data)
    //  if(data.data)
  },[]);
  useEffect(() => {
    async function apiCall() {
      let data = await axios.get("http://localhost:4000/api/get");
      console.log("data is ", data.data.data.unAssigned);
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
    }
    apiCall();
  }, []);
  return (
    <div>
      {/* <button onClick={groupDetials()}> test</button> */}
      <nav class="navbar navbar-expand-sm bg-primary navbar- sticky-top">
        <div className="justify-content-center">
        <p className="navbar-brand strong">Ops360</p>
        </div>
        <p className="navbar-brand justify-content-end">Home</p>
      </nav>
      {/* <!-- Modal --> */}
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
              <h5 class="modal-title" id="exampleModalLabel">
                Change Group
              </h5>

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
              <p>kindly select group you want to Assign it to.</p>
              <select
                className=""
                onChange={(e) => {
                  setgroupId(e.target.value);
                }}
              >
                <option>Choose a Group</option>
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
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                class="btn btn-primary"
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
            <div class="full_card">
              <div class="heading">Unassigned</div>
              <div class="body_wrapper">
                {unAssigned.length > 0 &&
                  unAssigned.map((item) => (
                    <div>
                      <div class="item">
                        {item.objectName}
                        {item.id}
                        <button
                          type="button"
                          class="btn btn-primary btn-sm"
                          data-toggle="modal"
                          data-target="#exampleModal"
                          onClick={() => {
                            setcarId(item.id);
                          }}
                        >
                          assign
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          <div class="card_margin">
            <div class="full_card">
              <div class="heading">QC1</div>
              <div class="body_wrapper">
                {QC1.length > 0 &&
                  QC1.map((item) => (
                    <div class="item">
                      {item.objectName}
                      {/* test data */}
                    </div>
                  ))}
              </div>
            </div>
          </div>

          <div class="card_margin">
            <div class="full_card">
              <div class="heading">QC2</div>
              <div class="body_wrapper">
                {QC2.length > 0 &&
                  QC2.map((item) => (
                    <div class="item">
                      {item.objectName}
                      {/* test data */}
                    </div>
                  ))}
              </div>
            </div>
          </div>

          <div class="card_margin">
            <div class="full_card">
              <div class="heading">QC3</div>
              <div class="body_wrapper">
                {QC3.length > 0 &&
                  QC3.map((item) => (
                    <div class="item">
                      {item.objectName}
                      {/* test data */}
                    </div>
                  ))}
              </div>
            </div>
          </div>

          <div class="card_margin">
            <div class="full_card">
              <div class="heading">QC4</div>
              <div class="body_wrapper">
                {QC4.length > 0 &&
                  QC4.map((item) => (
                    <div class="item">
                      {item.objectName}
                      {/* test data */}
                    </div>
                  ))}
              </div>
            </div>
          </div>

          <div class="card_margin">
            <div class="full_card">
              <div class="heading">Land Side</div>
              <div class="body_wrapper">
                {landSide.length > 0 &&
                  landSide.map((item) => (
                    <div class="item">
                      {item.objectName}
                      {/* test data */}
                    </div>
                  ))}
              </div>
            </div>
          </div>

          <div class="card_margin">
            <div class="full_card">
              <div class="heading">House Keeping</div>
              <div class="body_wrapper">
                {houseKeeping.length > 0 &&
                  houseKeeping.map((item) => (
                    <div class="item">
                      {item.objectName}
                      {/* test data */}
                    </div>
                  ))}
              </div>
            </div>
          </div>

          <div class="card_margin">
            <div class="full_card">
              <div class="heading">Rail</div>
              <div class="body_wrapper">
                {Rail.length > 0 &&
                  Rail.map((item) => (
                    <div class="item">
                      {item.objectName}
                      {/* test data */}
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
