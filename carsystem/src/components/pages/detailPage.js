import React, { Component } from "react";
import MapContainer from "./mapPage";
import TableContect from "./detailTable";
import Navbar from "./navbar";

class detailPage extends Component {
  state = {
    groupId: 0,
    groupName: "Choose a Group.",
    startdate: "",
    startdateFinal: "",
    endDate: "",
  };
 
  render() {
    return (
      <div>
        <Navbar />
        <div>
          <MapContainer groupId={this.state.groupId} />
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            flexWrap: "wrap",
            marginBottom: "3rem",
            marginTop: "3rem",
          }}
        >
          <div class="btn-group mt-2 mr-1">
          <label className='sr-only'>Select End Time</label><br></br>
            <input
              class="btn btn-secondary btn-lg"
              type="input"
              value={this.state.groupName}
              readOnly
              style={{ color: "white" }}
            />

            <button
              type="button"
              class="btn btn-lg btn-secondary dropdown-toggle dropdown-toggle-split"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <span class="sr-only">Toggle Dropdown</span>
            </button>
            <div
              class="dropdown-menu text-center"
              style={{
                padding: "0.3rem",
                cursor: "pointer",
                marginLeft: "0.2rem",
                minWidth: "240px",
                marginBottom: "5rem",
              }}
            >
              <option
                onClick={() => {
                  this.setState({
                    groupId: 1,
                    groupName: "QC1",
                  });
                }}
                value="1"
                style={{ fontSize: "18px", padding: "0.2rem" }}
              >
                QC1
              </option>
              <hr
                style={{
                  width: "100%",
                  height: "2px",
                  color: "black",
                  padding: "0px",
                  marginTop: "3px",
                  marginBottom: "3px",
                }}
              ></hr>
              <option
                onClick={() => {
                  this.setState({
                    groupId: 2,
                    groupName: "QC2",
                  });
                }}
                value="2"
                style={{ fontSize: "18px", padding: "0.2rem" }}
              >
                QC2
              </option>
              <hr
                style={{
                  width: "100%",
                  height: "2px",
                  color: "black",
                  padding: "0px",
                  marginTop: "3px",
                  marginBottom: "3px",
                }}
              ></hr>
              <option
                onClick={() => {
                  this.setState({
                    groupId: 3,
                    groupName: "QC3",
                  });
                }}
                value="3"
                style={{ fontSize: "18px", padding: "0.2rem" }}
              >
                QC3
              </option>
              <hr
                style={{
                  width: "100%",
                  height: "2px",
                  color: "black",
                  padding: "0px",
                  marginTop: "3px",
                  marginBottom: "3px",
                }}
              ></hr>
              <option
                onClick={() => {
                  this.setState({
                    groupId: 4,
                    groupName: "QC4",
                  });
                }}
                value="4"
                style={{ fontSize: "18px", padding: "0.2rem" }}
              >
                QC4
              </option>
              <hr
                style={{
                  width: "100%",
                  height: "2px",
                  color: "black",
                  padding: "0px",
                  marginTop: "3px",
                  marginBottom: "3px",
                }}
              ></hr>
              <option
                onClick={() => {
                  this.setState({
                    groupId: 5,
                    groupName: "landSide",
                  });
                }}
                value="5"
                style={{ fontSize: "18px", padding: "0.2rem" }}
              >
                landSide
              </option>
              <hr
                style={{
                  width: "100%",
                  height: "2px",
                  color: "black",
                  padding: "0",
                  marginTop: "3px",
                  marginBottom: "3px",
                }}
              ></hr>
              <option
                onClick={() => {
                  this.setState({
                    groupId: 6,
                    groupName: "houseKeeping",
                  });
                }}
                value="6"
                style={{ fontSize: "18px", padding: "0.2rem" }}
              >
                houseKeeping
              </option>
              <hr
                style={{
                  width: "100%",
                  height: "2px",
                  color: "black",
                  padding: "0",
                  marginTop: "3px",
                  marginBottom: "3px",
                }}
              ></hr>
              <option
                onClick={() => {
                  this.setState({
                    groupId: 7,
                    groupName: "Rail",
                  });
                }}
                value="7"
                style={{ fontSize: "18px", padding: "0.2rem" }}
              >
                Rail
              </option>
            </div>
          </div>
          <div class="btn-group mt-2 mr-1">
           <label className='text-center'>Select Start Time</label><br></br>
            <input
              class="btn btn-secondary btn-lg"
              type="datetime-local"
              placeholder="Choose a group."
              // readOnly
              style={{ color: "white" }}
              onChange={(e)=>{
                this.setState({
                  startdate : e.target.value
                })
              }}
            />
          
          </div>
         
          <div class="btn-group mt-2 mr-1">
           <label className='text-center'>Select End Time</label><br></br>
            <input
              class="btn btn-secondary btn-lg"
              type="datetime-local"
              placeholder="Choose a group."
              // readOnly
             onChange={(e)=>{
               if(this.state.startdate === ""){
                 alert("Please pick start date first")
               }else{
               this.setState({
                 startdateFinal : this.state.startdate,
                 endDate: e.target.value
               })
             }}
            }
              style={{ color: "white" }}
            />
          
          </div>
         
        </div>
        <div>
          <TableContect groupId={this.state.groupId} startDate= {this.state.startdateFinal} endDate={this.state.endDate}/>
        </div>
      </div>
    );
  }
}

export default detailPage;
