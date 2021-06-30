var express = require("express");
var router = express.Router();
var objectModel = require("../models/objects");
var request = require("request");
var xml2js = require("xml2js");
var moment = require("moment");

router.get("/get", async function (req, res, next) {
  try {
    let allData = await objectModel.find({}).lean();
    let unAssigned = allData.filter((item) => {
      return item.assignType === 0;
    });
    let QC1 = allData.filter((item) => {
      return item.assignType === 1;
    });
    let QC2 = allData.filter((item) => {
      return item.assignType === 2;
    });
    let QC3 = allData.filter((item) => {
      return item.assignType === 3;
    });
    let QC4 = allData.filter((item) => {
      return item.assignType === 4;
    });
    let landSide = allData.filter((item) => {
      return item.assignType === 5;
    });
    let houseKeeping = allData.filter((item) => {
      return item.assignType === 6;
    });
    let Rail = allData.filter((item) => {
      return item.assignType === 7;
    });

    return res.json({
      status: 0,
      message: "Object data is fetched Successfully.",
      data: {
        unAssigned,
        QC1,
        QC2,
        QC3,
        QC4,
        landSide,
        houseKeeping,
        Rail,
      },
    });
  } catch (err) {
    res.json({
      status: 1,
      message: "Internal Server Error",
      data: [],
    });
  }
});
/* update  group. */
router.put("/", async function (req, res, next) {
  try {
    let assignType = parseInt(req.query.assignType) || 0;
    let id = req.query.id || 0;
    let unAssigned = await objectModel.findOneAndUpdate({
      id: id,
    }, {
      assignType: assignType,
    });
    console.log(unAssigned);
    if (unAssigned) {
      console.log("updated");
    }
    return res.json({
      status: 0,
      message: "Group is chnaged Successfully.",
      data: [],
    });
  } catch (err) {
    console.log(err);
    res.json({
      status: 1,
      message: "Internal Server Error",
      data: [err],
    });
  }
});
router.get("/detials", async function (req, res, next) {
  try {
    var auth =
      "Basic " + Buffer.from("n4api" + ":" + "Lookitup1").toString("base64");
    // var header = { Host: "www.example.com", Authorization: auth };
    let assignType = req.query.assignType || null;
    let startDate = req.query.startDate || "2021-05-10T01:32";
    let endDate = req.query.endDate || "2022-05-10T01:32";
    console.log("before conversion ", startDate);
    var startDateCov = moment(startDate).format("DD-MM-YY HH:mm");
    var endDateCov = moment(endDate).format("DD-MM-YY HH:mm ");
    console.log("here is the time after conversion", startDateCov, endDateCov);

    let id_filters = await objectModel
      .find({
        assignType: assignType,
      })
      .select(["id", "objectName"]);
    let id_filter = [],
      objectName = [],
      indexs = -1,
      timeFilter = [],
      filtered_obj = [];
    let objectCount = [];
    var arrOfObj = [];
    id_filters.map((item) => {
      objectName = [...objectName, item.objectName];
      id_filter = [...id_filter, `${item.id}`];
      let myArray = item.objectName.split(/(\d+)/).filter(Boolean)
      var dataaa = myArray[1] + myArray[3]
      filtered_obj = [...filtered_obj, dataaa];
    });
    console.log("working till now");
    request({
        uri: "http://10.0.4.21:10080/apex/api/query?filtername=MH&operatorId=CDM&complexId=BEIRA&facilityId=BEIRA&yardId=BEIRA",
        headers: {
          Authorization: auth,
        },
      },
      function (error, response, body) {
        if (!error && response.statusCode === 200) {
          let data = body;
          let parser = new xml2js.Parser();
          parser.parseString(data, function (err, result) {
            let count = 0,
              receivalCount = [],
              dischargeCount = [],
              loadCount = [];

            let rows = result["query-response"]["data-table"][0]["rows"][0];

            timeFilter = rows["row"].filter((items) => {
              return (
                moment(items.field[0], "DD-MM-YY HH:mm").valueOf() >=
                moment(startDateCov, "DD-MM-YY HH:mm").valueOf() &&
                moment(items.field[0], "DD-MM-YY HH:mm").valueOf() <=
                moment(endDateCov, "DD-MM-YY HH:mm").valueOf()
              );
            });
            console.log(timeFilter.length);
            console.log(timeFilter.length);
            console.log(timeFilter.length);
            console.log("*********************************************");
            if (timeFilter.length != 0) {
              filtered_obj.map((item) => {
                if (item.startsWith(4)) {
                  deliveryCount = timeFilter.filter((items) => {
                    return (
                      items.field[5] == item && items.field[1] === "Delivery"
                    );
                  });
                  receivalCount = timeFilter.filter((items) => {
                    return (
                      items.field[7] == item && items.field[1] === "Receival"
                    );
                  });
                  dischargeCount = timeFilter.filter((items) => {
                    return (
                      items.field[7] == item && items.field[1] === "Discharge"
                    );
                  });
                  loadCount = timeFilter.filter((items) => {
                    return items.field[5] == item && items.field[1] === "Load";
                  });
                  railDischargeCount = timeFilter.filter((items) => {
                    return (
                      items.field[7] == item &&
                      items.field[1] === "Rail Discharge"
                    );
                  });
                  railLoadCount = timeFilter.filter((items) => {
                    return (
                      items.field[5] == item && items.field[1] === "Rail Load"
                    );
                  });
                } else {
                  receivalCount = timeFilter.filter((items) => {
                    return (
                      items.field[9] == item && items.field[1] === "Receival"
                    );
                  });
                  dischargeCount = timeFilter.filter((items) => {
                    return (
                      items.field[9] == item && items.field[1] === "Discharge"
                    );
                  });
                  loadCount = timeFilter.filter((items) => {
                    return items.field[9] == item && items.field[1] === "Load";
                  });
                  deliveryCount = timeFilter.filter((items) => {
                    return (
                      items.field[9] == item && items.field[1] === "Delivery"
                    );
                  });
                  railDischargeCount = timeFilter.filter((items) => {
                    return (
                      items.field[9] == item &&
                      items.field[1] === "Rail Discharge"
                    );
                  });
                  railLoadCount = timeFilter.filter((items) => {
                    return (
                      items.field[9] == item && items.field[1] === "Rail Load"
                    );
                  });
                }
                yardMove = timeFilter.filter((items) => {
                  return (
                    items.field[7] == item && items.field[1] === "Yard Move"
                  );
                });
                yardShift = timeFilter.filter((items) => {
                  return (
                    items.field[7] == item && items.field[1] === "Yard Shift"
                  );
                });
                let obj = {
                  name: item,
                  receivalCount: receivalCount.length,
                  dischargeCount: dischargeCount.length,
                  deliveryCount: deliveryCount.length,
                  railDischargeCount: railDischargeCount.length,
                  railLoadCount: railLoadCount.length,
                  loadCount: loadCount.length,
                  yardMove: yardMove.length,
                  yardShift: yardShift.length,
                  totalMoves: receivalCount.length +
                    dischargeCount.length +
                    deliveryCount.length +
                    railDischargeCount.length +
                    railLoadCount.length +
                    loadCount.length +
                    yardMove.length +
                    yardShift.length,
                };
                objectCount = [...objectCount, obj];
              });
            }
          });

          if (timeFilter.length > 0) {
            // return ;
            request({
                uri: "https://fleetapi.geeksapi.app/api/statisticsByPeriod?api_token=01a7e2aa1e56ab03c56b7f2aa0580e5af63958fcdaa0a1e7e59ce14803f2&timeBegin=1615006800&timeEnd=1615050000&objectType=0&aggregate=0",
              },
              function (error, response, body) {
                if (!error && response.statusCode === 200) {
                  body = JSON.parse(body);

                  Object.keys(body.statistics).map((item) => {
                    if (id_filter.indexOf(item) !== -1) {
                      body.statistics[item].id = item;
                      id_filters.forEach(element => {
                        if(element.id == item){
                        body.statistics[item].objectName =element.objectName || '';
                        }
                      });
                      
                      var engineIdlingTime = moment.duration(
                        parseInt(body.statistics[item].engineIdlingTime),
                        "seconds"
                      );
                      body.statistics[item].engineIdlingTime =
                        engineIdlingTime.hours() +
                        ":" +
                        engineIdlingTime.minutes();
                      var engineOperationTime = moment.duration(
                        parseInt(body.statistics[item].engineOperationTime),
                        "seconds"
                      );
                      body.statistics[item].engineOperationTime =
                        engineOperationTime.hours() +
                        ":" +
                        engineOperationTime.minutes();
                      // body.statistics[item].objectName =
                      //   objectName[indexs + 1] || 0;
                      indexs++;
                      arrOfObj = [...arrOfObj, body.statistics[item]];
                    }
                  });
                  arrOfObj.map((item) => {
                    let myArray = item.objectName.split(/(\d+)/).filter(Boolean)
                    var dataaa = myArray[1] + myArray[3]
                    objectCount.map((items) => {
                      if (items.name == dataaa) {
                        item.Delivery = items.deliveryCount;
                        item.Receival = items.receivalCount;
                        item.Discharge = items.dischargeCount;
                        item.Load = items.loadCount;
                        item.railDischarge = items.railDischargeCount || 0;
                        item.RailLoad = items.railLoadCount || 0;
                        item.yardMove = items.yardMove || 0;
                        item.yardShift = items.yardShift || 0;
                        item.totalMoves = items.totalMoves || 0;
                      }
                    });
                  });
                  return res.json({
                    status: 0,
                    message: "Object details is fetched Successfully.",
                    data: {
                      arrOfObj,
                    },
                  });
                } else {
                  res.json(error);
                }
              }
            );
          } else {
            res.json({
              status: 0,
              message: "Object details is fetched Successfully.",
              data: {
                arrOfObj,
              },
            });
          }
        }
      }
    );
  } catch (err) {
    console.log(err);
    res.json({
      status: 1,
      message: "Internal Server Error",
      data: [err],
    });
  }
});
router.get("/map", async function (req, res, next) {
  try {
    let assignType = req.query.assignType || null;
    let id_filters = await objectModel
      .find({
        assignType: assignType,
      })
      .select(["id", "objectName"]);
    let mapArry = [];
    let count = 1;
    id_filters.map((item, index) => {
      request({
          uri: `https://fleetapi.geeksapi.app/api/currentObjectState?api_token=01a7e2aa1e56ab03c56b7f2aa0580e5af63958fcdaa0a1e7e59ce14803f2&objectId=${item.id}`,
        },
        function (error, response, body) {
          if (!error && response.statusCode === 200) {
            body = JSON.parse(body);
            body.objectName = item.objectName;
            mapArry = [...mapArry, body];

            if (count === id_filters.length) {
              res.json({
                status: 1,
                message: "map data is fetched successfuly",
                data: mapArry,
              });
            }
            count++;
          }
        }
      ); // end of request
    });
  } catch (err) {
    console.log(err);
    res.json({
      status: 1,
      message: "Internal Server Error",
      data: [err],
    });
  }
});

module.exports = router;