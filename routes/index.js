var express = require('express');
var router = express.Router();
var objectModel = require('../models/objects')
var request = require('request');
var xml2js = require('xml2js')
/* save Object data. */
router.post('/add', async function (req, res, next) {
  try {
    // const {
    //   garageNumber,
    //   id,
    //   mnfID,
    //   objectName,
    //   objectType,
    //   phone,
    //   groupList
    // } = req.body;
    // console.log(req.body)
    // return res.send(req.body)
    await objectModel.insertMany(req.body)

    return res.json({
      status: 0,
      message: "Object data is saved Successfully.",
      data: []
    })
  } catch (err) {
    res.json({
      status: 1,
      message: "Internal Server Error",
      data: []
    })
  }
});
/* get Object data. */
router.get('/get', async function (req, res, next) {
  try {
    let allData = await objectModel.find({}).lean();
    let unAssigned = allData.filter((item) => {
      return item.assignType === 0
    });
    let QC1 = allData.filter((item) => {
      return item.assignType === 1
    });
    let QC2 = allData.filter((item) => {
      return item.assignType === 2
    });
    let QC3 = allData.filter((item) => {
      return item.assignType === 3
    });
    let QC4 = allData.filter((item) => {
      return item.assignType === 4
    });
    let landSide = allData.filter((item) => {
      return item.assignType === 5
    });
    let houseKeeping = allData.filter((item) => {
      return item.assignType === 6
    });
    let Rail = allData.filter((item) => {
      return item.assignType === 7
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
        Rail
      }
    })
  } catch (err) {
    res.json({
      status: 1,
      message: "Internal Server Error",
      data: []
    })
  }
});
/* update  group. */
router.put('/', async function (req, res, next) {
  try {
    let assignType = parseInt(req.query.assignType) || 0;
    let id = req.query.id || 0;
    let unAssigned = await objectModel.findOneAndUpdate({
      id: id
    }, {
      assignType: assignType
    })
    console.log(unAssigned)
    if (unAssigned) {
      console.log("updated")
    }
    return res.json({
      status: 0,
      message: "Group is chnaged Successfully.",
      data: []
    })
  } catch (err) {
    console.log(err)
    res.json({
      status: 1,
      message: "Internal Server Error",
      data: [err]
    })
  }
});
router.get('/detials', async function (req, res, next) {
  try {
    let assignType = req.query.assignType || null;
    let id_filters = await objectModel.find({
      assignType: assignType
    }).select(['id', 'objectName']);
    let id_filter = [],
      objectName = [],
      indexs = -1,
      filtered_obj = [];
    let Receival = [],
      Discharge = [],
      objName=[],
      Load = [],
      objectCount=[];
    console.log("working....", id_filters)
    id_filters.map((item) => {
      objectName = [...objectName, item.objectName]
      console.log("here is the id", item.id)
      id_filter = [...id_filter, `${item.id}`]
      var res = item.objectName.split(" ");
      var ress = res[1].split("-")
      console.log(ress[0], ress[1])
      var resss = ress[0]?ress[0] : ''
      var ressss= ress[1]? ress[1]: ''
      var dataaa= resss + ressss
      console.log(dataaa)
      filtered_obj = [...filtered_obj, dataaa]
    })
    console.log(filtered_obj)
    let data = `<?xml version="1.0" encoding="UTF-8"?>
    <query-response>
        <data-table filter="MH" count="1589">
            <columns>
                <column>Time Completed</column>
                <column>Move Kind</column>
                <column>Unit Category</column>
                <column>Unit Nbr</column>
                <column>Crane CHE Name</column>
                <column>Fetch CHE Name</column>
                <column>Fetch CHE Login Name</column>
                <column>Put CHE Name</column>
                <column>Put CHE Login Name</column>
                <column>Carry CHE Name</column>
            </columns>
            <rows>
                <row primary-key="32043326">
                    <field>11-05-21 00:00</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>MRKU7635223</field>
                    <field />
                    <field />
                    <field />
                    <field>4538</field>
                    <field>MAU</field>
                    <field />
                </row>
                <row primary-key="32043348">
                    <field>11-05-21 00:02</field>
                    <field>Receival</field>
                    <field>Storage</field>
                    <field>PCIU8709630</field>
                    <field />
                    <field />
                    <field />
                    <field>4532</field>
                    <field>FVO</field>
                    <field />
                </row>
                <row primary-key="32043381">
                    <field>11-05-21 00:04</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>MSDU7618027</field>
                    <field />
                    <field />
                    <field />
                    <field>4533</field>
                    <field>RTO</field>
                    <field />
                </row>
                <row primary-key="32043414">
                    <field>11-05-21 00:08</field>
                    <field>Receival</field>
                    <field>Storage</field>
                    <field>MNBU0256130</field>
                    <field />
                    <field />
                    <field />
                    <field>4538</field>
                    <field>MAU</field>
                    <field />
                </row>
                <row primary-key="32043423">
                    <field>11-05-21 00:09</field>
                    <field>Receival</field>
                    <field>Storage</field>
                    <field>SUDU6630259</field>
                    <field />
                    <field />
                    <field />
                    <field>4532</field>
                    <field>FVO</field>
                    <field />
                </row>
                <row primary-key="32043438">
                    <field>11-05-21 00:10</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>TGBU7731300</field>
                    <field />
                    <field />
                    <field />
                    <field>4533</field>
                    <field>RTO</field>
                    <field />
                </row>
                <row primary-key="32043464">
                    <field>11-05-21 00:12</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>TCKU1766347</field>
                    <field />
                    <field />
                    <field />
                    <field>4533</field>
                    <field>RTO</field>
                    <field />
                </row>
                <row primary-key="32043466">
                    <field>11-05-21 00:12</field>
                    <field>Receival</field>
                    <field>Storage</field>
                    <field>GESU6369921</field>
                    <field />
                    <field />
                    <field />
                    <field>4532</field>
                    <field>FVO</field>
                    <field />
                </row>
                <row primary-key="32043500">
                    <field>11-05-21 00:15</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>MSKU8592956</field>
                    <field />
                    <field>4538</field>
                    <field>MAU</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32043504">
                    <field>11-05-21 00:16</field>
                    <field>Receival</field>
                    <field>Storage</field>
                    <field>PCIU8714998</field>
                    <field />
                    <field />
                    <field />
                    <field>4532</field>
                    <field>FVO</field>
                    <field />
                </row>
                <row primary-key="32043507">
                    <field>11-05-21 00:16</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>BMOU6614585</field>
                    <field />
                    <field />
                    <field />
                    <field>4533</field>
                    <field>RTO</field>
                    <field />
                </row>
                <row primary-key="32043508">
                    <field>11-05-21 00:16</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>ZIQ9647</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32043542">
                    <field>11-05-21 00:23</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>TTNU1176760</field>
                    <field />
                    <field />
                    <field />
                    <field>4533</field>
                    <field>RTO</field>
                    <field />
                </row>
                <row primary-key="32043546">
                    <field>11-05-21 00:24</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>TCLU7333378</field>
                    <field />
                    <field />
                    <field />
                    <field>4538</field>
                    <field>MAU</field>
                    <field />
                </row>
                <row primary-key="32043561">
                    <field>11-05-21 00:25</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>DRYU2819382</field>
                    <field />
                    <field />
                    <field />
                    <field>4533</field>
                    <field>RTO</field>
                    <field />
                </row>
                <row primary-key="32043563">
                    <field>11-05-21 00:27</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>TCKU1899102</field>
                    <field />
                    <field />
                    <field />
                    <field>4533</field>
                    <field>RTO</field>
                    <field />
                </row>
                <row primary-key="32043573">
                    <field>11-05-21 00:28</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>CAIU3548659</field>
                    <field />
                    <field />
                    <field />
                    <field>4533</field>
                    <field>RTO</field>
                    <field />
                </row>
                <row primary-key="32043577">
                    <field>11-05-21 00:29</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>CMAU1577326</field>
                    <field />
                    <field />
                    <field />
                    <field>4538</field>
                    <field>MAU</field>
                    <field />
                </row>
                <row primary-key="32043579">
                    <field>11-05-21 00:29</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>TRHU1806197</field>
                    <field />
                    <field />
                    <field />
                    <field>4533</field>
                    <field>RTO</field>
                    <field />
                </row>
                <row primary-key="32043596">
                    <field>11-05-21 00:31</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>MEDU2382570</field>
                    <field />
                    <field />
                    <field />
                    <field>4533</field>
                    <field>RTO</field>
                    <field />
                </row>
                <row primary-key="32043597">
                    <field>11-05-21 00:31</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>HASU4841835</field>
                    <field />
                    <field>4531</field>
                    <field>SJP</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32043602">
                    <field>11-05-21 00:33</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>APZU3526111</field>
                    <field />
                    <field />
                    <field />
                    <field>4533</field>
                    <field>RTO</field>
                    <field />
                </row>
                <row primary-key="32043604">
                    <field>11-05-21 00:34</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>TEMU1882172</field>
                    <field />
                    <field />
                    <field />
                    <field>4533</field>
                    <field>RTO</field>
                    <field />
                </row>
                <row primary-key="32043618">
                    <field>11-05-21 00:35</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>TCLU8786430</field>
                    <field />
                    <field />
                    <field />
                    <field>4538</field>
                    <field>MAU</field>
                    <field />
                </row>
                <row primary-key="32043628">
                    <field>11-05-21 00:39</field>
                    <field>Receival</field>
                    <field>Storage</field>
                    <field>PCIU9449862</field>
                    <field />
                    <field />
                    <field />
                    <field>4532</field>
                    <field>FVO</field>
                    <field />
                </row>
                <row primary-key="32043643">
                    <field>11-05-21 00:41</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>APHU7315937</field>
                    <field />
                    <field />
                    <field />
                    <field>4538</field>
                    <field>MAU</field>
                    <field />
                </row>
                <row primary-key="32043655">
                    <field>11-05-21 00:42</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>MWCU6692977</field>
                    <field />
                    <field />
                    <field />
                    <field>4531</field>
                    <field>SJP</field>
                    <field />
                </row>
                <row primary-key="32043661">
                    <field>11-05-21 00:42</field>
                    <field>Yard Shift</field>
                    <field>Import</field>
                    <field>CMAU7790637</field>
                    <field />
                    <field>4533</field>
                    <field>RTO</field>
                    <field>4533</field>
                    <field>RTO</field>
                    <field>4533</field>
                </row>
                <row primary-key="32043695">
                    <field>11-05-21 00:45</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>PCIU8457098</field>
                    <field />
                    <field>4533</field>
                    <field>RTO</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32043707">
                    <field>11-05-21 00:49</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>CAIU7084983</field>
                    <field />
                    <field>4533</field>
                    <field>RTO</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32043728">
                    <field>11-05-21 00:50</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>PCIU8483081</field>
                    <field />
                    <field>4531</field>
                    <field>SJP</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32043756">
                    <field>11-05-21 00:52</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>SEGU6209419</field>
                    <field />
                    <field>4533</field>
                    <field>RTO</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32043758">
                    <field>11-05-21 00:53</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>PCIU8850628</field>
                    <field />
                    <field>4531</field>
                    <field>SJP</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32043786">
                    <field>11-05-21 00:55</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>AMFU3201790</field>
                    <field />
                    <field />
                    <field />
                    <field>4538</field>
                    <field>MAU</field>
                    <field />
                </row>
                <row primary-key="32043855">
                    <field>11-05-21 01:00</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>DFSU6990394</field>
                    <field />
                    <field />
                    <field />
                    <field>4533</field>
                    <field>RTO</field>
                    <field />
                </row>
                <row primary-key="32043917">
                    <field>11-05-21 01:06</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>CLHU3853312</field>
                    <field />
                    <field />
                    <field />
                    <field>4538</field>
                    <field>MAU</field>
                    <field />
                </row>
                <row primary-key="32043931">
                    <field>11-05-21 01:07</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>APHU7011662</field>
                    <field />
                    <field />
                    <field />
                    <field>4533</field>
                    <field>RTO</field>
                    <field />
                </row>
                <row primary-key="32043958">
                    <field>11-05-21 01:11</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>TRHU4929066</field>
                    <field />
                    <field />
                    <field />
                    <field>4533</field>
                    <field>RTO</field>
                    <field />
                </row>
                <row primary-key="32043960">
                    <field>11-05-21 01:12</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>TRHU1515442</field>
                    <field />
                    <field />
                    <field />
                    <field>4538</field>
                    <field>MAU</field>
                    <field />
                </row>
                <row primary-key="32043961">
                    <field>11-05-21 01:12</field>
                    <field>Receival</field>
                    <field>Storage</field>
                    <field>PCIU8736071</field>
                    <field />
                    <field />
                    <field />
                    <field>4532</field>
                    <field>FVO</field>
                    <field />
                </row>
                <row primary-key="32043972">
                    <field>11-05-21 01:14</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>ECMU2066540</field>
                    <field />
                    <field />
                    <field />
                    <field>4538</field>
                    <field>MAU</field>
                    <field />
                </row>
                <row primary-key="32043997">
                    <field>11-05-21 01:16</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>FFAU1376232</field>
                    <field />
                    <field />
                    <field />
                    <field>4538</field>
                    <field>MAU</field>
                    <field />
                </row>
                <row primary-key="32044001">
                    <field>11-05-21 01:16</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>INKU6289931</field>
                    <field />
                    <field />
                    <field />
                    <field>4533</field>
                    <field>RTO</field>
                    <field />
                </row>
                <row primary-key="32044030">
                    <field>11-05-21 01:21</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>CAIU7028017</field>
                    <field />
                    <field />
                    <field />
                    <field>4538</field>
                    <field>MAU</field>
                    <field />
                </row>
                <row primary-key="32044033">
                    <field>11-05-21 01:24</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>ECMU1495703</field>
                    <field />
                    <field />
                    <field />
                    <field>4533</field>
                    <field>RTO</field>
                    <field />
                </row>
                <row primary-key="32044050">
                    <field>11-05-21 01:26</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>BMOU5486089</field>
                    <field />
                    <field />
                    <field />
                    <field>4533</field>
                    <field>RTO</field>
                    <field />
                </row>
                <row primary-key="32044059">
                    <field>11-05-21 01:26</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>CMAU3050545</field>
                    <field />
                    <field />
                    <field />
                    <field>4533</field>
                    <field>RTO</field>
                    <field />
                </row>
                <row primary-key="32044085">
                    <field>11-05-21 01:29</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>FSCU7138752</field>
                    <field />
                    <field />
                    <field />
                    <field>4531</field>
                    <field>SJP</field>
                    <field />
                </row>
                <row primary-key="32044115">
                    <field>11-05-21 01:31</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>TEMU2593019</field>
                    <field />
                    <field />
                    <field />
                    <field>4533</field>
                    <field>RTO</field>
                    <field />
                </row>
                <row primary-key="32044118">
                    <field>11-05-21 01:32</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>PCIU8668320</field>
                    <field />
                    <field>4532</field>
                    <field>FVO</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32044120">
                    <field>11-05-21 01:33</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>SGCU2213425</field>
                    <field />
                    <field />
                    <field />
                    <field>4533</field>
                    <field>RTO</field>
                    <field />
                </row>
                <row primary-key="32044123">
                    <field>11-05-21 01:34</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>FCIU6226274</field>
                    <field />
                    <field />
                    <field />
                    <field>4533</field>
                    <field>RTO</field>
                    <field />
                </row>
                <row primary-key="32044147">
                    <field>11-05-21 01:36</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>APZU3413368</field>
                    <field />
                    <field />
                    <field />
                    <field>4533</field>
                    <field>RTO</field>
                    <field />
                </row>
                <row primary-key="32044149">
                    <field>11-05-21 01:37</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>TRHU3584186</field>
                    <field />
                    <field />
                    <field />
                    <field>4533</field>
                    <field>RTO</field>
                    <field />
                </row>
                <row primary-key="32044194">
                    <field>11-05-21 01:41</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>MEDU6913083</field>
                    <field />
                    <field />
                    <field />
                    <field>4532</field>
                    <field>FVO</field>
                    <field />
                </row>
                <row primary-key="32044206">
                    <field>11-05-21 01:42</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>ECMU1557908</field>
                    <field />
                    <field />
                    <field />
                    <field>4533</field>
                    <field>RTO</field>
                    <field />
                </row>
                <row primary-key="32044211">
                    <field>11-05-21 01:43</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>FCIU3337314</field>
                    <field />
                    <field />
                    <field />
                    <field>4533</field>
                    <field>RTO</field>
                    <field />
                </row>
                <row primary-key="32044233">
                    <field>11-05-21 01:46</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>MRKU7012753</field>
                    <field />
                    <field />
                    <field />
                    <field>4532</field>
                    <field>FVO</field>
                    <field />
                </row>
                <row primary-key="32044235">
                    <field>11-05-21 01:47</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>XINU1452665</field>
                    <field />
                    <field />
                    <field />
                    <field>4533</field>
                    <field>RTO</field>
                    <field />
                </row>
                <row primary-key="32044239">
                    <field>11-05-21 01:48</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>APZU3752485</field>
                    <field />
                    <field />
                    <field />
                    <field>4533</field>
                    <field>RTO</field>
                    <field />
                </row>
                <row primary-key="32044254">
                    <field>11-05-21 01:51</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>MSKU3609038</field>
                    <field />
                    <field />
                    <field />
                    <field>4532</field>
                    <field>FVO</field>
                    <field />
                </row>
                <row primary-key="32044256">
                    <field>11-05-21 01:52</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>TCLU9505861</field>
                    <field />
                    <field />
                    <field />
                    <field>4531</field>
                    <field>SJP</field>
                    <field />
                </row>
                <row primary-key="32044271">
                    <field>11-05-21 01:56</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>TGBU9313681</field>
                    <field />
                    <field />
                    <field />
                    <field>4532</field>
                    <field>FVO</field>
                    <field />
                </row>
                <row primary-key="32044273">
                    <field>11-05-21 01:56</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>SUDU7659690</field>
                    <field />
                    <field />
                    <field />
                    <field>4533</field>
                    <field>RTO</field>
                    <field />
                </row>
                <row primary-key="32044294">
                    <field>11-05-21 02:01</field>
                    <field>Yard Shift</field>
                    <field>Import</field>
                    <field>PCIU8539914</field>
                    <field />
                    <field>4533</field>
                    <field>RTO</field>
                    <field>4533</field>
                    <field>RTO</field>
                    <field>4533</field>
                </row>
                <row primary-key="32044295">
                    <field>11-05-21 02:02</field>
                    <field>Yard Shift</field>
                    <field>Import</field>
                    <field>PCIU9514973</field>
                    <field />
                    <field>4533</field>
                    <field>RTO</field>
                    <field>4533</field>
                    <field>RTO</field>
                    <field>4533</field>
                </row>
                <row primary-key="32044296">
                    <field>11-05-21 02:02</field>
                    <field>Yard Shift</field>
                    <field>Import</field>
                    <field>MSKU8784769</field>
                    <field />
                    <field>4533</field>
                    <field>RTO</field>
                    <field>4533</field>
                    <field>RTO</field>
                    <field>4533</field>
                </row>
                <row primary-key="32044297">
                    <field>11-05-21 02:02</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>TGHU9042323</field>
                    <field />
                    <field>4533</field>
                    <field>RTO</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32044314">
                    <field>11-05-21 02:09</field>
                    <field>Yard Shift</field>
                    <field>Import</field>
                    <field>BSIU9869559</field>
                    <field />
                    <field>4533</field>
                    <field>RTO</field>
                    <field>4533</field>
                    <field>RTO</field>
                    <field>4533</field>
                </row>
                <row primary-key="32044328">
                    <field>11-05-21 02:10</field>
                    <field>Yard Shift</field>
                    <field>Import</field>
                    <field>TRLU7644595</field>
                    <field />
                    <field>4533</field>
                    <field>RTO</field>
                    <field>4533</field>
                    <field>RTO</field>
                    <field>4533</field>
                </row>
                <row primary-key="32044329">
                    <field>11-05-21 02:12</field>
                    <field>Yard Shift</field>
                    <field>Import</field>
                    <field>CMAU9102672</field>
                    <field />
                    <field>4533</field>
                    <field>RTO</field>
                    <field>4533</field>
                    <field>RTO</field>
                    <field>4533</field>
                </row>
                <row primary-key="32044334">
                    <field>11-05-21 02:14</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>CMAU4601386</field>
                    <field />
                    <field>4533</field>
                    <field>RTO</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32044362">
                    <field>11-05-21 02:21</field>
                    <field>Receival</field>
                    <field>Storage</field>
                    <field>PCIU8699363</field>
                    <field />
                    <field />
                    <field />
                    <field>4533</field>
                    <field>RTO</field>
                    <field />
                </row>
                <row primary-key="32044376">
                    <field>11-05-21 02:25</field>
                    <field>Receival</field>
                    <field>Storage</field>
                    <field>PCIU9495214</field>
                    <field />
                    <field />
                    <field />
                    <field>4533</field>
                    <field>RTO</field>
                    <field />
                </row>
                <row primary-key="32044381">
                    <field>11-05-21 02:27</field>
                    <field>Receival</field>
                    <field>Storage</field>
                    <field>PCIU8726535</field>
                    <field />
                    <field />
                    <field />
                    <field>4533</field>
                    <field>RTO</field>
                    <field />
                </row>
                <row primary-key="32044382">
                    <field>11-05-21 02:29</field>
                    <field>Receival</field>
                    <field>Storage</field>
                    <field>APHU4680685</field>
                    <field />
                    <field />
                    <field />
                    <field>4533</field>
                    <field>RTO</field>
                    <field />
                </row>
                <row primary-key="32044401">
                    <field>11-05-21 02:34</field>
                    <field>Receival</field>
                    <field>Storage</field>
                    <field>PCIU8714513</field>
                    <field />
                    <field />
                    <field />
                    <field>4533</field>
                    <field>RTO</field>
                    <field />
                </row>
                <row primary-key="32044403">
                    <field>11-05-21 02:34</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>ZIQ9642</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32044418">
                    <field>11-05-21 02:35</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>ZIQ9598</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32044420">
                    <field>11-05-21 02:35</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>ZIQ9610</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32044435">
                    <field>11-05-21 02:42</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>PCIU9435787</field>
                    <field />
                    <field>4533</field>
                    <field>RTO</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32044450">
                    <field>11-05-21 02:45</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>GESU6625643</field>
                    <field />
                    <field />
                    <field />
                    <field>4532</field>
                    <field>FVO</field>
                    <field />
                </row>
                <row primary-key="32044452">
                    <field>11-05-21 02:48</field>
                    <field>Yard Shift</field>
                    <field>Import</field>
                    <field>PCIU9176177</field>
                    <field />
                    <field>4533</field>
                    <field>RTO</field>
                    <field>4533</field>
                    <field>RTO</field>
                    <field>4533</field>
                </row>
                <row primary-key="32044453">
                    <field>11-05-21 02:49</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>PCIU8564239</field>
                    <field />
                    <field>4531</field>
                    <field>SJP</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32044468">
                    <field>11-05-21 02:50</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>BMOU4384713</field>
                    <field />
                    <field>4533</field>
                    <field>RTO</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32044617">
                    <field>11-05-21 03:30</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>FBIU0298172</field>
                    <field />
                    <field />
                    <field />
                    <field>4531</field>
                    <field>SJP</field>
                    <field />
                </row>
                <row primary-key="32044619">
                    <field>11-05-21 03:33</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>MEDU1380079</field>
                    <field />
                    <field />
                    <field />
                    <field>4531</field>
                    <field>SJP</field>
                    <field />
                </row>
                <row primary-key="32044849">
                    <field>11-05-21 04:58</field>
                    <field>Yard Move</field>
                    <field>Export</field>
                    <field>ZIQ9640</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32044850">
                    <field>11-05-21 04:59</field>
                    <field>Yard Move</field>
                    <field>Export</field>
                    <field>ZIQ9598</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32044864">
                    <field>11-05-21 05:00</field>
                    <field>Yard Move</field>
                    <field>Export</field>
                    <field>ZIQ9642</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32044891">
                    <field>11-05-21 05:11</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>MRKU4487523</field>
                    <field />
                    <field>4531</field>
                    <field>SJP</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32044988">
                    <field>11-05-21 05:44</field>
                    <field>Delivery</field>
                    <field>Storage</field>
                    <field>GESU1160820</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32044991">
                    <field>11-05-21 05:44</field>
                    <field>Delivery</field>
                    <field>Storage</field>
                    <field>GESU1272625</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32045099">
                    <field>11-05-21 06:17</field>
                    <field>Yard Shift</field>
                    <field>Import</field>
                    <field>PCIU8513329</field>
                    <field />
                    <field>4532</field>
                    <field>FVO</field>
                    <field>4532</field>
                    <field>FVO</field>
                    <field>4532</field>
                </row>
                <row primary-key="32045102">
                    <field>11-05-21 06:19</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>PCIU9081132</field>
                    <field />
                    <field>4532</field>
                    <field>FVO</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32045125">
                    <field>11-05-21 06:20</field>
                    <field>Yard Shift</field>
                    <field>Import</field>
                    <field>MRKU6283175</field>
                    <field />
                    <field>4533</field>
                    <field>RTO</field>
                    <field>4533</field>
                    <field>RTO</field>
                    <field>4533</field>
                </row>
                <row primary-key="32045126">
                    <field>11-05-21 06:21</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>HASU5105802</field>
                    <field />
                    <field>4533</field>
                    <field>RTO</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32045128">
                    <field>11-05-21 06:23</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>MRKU5912885</field>
                    <field />
                    <field>4531</field>
                    <field>SJP</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32045151">
                    <field>11-05-21 06:25</field>
                    <field>Yard Shift</field>
                    <field>Import</field>
                    <field>MSKU8936769</field>
                    <field />
                    <field>4533</field>
                    <field>RTO</field>
                    <field>4533</field>
                    <field>RTO</field>
                    <field>4533</field>
                </row>
                <row primary-key="32045152">
                    <field>11-05-21 06:25</field>
                    <field>Yard Shift</field>
                    <field>Import</field>
                    <field>TCNU4022873</field>
                    <field />
                    <field>4533</field>
                    <field>RTO</field>
                    <field>4533</field>
                    <field>RTO</field>
                    <field>4533</field>
                </row>
                <row primary-key="32045161">
                    <field>11-05-21 06:27</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>MSKU8071500</field>
                    <field />
                    <field>4533</field>
                    <field>RTO</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32045185">
                    <field>11-05-21 06:28</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>TCLU3129448</field>
                    <field />
                    <field />
                    <field />
                    <field>4538</field>
                    <field>MAU</field>
                    <field />
                </row>
                <row primary-key="32045200">
                    <field>11-05-21 06:30</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>BEAU2190571</field>
                    <field />
                    <field />
                    <field />
                    <field>4533</field>
                    <field>RTO</field>
                    <field />
                </row>
                <row primary-key="32045202">
                    <field>11-05-21 06:31</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>TLLU8395222</field>
                    <field />
                    <field />
                    <field />
                    <field>4538</field>
                    <field>MAU</field>
                    <field />
                </row>
                <row primary-key="32045206">
                    <field>11-05-21 06:32</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>MSCU6067414</field>
                    <field />
                    <field />
                    <field />
                    <field>4533</field>
                    <field>RTO</field>
                    <field />
                </row>
                <row primary-key="32045213">
                    <field>11-05-21 06:33</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>FCIU8786811</field>
                    <field />
                    <field>4532</field>
                    <field>FVO</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32045244">
                    <field>11-05-21 06:37</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>TCNU2838512</field>
                    <field />
                    <field />
                    <field />
                    <field>4531</field>
                    <field>SJP</field>
                    <field />
                </row>
                <row primary-key="32045247">
                    <field>11-05-21 06:38</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>MRKU6713002</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32045246">
                    <field>11-05-21 06:38</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>MSKU7583435</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32045248">
                    <field>11-05-21 06:38</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>SUDU1917328</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32045249">
                    <field>11-05-21 06:38</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>TGHU0615492</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32045252">
                    <field>11-05-21 06:39</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>FSCU3902522</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32045251">
                    <field>11-05-21 06:39</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>CLHU3059811</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32045256">
                    <field>11-05-21 06:39</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>MEDU3465529</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32045271">
                    <field>11-05-21 06:40</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>MRKU7962777</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32045270">
                    <field>11-05-21 06:40</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>PCIU1859161</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32045272">
                    <field>11-05-21 06:40</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>PCIU1242035</field>
                    <field />
                    <field>4538</field>
                    <field>MAU</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32045274">
                    <field>11-05-21 06:40</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>PCIU1381350</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32045273">
                    <field>11-05-21 06:40</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>TRHU3674124</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32045275">
                    <field>11-05-21 06:40</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>PCIU1120736</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32045279">
                    <field>11-05-21 06:41</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>PCIU1399092</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32045280">
                    <field>11-05-21 06:41</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>GLDU9781482</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32045281">
                    <field>11-05-21 06:42</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>PCIU0193492</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32045282">
                    <field>11-05-21 06:42</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>GLDU9766997</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32045285">
                    <field>11-05-21 06:43</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>SUDU1356715</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32045289">
                    <field>11-05-21 06:43</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>INBU3755720</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32045291">
                    <field>11-05-21 06:43</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>CMAU1645837</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32045293">
                    <field>11-05-21 06:43</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>MSDU1687381</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32045294">
                    <field>11-05-21 06:43</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>MSCU6503631</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32045295">
                    <field>11-05-21 06:43</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>PCIU1232211</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32045298">
                    <field>11-05-21 06:44</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>DFSU2737053</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32045297">
                    <field>11-05-21 06:44</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>TEMU3183913</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32045296">
                    <field>11-05-21 06:44</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>MRSU0162625</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32045348">
                    <field>11-05-21 06:46</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>PCIU0193492</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32045347">
                    <field>11-05-21 06:46</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>BEAU2481350</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32045349">
                    <field>11-05-21 06:46</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>GLDU9766997</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32045353">
                    <field>11-05-21 06:46</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>INBU3755720</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32045354">
                    <field>11-05-21 06:46</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>SUDU1356715</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32045355">
                    <field>11-05-21 06:46</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>CMAU1645837</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32045360">
                    <field>11-05-21 06:47</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>MSCU6503631</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32045359">
                    <field>11-05-21 06:47</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>PCIU1232211</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32045361">
                    <field>11-05-21 06:47</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>MSDU1687381</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32045370">
                    <field>11-05-21 06:47</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>DFSU2737053</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32045371">
                    <field>11-05-21 06:47</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>TEMU3183913</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32045372">
                    <field>11-05-21 06:47</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>MRSU0162625</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32045381">
                    <field>11-05-21 06:48</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>MEDU1411884</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32045382">
                    <field>11-05-21 06:48</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>PCIU1280550</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32045383">
                    <field>11-05-21 06:49</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>TTNU2997760</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32045397">
                    <field>11-05-21 06:50</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>UESU4662050</field>
                    <field />
                    <field>4531</field>
                    <field>SJP</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32045399">
                    <field>11-05-21 06:51</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>HASU4259594</field>
                    <field />
                    <field>4540</field>
                    <field>LGE</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32045407">
                    <field>11-05-21 06:53</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>BEAU2229360</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32045408">
                    <field>11-05-21 06:53</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>MRKU7670395</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32045409">
                    <field>11-05-21 06:53</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>MSKU8882533</field>
                    <field />
                    <field>4531</field>
                    <field>SJP</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32045424">
                    <field>11-05-21 06:57</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>BMOU2596328</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32045425">
                    <field>11-05-21 06:57</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>MRKU3872910</field>
                    <field />
                    <field>4540</field>
                    <field>LGE</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32045427">
                    <field>11-05-21 06:57</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>TCKU2222287</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32045428">
                    <field>11-05-21 06:57</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>MRKU6656860</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32045429">
                    <field>11-05-21 06:58</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>PCIU1551332</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32045430">
                    <field>11-05-21 06:58</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>TEMU2912348</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32045431">
                    <field>11-05-21 06:58</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>MRKU9226902</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32045451">
                    <field>11-05-21 07:02</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>PCIU9227612</field>
                    <field />
                    <field>4540</field>
                    <field>LGE</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32045720">
                    <field>11-05-21 07:46</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>APHU6792982</field>
                    <field />
                    <field />
                    <field />
                    <field>4532</field>
                    <field>RJE</field>
                    <field />
                </row>
                <row primary-key="32045734">
                    <field>11-05-21 07:47</field>
                    <field>Yard Move</field>
                    <field>Export</field>
                    <field>APHU6792982</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32045753">
                    <field>11-05-21 07:51</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>MSKU0053710</field>
                    <field />
                    <field>4534</field>
                    <field>NFM</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32045761">
                    <field>11-05-21 07:53</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>PCIU0025930</field>
                    <field />
                    <field>4534</field>
                    <field>NFM</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32045763">
                    <field>11-05-21 07:54</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>MSKU9782420</field>
                    <field />
                    <field>4532</field>
                    <field>RJE</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32045780">
                    <field>11-05-21 07:55</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>CAIU6044538</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32045797">
                    <field>11-05-21 07:58</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>MRKU4036026</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32045798">
                    <field>11-05-21 07:58</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>MEDU2836142</field>
                    <field />
                    <field />
                    <field />
                    <field>4538</field>
                    <field>JVA</field>
                    <field />
                </row>
                <row primary-key="32045816">
                    <field>11-05-21 08:00</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>HASU4894075</field>
                    <field />
                    <field>4533</field>
                    <field>GPA</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32045818">
                    <field>11-05-21 08:00</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>GLDU9662499</field>
                    <field />
                    <field>4531</field>
                    <field>AAM</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32045850">
                    <field>11-05-21 08:04</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>TRLU3888037</field>
                    <field />
                    <field />
                    <field />
                    <field>4538</field>
                    <field>JVA</field>
                    <field />
                </row>
                <row primary-key="32045892">
                    <field>11-05-21 08:06</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>CAIU3851639</field>
                    <field />
                    <field />
                    <field />
                    <field>4531</field>
                    <field>AAM</field>
                    <field />
                </row>
                <row primary-key="32045901">
                    <field>11-05-21 08:07</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>TGHU1588241</field>
                    <field />
                    <field />
                    <field />
                    <field>4538</field>
                    <field>JVA</field>
                    <field />
                </row>
                <row primary-key="32045933">
                    <field>11-05-21 08:10</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>MEDU6236589</field>
                    <field />
                    <field />
                    <field />
                    <field>4531</field>
                    <field>AAM</field>
                    <field />
                </row>
                <row primary-key="32045934">
                    <field>11-05-21 08:10</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>PCIU1194929</field>
                    <field />
                    <field>4519</field>
                    <field>FLE</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32046153">
                    <field>11-05-21 08:19</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>TRHU3028989</field>
                    <field />
                    <field />
                    <field />
                    <field>4531</field>
                    <field>AAM</field>
                    <field />
                </row>
                <row primary-key="32046246">
                    <field>11-05-21 08:29</field>
                    <field>Yard Move</field>
                    <field>Export</field>
                    <field>MSDU1324365</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32046275">
                    <field>11-05-21 08:30</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>GCXU5041140</field>
                    <field />
                    <field>4529</field>
                    <field>DLE</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32046302">
                    <field>11-05-21 08:34</field>
                    <field>Yard Move</field>
                    <field>Export</field>
                    <field>MEDU2836142</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32046327">
                    <field>11-05-21 08:36</field>
                    <field>Yard Move</field>
                    <field>Export</field>
                    <field>TCLU7737153</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32046330">
                    <field>11-05-21 08:37</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>PCIU8817661</field>
                    <field />
                    <field>4529</field>
                    <field>DLE</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32046367">
                    <field>11-05-21 08:40</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>CAIU3170825</field>
                    <field />
                    <field />
                    <field />
                    <field>4538</field>
                    <field>JVA</field>
                    <field />
                </row>
                <row primary-key="32046369">
                    <field>11-05-21 08:41</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>MRKU7161757</field>
                    <field />
                    <field />
                    <field />
                    <field>4532</field>
                    <field>RJE</field>
                    <field />
                </row>
                <row primary-key="32046375">
                    <field>11-05-21 08:43</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>CMAU0419990</field>
                    <field />
                    <field />
                    <field />
                    <field>4531</field>
                    <field>AAM</field>
                    <field />
                </row>
                <row primary-key="32046376">
                    <field>11-05-21 08:43</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>MSCU3231458</field>
                    <field />
                    <field />
                    <field />
                    <field>4538</field>
                    <field>JVA</field>
                    <field />
                </row>
                <row primary-key="32046438">
                    <field>11-05-21 08:46</field>
                    <field>Yard Move</field>
                    <field>Export</field>
                    <field>APHU6972958</field>
                    <field />
                    <field />
                    <field />
                    <field>4533</field>
                    <field>GPA</field>
                    <field />
                </row>
                <row primary-key="32047155">
                    <field>11-05-21 08:49</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>TCNU5838795</field>
                    <field />
                    <field />
                    <field />
                    <field>4532</field>
                    <field>RJE</field>
                    <field />
                </row>
                <row primary-key="32047176">
                    <field>11-05-21 08:50</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>TCLU5884601</field>
                    <field />
                    <field>4529</field>
                    <field>DLE</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32047182">
                    <field>11-05-21 08:51</field>
                    <field>Yard Move</field>
                    <field>Export</field>
                    <field>TCNU5838795</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32047191">
                    <field>11-05-21 08:51</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>CMAU6244396</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32047192">
                    <field>11-05-21 08:51</field>
                    <field>Yard Move</field>
                    <field>Export</field>
                    <field>TRHU3028989</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32047195">
                    <field>11-05-21 08:51</field>
                    <field>Yard Move</field>
                    <field>Export</field>
                    <field>MSDU1440771</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32047198">
                    <field>11-05-21 08:52</field>
                    <field>Yard Move</field>
                    <field>Export</field>
                    <field>MSCU3492385</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32047202">
                    <field>11-05-21 08:52</field>
                    <field>Yard Move</field>
                    <field>Export</field>
                    <field>MSDU1056468</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32047211">
                    <field>11-05-21 08:53</field>
                    <field>Yard Move</field>
                    <field>Export</field>
                    <field>MSDU1425381</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32047220">
                    <field>11-05-21 08:53</field>
                    <field>Yard Move</field>
                    <field>Export</field>
                    <field>MSDU1270660</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32047226">
                    <field>11-05-21 08:54</field>
                    <field>Yard Move</field>
                    <field>Export</field>
                    <field>MEDU3044290</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32047228">
                    <field>11-05-21 08:54</field>
                    <field>Yard Move</field>
                    <field>Export</field>
                    <field>BEAU2961410</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32047230">
                    <field>11-05-21 08:54</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>MEDU2571059</field>
                    <field />
                    <field />
                    <field />
                    <field>4533</field>
                    <field>GPA</field>
                    <field />
                </row>
                <row primary-key="32047232">
                    <field>11-05-21 08:54</field>
                    <field>Yard Move</field>
                    <field>Export</field>
                    <field>TGCU2127610</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32047234">
                    <field>11-05-21 08:54</field>
                    <field>Yard Shift</field>
                    <field>Import</field>
                    <field>CMAU0355983</field>
                    <field />
                    <field>4529</field>
                    <field>DLE</field>
                    <field>4529</field>
                    <field>DLE</field>
                    <field>4529</field>
                </row>
                <row primary-key="32047255">
                    <field>11-05-21 08:55</field>
                    <field>Yard Move</field>
                    <field>Export</field>
                    <field>FCIU4217416</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32047261">
                    <field>11-05-21 08:55</field>
                    <field>Yard Move</field>
                    <field>Export</field>
                    <field>CAIU6222558</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32047266">
                    <field>11-05-21 08:55</field>
                    <field>Yard Move</field>
                    <field>Export</field>
                    <field>FTAU1261544</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32047268">
                    <field>11-05-21 08:56</field>
                    <field>Yard Move</field>
                    <field>Export</field>
                    <field>CAIU3376082</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32047271">
                    <field>11-05-21 08:56</field>
                    <field>Yard Move</field>
                    <field>Export</field>
                    <field>MEDU1416989</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32047275">
                    <field>11-05-21 08:57</field>
                    <field>Yard Move</field>
                    <field>Export</field>
                    <field>GATU1371216</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32047277">
                    <field>11-05-21 08:57</field>
                    <field>Yard Move</field>
                    <field>Export</field>
                    <field>TGHU0920496</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32047278">
                    <field>11-05-21 08:57</field>
                    <field>Yard Move</field>
                    <field>Export</field>
                    <field>MEDU2295726</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32047279">
                    <field>11-05-21 08:58</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>TCKU1724547</field>
                    <field />
                    <field>4529</field>
                    <field>DLE</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32047292">
                    <field>11-05-21 08:58</field>
                    <field>Yard Move</field>
                    <field>Export</field>
                    <field>MSCU6113696</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32047294">
                    <field>11-05-21 08:59</field>
                    <field>Yard Move</field>
                    <field>Export</field>
                    <field>FCIU6375961</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32047297">
                    <field>11-05-21 08:59</field>
                    <field>Yard Move</field>
                    <field>Export</field>
                    <field>TRHU1261081</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32047311">
                    <field>11-05-21 09:00</field>
                    <field>Yard Move</field>
                    <field>Export</field>
                    <field>GLDU5488270</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32047312">
                    <field>11-05-21 09:00</field>
                    <field>Yard Move</field>
                    <field>Export</field>
                    <field>TRHU2319531</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32047314">
                    <field>11-05-21 09:00</field>
                    <field>Yard Move</field>
                    <field>Export</field>
                    <field>BMOU2647699</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32047313">
                    <field>11-05-21 09:00</field>
                    <field>Yard Move</field>
                    <field>Export</field>
                    <field>SUDU7619228</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32047316">
                    <field>11-05-21 09:00</field>
                    <field>Yard Move</field>
                    <field>Export</field>
                    <field>PONU0532863</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32047315">
                    <field>11-05-21 09:00</field>
                    <field>Yard Move</field>
                    <field>Export</field>
                    <field>MSKU7294427</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32047318">
                    <field>11-05-21 09:00</field>
                    <field>Yard Move</field>
                    <field>Export</field>
                    <field>MEDU1918755</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32047320">
                    <field>11-05-21 09:01</field>
                    <field>Yard Move</field>
                    <field>Export</field>
                    <field>TGHU2275447</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32047327">
                    <field>11-05-21 09:02</field>
                    <field>Yard Move</field>
                    <field>Export</field>
                    <field>MSKU7438268</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32047326">
                    <field>11-05-21 09:02</field>
                    <field>Yard Move</field>
                    <field>Export</field>
                    <field>MRKU9298760</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32047325">
                    <field>11-05-21 09:02</field>
                    <field>Yard Move</field>
                    <field>Export</field>
                    <field>MRKU8741805</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32047328">
                    <field>11-05-21 09:02</field>
                    <field>Yard Move</field>
                    <field>Export</field>
                    <field>MRKU6915493</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32047330">
                    <field>11-05-21 09:02</field>
                    <field>Yard Move</field>
                    <field>Export</field>
                    <field>TRHU2002001</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32047346">
                    <field>11-05-21 09:03</field>
                    <field>Yard Move</field>
                    <field>Export</field>
                    <field>FCIU4370507</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32047347">
                    <field>11-05-21 09:03</field>
                    <field>Yard Move</field>
                    <field>Export</field>
                    <field>CARU2216810</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32047348">
                    <field>11-05-21 09:03</field>
                    <field>Yard Move</field>
                    <field>Export</field>
                    <field>MEDU6508460</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32047349">
                    <field>11-05-21 09:03</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>MRKU8608855</field>
                    <field />
                    <field>4533</field>
                    <field>GPA</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32047351">
                    <field>11-05-21 09:04</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>MEDU1350562</field>
                    <field />
                    <field />
                    <field />
                    <field>4538</field>
                    <field>JVA</field>
                    <field />
                </row>
                <row primary-key="32047372">
                    <field>11-05-21 09:06</field>
                    <field>Yard Move</field>
                    <field>Export</field>
                    <field>GLDU5012411</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32047376">
                    <field>11-05-21 09:06</field>
                    <field>Yard Move</field>
                    <field>Export</field>
                    <field>TCKU3913180</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32047377">
                    <field>11-05-21 09:06</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>HASU1182101</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32047378">
                    <field>11-05-21 09:06</field>
                    <field>Yard Move</field>
                    <field>Export</field>
                    <field>MEDU1862450</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32047379">
                    <field>11-05-21 09:07</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>CXDU1854833</field>
                    <field />
                    <field />
                    <field />
                    <field>4529</field>
                    <field>DLE</field>
                    <field />
                </row>
                <row primary-key="32047381">
                    <field>11-05-21 09:07</field>
                    <field>Yard Move</field>
                    <field>Export</field>
                    <field>MEDU6248553</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32047384">
                    <field>11-05-21 09:07</field>
                    <field>Yard Move</field>
                    <field>Export</field>
                    <field>FBIU0298172</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32047385">
                    <field>11-05-21 09:07</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>TGBU6828240</field>
                    <field />
                    <field>4531</field>
                    <field>AAM</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32047423">
                    <field>11-05-21 09:10</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>PCIU1096727</field>
                    <field />
                    <field>4533</field>
                    <field>GPA</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32047445">
                    <field>11-05-21 09:13</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>PCIU1957487</field>
                    <field />
                    <field>4533</field>
                    <field>GPA</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32047474">
                    <field>11-05-21 09:15</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>MEDU2771761</field>
                    <field />
                    <field>4533</field>
                    <field>GPA</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32047579">
                    <field>11-05-21 09:17</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>TEMU5861368</field>
                    <field />
                    <field />
                    <field />
                    <field>4525</field>
                    <field>APM</field>
                    <field />
                </row>
                <row primary-key="32047599">
                    <field>11-05-21 09:19</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>CAIU2704103</field>
                    <field />
                    <field>4533</field>
                    <field>GPA</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32047608">
                    <field>11-05-21 09:19</field>
                    <field>Yard Move</field>
                    <field>Export</field>
                    <field>SUDU7619228</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32047607">
                    <field>11-05-21 09:19</field>
                    <field>Yard Move</field>
                    <field>Export</field>
                    <field>PONU0532863</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32047609">
                    <field>11-05-21 09:19</field>
                    <field>Yard Move</field>
                    <field>Export</field>
                    <field>MSKU7294427</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32047621">
                    <field>11-05-21 09:20</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>PCIU1957487</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32047632">
                    <field>11-05-21 09:20</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>MEDU2771761</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32047677">
                    <field>11-05-21 09:22</field>
                    <field>Yard Move</field>
                    <field>Export</field>
                    <field>CXDU1854833</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32047690">
                    <field>11-05-21 09:22</field>
                    <field>Yard Move</field>
                    <field>Export</field>
                    <field>BMOU2647699</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32047696">
                    <field>11-05-21 09:22</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>MRKU8928910</field>
                    <field />
                    <field>4533</field>
                    <field>GPA</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32047802">
                    <field>11-05-21 09:27</field>
                    <field>Rail Discharge</field>
                    <field>Export</field>
                    <field>ZW17387</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32047811">
                    <field>11-05-21 09:27</field>
                    <field>Rail Discharge</field>
                    <field>Export</field>
                    <field>ZW17389</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32047822">
                    <field>11-05-21 09:27</field>
                    <field>Rail Discharge</field>
                    <field>Export</field>
                    <field>ZW17391</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32047834">
                    <field>11-05-21 09:28</field>
                    <field>Rail Discharge</field>
                    <field>Export</field>
                    <field>ZW17395</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32047841">
                    <field>11-05-21 09:28</field>
                    <field>Rail Discharge</field>
                    <field>Export</field>
                    <field>ZW17397</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32047844">
                    <field>11-05-21 09:28</field>
                    <field>Rail Discharge</field>
                    <field>Export</field>
                    <field>ZW17399</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32047847">
                    <field>11-05-21 09:29</field>
                    <field>Rail Discharge</field>
                    <field>Export</field>
                    <field>ZW17401</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32047860">
                    <field>11-05-21 09:29</field>
                    <field>Rail Discharge</field>
                    <field>Export</field>
                    <field>ZW17403</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32047863">
                    <field>11-05-21 09:29</field>
                    <field>Rail Discharge</field>
                    <field>Export</field>
                    <field>ZW17405</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32047867">
                    <field>11-05-21 09:29</field>
                    <field>Rail Discharge</field>
                    <field>Export</field>
                    <field>ZW17406</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32047870">
                    <field>11-05-21 09:29</field>
                    <field>Rail Discharge</field>
                    <field>Export</field>
                    <field>ZW17407</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32047873">
                    <field>11-05-21 09:29</field>
                    <field>Rail Discharge</field>
                    <field>Export</field>
                    <field>ZW17409</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32047889">
                    <field>11-05-21 09:30</field>
                    <field>Rail Discharge</field>
                    <field>Export</field>
                    <field>ZW17411</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32047892">
                    <field>11-05-21 09:30</field>
                    <field>Rail Discharge</field>
                    <field>Export</field>
                    <field>ZW17415</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32047900">
                    <field>11-05-21 09:30</field>
                    <field>Rail Discharge</field>
                    <field>Export</field>
                    <field>ZW17417</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32047904">
                    <field>11-05-21 09:30</field>
                    <field>Rail Discharge</field>
                    <field>Export</field>
                    <field>ZW17434</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32047909">
                    <field>11-05-21 09:30</field>
                    <field>Rail Discharge</field>
                    <field>Export</field>
                    <field>ZW17436</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32047918">
                    <field>11-05-21 09:30</field>
                    <field>Rail Discharge</field>
                    <field>Export</field>
                    <field>ZW17440</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32047924">
                    <field>11-05-21 09:30</field>
                    <field>Rail Discharge</field>
                    <field>Export</field>
                    <field>ZW17444</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32047930">
                    <field>11-05-21 09:30</field>
                    <field>Delivery</field>
                    <field>Storage</field>
                    <field>PCIU1004530</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32047932">
                    <field>11-05-21 09:30</field>
                    <field>Rail Discharge</field>
                    <field>Export</field>
                    <field>ZW17450</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32047935">
                    <field>11-05-21 09:31</field>
                    <field>Rail Discharge</field>
                    <field>Export</field>
                    <field>ZW17452</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32047952">
                    <field>11-05-21 09:32</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>TRHU4701287</field>
                    <field />
                    <field />
                    <field />
                    <field>4531</field>
                    <field>AAM</field>
                    <field />
                </row>
                <row primary-key="32047977">
                    <field>11-05-21 09:34</field>
                    <field>Delivery</field>
                    <field>Storage</field>
                    <field>PCIU1188818</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32047988">
                    <field>11-05-21 09:34</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>TCLU2469607</field>
                    <field />
                    <field />
                    <field />
                    <field>4538</field>
                    <field>JVA</field>
                    <field />
                </row>
                <row primary-key="32048023">
                    <field>11-05-21 09:36</field>
                    <field>Delivery</field>
                    <field>Storage</field>
                    <field>PCIU1818270</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32048036">
                    <field>11-05-21 09:38</field>
                    <field>Delivery</field>
                    <field>Storage</field>
                    <field>PCIU1782584</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32048046">
                    <field>11-05-21 09:38</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>TCLU4755805</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32048052">
                    <field>11-05-21 09:39</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>MRKU5502453</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32048055">
                    <field>11-05-21 09:39</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>MEDU8720210</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32048058">
                    <field>11-05-21 09:39</field>
                    <field>Delivery</field>
                    <field>Storage</field>
                    <field>PCIU1992235</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32048100">
                    <field>11-05-21 09:40</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>ECMU1773677</field>
                    <field />
                    <field />
                    <field />
                    <field>4531</field>
                    <field>AAM</field>
                    <field />
                </row>
                <row primary-key="32048114">
                    <field>11-05-21 09:41</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>MEDU8720210</field>
                    <field />
                    <field>4533</field>
                    <field>GPA</field>
                    <field>4533</field>
                    <field>GPA</field>
                    <field>2519</field>
                </row>
                <row primary-key="32048123">
                    <field>11-05-21 09:42</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>MEDU8720210</field>
                    <field />
                    <field>4533</field>
                    <field>GPA</field>
                    <field>4533</field>
                    <field>GPA</field>
                    <field>4533</field>
                </row>
                <row primary-key="32048129">
                    <field>11-05-21 09:42</field>
                    <field>Delivery</field>
                    <field>Storage</field>
                    <field>PCIU1026442</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32048136">
                    <field>11-05-21 09:43</field>
                    <field>Delivery</field>
                    <field>Storage</field>
                    <field>PCIU2817242</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32048171">
                    <field>11-05-21 09:44</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>ECMU2161790</field>
                    <field />
                    <field>4533</field>
                    <field>GPA</field>
                    <field>4533</field>
                    <field>GPA</field>
                    <field>2519</field>
                </row>
                <row primary-key="32048172">
                    <field>11-05-21 09:44</field>
                    <field>Receival</field>
                    <field>Storage</field>
                    <field>CAIU7563543</field>
                    <field />
                    <field />
                    <field />
                    <field>FL0905</field>
                    <field>MJO</field>
                    <field />
                </row>
                <row primary-key="32048197">
                    <field>11-05-21 09:45</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>ECMU2161790</field>
                    <field />
                    <field>4533</field>
                    <field>GPA</field>
                    <field>4533</field>
                    <field>GPA</field>
                    <field>4533</field>
                </row>
                <row primary-key="32048208">
                    <field>11-05-21 09:45</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>GESU6126639</field>
                    <field />
                    <field />
                    <field />
                    <field>4538</field>
                    <field>JVA</field>
                    <field />
                </row>
                <row primary-key="32048232">
                    <field>11-05-21 09:46</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>MRKU5502453</field>
                    <field />
                    <field>4533</field>
                    <field>GPA</field>
                    <field>4533</field>
                    <field>GPA</field>
                    <field>2519</field>
                </row>
                <row primary-key="32048246">
                    <field>11-05-21 09:47</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>MRKU5502453</field>
                    <field />
                    <field>4533</field>
                    <field>GPA</field>
                    <field>4533</field>
                    <field>GPA</field>
                    <field>4533</field>
                </row>
                <row primary-key="32048267">
                    <field>11-05-21 09:48</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>TCLU1820996</field>
                    <field />
                    <field />
                    <field />
                    <field>4529</field>
                    <field>DLE</field>
                    <field />
                </row>
                <row primary-key="32048279">
                    <field>11-05-21 09:48</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>TCLU4755805</field>
                    <field />
                    <field>4533</field>
                    <field>GPA</field>
                    <field>4533</field>
                    <field>GPA</field>
                    <field>2519</field>
                </row>
                <row primary-key="32048282">
                    <field>11-05-21 09:48</field>
                    <field>Yard Move</field>
                    <field>Export</field>
                    <field>TRHU3028989</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32048285">
                    <field>11-05-21 09:48</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>TCLU4755805</field>
                    <field />
                    <field>4533</field>
                    <field>GPA</field>
                    <field>4533</field>
                    <field>GPA</field>
                    <field>4533</field>
                </row>
                <row primary-key="32048328">
                    <field>11-05-21 09:51</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>TCLU3290642</field>
                    <field />
                    <field>4533</field>
                    <field>GPA</field>
                    <field>4533</field>
                    <field>GPA</field>
                    <field>2519</field>
                </row>
                <row primary-key="32048338">
                    <field>11-05-21 09:51</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>TCLU3290642</field>
                    <field />
                    <field>4533</field>
                    <field>GPA</field>
                    <field>4533</field>
                    <field>GPA</field>
                    <field>4533</field>
                </row>
                <row primary-key="32048341">
                    <field>11-05-21 09:52</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>XINU1444720</field>
                    <field />
                    <field />
                    <field />
                    <field>4531</field>
                    <field>AAM</field>
                    <field />
                </row>
                <row primary-key="32048343">
                    <field>11-05-21 09:52</field>
                    <field>Yard Move</field>
                    <field>Export</field>
                    <field>TCLU1820996</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32048344">
                    <field>11-05-21 09:52</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>MEDU3631928</field>
                    <field />
                    <field>4533</field>
                    <field>GPA</field>
                    <field>4533</field>
                    <field>GPA</field>
                    <field>2519</field>
                </row>
                <row primary-key="32048365">
                    <field>11-05-21 09:53</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>MEDU3631928</field>
                    <field />
                    <field>4533</field>
                    <field>GPA</field>
                    <field>4533</field>
                    <field>GPA</field>
                    <field>4533</field>
                </row>
                <row primary-key="32048368">
                    <field>11-05-21 09:53</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>SEGU3060044</field>
                    <field />
                    <field>4533</field>
                    <field>GPA</field>
                    <field>4533</field>
                    <field>GPA</field>
                    <field>2519</field>
                </row>
                <row primary-key="32048374">
                    <field>11-05-21 09:54</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>SEGU3060044</field>
                    <field />
                    <field>4533</field>
                    <field>GPA</field>
                    <field>4533</field>
                    <field>GPA</field>
                    <field>4533</field>
                </row>
                <row primary-key="32048381">
                    <field>11-05-21 09:54</field>
                    <field>Delivery</field>
                    <field>Storage</field>
                    <field>PCIU1258345</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32048397">
                    <field>11-05-21 09:55</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>CMAU4440390</field>
                    <field />
                    <field />
                    <field />
                    <field>4532</field>
                    <field>RJE</field>
                    <field />
                </row>
                <row primary-key="32048409">
                    <field>11-05-21 09:55</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>TEXU3929689</field>
                    <field />
                    <field />
                    <field />
                    <field>4531</field>
                    <field>AAM</field>
                    <field />
                </row>
                <row primary-key="32048414">
                    <field>11-05-21 09:55</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>GLDU9766997</field>
                    <field />
                    <field>4533</field>
                    <field>GPA</field>
                    <field>4533</field>
                    <field>GPA</field>
                    <field>2519</field>
                </row>
                <row primary-key="32048429">
                    <field>11-05-21 09:56</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>GLDU9766997</field>
                    <field />
                    <field>4533</field>
                    <field>GPA</field>
                    <field>4533</field>
                    <field>GPA</field>
                    <field>4533</field>
                </row>
                <row primary-key="32048435">
                    <field>11-05-21 09:56</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>ZIQ9776</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32048446">
                    <field>11-05-21 09:56</field>
                    <field>Delivery</field>
                    <field>Storage</field>
                    <field>PCIU1074369</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32048482">
                    <field>11-05-21 09:57</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>CMAU0614786</field>
                    <field />
                    <field>4533</field>
                    <field>GPA</field>
                    <field>4533</field>
                    <field>GPA</field>
                    <field>2519</field>
                </row>
                <row primary-key="32048497">
                    <field>11-05-21 09:57</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>CMAU0614786</field>
                    <field />
                    <field>4533</field>
                    <field>GPA</field>
                    <field>4533</field>
                    <field>GPA</field>
                    <field>4533</field>
                </row>
                <row primary-key="32048538">
                    <field>11-05-21 09:59</field>
                    <field>Yard Move</field>
                    <field>Export</field>
                    <field>CXDU1854833</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32048555">
                    <field>11-05-21 10:00</field>
                    <field>Yard Move</field>
                    <field>Export</field>
                    <field>TCNU5838795</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32048582">
                    <field>11-05-21 10:01</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>BMOU1283226</field>
                    <field />
                    <field />
                    <field />
                    <field>4529</field>
                    <field>DLE</field>
                    <field />
                </row>
                <row primary-key="32048673">
                    <field>11-05-21 10:04</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>MSCU3719503</field>
                    <field />
                    <field />
                    <field />
                    <field>4538</field>
                    <field>JVA</field>
                    <field />
                </row>
                <row primary-key="32048732">
                    <field>11-05-21 10:07</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>GESU1222265</field>
                    <field />
                    <field>4534</field>
                    <field>NFM</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32048734">
                    <field>11-05-21 10:07</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>CMAU0532040</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32048735">
                    <field>11-05-21 10:07</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>PCIU1169660</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32048741">
                    <field>11-05-21 10:08</field>
                    <field>Receival</field>
                    <field>Storage</field>
                    <field>MRKU6468878</field>
                    <field />
                    <field />
                    <field />
                    <field>FL0905</field>
                    <field>MJO</field>
                    <field />
                </row>
                <row primary-key="32048754">
                    <field>11-05-21 10:08</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>TEMU1012906</field>
                    <field />
                    <field>4534</field>
                    <field>NFM</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32048810">
                    <field>11-05-21 10:09</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>PCIU9337902</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32048809">
                    <field>11-05-21 10:09</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>CCLU4265099</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32048816">
                    <field>11-05-21 10:09</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>TCNU8594331</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32048837">
                    <field>11-05-21 10:10</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>TCKU3075149</field>
                    <field />
                    <field>4534</field>
                    <field>NFM</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32048838">
                    <field>11-05-21 10:10</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>CMAU7305665</field>
                    <field />
                    <field />
                    <field />
                    <field>4532</field>
                    <field>RJE</field>
                    <field />
                </row>
                <row primary-key="32048839">
                    <field>11-05-21 10:10</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>CMAU7605024</field>
                    <field />
                    <field />
                    <field />
                    <field>4538</field>
                    <field>JVA</field>
                    <field />
                </row>
                <row primary-key="32048842">
                    <field>11-05-21 10:11</field>
                    <field>Yard Shift</field>
                    <field>Import</field>
                    <field>PCIU1399092</field>
                    <field />
                    <field>4529</field>
                    <field>DLE</field>
                    <field>4529</field>
                    <field>DLE</field>
                    <field>4529</field>
                </row>
                <row primary-key="32048847">
                    <field>11-05-21 10:12</field>
                    <field>Receival</field>
                    <field>Storage</field>
                    <field>PCIU9481057</field>
                    <field />
                    <field />
                    <field />
                    <field>FL0905</field>
                    <field>MJO</field>
                    <field />
                </row>
                <row primary-key="32048857">
                    <field>11-05-21 10:12</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>TCLU3415550</field>
                    <field />
                    <field>4534</field>
                    <field>NFM</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32048858">
                    <field>11-05-21 10:13</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>PCIU1097359</field>
                    <field />
                    <field>4529</field>
                    <field>DLE</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32048898">
                    <field>11-05-21 10:15</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>MSDU1289080</field>
                    <field />
                    <field>4534</field>
                    <field>NFM</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32048902">
                    <field>11-05-21 10:15</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>TRHU1642468</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32048900">
                    <field>11-05-21 10:15</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>PCIU1609075</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32048901">
                    <field>11-05-21 10:15</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>FCIU2596141</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32048903">
                    <field>11-05-21 10:15</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>DFSU2375170</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32048914">
                    <field>11-05-21 10:15</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>GESU3599638</field>
                    <field />
                    <field />
                    <field />
                    <field>4529</field>
                    <field>DLE</field>
                    <field />
                </row>
                <row primary-key="32048921">
                    <field>11-05-21 10:15</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>MRKU3613735</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32048931">
                    <field>11-05-21 10:16</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>PCIU8942977</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32048934">
                    <field>11-05-21 10:16</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>APZU3613073</field>
                    <field />
                    <field />
                    <field />
                    <field>4538</field>
                    <field>JVA</field>
                    <field />
                </row>
                <row primary-key="32048944">
                    <field>11-05-21 10:17</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>CMAU5602670</field>
                    <field />
                    <field />
                    <field />
                    <field>4532</field>
                    <field>RJE</field>
                    <field />
                </row>
                <row primary-key="32048945">
                    <field>11-05-21 10:17</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>PCIU1269186</field>
                    <field />
                    <field>4534</field>
                    <field>NFM</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32048955">
                    <field>11-05-21 10:19</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>TRHU2416634</field>
                    <field />
                    <field />
                    <field />
                    <field>4531</field>
                    <field>AAM</field>
                    <field />
                </row>
                <row primary-key="32048956">
                    <field>11-05-21 10:19</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>CMAU0557618</field>
                    <field />
                    <field />
                    <field />
                    <field>4529</field>
                    <field>DLE</field>
                    <field />
                </row>
                <row primary-key="32048973">
                    <field>11-05-21 10:20</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>TRHU1969023</field>
                    <field />
                    <field>4534</field>
                    <field>NFM</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32048974">
                    <field>11-05-21 10:20</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>TCLU6765227</field>
                    <field />
                    <field />
                    <field />
                    <field>4529</field>
                    <field>DLE</field>
                    <field />
                </row>
                <row primary-key="32048987">
                    <field>11-05-21 10:20</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>PCIU8907908</field>
                    <field />
                    <field>4532</field>
                    <field>RJE</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32049010">
                    <field>11-05-21 10:22</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>TRLU9652840</field>
                    <field />
                    <field />
                    <field />
                    <field>4531</field>
                    <field>AAM</field>
                    <field />
                </row>
                <row primary-key="32049015">
                    <field>11-05-21 10:23</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>AXIU8465865</field>
                    <field />
                    <field>4534</field>
                    <field>NFM</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32049069">
                    <field>11-05-21 10:25</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>TCNU5383000</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32049070">
                    <field>11-05-21 10:25</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>MSCU6816805</field>
                    <field />
                    <field>4534</field>
                    <field>NFM</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32049109">
                    <field>11-05-21 10:27</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>CMAU0422720</field>
                    <field />
                    <field />
                    <field />
                    <field>4529</field>
                    <field>DLE</field>
                    <field />
                </row>
                <row primary-key="32049177">
                    <field>11-05-21 10:28</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>TGBU4138117</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32049178">
                    <field>11-05-21 10:28</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>MEDU5862248</field>
                    <field />
                    <field>4534</field>
                    <field>NFM</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32049219">
                    <field>11-05-21 10:30</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>APZU3783640</field>
                    <field />
                    <field />
                    <field />
                    <field>4529</field>
                    <field>DLE</field>
                    <field />
                </row>
                <row primary-key="32049231">
                    <field>11-05-21 10:30</field>
                    <field>Yard Move</field>
                    <field>Export</field>
                    <field>ZIQ9776</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32049232">
                    <field>11-05-21 10:30</field>
                    <field>Yard Move</field>
                    <field>Export</field>
                    <field>TRHU2667075</field>
                    <field />
                    <field>4538</field>
                    <field>JVA</field>
                    <field>4538</field>
                    <field>JVA</field>
                    <field>2519</field>
                </row>
                <row primary-key="32049239">
                    <field>11-05-21 10:30</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>SEGU1786172</field>
                    <field />
                    <field />
                    <field />
                    <field>4529</field>
                    <field>DLE</field>
                    <field />
                </row>
                <row primary-key="32049241">
                    <field>11-05-21 10:31</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>PCIU1631037</field>
                    <field />
                    <field />
                    <field />
                    <field>4531</field>
                    <field>AAM</field>
                    <field />
                </row>
                <row primary-key="32049245">
                    <field>11-05-21 10:31</field>
                    <field>Yard Move</field>
                    <field>Export</field>
                    <field>ZIQ9776</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32049249">
                    <field>11-05-21 10:31</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>TRHU3865199</field>
                    <field />
                    <field>4534</field>
                    <field>NFM</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32049259">
                    <field>11-05-21 10:32</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>PCIU8810081</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32049258">
                    <field>11-05-21 10:32</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>TCNU5383000</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32049264">
                    <field>11-05-21 10:32</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>ZIQ9615</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32049285">
                    <field>11-05-21 10:33</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>CMAU5262733</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32049297">
                    <field>11-05-21 10:33</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>CMAU5185576</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32049302">
                    <field>11-05-21 10:33</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>TEMU2556165</field>
                    <field />
                    <field>4534</field>
                    <field>NFM</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32049360">
                    <field>11-05-21 10:35</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>PONU7626408</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32049361">
                    <field>11-05-21 10:35</field>
                    <field>Yard Move</field>
                    <field>Export</field>
                    <field>PONU2024901</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32049382">
                    <field>11-05-21 10:36</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>TGHU1525768</field>
                    <field />
                    <field />
                    <field />
                    <field>4532</field>
                    <field>RJE</field>
                    <field />
                </row>
                <row primary-key="32049395">
                    <field>11-05-21 10:36</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>PCIU1926146</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32049398">
                    <field>11-05-21 10:36</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>PCIU1265468</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32049396">
                    <field>11-05-21 10:36</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>CMAU1209129</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32049397">
                    <field>11-05-21 10:36</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>PCIU1205915</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32049405">
                    <field>11-05-21 10:37</field>
                    <field>Yard Move</field>
                    <field>Export</field>
                    <field>CAIU3061830</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32049410">
                    <field>11-05-21 10:37</field>
                    <field>Yard Move</field>
                    <field>Export</field>
                    <field>FCIU3463380</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32049413">
                    <field>11-05-21 10:37</field>
                    <field>Yard Move</field>
                    <field>Export</field>
                    <field>TRHU2667075</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32049417">
                    <field>11-05-21 10:38</field>
                    <field>Yard Move</field>
                    <field>Export</field>
                    <field>TRHU3028989</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32049428">
                    <field>11-05-21 10:39</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>SEKU4467527</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32049436">
                    <field>11-05-21 10:39</field>
                    <field>Yard Move</field>
                    <field>Export</field>
                    <field>MEDU2836142</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32049457">
                    <field>11-05-21 10:40</field>
                    <field>Yard Move</field>
                    <field>Export</field>
                    <field>TGHU1525768</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32049458">
                    <field>11-05-21 10:40</field>
                    <field>Yard Move</field>
                    <field>Export</field>
                    <field>CMAU2061735</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32049459">
                    <field>11-05-21 10:40</field>
                    <field>Yard Move</field>
                    <field>Export</field>
                    <field>SUDU1842276</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32049460">
                    <field>11-05-21 10:40</field>
                    <field>Yard Move</field>
                    <field>Export</field>
                    <field>MSDU7118850</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32049461">
                    <field>11-05-21 10:40</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>FCIU4772614</field>
                    <field />
                    <field>4534</field>
                    <field>NFM</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32049462">
                    <field>11-05-21 10:41</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>TCKU9446313</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32049486">
                    <field>11-05-21 10:42</field>
                    <field>Yard Move</field>
                    <field>Export</field>
                    <field>UNIU2039271</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32049501">
                    <field>11-05-21 10:43</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>CXDU1170234</field>
                    <field />
                    <field>4534</field>
                    <field>NFM</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32049521">
                    <field>11-05-21 10:45</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>TLLU2758742</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32049522">
                    <field>11-05-21 10:45</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>TCKU3635602</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32049523">
                    <field>11-05-21 10:45</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>CMAU7790637</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32049525">
                    <field>11-05-21 10:45</field>
                    <field>Yard Move</field>
                    <field>Export</field>
                    <field>MSDU8184028</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32049524">
                    <field>11-05-21 10:45</field>
                    <field>Yard Move</field>
                    <field>Export</field>
                    <field>MRKU7703225</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32049528">
                    <field>11-05-21 10:46</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>MEDU2373259</field>
                    <field />
                    <field>4534</field>
                    <field>NFM</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32049529">
                    <field>11-05-21 10:46</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>APZU3987068</field>
                    <field />
                    <field />
                    <field />
                    <field>4538</field>
                    <field>JVA</field>
                    <field />
                </row>
                <row primary-key="32049541">
                    <field>11-05-21 10:48</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>CAIU6370088</field>
                    <field />
                    <field />
                    <field />
                    <field>4538</field>
                    <field>JVA</field>
                    <field />
                </row>
                <row primary-key="32049619">
                    <field>11-05-21 10:49</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>PCIU9445640</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32049620">
                    <field>11-05-21 10:49</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>CAXU6214322</field>
                    <field />
                    <field>4534</field>
                    <field>NFM</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32049635">
                    <field>11-05-21 10:50</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>CMAU0484147</field>
                    <field />
                    <field />
                    <field />
                    <field>4538</field>
                    <field>JVA</field>
                    <field />
                </row>
                <row primary-key="32049653">
                    <field>11-05-21 10:52</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>CAIU9989184</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32049654">
                    <field>11-05-21 10:52</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>PCIU8686772</field>
                    <field />
                    <field>4525</field>
                    <field>APM</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32049656">
                    <field>11-05-21 10:52</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>MSKU0326477</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32049658">
                    <field>11-05-21 10:52</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>CLHU3106997</field>
                    <field />
                    <field>4534</field>
                    <field>NFM</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32049659">
                    <field>11-05-21 10:53</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>CMAU5974018</field>
                    <field />
                    <field />
                    <field />
                    <field>4532</field>
                    <field>RJE</field>
                    <field />
                </row>
                <row primary-key="32049661">
                    <field>11-05-21 10:54</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>TEMU2222430</field>
                    <field />
                    <field />
                    <field />
                    <field>4531</field>
                    <field>AAM</field>
                    <field />
                </row>
                <row primary-key="32049663">
                    <field>11-05-21 10:54</field>
                    <field>Yard Move</field>
                    <field>Export</field>
                    <field>TEMU2669599</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32049672">
                    <field>11-05-21 10:54</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>TCKU7174664</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32049690">
                    <field>11-05-21 10:55</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>TEMU3308651</field>
                    <field />
                    <field />
                    <field />
                    <field>4531</field>
                    <field>AAM</field>
                    <field />
                </row>
                <row primary-key="32049696">
                    <field>11-05-21 10:55</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>MEDU1315788</field>
                    <field />
                    <field>4534</field>
                    <field>NFM</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32049713">
                    <field>11-05-21 10:56</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>CMAU0527737</field>
                    <field />
                    <field />
                    <field />
                    <field>4529</field>
                    <field>DLE</field>
                    <field />
                </row>
                <row primary-key="32049715">
                    <field>11-05-21 10:56</field>
                    <field>Yard Move</field>
                    <field>Export</field>
                    <field>TCKU2644111</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32049718">
                    <field>11-05-21 10:57</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>MSKU8823058</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32049728">
                    <field>11-05-21 10:58</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>CGMU5152966</field>
                    <field />
                    <field>4528</field>
                    <field>AAL</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32049731">
                    <field>11-05-21 10:58</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>TEMU4215785</field>
                    <field />
                    <field />
                    <field />
                    <field>4529</field>
                    <field>DLE</field>
                    <field />
                </row>
                <row primary-key="32049733">
                    <field>11-05-21 10:58</field>
                    <field>Yard Move</field>
                    <field>Export</field>
                    <field>TEMU2384024</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32049735">
                    <field>11-05-21 10:58</field>
                    <field>Yard Move</field>
                    <field>Storage</field>
                    <field>TTNU8110954</field>
                    <field />
                    <field>4528</field>
                    <field>AAL</field>
                    <field>4528</field>
                    <field>AAL</field>
                    <field>4528</field>
                </row>
                <row primary-key="32049752">
                    <field>11-05-21 10:59</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>APZU3663032</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32049753">
                    <field>11-05-21 10:59</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>TEMU2895997</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32049762">
                    <field>11-05-21 11:00</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>APZU3847030</field>
                    <field />
                    <field />
                    <field />
                    <field>4531</field>
                    <field>AAM</field>
                    <field />
                </row>
                <row primary-key="32049771">
                    <field>11-05-21 11:00</field>
                    <field>Yard Move</field>
                    <field>Storage</field>
                    <field>MNBU3799321</field>
                    <field />
                    <field>4528</field>
                    <field>AAL</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32049772">
                    <field>11-05-21 11:00</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>APZU3662843</field>
                    <field />
                    <field />
                    <field />
                    <field>4529</field>
                    <field>DLE</field>
                    <field />
                </row>
                <row primary-key="32049774">
                    <field>11-05-21 11:00</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>MEDU6124594</field>
                    <field />
                    <field>4534</field>
                    <field>NFM</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32049776">
                    <field>11-05-21 11:00</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>TLLU5955909</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32049802">
                    <field>11-05-21 11:03</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>PCIU1555723</field>
                    <field />
                    <field>4534</field>
                    <field>NFM</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32049809">
                    <field>11-05-21 11:04</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>APZU3843590</field>
                    <field />
                    <field />
                    <field />
                    <field>4531</field>
                    <field>AAM</field>
                    <field />
                </row>
                <row primary-key="32049813">
                    <field>11-05-21 11:04</field>
                    <field>Yard Move</field>
                    <field>Export</field>
                    <field>CAIU3069131</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32049845">
                    <field>11-05-21 11:05</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>SEGU6430923</field>
                    <field />
                    <field />
                    <field />
                    <field>4532</field>
                    <field>RJE</field>
                    <field />
                </row>
                <row primary-key="32049861">
                    <field>11-05-21 11:06</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>SUDU6660340</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32049862">
                    <field>11-05-21 11:06</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>CMAU6570005</field>
                    <field />
                    <field />
                    <field />
                    <field>4532</field>
                    <field>RJE</field>
                    <field />
                </row>
                <row primary-key="32049864">
                    <field>11-05-21 11:07</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>BMOU1101065</field>
                    <field />
                    <field>4534</field>
                    <field>NFM</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32049865">
                    <field>11-05-21 11:07</field>
                    <field>Yard Shift</field>
                    <field>Import</field>
                    <field>PCIU8576395</field>
                    <field />
                    <field>4525</field>
                    <field>APM</field>
                    <field>4525</field>
                    <field>APM</field>
                    <field>4525</field>
                </row>
                <row primary-key="32049866">
                    <field>11-05-21 11:07</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>TRHU6495816</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32049883">
                    <field>11-05-21 11:07</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>TGHU0546257</field>
                    <field />
                    <field />
                    <field />
                    <field>4531</field>
                    <field>AAM</field>
                    <field />
                </row>
                <row primary-key="32049885">
                    <field>11-05-21 11:08</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>MRKU5953061</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32049890">
                    <field>11-05-21 11:08</field>
                    <field>Yard Move</field>
                    <field>Export</field>
                    <field>CMAU5974018</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32049903">
                    <field>11-05-21 11:09</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>CAIU2723232</field>
                    <field />
                    <field />
                    <field />
                    <field>4529</field>
                    <field>DLE</field>
                    <field />
                </row>
                <row primary-key="32049936">
                    <field>11-05-21 11:10</field>
                    <field>Receival</field>
                    <field>Storage</field>
                    <field>CAAU5286468</field>
                    <field />
                    <field />
                    <field />
                    <field>FL0905</field>
                    <field>MJO</field>
                    <field />
                </row>
                <row primary-key="32049941">
                    <field>11-05-21 11:10</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>TLLU4638181</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32049948">
                    <field>11-05-21 11:10</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>MRKU3240544</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32049958">
                    <field>11-05-21 11:11</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>CMAU7019846</field>
                    <field />
                    <field />
                    <field />
                    <field>4538</field>
                    <field>JVA</field>
                    <field />
                </row>
                <row primary-key="32049959">
                    <field>11-05-21 11:11</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>ZIQ9629</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32049962">
                    <field>11-05-21 11:12</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>PCIU8466422</field>
                    <field />
                    <field>4525</field>
                    <field>APM</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32049993">
                    <field>11-05-21 11:14</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>CAIU7082300</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32050017">
                    <field>11-05-21 11:15</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>FSCU7633150</field>
                    <field />
                    <field />
                    <field />
                    <field>4531</field>
                    <field>AAM</field>
                    <field />
                </row>
                <row primary-key="32050018">
                    <field>11-05-21 11:15</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>MRKU3082433</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32050020">
                    <field>11-05-21 11:15</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>MAGU5611706</field>
                    <field />
                    <field />
                    <field />
                    <field>4538</field>
                    <field>JVA</field>
                    <field />
                </row>
                <row primary-key="32050022">
                    <field>11-05-21 11:15</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>CMAU6380730</field>
                    <field />
                    <field />
                    <field />
                    <field>4538</field>
                    <field>JVA</field>
                    <field />
                </row>
                <row primary-key="32050043">
                    <field>11-05-21 11:16</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>TEMU2048924</field>
                    <field />
                    <field />
                    <field />
                    <field>4529</field>
                    <field>DLE</field>
                    <field />
                </row>
                <row primary-key="32050046">
                    <field>11-05-21 11:16</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>MSMU7854040</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32050059">
                    <field>11-05-21 11:18</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>BSIU2768280</field>
                    <field />
                    <field />
                    <field />
                    <field>4531</field>
                    <field>AAM</field>
                    <field />
                </row>
                <row primary-key="32050069">
                    <field>11-05-21 11:19</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>MEDU7619941</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32050070">
                    <field>11-05-21 11:19</field>
                    <field>Yard Move</field>
                    <field>Export</field>
                    <field>ZIQ9629</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32050093">
                    <field>11-05-21 11:20</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>MRKU6220475</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32050109">
                    <field>11-05-21 11:21</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>SEGU6080152</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32050111">
                    <field>11-05-21 11:21</field>
                    <field>Yard Move</field>
                    <field>Export</field>
                    <field>TGHU9070813</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32050110">
                    <field>11-05-21 11:21</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>PCIU8723372</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32050114">
                    <field>11-05-21 11:22</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>MRKU2496022</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32050133">
                    <field>11-05-21 11:22</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>PCIU1933232</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32050131">
                    <field>11-05-21 11:22</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>SEGU1533528</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32050132">
                    <field>11-05-21 11:22</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>TEMU4469563</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32050130">
                    <field>11-05-21 11:22</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>CMAU0255752</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32050142">
                    <field>11-05-21 11:22</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>TLLU4270309</field>
                    <field />
                    <field />
                    <field />
                    <field>4538</field>
                    <field>JVA</field>
                    <field />
                </row>
                <row primary-key="32050195">
                    <field>11-05-21 11:25</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>TGHU6890892</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32050199">
                    <field>11-05-21 11:25</field>
                    <field>Yard Move</field>
                    <field>Export</field>
                    <field>CMAU0620840</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32050203">
                    <field>11-05-21 11:25</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>FBIU0286248</field>
                    <field />
                    <field />
                    <field />
                    <field>4529</field>
                    <field>DLE</field>
                    <field />
                </row>
                <row primary-key="32050206">
                    <field>11-05-21 11:25</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>HASU5021609</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32050229">
                    <field>11-05-21 11:26</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>MEDU6461234</field>
                    <field />
                    <field />
                    <field />
                    <field>4529</field>
                    <field>DLE</field>
                    <field />
                </row>
                <row primary-key="32050251">
                    <field>11-05-21 11:27</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>MRKU6283175</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32050252">
                    <field>11-05-21 11:27</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>MAEU8405208</field>
                    <field />
                    <field>4531</field>
                    <field>AAM</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32050262">
                    <field>11-05-21 11:28</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>BMOU2064449</field>
                    <field />
                    <field />
                    <field />
                    <field>4538</field>
                    <field>JVA</field>
                    <field />
                </row>
                <row primary-key="32050272">
                    <field>11-05-21 11:28</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>CMAU6392794</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32050289">
                    <field>11-05-21 11:29</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>MEDU7634859</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32050310">
                    <field>11-05-21 11:30</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>CMAU3186378</field>
                    <field />
                    <field />
                    <field />
                    <field>4528</field>
                    <field>AAL</field>
                    <field />
                </row>
                <row primary-key="32050322">
                    <field>11-05-21 11:31</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>AXIU1657172</field>
                    <field />
                    <field />
                    <field />
                    <field>4532</field>
                    <field>RJE</field>
                    <field />
                </row>
                <row primary-key="32050329">
                    <field>11-05-21 11:32</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>CAIU4714754</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32050330">
                    <field>11-05-21 11:32</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>MSDU7134418</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32050341">
                    <field>11-05-21 11:33</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>ECMU1672012</field>
                    <field />
                    <field />
                    <field />
                    <field>4528</field>
                    <field>AAL</field>
                    <field />
                </row>
                <row primary-key="32050344">
                    <field>11-05-21 11:33</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>APZU3504452</field>
                    <field />
                    <field />
                    <field />
                    <field>4531</field>
                    <field>AAM</field>
                    <field />
                </row>
                <row primary-key="32050351">
                    <field>11-05-21 11:34</field>
                    <field>Yard Move</field>
                    <field>Export</field>
                    <field>AXIU1657172</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32050354">
                    <field>11-05-21 11:34</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>APZU3730681</field>
                    <field />
                    <field />
                    <field />
                    <field>4528</field>
                    <field>AAL</field>
                    <field />
                </row>
                <row primary-key="32050361">
                    <field>11-05-21 11:34</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>MSKU0621765</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32050375">
                    <field>11-05-21 11:35</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>DFSU2181175</field>
                    <field />
                    <field />
                    <field />
                    <field>4528</field>
                    <field>AAL</field>
                    <field />
                </row>
                <row primary-key="32050383">
                    <field>11-05-21 11:35</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>MRKU5545922</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32050390">
                    <field>11-05-21 11:36</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>FCIU4599751</field>
                    <field />
                    <field />
                    <field />
                    <field>4528</field>
                    <field>AAL</field>
                    <field />
                </row>
                <row primary-key="32050393">
                    <field>11-05-21 11:36</field>
                    <field>Yard Move</field>
                    <field>Export</field>
                    <field>APZU3570433</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32050394">
                    <field>11-05-21 11:36</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>FFAU1212413</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32050395">
                    <field>11-05-21 11:36</field>
                    <field>Yard Move</field>
                    <field>Export</field>
                    <field>CMAU4772938</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32050396">
                    <field>11-05-21 11:37</field>
                    <field>Yard Move</field>
                    <field>Export</field>
                    <field>CAIU6376208</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32050398">
                    <field>11-05-21 11:37</field>
                    <field>Yard Shift</field>
                    <field>Import</field>
                    <field>PCIU9189111</field>
                    <field />
                    <field>4534</field>
                    <field>NFM</field>
                    <field>4534</field>
                    <field>NFM</field>
                    <field>4534</field>
                </row>
                <row primary-key="32050401">
                    <field>11-05-21 11:37</field>
                    <field>Yard Move</field>
                    <field>Export</field>
                    <field>BEAU2075285</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32050404">
                    <field>11-05-21 11:37</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>MRKU4413330</field>
                    <field />
                    <field>4534</field>
                    <field>NFM</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32050406">
                    <field>11-05-21 11:38</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>MSMU7861769</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32050418">
                    <field>11-05-21 11:38</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>APHU7403339</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32050426">
                    <field>11-05-21 11:39</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>CARU3859024</field>
                    <field />
                    <field />
                    <field />
                    <field>4531</field>
                    <field>AAM</field>
                    <field />
                </row>
                <row primary-key="32050445">
                    <field>11-05-21 11:41</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>TRLU7352994</field>
                    <field />
                    <field />
                    <field />
                    <field>4532</field>
                    <field>RJE</field>
                    <field />
                </row>
                <row primary-key="32050447">
                    <field>11-05-21 11:41</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>PCIU9231973</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32050448">
                    <field>11-05-21 11:41</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>MRKU7961261</field>
                    <field />
                    <field />
                    <field />
                    <field>4531</field>
                    <field>AAM</field>
                    <field />
                </row>
                <row primary-key="32050452">
                    <field>11-05-21 11:42</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>MSDU7806277</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32050461">
                    <field>11-05-21 11:43</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>HJCU1581983</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32050462">
                    <field>11-05-21 11:43</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>CMAU7176892</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32050467">
                    <field>11-05-21 11:44</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>MRKU3312984</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32050482">
                    <field>11-05-21 11:45</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>MSKU9633140</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32050483">
                    <field>11-05-21 11:45</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>MEDU4184320</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32050488">
                    <field>11-05-21 11:46</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>APHU7341710</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32050496">
                    <field>11-05-21 11:47</field>
                    <field>Yard Move</field>
                    <field>Export</field>
                    <field>TEMU3235874</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32050511">
                    <field>11-05-21 11:47</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>TCKU6967880</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32050514">
                    <field>11-05-21 11:47</field>
                    <field>Yard Move</field>
                    <field>Export</field>
                    <field>BMOU1295680</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32050521">
                    <field>11-05-21 11:48</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>TGBU9618850</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32050568">
                    <field>11-05-21 11:50</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>TCLU8745786</field>
                    <field />
                    <field />
                    <field />
                    <field>4538</field>
                    <field>JVA</field>
                    <field />
                </row>
                <row primary-key="32050599">
                    <field>11-05-21 11:53</field>
                    <field>Yard Move</field>
                    <field>Export</field>
                    <field>TGBU3179343</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32050628">
                    <field>11-05-21 11:55</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>TEMU3868379</field>
                    <field />
                    <field />
                    <field />
                    <field>4531</field>
                    <field>AAM</field>
                    <field />
                </row>
                <row primary-key="32050640">
                    <field>11-05-21 11:56</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>TCNU3585255</field>
                    <field />
                    <field />
                    <field />
                    <field>4538</field>
                    <field>JVA</field>
                    <field />
                </row>
                <row primary-key="32050680">
                    <field>11-05-21 12:01</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>APZU3254570</field>
                    <field />
                    <field />
                    <field />
                    <field>4538</field>
                    <field>JVA</field>
                    <field />
                </row>
                <row primary-key="32050682">
                    <field>11-05-21 12:02</field>
                    <field>Yard Move</field>
                    <field>Export</field>
                    <field>TRHU1778407</field>
                    <field />
                    <field>4531</field>
                    <field>AAM</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32050746">
                    <field>11-05-21 12:10</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>MSKU7165076</field>
                    <field />
                    <field />
                    <field />
                    <field>4538</field>
                    <field>JVA</field>
                    <field />
                </row>
                <row primary-key="32050749">
                    <field>11-05-21 12:12</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>CXDU1399724</field>
                    <field />
                    <field />
                    <field />
                    <field>4531</field>
                    <field>AAM</field>
                    <field />
                </row>
                <row primary-key="32050752">
                    <field>11-05-21 12:13</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>MSCU9054935</field>
                    <field />
                    <field />
                    <field />
                    <field>4538</field>
                    <field>JVA</field>
                    <field />
                </row>
                <row primary-key="32050754">
                    <field>11-05-21 12:13</field>
                    <field>Yard Move</field>
                    <field>Export</field>
                    <field>TEMU3868379</field>
                    <field />
                    <field>4531</field>
                    <field>AAM</field>
                    <field>4531</field>
                    <field>AAM</field>
                    <field>4531</field>
                </row>
                <row primary-key="32050778">
                    <field>11-05-21 12:15</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>AMFU3262081</field>
                    <field />
                    <field />
                    <field />
                    <field>4538</field>
                    <field>JVA</field>
                    <field />
                </row>
                <row primary-key="32050787">
                    <field>11-05-21 12:19</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>CMAU0039706</field>
                    <field />
                    <field />
                    <field />
                    <field>4538</field>
                    <field>JVA</field>
                    <field />
                </row>
                <row primary-key="32050813">
                    <field>11-05-21 12:23</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>PCIU0171045</field>
                    <field />
                    <field>4531</field>
                    <field>AAM</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32050814">
                    <field>11-05-21 12:24</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>BEAU4065033</field>
                    <field />
                    <field />
                    <field />
                    <field>4538</field>
                    <field>JVA</field>
                    <field />
                </row>
                <row primary-key="32050830">
                    <field>11-05-21 12:25</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>PCIU1338055</field>
                    <field />
                    <field>4531</field>
                    <field>AAM</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32050834">
                    <field>11-05-21 12:26</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>TEMU4704127</field>
                    <field />
                    <field />
                    <field />
                    <field>4538</field>
                    <field>JVA</field>
                    <field />
                </row>
                <row primary-key="32050874">
                    <field>11-05-21 12:35</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>TEMU3788416</field>
                    <field />
                    <field />
                    <field />
                    <field>4538</field>
                    <field>JVA</field>
                    <field />
                </row>
                <row primary-key="32050876">
                    <field>11-05-21 12:36</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>PCIU1034319</field>
                    <field />
                    <field>4531</field>
                    <field>AAM</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32050904">
                    <field>11-05-21 12:40</field>
                    <field>Yard Shift</field>
                    <field>Import</field>
                    <field>PCIU1120736</field>
                    <field />
                    <field>4531</field>
                    <field>AAM</field>
                    <field>4531</field>
                    <field>AAM</field>
                    <field>4531</field>
                </row>
                <row primary-key="32050925">
                    <field>11-05-21 12:44</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>PCIU1381350</field>
                    <field />
                    <field>4531</field>
                    <field>AAM</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32050941">
                    <field>11-05-21 12:46</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>ZIQ9672</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32051052">
                    <field>11-05-21 12:53</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>BMOU5644604</field>
                    <field />
                    <field>4532</field>
                    <field>RJE</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32051119">
                    <field>11-05-21 12:55</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>PCIU0078565</field>
                    <field />
                    <field />
                    <field />
                    <field>4538</field>
                    <field>JVA</field>
                    <field />
                </row>
                <row primary-key="32051124">
                    <field>11-05-21 12:58</field>
                    <field>Yard Shift</field>
                    <field>Import</field>
                    <field>MSKU0016506</field>
                    <field />
                    <field>4532</field>
                    <field>RJE</field>
                    <field>4532</field>
                    <field>RJE</field>
                    <field>4532</field>
                </row>
                <row primary-key="32051158">
                    <field>11-05-21 13:00</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>MSDU7983462</field>
                    <field />
                    <field />
                    <field />
                    <field>4538</field>
                    <field>JVA</field>
                    <field />
                </row>
                <row primary-key="32051159">
                    <field>11-05-21 13:00</field>
                    <field>Yard Shift</field>
                    <field>Import</field>
                    <field>MSKU8107198</field>
                    <field />
                    <field>4532</field>
                    <field>RJE</field>
                    <field>4532</field>
                    <field>RJE</field>
                    <field>4532</field>
                </row>
                <row primary-key="32051170">
                    <field>11-05-21 13:01</field>
                    <field>Yard Shift</field>
                    <field>Import</field>
                    <field>SEGU6421120</field>
                    <field />
                    <field>4532</field>
                    <field>RJE</field>
                    <field>4532</field>
                    <field>RJE</field>
                    <field>4532</field>
                </row>
                <row primary-key="32051190">
                    <field>11-05-21 13:03</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>TGHU6796865</field>
                    <field />
                    <field />
                    <field />
                    <field>4538</field>
                    <field>JVA</field>
                    <field />
                </row>
                <row primary-key="32051214">
                    <field>11-05-21 13:05</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>GESU5503949</field>
                    <field />
                    <field>4532</field>
                    <field>RJE</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32051219">
                    <field>11-05-21 13:05</field>
                    <field>Delivery</field>
                    <field>Storage</field>
                    <field>PCIU1966684</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32051220">
                    <field>11-05-21 13:06</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>MRSU0099517</field>
                    <field />
                    <field />
                    <field />
                    <field>4538</field>
                    <field>JVA</field>
                    <field />
                </row>
                <row primary-key="32051224">
                    <field>11-05-21 13:06</field>
                    <field>Delivery</field>
                    <field>Storage</field>
                    <field>PCIU1981077</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32051237">
                    <field>11-05-21 13:08</field>
                    <field>Receival</field>
                    <field>Storage</field>
                    <field>PGTU4159732</field>
                    <field />
                    <field />
                    <field />
                    <field>FL0905</field>
                    <field>MJO</field>
                    <field />
                </row>
                <row primary-key="32051239">
                    <field>11-05-21 13:08</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>CMAU4727836</field>
                    <field />
                    <field />
                    <field />
                    <field>4538</field>
                    <field>JVA</field>
                    <field />
                </row>
                <row primary-key="32051241">
                    <field>11-05-21 13:08</field>
                    <field>Yard Shift</field>
                    <field>Import</field>
                    <field>PCIU8995154</field>
                    <field />
                    <field>4532</field>
                    <field>RJE</field>
                    <field>4532</field>
                    <field>RJE</field>
                    <field>4532</field>
                </row>
                <row primary-key="32051242">
                    <field>11-05-21 13:09</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>TEMU3287651</field>
                    <field />
                    <field />
                    <field />
                    <field>4538</field>
                    <field>JVA</field>
                    <field />
                </row>
                <row primary-key="32051265">
                    <field>11-05-21 13:11</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>PCIU1639634</field>
                    <field />
                    <field>4529</field>
                    <field>DLE</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32051266">
                    <field>11-05-21 13:11</field>
                    <field>Yard Shift</field>
                    <field>Import</field>
                    <field>PCIU8844230</field>
                    <field />
                    <field>4532</field>
                    <field>RJE</field>
                    <field>4532</field>
                    <field>RJE</field>
                    <field>4532</field>
                </row>
                <row primary-key="32051288">
                    <field>11-05-21 13:12</field>
                    <field>Yard Shift</field>
                    <field>Import</field>
                    <field>DRYU2345920</field>
                    <field />
                    <field>4529</field>
                    <field>DLE</field>
                    <field>4529</field>
                    <field>DLE</field>
                    <field>4529</field>
                </row>
                <row primary-key="32051289">
                    <field>11-05-21 13:12</field>
                    <field>Yard Shift</field>
                    <field>Import</field>
                    <field>TCKU3075149</field>
                    <field />
                    <field>4529</field>
                    <field>DLE</field>
                    <field>4529</field>
                    <field>DLE</field>
                    <field>4529</field>
                </row>
                <row primary-key="32051290">
                    <field>11-05-21 13:13</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>MRKU6405360</field>
                    <field />
                    <field>4532</field>
                    <field>RJE</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32051300">
                    <field>11-05-21 13:13</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>PCIU1120736</field>
                    <field />
                    <field>4541</field>
                    <field>MSB</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32051348">
                    <field>11-05-21 13:17</field>
                    <field>Receival</field>
                    <field>Storage</field>
                    <field>CGMU5152478</field>
                    <field />
                    <field />
                    <field />
                    <field>4525</field>
                    <field>APM</field>
                    <field />
                </row>
                <row primary-key="32051350">
                    <field>11-05-21 13:17</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>PCIU2910397</field>
                    <field />
                    <field>4541</field>
                    <field>MSB</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32051357">
                    <field>11-05-21 13:17</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>TCNU7576483</field>
                    <field />
                    <field />
                    <field />
                    <field>4538</field>
                    <field>JVA</field>
                    <field />
                </row>
                <row primary-key="32051360">
                    <field>11-05-21 13:17</field>
                    <field>Yard Shift</field>
                    <field>Import</field>
                    <field>PCIU0110538</field>
                    <field />
                    <field>4540</field>
                    <field>ZME</field>
                    <field>4540</field>
                    <field>ZME</field>
                    <field>4540</field>
                </row>
                <row primary-key="32051368">
                    <field>11-05-21 13:18</field>
                    <field>Yard Shift</field>
                    <field>Import</field>
                    <field>TGBU5880943</field>
                    <field />
                    <field>4532</field>
                    <field>RJE</field>
                    <field>4532</field>
                    <field>RJE</field>
                    <field>4532</field>
                </row>
                <row primary-key="32051376">
                    <field>11-05-21 13:18</field>
                    <field>Yard Shift</field>
                    <field>Import</field>
                    <field>PCIU0162399</field>
                    <field />
                    <field>4540</field>
                    <field>ZME</field>
                    <field>4540</field>
                    <field>ZME</field>
                    <field>4540</field>
                </row>
                <row primary-key="32051394">
                    <field>11-05-21 13:19</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>PCIU1781994</field>
                    <field />
                    <field>4529</field>
                    <field>DLE</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32051437">
                    <field>11-05-21 13:20</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>PCIU1591891</field>
                    <field />
                    <field>4540</field>
                    <field>ZME</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32051438">
                    <field>11-05-21 13:20</field>
                    <field>Yard Shift</field>
                    <field>Import</field>
                    <field>TCNU1141502</field>
                    <field />
                    <field>4532</field>
                    <field>RJE</field>
                    <field>4532</field>
                    <field>RJE</field>
                    <field>4532</field>
                </row>
                <row primary-key="32051440">
                    <field>11-05-21 13:20</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>CAIU4709824</field>
                    <field />
                    <field>4532</field>
                    <field>RJE</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32051487">
                    <field>11-05-21 13:22</field>
                    <field>Yard Shift</field>
                    <field>Import</field>
                    <field>PCIU1678369</field>
                    <field />
                    <field>4529</field>
                    <field>DLE</field>
                    <field>4529</field>
                    <field>DLE</field>
                    <field>4529</field>
                </row>
                <row primary-key="32051490">
                    <field>11-05-21 13:22</field>
                    <field>Delivery</field>
                    <field>Storage</field>
                    <field>MEDU2247013</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32051501">
                    <field>11-05-21 13:23</field>
                    <field>Delivery</field>
                    <field>Storage</field>
                    <field>CAIU6680118</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32051508">
                    <field>11-05-21 13:24</field>
                    <field>Yard Shift</field>
                    <field>Import</field>
                    <field>SEGU1708483</field>
                    <field />
                    <field>4529</field>
                    <field>DLE</field>
                    <field>4529</field>
                    <field>DLE</field>
                    <field>4529</field>
                </row>
                <row primary-key="32051509">
                    <field>11-05-21 13:24</field>
                    <field>Yard Shift</field>
                    <field>Import</field>
                    <field>CAIU3336270</field>
                    <field />
                    <field>4540</field>
                    <field>ZME</field>
                    <field>4540</field>
                    <field>ZME</field>
                    <field>4540</field>
                </row>
                <row primary-key="32051532">
                    <field>11-05-21 13:25</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>CAXU9610332</field>
                    <field />
                    <field />
                    <field />
                    <field>4533</field>
                    <field>GPA</field>
                    <field />
                </row>
                <row primary-key="32051536">
                    <field>11-05-21 13:25</field>
                    <field>Yard Shift</field>
                    <field>Import</field>
                    <field>PRSU8862079</field>
                    <field />
                    <field>4532</field>
                    <field>RJE</field>
                    <field>4532</field>
                    <field>RJE</field>
                    <field>4532</field>
                </row>
                <row primary-key="32051540">
                    <field>11-05-21 13:26</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>PCIU1283878</field>
                    <field />
                    <field>4540</field>
                    <field>ZME</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32051550">
                    <field>11-05-21 13:27</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>PCIU1391635</field>
                    <field />
                    <field>4529</field>
                    <field>DLE</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32051607">
                    <field>11-05-21 13:30</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>TCKU3194940</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32051609">
                    <field>11-05-21 13:30</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>MEDU5497119</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32051608">
                    <field>11-05-21 13:30</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>MEDU6564084</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32051610">
                    <field>11-05-21 13:30</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>BSIU2926169</field>
                    <field />
                    <field />
                    <field />
                    <field>4519</field>
                    <field>AOC</field>
                    <field />
                </row>
                <row primary-key="32051622">
                    <field>11-05-21 13:32</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>TRHU3883973</field>
                    <field />
                    <field />
                    <field />
                    <field>4532</field>
                    <field>RJE</field>
                    <field />
                </row>
                <row primary-key="32051644">
                    <field>11-05-21 13:32</field>
                    <field>Yard Shift</field>
                    <field>Import</field>
                    <field>PCIU1265468</field>
                    <field />
                    <field>4529</field>
                    <field>DLE</field>
                    <field>4529</field>
                    <field>DLE</field>
                    <field>4529</field>
                </row>
                <row primary-key="32051650">
                    <field>11-05-21 13:33</field>
                    <field>Yard Shift</field>
                    <field>Import</field>
                    <field>PCIU1205915</field>
                    <field />
                    <field>4529</field>
                    <field>DLE</field>
                    <field>4529</field>
                    <field>DLE</field>
                    <field>4529</field>
                </row>
                <row primary-key="32051652">
                    <field>11-05-21 13:33</field>
                    <field>Yard Shift</field>
                    <field>Import</field>
                    <field>PRSU8862079</field>
                    <field />
                    <field>4541</field>
                    <field>MSB</field>
                    <field>4541</field>
                    <field>MSB</field>
                    <field>4541</field>
                </row>
                <row primary-key="32051653">
                    <field>11-05-21 13:33</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>GLDU5568421</field>
                    <field />
                    <field />
                    <field />
                    <field>4538</field>
                    <field>JVA</field>
                    <field />
                </row>
                <row primary-key="32051657">
                    <field>11-05-21 13:33</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>MSKU5787851</field>
                    <field />
                    <field />
                    <field />
                    <field>4538</field>
                    <field>JVA</field>
                    <field />
                </row>
                <row primary-key="32051665">
                    <field>11-05-21 13:34</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>HASU1365020</field>
                    <field />
                    <field />
                    <field />
                    <field>4538</field>
                    <field>JVA</field>
                    <field />
                </row>
                <row primary-key="32051693">
                    <field>11-05-21 13:35</field>
                    <field>Yard Move</field>
                    <field>Export</field>
                    <field>MSDU1510483</field>
                    <field />
                    <field>4538</field>
                    <field>JVA</field>
                    <field>4540</field>
                    <field>ZME</field>
                    <field>2520</field>
                </row>
                <row primary-key="32051704">
                    <field>11-05-21 13:35</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>CAIU6282264</field>
                    <field />
                    <field />
                    <field />
                    <field>4538</field>
                    <field>JVA</field>
                    <field />
                </row>
                <row primary-key="32051708">
                    <field>11-05-21 13:35</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>CMAU7659144</field>
                    <field />
                    <field>4541</field>
                    <field>MSB</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32051719">
                    <field>11-05-21 13:36</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>PCIU1096727</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32051720">
                    <field>11-05-21 13:36</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>GESU3718090</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32051721">
                    <field>11-05-21 13:36</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>PCIU1679874</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32051742">
                    <field>11-05-21 13:38</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>TLLU2313150</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32051743">
                    <field>11-05-21 13:38</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>TTNU1167536</field>
                    <field />
                    <field />
                    <field />
                    <field>4528</field>
                    <field>AAL</field>
                    <field />
                </row>
                <row primary-key="32051746">
                    <field>11-05-21 13:39</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>CAIU9385564</field>
                    <field />
                    <field />
                    <field />
                    <field>4532</field>
                    <field>RJE</field>
                    <field />
                </row>
                <row primary-key="32051784">
                    <field>11-05-21 13:41</field>
                    <field>Yard Move</field>
                    <field>Export</field>
                    <field>CAIU9385564</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32051785">
                    <field>11-05-21 13:41</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>PCIU1926146</field>
                    <field />
                    <field>4529</field>
                    <field>DLE</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32051806">
                    <field>11-05-21 13:42</field>
                    <field>Delivery</field>
                    <field>Storage</field>
                    <field>PCIU1591593</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32051822">
                    <field>11-05-21 13:43</field>
                    <field>Delivery</field>
                    <field>Storage</field>
                    <field>PCIU1390583</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32051828">
                    <field>11-05-21 13:43</field>
                    <field>Yard Move</field>
                    <field>Export</field>
                    <field>TEMU3509445</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32051829">
                    <field>11-05-21 13:44</field>
                    <field>Yard Move</field>
                    <field>Storage</field>
                    <field>SUDU1431634</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32051830">
                    <field>11-05-21 13:44</field>
                    <field>Yard Move</field>
                    <field>Storage</field>
                    <field>MRKU7082447</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32051831">
                    <field>11-05-21 13:44</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>CMAU0463458</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32051832">
                    <field>11-05-21 13:44</field>
                    <field>Yard Shift</field>
                    <field>Import</field>
                    <field>MEDU3465529</field>
                    <field />
                    <field>4529</field>
                    <field>DLE</field>
                    <field>4529</field>
                    <field>DLE</field>
                    <field>4529</field>
                </row>
                <row primary-key="32051833">
                    <field>11-05-21 13:44</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>ST93565</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32051857">
                    <field>11-05-21 13:45</field>
                    <field>Yard Move</field>
                    <field>Export</field>
                    <field>TEMU3509445</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32051876">
                    <field>11-05-21 13:45</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>MRKU5070215</field>
                    <field />
                    <field />
                    <field />
                    <field>4531</field>
                    <field>AAM</field>
                    <field />
                </row>
                <row primary-key="32051906">
                    <field>11-05-21 13:47</field>
                    <field>Yard Shift</field>
                    <field>Import</field>
                    <field>MRKU3384201</field>
                    <field />
                    <field>4541</field>
                    <field>MSB</field>
                    <field>4541</field>
                    <field>MSB</field>
                    <field>4541</field>
                </row>
                <row primary-key="32051907">
                    <field>11-05-21 13:47</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>PCIU1146880</field>
                    <field />
                    <field>4529</field>
                    <field>DLE</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32051913">
                    <field>11-05-21 13:48</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>GESU6453230</field>
                    <field />
                    <field />
                    <field />
                    <field>4532</field>
                    <field>RJE</field>
                    <field />
                </row>
                <row primary-key="32051925">
                    <field>11-05-21 13:48</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>MSKU4269945</field>
                    <field />
                    <field />
                    <field />
                    <field>4531</field>
                    <field>AAM</field>
                    <field />
                </row>
                <row primary-key="32051928">
                    <field>11-05-21 13:49</field>
                    <field>Receival</field>
                    <field>Storage</field>
                    <field>GCXU5092912</field>
                    <field />
                    <field />
                    <field />
                    <field>FL0905</field>
                    <field>MJO</field>
                    <field />
                </row>
                <row primary-key="32051949">
                    <field>11-05-21 13:50</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>MRKU8055343</field>
                    <field />
                    <field />
                    <field />
                    <field>4538</field>
                    <field>JVA</field>
                    <field />
                </row>
                <row primary-key="32051960">
                    <field>11-05-21 13:50</field>
                    <field>Yard Shift</field>
                    <field>Import</field>
                    <field>MSCU5264234</field>
                    <field />
                    <field>4541</field>
                    <field>MSB</field>
                    <field>4541</field>
                    <field>MSB</field>
                    <field>4541</field>
                </row>
                <row primary-key="32052018">
                    <field>11-05-21 13:53</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>MRKU3510700</field>
                    <field />
                    <field>4541</field>
                    <field>MSB</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32052023">
                    <field>11-05-21 13:53</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>PCIU1567792</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32052021">
                    <field>11-05-21 13:53</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>PCIU1220756</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32052022">
                    <field>11-05-21 13:53</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>PCIU1821063</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32052024">
                    <field>11-05-21 13:53</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>BMOU2550570</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32052027">
                    <field>11-05-21 13:53</field>
                    <field>Yard Move</field>
                    <field>Export</field>
                    <field>MEDU5456716</field>
                    <field />
                    <field>4538</field>
                    <field>JVA</field>
                    <field>4540</field>
                    <field>ZME</field>
                    <field>2520</field>
                </row>
                <row primary-key="32052026">
                    <field>11-05-21 13:53</field>
                    <field>Yard Move</field>
                    <field>Export</field>
                    <field>FCIU4312352</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32052028">
                    <field>11-05-21 13:53</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>ZIQ9651</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32052041">
                    <field>11-05-21 13:54</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>MSKU7904577</field>
                    <field />
                    <field />
                    <field />
                    <field>4529</field>
                    <field>DLE</field>
                    <field />
                </row>
                <row primary-key="32052060">
                    <field>11-05-21 13:55</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>TEMU5329340</field>
                    <field />
                    <field />
                    <field />
                    <field>4528</field>
                    <field>AAL</field>
                    <field />
                </row>
                <row primary-key="32052072">
                    <field>11-05-21 13:56</field>
                    <field>Yard Move</field>
                    <field>Export</field>
                    <field>GLDU3451190</field>
                    <field />
                    <field>4538</field>
                    <field>JVA</field>
                    <field>4540</field>
                    <field>ZME</field>
                    <field>2517</field>
                </row>
                <row primary-key="32052074">
                    <field>11-05-21 13:56</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>PCIU2850338</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32052075">
                    <field>11-05-21 13:56</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>PCIU1966323</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32052076">
                    <field>11-05-21 13:56</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>BMOU2055112</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32052087">
                    <field>11-05-21 13:56</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>PCIU1375629</field>
                    <field />
                    <field />
                    <field />
                    <field>4532</field>
                    <field>RJE</field>
                    <field />
                </row>
                <row primary-key="32052105">
                    <field>11-05-21 13:57</field>
                    <field>Yard Move</field>
                    <field>Export</field>
                    <field>MRKU6847608</field>
                    <field />
                    <field>4538</field>
                    <field>JVA</field>
                    <field>4538</field>
                    <field>JVA</field>
                    <field>2512</field>
                </row>
                <row primary-key="32052106">
                    <field>11-05-21 13:57</field>
                    <field>Yard Move</field>
                    <field>Export</field>
                    <field>PCIU1375629</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32052107">
                    <field>11-05-21 13:57</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>ECMU2228954</field>
                    <field />
                    <field />
                    <field />
                    <field>4528</field>
                    <field>AAL</field>
                    <field />
                </row>
                <row primary-key="32052110">
                    <field>11-05-21 13:58</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>MEDU2771761</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32052111">
                    <field>11-05-21 13:58</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>PCIU1957487</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32052112">
                    <field>11-05-21 13:58</field>
                    <field>Yard Move</field>
                    <field>Export</field>
                    <field>MEDU3136101</field>
                    <field />
                    <field>4538</field>
                    <field>JVA</field>
                    <field>4540</field>
                    <field>ZME</field>
                    <field>2525</field>
                </row>
                <row primary-key="32052118">
                    <field>11-05-21 13:58</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>MRSU0144426</field>
                    <field />
                    <field />
                    <field />
                    <field>4531</field>
                    <field>AAM</field>
                    <field />
                </row>
                <row primary-key="32052122">
                    <field>11-05-21 13:58</field>
                    <field>Delivery</field>
                    <field>Storage</field>
                    <field>PCIU2847463</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32052126">
                    <field>11-05-21 13:59</field>
                    <field>Delivery</field>
                    <field>Storage</field>
                    <field>PCIU0173217</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32052153">
                    <field>11-05-21 14:02</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>HASU4923050</field>
                    <field />
                    <field>4533</field>
                    <field>GPA</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32052159">
                    <field>11-05-21 14:03</field>
                    <field>Yard Shift</field>
                    <field>Import</field>
                    <field>CMAU5185576</field>
                    <field />
                    <field>4532</field>
                    <field>RJE</field>
                    <field>4532</field>
                    <field>RJE</field>
                    <field>4532</field>
                </row>
                <row primary-key="32052166">
                    <field>11-05-21 14:04</field>
                    <field>Yard Move</field>
                    <field>Export</field>
                    <field>TEMU3744892</field>
                    <field />
                    <field>4538</field>
                    <field>JVA</field>
                    <field>4540</field>
                    <field>ZME</field>
                    <field>2526</field>
                </row>
                <row primary-key="32052198">
                    <field>11-05-21 14:06</field>
                    <field>Receival</field>
                    <field>Storage</field>
                    <field>PCIU8614664</field>
                    <field />
                    <field />
                    <field />
                    <field>FL0905</field>
                    <field>MJO</field>
                    <field />
                </row>
                <row primary-key="32052197">
                    <field>11-05-21 14:06</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>PCIU1555723</field>
                    <field />
                    <field>4529</field>
                    <field>DLE</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32052208">
                    <field>11-05-21 14:06</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>ZIQ9653</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32052255">
                    <field>11-05-21 14:09</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>APZU4301784</field>
                    <field />
                    <field>4532</field>
                    <field>RJE</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32052408">
                    <field>11-05-21 14:14</field>
                    <field>Yard Move</field>
                    <field>Export</field>
                    <field>CAIU6376208</field>
                    <field />
                    <field>4538</field>
                    <field>JVA</field>
                    <field>4540</field>
                    <field>ZME</field>
                    <field>2520</field>
                </row>
                <row primary-key="32052449">
                    <field>11-05-21 14:15</field>
                    <field>Yard Move</field>
                    <field>Export</field>
                    <field>BEAU2075285</field>
                    <field />
                    <field>4538</field>
                    <field>JVA</field>
                    <field>4540</field>
                    <field>ZME</field>
                    <field>2517</field>
                </row>
                <row primary-key="32052469">
                    <field>11-05-21 14:18</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>ZIQ9632</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32052484">
                    <field>11-05-21 14:19</field>
                    <field>Yard Move</field>
                    <field>Export</field>
                    <field>TEMU3868379</field>
                    <field />
                    <field>4540</field>
                    <field>ZME</field>
                    <field>4540</field>
                    <field>ZME</field>
                    <field>2511</field>
                </row>
                <row primary-key="32052565">
                    <field>11-05-21 14:22</field>
                    <field>Yard Move</field>
                    <field>Export</field>
                    <field>CXDU1399724</field>
                    <field />
                    <field>4540</field>
                    <field>ZME</field>
                    <field>4540</field>
                    <field>ZME</field>
                    <field>2511</field>
                </row>
                <row primary-key="32052584">
                    <field>11-05-21 14:23</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>PCIU2804986</field>
                    <field />
                    <field>4531</field>
                    <field>AAM</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32052606">
                    <field>11-05-21 14:25</field>
                    <field>Yard Shift</field>
                    <field>Import</field>
                    <field>PCIU9485957</field>
                    <field />
                    <field>4525</field>
                    <field>APM</field>
                    <field>4525</field>
                    <field>APM</field>
                    <field>4525</field>
                </row>
                <row primary-key="32052616">
                    <field>11-05-21 14:26</field>
                    <field>Yard Move</field>
                    <field>Export</field>
                    <field>UNIU2039271</field>
                    <field />
                    <field>4538</field>
                    <field>JVA</field>
                    <field>4540</field>
                    <field>ZME</field>
                    <field>2520</field>
                </row>
                <row primary-key="32052678">
                    <field>11-05-21 14:28</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>TLLU2825882</field>
                    <field />
                    <field />
                    <field />
                    <field>4531</field>
                    <field>AAM</field>
                    <field />
                </row>
                <row primary-key="32052685">
                    <field>11-05-21 14:28</field>
                    <field>Yard Move</field>
                    <field>Export</field>
                    <field>CMAU2061735</field>
                    <field />
                    <field>4538</field>
                    <field>JVA</field>
                    <field>4540</field>
                    <field>ZME</field>
                    <field>2517</field>
                </row>
                <row primary-key="32052693">
                    <field>11-05-21 14:29</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>TEMU3168605</field>
                    <field />
                    <field />
                    <field />
                    <field>4528</field>
                    <field>AAL</field>
                    <field />
                </row>
                <row primary-key="32052700">
                    <field>11-05-21 14:29</field>
                    <field>Receival</field>
                    <field>Storage</field>
                    <field>PCIU8523651</field>
                    <field />
                    <field />
                    <field />
                    <field>FL0905</field>
                    <field>MJO</field>
                    <field />
                </row>
                <row primary-key="32052719">
                    <field>11-05-21 14:30</field>
                    <field>Receival</field>
                    <field>Storage</field>
                    <field>PCIU8486650</field>
                    <field />
                    <field />
                    <field />
                    <field>FL0905</field>
                    <field>MJO</field>
                    <field />
                </row>
                <row primary-key="32052720">
                    <field>11-05-21 14:30</field>
                    <field>Yard Move</field>
                    <field>Export</field>
                    <field>CAIU3061830</field>
                    <field />
                    <field>4538</field>
                    <field>JVA</field>
                    <field>4540</field>
                    <field>ZME</field>
                    <field>2527</field>
                </row>
                <row primary-key="32052726">
                    <field>11-05-21 14:30</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>TCLU2518980</field>
                    <field />
                    <field />
                    <field />
                    <field>4529</field>
                    <field>DLE</field>
                    <field />
                </row>
                <row primary-key="32052733">
                    <field>11-05-21 14:31</field>
                    <field>Yard Move</field>
                    <field>Export</field>
                    <field>TLLU2825882</field>
                    <field />
                    <field>4528</field>
                    <field>AAL</field>
                    <field>4528</field>
                    <field>AAL</field>
                    <field>4528</field>
                </row>
                <row primary-key="32052734">
                    <field>11-05-21 14:32</field>
                    <field>Yard Move</field>
                    <field>Export</field>
                    <field>TEMU3168605</field>
                    <field />
                    <field>4528</field>
                    <field>AAL</field>
                    <field>4528</field>
                    <field>AAL</field>
                    <field>4528</field>
                </row>
                <row primary-key="32052735">
                    <field>11-05-21 14:32</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>DRYU9719235</field>
                    <field />
                    <field />
                    <field />
                    <field>4541</field>
                    <field>MSB</field>
                    <field />
                </row>
                <row primary-key="32052742">
                    <field>11-05-21 14:34</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>CMAU1709382</field>
                    <field />
                    <field />
                    <field />
                    <field>4528</field>
                    <field>AAL</field>
                    <field />
                </row>
                <row primary-key="32052744">
                    <field>11-05-21 14:34</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>MEDU2570670</field>
                    <field />
                    <field />
                    <field />
                    <field>4531</field>
                    <field>AAM</field>
                    <field />
                </row>
                <row primary-key="32052746">
                    <field>11-05-21 14:34</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>PCIU8716286</field>
                    <field />
                    <field>4532</field>
                    <field>RJE</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32052778">
                    <field>11-05-21 14:35</field>
                    <field>Yard Shift</field>
                    <field>Import</field>
                    <field>TCKU3194940</field>
                    <field />
                    <field>4529</field>
                    <field>DLE</field>
                    <field>4529</field>
                    <field>DLE</field>
                    <field>4529</field>
                </row>
                <row primary-key="32052779">
                    <field>11-05-21 14:35</field>
                    <field>Yard Shift</field>
                    <field>Import</field>
                    <field>MEDU6564084</field>
                    <field />
                    <field>4529</field>
                    <field>DLE</field>
                    <field>4529</field>
                    <field>DLE</field>
                    <field>4529</field>
                </row>
                <row primary-key="32052780">
                    <field>11-05-21 14:35</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>PCIU8461884</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32052783">
                    <field>11-05-21 14:37</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>PCIU9070396</field>
                    <field />
                    <field>4541</field>
                    <field>MSB</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32052787">
                    <field>11-05-21 14:37</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>PCIU9358401</field>
                    <field />
                    <field>4533</field>
                    <field>GPA</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32052790">
                    <field>11-05-21 14:38</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>ECMU1923817</field>
                    <field />
                    <field />
                    <field />
                    <field>4528</field>
                    <field>AAL</field>
                    <field />
                </row>
                <row primary-key="32052793">
                    <field>11-05-21 14:38</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>PCIU9102298</field>
                    <field />
                    <field>4525</field>
                    <field>APM</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32052804">
                    <field>11-05-21 14:39</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>ECMU1617150</field>
                    <field />
                    <field />
                    <field />
                    <field>4528</field>
                    <field>AAL</field>
                    <field />
                </row>
                <row primary-key="32052806">
                    <field>11-05-21 14:39</field>
                    <field>Receival</field>
                    <field>Storage</field>
                    <field>CGMU5173450</field>
                    <field />
                    <field />
                    <field />
                    <field>4533</field>
                    <field>GPA</field>
                    <field />
                </row>
                <row primary-key="32052808">
                    <field>11-05-21 14:39</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>MRKU9760733</field>
                    <field />
                    <field />
                    <field />
                    <field>4532</field>
                    <field>RJE</field>
                    <field />
                </row>
                <row primary-key="32052837">
                    <field>11-05-21 14:41</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>MEDU5497119</field>
                    <field />
                    <field>4529</field>
                    <field>DLE</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32052843">
                    <field>11-05-21 14:42</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>PCIU9136997</field>
                    <field />
                    <field>4533</field>
                    <field>GPA</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32052850">
                    <field>11-05-21 14:42</field>
                    <field>Yard Shift</field>
                    <field>Import</field>
                    <field>MSKU7460549</field>
                    <field />
                    <field>4529</field>
                    <field>DLE</field>
                    <field>4529</field>
                    <field>DLE</field>
                    <field>4529</field>
                </row>
                <row primary-key="32052874">
                    <field>11-05-21 14:44</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>PCIU9255487</field>
                    <field />
                    <field>4531</field>
                    <field>AAM</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32052881">
                    <field>11-05-21 14:44</field>
                    <field>Yard Shift</field>
                    <field>Import</field>
                    <field>PCIU0184417</field>
                    <field />
                    <field>4532</field>
                    <field>RJE</field>
                    <field>4532</field>
                    <field>RJE</field>
                    <field>4532</field>
                </row>
                <row primary-key="32052899">
                    <field>11-05-21 14:45</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>CMAU0989397</field>
                    <field />
                    <field />
                    <field />
                    <field>4528</field>
                    <field>AAL</field>
                    <field />
                </row>
                <row primary-key="32052902">
                    <field>11-05-21 14:45</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>CMAU7806991</field>
                    <field />
                    <field />
                    <field />
                    <field>4538</field>
                    <field>JVA</field>
                    <field />
                </row>
                <row primary-key="32052903">
                    <field>11-05-21 14:46</field>
                    <field>Yard Shift</field>
                    <field>Import</field>
                    <field>GLDU5690851</field>
                    <field />
                    <field>4532</field>
                    <field>RJE</field>
                    <field>4532</field>
                    <field>RJE</field>
                    <field>4532</field>
                </row>
                <row primary-key="32052911">
                    <field>11-05-21 14:47</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>CMAU0478313</field>
                    <field />
                    <field />
                    <field />
                    <field>4528</field>
                    <field>AAL</field>
                    <field />
                </row>
                <row primary-key="32052914">
                    <field>11-05-21 14:47</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>MRKU7811467</field>
                    <field />
                    <field>4525</field>
                    <field>APM</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32052918">
                    <field>11-05-21 14:48</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>PCIU2843431</field>
                    <field />
                    <field>4532</field>
                    <field>RJE</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32052923">
                    <field>11-05-21 14:49</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>FCIU4580695</field>
                    <field />
                    <field />
                    <field />
                    <field>4528</field>
                    <field>AAL</field>
                    <field />
                </row>
                <row primary-key="32052928">
                    <field>11-05-21 14:49</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>TRHU5613318</field>
                    <field />
                    <field>4531</field>
                    <field>AAM</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32052954">
                    <field>11-05-21 14:50</field>
                    <field>Yard Shift</field>
                    <field>Import</field>
                    <field>PCIU1396257</field>
                    <field />
                    <field>4532</field>
                    <field>RJE</field>
                    <field>4532</field>
                    <field>RJE</field>
                    <field>4532</field>
                </row>
                <row primary-key="32052957">
                    <field>11-05-21 14:50</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>ZIQ9641</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32052960">
                    <field>11-05-21 14:51</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>FCIU4476823</field>
                    <field />
                    <field />
                    <field />
                    <field>4538</field>
                    <field>JVA</field>
                    <field />
                </row>
                <row primary-key="32052965">
                    <field>11-05-21 14:51</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>PCIU1652723</field>
                    <field />
                    <field>4519</field>
                    <field>AOC</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32052966">
                    <field>11-05-21 14:52</field>
                    <field>Yard Shift</field>
                    <field>Import</field>
                    <field>PCIU1669623</field>
                    <field />
                    <field>4532</field>
                    <field>RJE</field>
                    <field>4532</field>
                    <field>RJE</field>
                    <field>4532</field>
                </row>
                <row primary-key="32052970">
                    <field>11-05-21 14:52</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>PONU0272386</field>
                    <field />
                    <field>4541</field>
                    <field>MSB</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32052976">
                    <field>11-05-21 14:53</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>MSKU7460549</field>
                    <field />
                    <field>4525</field>
                    <field>APM</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32052978">
                    <field>11-05-21 14:54</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>CMAU1568290</field>
                    <field />
                    <field />
                    <field />
                    <field>4528</field>
                    <field>AAL</field>
                    <field />
                </row>
                <row primary-key="32052986">
                    <field>11-05-21 14:54</field>
                    <field>Delivery</field>
                    <field>Storage</field>
                    <field>PCIU1766916</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32052996">
                    <field>11-05-21 14:54</field>
                    <field>Delivery</field>
                    <field>Storage</field>
                    <field>PCIU2815928</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32053024">
                    <field>11-05-21 14:56</field>
                    <field>Delivery</field>
                    <field>Storage</field>
                    <field>PCIU1418485</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32053075">
                    <field>11-05-21 15:02</field>
                    <field>Yard Move</field>
                    <field>Export</field>
                    <field>MEDU5473400</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32053076">
                    <field>11-05-21 15:02</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>CMAU9102672</field>
                    <field />
                    <field>4531</field>
                    <field>AAM</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32053080">
                    <field>11-05-21 15:03</field>
                    <field>Yard Shift</field>
                    <field>Import</field>
                    <field>PCIU1167712</field>
                    <field />
                    <field>4525</field>
                    <field>APM</field>
                    <field>4525</field>
                    <field>APM</field>
                    <field>4525</field>
                </row>
                <row primary-key="32053097">
                    <field>11-05-21 15:04</field>
                    <field>Discharge</field>
                    <field>Import</field>
                    <field>INKU2418748</field>
                    <field>QC3</field>
                    <field>QC3</field>
                    <field />
                    <field>4533</field>
                    <field>GPA</field>
                    <field>2519</field>
                </row>
                <row primary-key="32053116">
                    <field>11-05-21 15:04</field>
                    <field>Yard Shift</field>
                    <field>Import</field>
                    <field>PCIU8721739</field>
                    <field />
                    <field>4528</field>
                    <field>AAL</field>
                    <field>4528</field>
                    <field>AAL</field>
                    <field>4528</field>
                </row>
                <row primary-key="32053139">
                    <field>11-05-21 15:06</field>
                    <field>Discharge</field>
                    <field>Import</field>
                    <field>WOLU0080146</field>
                    <field>QC3</field>
                    <field>QC3</field>
                    <field />
                    <field>4533</field>
                    <field>GPA</field>
                    <field>2519</field>
                </row>
                <row primary-key="32053138">
                    <field>11-05-21 15:06</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>PCIU1587192</field>
                    <field />
                    <field>4525</field>
                    <field>APM</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32053148">
                    <field>11-05-21 15:06</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>TCLU2334957</field>
                    <field />
                    <field>4532</field>
                    <field>RJE</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32053162">
                    <field>11-05-21 15:06</field>
                    <field>Discharge</field>
                    <field>Import</field>
                    <field>TCLU5179598</field>
                    <field>QC3</field>
                    <field>QC3</field>
                    <field />
                    <field>4533</field>
                    <field>GPA</field>
                    <field>2519</field>
                </row>
                <row primary-key="32053205">
                    <field>11-05-21 15:09</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>HASU1182101</field>
                    <field />
                    <field>4541</field>
                    <field>MSB</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32053220">
                    <field>11-05-21 15:10</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>BMOU2571130</field>
                    <field />
                    <field>4531</field>
                    <field>AAM</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32053232">
                    <field>11-05-21 15:11</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>FCIU3000771</field>
                    <field />
                    <field />
                    <field />
                    <field>4532</field>
                    <field>RJE</field>
                    <field />
                </row>
                <row primary-key="32053294">
                    <field>11-05-21 15:13</field>
                    <field>Yard Shift</field>
                    <field>Import</field>
                    <field>PCIU9485957</field>
                    <field />
                    <field>4525</field>
                    <field>APM</field>
                    <field>4525</field>
                    <field>APM</field>
                    <field>4525</field>
                </row>
                <row primary-key="32053315">
                    <field>11-05-21 15:14</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>BMOU4911286</field>
                    <field />
                    <field>4528</field>
                    <field>AAL</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32053362">
                    <field>11-05-21 15:16</field>
                    <field>Yard Move</field>
                    <field>Export</field>
                    <field>FCIU3000771</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32053361">
                    <field>11-05-21 15:16</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>FSCU8606930</field>
                    <field />
                    <field />
                    <field />
                    <field>4531</field>
                    <field>AAM</field>
                    <field />
                </row>
                <row primary-key="32053381">
                    <field>11-05-21 15:17</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>TRHU2852690</field>
                    <field />
                    <field />
                    <field />
                    <field>4528</field>
                    <field>AAL</field>
                    <field />
                </row>
                <row primary-key="32053409">
                    <field>11-05-21 15:18</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>MRKU2453210</field>
                    <field />
                    <field>4525</field>
                    <field>APM</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32053451">
                    <field>11-05-21 15:20</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>MAXU6252071</field>
                    <field />
                    <field>4533</field>
                    <field>GPA</field>
                    <field>4533</field>
                    <field>GPA</field>
                    <field>4533</field>
                </row>
                <row primary-key="32053499">
                    <field>11-05-21 15:22</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>MRKU7068942</field>
                    <field />
                    <field />
                    <field />
                    <field>4531</field>
                    <field>AAM</field>
                    <field />
                </row>
                <row primary-key="32053501">
                    <field>11-05-21 15:22</field>
                    <field>Yard Shift</field>
                    <field>Import</field>
                    <field>PCIU0076238</field>
                    <field />
                    <field>4528</field>
                    <field>AAL</field>
                    <field>4528</field>
                    <field>AAL</field>
                    <field>4528</field>
                </row>
                <row primary-key="32053502">
                    <field>11-05-21 15:22</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>CRXU9927384</field>
                    <field />
                    <field>4533</field>
                    <field>GPA</field>
                    <field>4533</field>
                    <field>GPA</field>
                    <field>4533</field>
                </row>
                <row primary-key="32053505">
                    <field>11-05-21 15:23</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>PCIU8288017</field>
                    <field />
                    <field>4533</field>
                    <field>GPA</field>
                    <field>4533</field>
                    <field>GPA</field>
                    <field>4533</field>
                </row>
                <row primary-key="32053506">
                    <field>11-05-21 15:23</field>
                    <field>Yard Shift</field>
                    <field>Import</field>
                    <field>HASU1058235</field>
                    <field />
                    <field>4528</field>
                    <field>AAL</field>
                    <field>4528</field>
                    <field>AAL</field>
                    <field>4528</field>
                </row>
                <row primary-key="32053508">
                    <field>11-05-21 15:23</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>KKFU7177315</field>
                    <field />
                    <field>4533</field>
                    <field>GPA</field>
                    <field>4533</field>
                    <field>GPA</field>
                    <field>4533</field>
                </row>
                <row primary-key="32053540">
                    <field>11-05-21 15:25</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>TCLU3236404</field>
                    <field />
                    <field>4529</field>
                    <field>DLE</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32053546">
                    <field>11-05-21 15:27</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>SUDU1821458</field>
                    <field />
                    <field>4541</field>
                    <field>MSB</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32053553">
                    <field>11-05-21 15:27</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>MRKU8919950</field>
                    <field />
                    <field>4528</field>
                    <field>AAL</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32053598">
                    <field>11-05-21 15:28</field>
                    <field>Yard Shift</field>
                    <field>Import</field>
                    <field>TRHU3865199</field>
                    <field />
                    <field>4525</field>
                    <field>APM</field>
                    <field>4525</field>
                    <field>APM</field>
                    <field>4525</field>
                </row>
                <row primary-key="32053599">
                    <field>11-05-21 15:28</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>MAGU2457726</field>
                    <field />
                    <field />
                    <field />
                    <field>4540</field>
                    <field>ZME</field>
                    <field />
                </row>
                <row primary-key="32053679">
                    <field>11-05-21 15:33</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>APZU3444775</field>
                    <field />
                    <field />
                    <field />
                    <field>4531</field>
                    <field>AAM</field>
                    <field />
                </row>
                <row primary-key="32053703">
                    <field>11-05-21 15:35</field>
                    <field>Yard Move</field>
                    <field>Export</field>
                    <field>CMAU0168576</field>
                    <field />
                    <field>4538</field>
                    <field>JVA</field>
                    <field>4540</field>
                    <field>ZME</field>
                    <field>2517</field>
                </row>
                <row primary-key="32053755">
                    <field>11-05-21 15:41</field>
                    <field>Yard Move</field>
                    <field>Export</field>
                    <field>TGHU0659103</field>
                    <field />
                    <field>4538</field>
                    <field>JVA</field>
                    <field>4540</field>
                    <field>ZME</field>
                    <field>2520</field>
                </row>
                <row primary-key="32053763">
                    <field>11-05-21 15:41</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>FSCU3211834</field>
                    <field />
                    <field />
                    <field />
                    <field>4531</field>
                    <field>AAM</field>
                    <field />
                </row>
                <row primary-key="32053767">
                    <field>11-05-21 15:41</field>
                    <field>Yard Shift</field>
                    <field>Import</field>
                    <field>TGBU3204580</field>
                    <field />
                    <field>4532</field>
                    <field>RJE</field>
                    <field>4532</field>
                    <field>RJE</field>
                    <field>4532</field>
                </row>
                <row primary-key="32053778">
                    <field>11-05-21 15:43</field>
                    <field>Yard Move</field>
                    <field>Export</field>
                    <field>CMAU1933469</field>
                    <field />
                    <field>4538</field>
                    <field>JVA</field>
                    <field>4540</field>
                    <field>ZME</field>
                    <field>2526</field>
                </row>
                <row primary-key="32053793">
                    <field>11-05-21 15:45</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>OPDU2052015</field>
                    <field />
                    <field />
                    <field />
                    <field>4528</field>
                    <field>AAL</field>
                    <field />
                </row>
                <row primary-key="32053799">
                    <field>11-05-21 15:49</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>CMAU0301312</field>
                    <field />
                    <field />
                    <field />
                    <field>4528</field>
                    <field>AAL</field>
                    <field />
                </row>
                <row primary-key="32053805">
                    <field>11-05-21 15:49</field>
                    <field>Yard Move</field>
                    <field>Export</field>
                    <field>BMOU2078859</field>
                    <field />
                    <field>4538</field>
                    <field>JVA</field>
                    <field>4540</field>
                    <field>ZME</field>
                    <field>2525</field>
                </row>
                <row primary-key="32053806">
                    <field>11-05-21 15:49</field>
                    <field>Yard Move</field>
                    <field>Export</field>
                    <field>APZU3885981</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32053821">
                    <field>11-05-21 15:50</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>SEGU5476473</field>
                    <field />
                    <field />
                    <field />
                    <field>4533</field>
                    <field>GPA</field>
                    <field />
                </row>
                <row primary-key="32053825">
                    <field>11-05-21 15:51</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>BSIU2651098</field>
                    <field />
                    <field>4529</field>
                    <field>DLE</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32053833">
                    <field>11-05-21 15:53</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>FCIU5938607</field>
                    <field />
                    <field>4532</field>
                    <field>RJE</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32053838">
                    <field>11-05-21 15:53</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>FCIU6444390</field>
                    <field />
                    <field>4541</field>
                    <field>MSB</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32053852">
                    <field>11-05-21 15:54</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>MEDU5862248</field>
                    <field />
                    <field>4525</field>
                    <field>APM</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32053876">
                    <field>11-05-21 15:55</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>MEDU2373259</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32053877">
                    <field>11-05-21 15:56</field>
                    <field>Yard Shift</field>
                    <field>Export</field>
                    <field>MRKU8427883</field>
                    <field />
                    <field>4541</field>
                    <field>MSB</field>
                    <field>4541</field>
                    <field>MSB</field>
                    <field>4541</field>
                </row>
                <row primary-key="32053883">
                    <field>11-05-21 15:56</field>
                    <field>Yard Move</field>
                    <field>Export</field>
                    <field>CMAU7823978</field>
                    <field />
                    <field>4538</field>
                    <field>JVA</field>
                    <field>4540</field>
                    <field>ZME</field>
                    <field>2529</field>
                </row>
                <row primary-key="32053889">
                    <field>11-05-21 15:57</field>
                    <field>Yard Shift</field>
                    <field>Import</field>
                    <field>TCNU7399650</field>
                    <field />
                    <field>4533</field>
                    <field>GPA</field>
                    <field>4533</field>
                    <field>GPA</field>
                    <field>4533</field>
                </row>
                <row primary-key="32053894">
                    <field>11-05-21 15:57</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>CXDU1170234</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32053899">
                    <field>11-05-21 15:57</field>
                    <field>Yard Shift</field>
                    <field>Import</field>
                    <field>PONU7695034</field>
                    <field />
                    <field>4533</field>
                    <field>GPA</field>
                    <field>4533</field>
                    <field>GPA</field>
                    <field>4533</field>
                </row>
                <row primary-key="32053904">
                    <field>11-05-21 15:58</field>
                    <field>Yard Shift</field>
                    <field>Import</field>
                    <field>TCKU2159034</field>
                    <field />
                    <field>4541</field>
                    <field>MSB</field>
                    <field>4541</field>
                    <field>MSB</field>
                    <field>4541</field>
                </row>
                <row primary-key="32053913">
                    <field>11-05-21 15:59</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>PCIU1289958</field>
                    <field />
                    <field>4528</field>
                    <field>AAL</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32053931">
                    <field>11-05-21 16:00</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>CAIU6008628</field>
                    <field />
                    <field>4525</field>
                    <field>APM</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32053935">
                    <field>11-05-21 16:01</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>GLDU5179013</field>
                    <field />
                    <field>4531</field>
                    <field>AAM</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32053940">
                    <field>11-05-21 16:02</field>
                    <field>Yard Shift</field>
                    <field>Import</field>
                    <field>PCIU1654325</field>
                    <field />
                    <field>4528</field>
                    <field>AAL</field>
                    <field>4528</field>
                    <field>AAL</field>
                    <field>4528</field>
                </row>
                <row primary-key="32053941">
                    <field>11-05-21 16:03</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>PCIU0086391</field>
                    <field />
                    <field>4528</field>
                    <field>AAL</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32053946">
                    <field>11-05-21 16:04</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>TRHU1768461</field>
                    <field />
                    <field>4529</field>
                    <field>DLE</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32053948">
                    <field>11-05-21 16:04</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>MRKU3113010</field>
                    <field />
                    <field>4533</field>
                    <field>GPA</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32053963">
                    <field>11-05-21 16:05</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>MSKU3205355</field>
                    <field />
                    <field />
                    <field />
                    <field>4531</field>
                    <field>AAM</field>
                    <field />
                </row>
                <row primary-key="32053965">
                    <field>11-05-21 16:05</field>
                    <field>Yard Shift</field>
                    <field>Import</field>
                    <field>AXIU8465865</field>
                    <field />
                    <field>4525</field>
                    <field>APM</field>
                    <field>4525</field>
                    <field>APM</field>
                    <field>4525</field>
                </row>
                <row primary-key="32053966">
                    <field>11-05-21 16:06</field>
                    <field>Yard Shift</field>
                    <field>Import</field>
                    <field>PCIU1395836</field>
                    <field />
                    <field>4528</field>
                    <field>AAL</field>
                    <field>4528</field>
                    <field>AAL</field>
                    <field>4528</field>
                </row>
                <row primary-key="32053970">
                    <field>11-05-21 16:07</field>
                    <field>Yard Shift</field>
                    <field>Import</field>
                    <field>TRHU2933004</field>
                    <field />
                    <field>4528</field>
                    <field>AAL</field>
                    <field>4528</field>
                    <field>AAL</field>
                    <field>4528</field>
                </row>
                <row primary-key="32053979">
                    <field>11-05-21 16:08</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>FCIU6529645</field>
                    <field />
                    <field>4541</field>
                    <field>MSB</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32053983">
                    <field>11-05-21 16:09</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>MRKU8538399</field>
                    <field />
                    <field />
                    <field />
                    <field>4531</field>
                    <field>AAM</field>
                    <field />
                </row>
                <row primary-key="32054000">
                    <field>11-05-21 16:10</field>
                    <field>Yard Shift</field>
                    <field>Import</field>
                    <field>TCLU3415550</field>
                    <field />
                    <field>4529</field>
                    <field>DLE</field>
                    <field>4529</field>
                    <field>DLE</field>
                    <field>4529</field>
                </row>
                <row primary-key="32054014">
                    <field>11-05-21 16:10</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>MRKU8928910</field>
                    <field />
                    <field>4525</field>
                    <field>APM</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32054016">
                    <field>11-05-21 16:10</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>SUDU7792980</field>
                    <field />
                    <field>4528</field>
                    <field>AAL</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32054026">
                    <field>11-05-21 16:12</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>TGHU0954330</field>
                    <field />
                    <field />
                    <field />
                    <field>4528</field>
                    <field>AAL</field>
                    <field />
                </row>
                <row primary-key="32054028">
                    <field>11-05-21 16:12</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>PCIU1169227</field>
                    <field />
                    <field>4529</field>
                    <field>DLE</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32054030">
                    <field>11-05-21 16:12</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>HASU1097360</field>
                    <field />
                    <field />
                    <field />
                    <field>4531</field>
                    <field>AAM</field>
                    <field />
                </row>
                <row primary-key="32054036">
                    <field>11-05-21 16:13</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>SUDU8562852</field>
                    <field />
                    <field>4538</field>
                    <field>JVA</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32054041">
                    <field>11-05-21 16:14</field>
                    <field>Yard Shift</field>
                    <field>Import</field>
                    <field>TCKU1109424</field>
                    <field />
                    <field>4525</field>
                    <field>APM</field>
                    <field>4525</field>
                    <field>APM</field>
                    <field>4525</field>
                </row>
                <row primary-key="32054049">
                    <field>11-05-21 16:14</field>
                    <field>Yard Shift</field>
                    <field>Import</field>
                    <field>CAIU7102367</field>
                    <field />
                    <field>4532</field>
                    <field>RJE</field>
                    <field>4532</field>
                    <field>RJE</field>
                    <field>4532</field>
                </row>
                <row primary-key="32054064">
                    <field>11-05-21 16:16</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>PCIU9011304</field>
                    <field />
                    <field>4541</field>
                    <field>MSB</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32054070">
                    <field>11-05-21 16:17</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>GESU5654879</field>
                    <field />
                    <field />
                    <field />
                    <field>4531</field>
                    <field>AAM</field>
                    <field />
                </row>
                <row primary-key="32054078">
                    <field>11-05-21 16:18</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>TLLU2247927</field>
                    <field />
                    <field>4525</field>
                    <field>APM</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32054090">
                    <field>11-05-21 16:18</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>KKFU7591053</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32054094">
                    <field>11-05-21 16:18</field>
                    <field>Yard Shift</field>
                    <field>Import</field>
                    <field>MEDU1799960</field>
                    <field />
                    <field>4529</field>
                    <field>DLE</field>
                    <field>4529</field>
                    <field>DLE</field>
                    <field>4529</field>
                </row>
                <row primary-key="32054095">
                    <field>11-05-21 16:19</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>PCIU9106713</field>
                    <field />
                    <field>4532</field>
                    <field>RJE</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32054118">
                    <field>11-05-21 16:21</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>GCXU5119464</field>
                    <field />
                    <field>4519</field>
                    <field>AOC</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32054120">
                    <field>11-05-21 16:21</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>MRKU6311934</field>
                    <field />
                    <field>4538</field>
                    <field>JVA</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32054136">
                    <field>11-05-21 16:22</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>CMAU1978118</field>
                    <field />
                    <field />
                    <field />
                    <field>4528</field>
                    <field>AAL</field>
                    <field />
                </row>
                <row primary-key="32054143">
                    <field>11-05-21 16:23</field>
                    <field>Yard Shift</field>
                    <field>Import</field>
                    <field>PCIU8515086</field>
                    <field />
                    <field>4532</field>
                    <field>RJE</field>
                    <field>4532</field>
                    <field>RJE</field>
                    <field>4532</field>
                </row>
                <row primary-key="32054144">
                    <field>11-05-21 16:23</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>TTNU1029049</field>
                    <field />
                    <field>4529</field>
                    <field>DLE</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32054159">
                    <field>11-05-21 16:24</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>BMOU2188199</field>
                    <field />
                    <field />
                    <field />
                    <field>4528</field>
                    <field>AAL</field>
                    <field />
                </row>
                <row primary-key="32054208">
                    <field>11-05-21 16:25</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>CMAU1447467</field>
                    <field />
                    <field />
                    <field />
                    <field>4528</field>
                    <field>AAL</field>
                    <field />
                </row>
                <row primary-key="32054223">
                    <field>11-05-21 16:26</field>
                    <field>Yard Shift</field>
                    <field>Import</field>
                    <field>CBHU1810116</field>
                    <field />
                    <field>4532</field>
                    <field>RJE</field>
                    <field>4532</field>
                    <field>RJE</field>
                    <field>4532</field>
                </row>
                <row primary-key="32054228">
                    <field>11-05-21 16:27</field>
                    <field>Delivery</field>
                    <field>Storage</field>
                    <field>MSKU2388014</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32054241">
                    <field>11-05-21 16:27</field>
                    <field>Delivery</field>
                    <field>Storage</field>
                    <field>MSKU4428780</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32054247">
                    <field>11-05-21 16:27</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>KKFU7591053</field>
                    <field />
                    <field>4533</field>
                    <field>GPA</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32054248">
                    <field>11-05-21 16:27</field>
                    <field>Yard Shift</field>
                    <field>Import</field>
                    <field>PCIU8717174</field>
                    <field />
                    <field>4532</field>
                    <field>RJE</field>
                    <field>4532</field>
                    <field>RJE</field>
                    <field>4532</field>
                </row>
                <row primary-key="32054358">
                    <field>11-05-21 16:30</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>BMOU2434836</field>
                    <field />
                    <field>4519</field>
                    <field>AOC</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32054362">
                    <field>11-05-21 16:30</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>CAIU7091730</field>
                    <field />
                    <field>4532</field>
                    <field>RJE</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32054398">
                    <field>11-05-21 16:32</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>GATU0135920</field>
                    <field />
                    <field />
                    <field />
                    <field>4528</field>
                    <field>AAL</field>
                    <field />
                </row>
                <row primary-key="32054403">
                    <field>11-05-21 16:32</field>
                    <field>Yard Shift</field>
                    <field>Import</field>
                    <field>SUDU8574030</field>
                    <field />
                    <field>4538</field>
                    <field>JVA</field>
                    <field>4538</field>
                    <field>JVA</field>
                    <field>4538</field>
                </row>
                <row primary-key="32054432">
                    <field>11-05-21 16:34</field>
                    <field>Yard Shift</field>
                    <field>Import</field>
                    <field>PCIU8995154</field>
                    <field />
                    <field>4532</field>
                    <field>RJE</field>
                    <field>4532</field>
                    <field>RJE</field>
                    <field>4532</field>
                </row>
                <row primary-key="32054433">
                    <field>11-05-21 16:34</field>
                    <field>Yard Shift</field>
                    <field>Import</field>
                    <field>MRKU4440341</field>
                    <field />
                    <field>4538</field>
                    <field>JVA</field>
                    <field>4538</field>
                    <field>JVA</field>
                    <field>4538</field>
                </row>
                <row primary-key="32054451">
                    <field>11-05-21 16:35</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>CMAU6521145</field>
                    <field />
                    <field>4538</field>
                    <field>JVA</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32054453">
                    <field>11-05-21 16:35</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>CMAU0444226</field>
                    <field />
                    <field />
                    <field />
                    <field>4528</field>
                    <field>AAL</field>
                    <field />
                </row>
                <row primary-key="32054456">
                    <field>11-05-21 16:36</field>
                    <field>Yard Shift</field>
                    <field>Import</field>
                    <field>GLDU9071618</field>
                    <field />
                    <field>4529</field>
                    <field>DLE</field>
                    <field>4529</field>
                    <field>DLE</field>
                    <field>4529</field>
                </row>
                <row primary-key="32054457">
                    <field>11-05-21 16:36</field>
                    <field>Yard Shift</field>
                    <field>Import</field>
                    <field>PONU7656280</field>
                    <field />
                    <field>4529</field>
                    <field>DLE</field>
                    <field>4529</field>
                    <field>DLE</field>
                    <field>4529</field>
                </row>
                <row primary-key="32054463">
                    <field>11-05-21 16:36</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>TCKU6364778</field>
                    <field />
                    <field>4529</field>
                    <field>DLE</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32054481">
                    <field>11-05-21 16:37</field>
                    <field>Yard Shift</field>
                    <field>Import</field>
                    <field>PONU7363826</field>
                    <field />
                    <field>4541</field>
                    <field>MSB</field>
                    <field>4541</field>
                    <field>MSB</field>
                    <field>4541</field>
                </row>
                <row primary-key="32054482">
                    <field>11-05-21 16:37</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>PONU8163864</field>
                    <field />
                    <field>4539</field>
                    <field>AAM</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32054485">
                    <field>11-05-21 16:38</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>FCIU4633774</field>
                    <field />
                    <field />
                    <field />
                    <field>4540</field>
                    <field>ZME</field>
                    <field />
                </row>
                <row primary-key="32054487">
                    <field>11-05-21 16:38</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>MSCU6131220</field>
                    <field />
                    <field>4525</field>
                    <field>APM</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32054527">
                    <field>11-05-21 16:41</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>TGHU3604254</field>
                    <field />
                    <field />
                    <field />
                    <field>4538</field>
                    <field>JVA</field>
                    <field />
                </row>
                <row primary-key="32054529">
                    <field>11-05-21 16:41</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>TCNU5018796</field>
                    <field />
                    <field>4532</field>
                    <field>RJE</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32054531">
                    <field>11-05-21 16:41</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>MEDU4963336</field>
                    <field />
                    <field>4533</field>
                    <field>GPA</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32054560">
                    <field>11-05-21 16:43</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>RMCU2501906</field>
                    <field />
                    <field />
                    <field />
                    <field>4539</field>
                    <field>AAM</field>
                    <field />
                </row>
                <row primary-key="32054564">
                    <field>11-05-21 16:44</field>
                    <field>Yard Shift</field>
                    <field>Import</field>
                    <field>CMAU9044961</field>
                    <field />
                    <field>4529</field>
                    <field>DLE</field>
                    <field>4529</field>
                    <field>DLE</field>
                    <field>4529</field>
                </row>
                <row primary-key="32054567">
                    <field>11-05-21 16:44</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>TEMU5442628</field>
                    <field />
                    <field />
                    <field />
                    <field>4538</field>
                    <field>JVA</field>
                    <field />
                </row>
                <row primary-key="32054594">
                    <field>11-05-21 16:45</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>MSKU0498497</field>
                    <field />
                    <field>4541</field>
                    <field>MSB</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32054612">
                    <field>11-05-21 16:46</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>SLZU2500664</field>
                    <field />
                    <field />
                    <field />
                    <field>4539</field>
                    <field>AAM</field>
                    <field />
                </row>
                <row primary-key="32054621">
                    <field>11-05-21 16:47</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>TRHU6936660</field>
                    <field />
                    <field>4529</field>
                    <field>DLE</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32054661">
                    <field>11-05-21 16:51</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>CMAU5185576</field>
                    <field />
                    <field>4525</field>
                    <field>APM</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32054663">
                    <field>11-05-21 16:51</field>
                    <field>Yard Shift</field>
                    <field>Import</field>
                    <field>BMOU2055112</field>
                    <field />
                    <field>4541</field>
                    <field>MSB</field>
                    <field>4541</field>
                    <field>MSB</field>
                    <field>4541</field>
                </row>
                <row primary-key="32054682">
                    <field>11-05-21 16:52</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>APZU3582603</field>
                    <field />
                    <field />
                    <field />
                    <field>4538</field>
                    <field>JVA</field>
                    <field />
                </row>
                <row primary-key="32054694">
                    <field>11-05-21 16:53</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>PCIU1966323</field>
                    <field />
                    <field>4541</field>
                    <field>MSB</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32054699">
                    <field>11-05-21 16:53</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>MSKU7987294</field>
                    <field />
                    <field />
                    <field />
                    <field>4539</field>
                    <field>AAM</field>
                    <field />
                </row>
                <row primary-key="32054723">
                    <field>11-05-21 16:54</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>APZU3554582</field>
                    <field />
                    <field>4533</field>
                    <field>GPA</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32054762">
                    <field>11-05-21 16:56</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>MSKU2027372</field>
                    <field />
                    <field />
                    <field />
                    <field>4539</field>
                    <field>AAM</field>
                    <field />
                </row>
                <row primary-key="32054764">
                    <field>11-05-21 16:56</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>BMOU2165681</field>
                    <field />
                    <field />
                    <field />
                    <field>4532</field>
                    <field>RJE</field>
                    <field />
                </row>
                <row primary-key="32054769">
                    <field>11-05-21 16:57</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>PCIU1754978</field>
                    <field />
                    <field>4528</field>
                    <field>AAL</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32054797">
                    <field>11-05-21 16:59</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>MSKU2687041</field>
                    <field />
                    <field />
                    <field />
                    <field>4539</field>
                    <field>AAM</field>
                    <field />
                </row>
                <row primary-key="32054811">
                    <field>11-05-21 16:59</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>CMAU3151258</field>
                    <field />
                    <field />
                    <field />
                    <field>4528</field>
                    <field>AAL</field>
                    <field />
                </row>
                <row primary-key="32054829">
                    <field>11-05-21 17:00</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>TEXU5630450</field>
                    <field />
                    <field />
                    <field />
                    <field>4532</field>
                    <field>RJE</field>
                    <field />
                </row>
                <row primary-key="32054842">
                    <field>11-05-21 17:01</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>APZU3670915</field>
                    <field />
                    <field />
                    <field />
                    <field>4528</field>
                    <field>AAL</field>
                    <field />
                </row>
                <row primary-key="32054854">
                    <field>11-05-21 17:02</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>TCLU3308253</field>
                    <field />
                    <field />
                    <field />
                    <field>4539</field>
                    <field>AAM</field>
                    <field />
                </row>
                <row primary-key="32054858">
                    <field>11-05-21 17:02</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>CMAU3216111</field>
                    <field />
                    <field />
                    <field />
                    <field>4528</field>
                    <field>AAL</field>
                    <field />
                </row>
                <row primary-key="32054871">
                    <field>11-05-21 17:04</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>CAIU3427976</field>
                    <field />
                    <field />
                    <field />
                    <field>4528</field>
                    <field>AAL</field>
                    <field />
                </row>
                <row primary-key="32054897">
                    <field>11-05-21 17:05</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>MRKU8489524</field>
                    <field />
                    <field />
                    <field />
                    <field>4539</field>
                    <field>AAM</field>
                    <field />
                </row>
                <row primary-key="32054900">
                    <field>11-05-21 17:05</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>CMAU1225860</field>
                    <field />
                    <field />
                    <field />
                    <field>4532</field>
                    <field>RJE</field>
                    <field />
                </row>
                <row primary-key="32054921">
                    <field>11-05-21 17:07</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>CMAU3238281</field>
                    <field />
                    <field />
                    <field />
                    <field>4528</field>
                    <field>AAL</field>
                    <field />
                </row>
                <row primary-key="32054957">
                    <field>11-05-21 17:09</field>
                    <field>Yard Move</field>
                    <field>Export</field>
                    <field>ZW17401</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32054958">
                    <field>11-05-21 17:09</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>ZIQ9753</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32054981">
                    <field>11-05-21 17:10</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>CMAU1255572</field>
                    <field />
                    <field />
                    <field />
                    <field>4528</field>
                    <field>AAL</field>
                    <field />
                </row>
                <row primary-key="32054989">
                    <field>11-05-21 17:10</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>MSKU7790089</field>
                    <field />
                    <field />
                    <field />
                    <field>4533</field>
                    <field>GPA</field>
                    <field />
                </row>
                <row primary-key="32054990">
                    <field>11-05-21 17:11</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>TEMU5244598</field>
                    <field />
                    <field />
                    <field />
                    <field>4528</field>
                    <field>AAL</field>
                    <field />
                </row>
                <row primary-key="32055003">
                    <field>11-05-21 17:12</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>SEKU4304242</field>
                    <field />
                    <field />
                    <field />
                    <field>4539</field>
                    <field>AAM</field>
                    <field />
                </row>
                <row primary-key="32055004">
                    <field>11-05-21 17:13</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>MSKU5670757</field>
                    <field />
                    <field />
                    <field />
                    <field>4532</field>
                    <field>RJE</field>
                    <field />
                </row>
                <row primary-key="32055007">
                    <field>11-05-21 17:13</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>ECMU1820953</field>
                    <field />
                    <field />
                    <field />
                    <field>4529</field>
                    <field>DLE</field>
                    <field />
                </row>
                <row primary-key="32055010">
                    <field>11-05-21 17:13</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>UETU2564470</field>
                    <field />
                    <field />
                    <field />
                    <field>4528</field>
                    <field>AAL</field>
                    <field />
                </row>
                <row primary-key="32055020">
                    <field>11-05-21 17:14</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>CMAU1959695</field>
                    <field />
                    <field />
                    <field />
                    <field>4538</field>
                    <field>JVA</field>
                    <field />
                </row>
                <row primary-key="32055046">
                    <field>11-05-21 17:16</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>CMAU1436436</field>
                    <field />
                    <field />
                    <field />
                    <field>4519</field>
                    <field>AOC</field>
                    <field />
                </row>
                <row primary-key="32055051">
                    <field>11-05-21 17:16</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>TCNU1215204</field>
                    <field />
                    <field />
                    <field />
                    <field>4538</field>
                    <field>JVA</field>
                    <field />
                </row>
                <row primary-key="32055053">
                    <field>11-05-21 17:17</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>SGCU2226166</field>
                    <field />
                    <field />
                    <field />
                    <field>4529</field>
                    <field>DLE</field>
                    <field />
                </row>
                <row primary-key="32055055">
                    <field>11-05-21 17:17</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>TEMU4489512</field>
                    <field />
                    <field />
                    <field />
                    <field>4539</field>
                    <field>AAM</field>
                    <field />
                </row>
                <row primary-key="32055073">
                    <field>11-05-21 17:19</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>CMAU2026842</field>
                    <field />
                    <field />
                    <field />
                    <field>4532</field>
                    <field>RJE</field>
                    <field />
                </row>
                <row primary-key="32055074">
                    <field>11-05-21 17:19</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>CAIU6289989</field>
                    <field />
                    <field />
                    <field />
                    <field>4538</field>
                    <field>JVA</field>
                    <field />
                </row>
                <row primary-key="32055096">
                    <field>11-05-21 17:21</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>MRKU9769556</field>
                    <field />
                    <field />
                    <field />
                    <field>4538</field>
                    <field>JVA</field>
                    <field />
                </row>
                <row primary-key="32055097">
                    <field>11-05-21 17:21</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>APZU3800011</field>
                    <field />
                    <field />
                    <field />
                    <field>4533</field>
                    <field>GPA</field>
                    <field />
                </row>
                <row primary-key="32055101">
                    <field>11-05-21 17:21</field>
                    <field>Yard Move</field>
                    <field>Export</field>
                    <field>CMAU2026842</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32055127">
                    <field>11-05-21 17:24</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>CXDU1984903</field>
                    <field />
                    <field />
                    <field />
                    <field>4539</field>
                    <field>AAM</field>
                    <field />
                </row>
                <row primary-key="32055126">
                    <field>11-05-21 17:24</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>TEMU2912348</field>
                    <field />
                    <field>4528</field>
                    <field>AAL</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32055128">
                    <field>11-05-21 17:24</field>
                    <field>Yard Shift</field>
                    <field>Import</field>
                    <field>DRYU2345920</field>
                    <field />
                    <field>4525</field>
                    <field>APM</field>
                    <field>4525</field>
                    <field>APM</field>
                    <field>4525</field>
                </row>
                <row primary-key="32055134">
                    <field>11-05-21 17:24</field>
                    <field>Yard Shift</field>
                    <field>Import</field>
                    <field>PCIU1015643</field>
                    <field />
                    <field>4525</field>
                    <field>APM</field>
                    <field>4525</field>
                    <field>APM</field>
                    <field>4525</field>
                </row>
                <row primary-key="32055149">
                    <field>11-05-21 17:25</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>TCNU2242164</field>
                    <field />
                    <field />
                    <field />
                    <field>4538</field>
                    <field>JVA</field>
                    <field />
                </row>
                <row primary-key="32055152">
                    <field>11-05-21 17:26</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>GLDU5097390</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32055167">
                    <field>11-05-21 17:27</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>PCIU1399092</field>
                    <field />
                    <field>4528</field>
                    <field>AAL</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32055177">
                    <field>11-05-21 17:29</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>TCLU3159864</field>
                    <field />
                    <field />
                    <field />
                    <field>4538</field>
                    <field>JVA</field>
                    <field />
                </row>
                <row primary-key="32055181">
                    <field>11-05-21 17:29</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>ZIQ9759</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32055206">
                    <field>11-05-21 17:30</field>
                    <field>Yard Move</field>
                    <field>Export</field>
                    <field>ZIQ9609</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32055207">
                    <field>11-05-21 17:31</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>TCKU2811970</field>
                    <field />
                    <field />
                    <field />
                    <field>4539</field>
                    <field>AAM</field>
                    <field />
                </row>
                <row primary-key="32055213">
                    <field>11-05-21 17:31</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>PCIU0055430</field>
                    <field />
                    <field>4525</field>
                    <field>APM</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32055231">
                    <field>11-05-21 17:32</field>
                    <field>Yard Move</field>
                    <field>Export</field>
                    <field>ST61323</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32055232">
                    <field>11-05-21 17:32</field>
                    <field>Yard Move</field>
                    <field>Export</field>
                    <field>ST61392</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32055233">
                    <field>11-05-21 17:32</field>
                    <field>Yard Move</field>
                    <field>Export</field>
                    <field>ZIQ9644</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32055234">
                    <field>11-05-21 17:32</field>
                    <field>Receival</field>
                    <field>Storage</field>
                    <field>MSKU5507919</field>
                    <field />
                    <field />
                    <field />
                    <field>4529</field>
                    <field>DLE</field>
                    <field />
                </row>
                <row primary-key="32055237">
                    <field>11-05-21 17:33</field>
                    <field>Yard Move</field>
                    <field>Export</field>
                    <field>ZIQ9617</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32055248">
                    <field>11-05-21 17:34</field>
                    <field>Receival</field>
                    <field>Storage</field>
                    <field>MRSU0239558</field>
                    <field />
                    <field />
                    <field />
                    <field>4529</field>
                    <field>DLE</field>
                    <field />
                </row>
                <row primary-key="32055250">
                    <field>11-05-21 17:34</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>CMAU0314686</field>
                    <field />
                    <field />
                    <field />
                    <field>4538</field>
                    <field>JVA</field>
                    <field />
                </row>
                <row primary-key="32055270">
                    <field>11-05-21 17:35</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>MRSU3691812</field>
                    <field />
                    <field>4532</field>
                    <field>RJE</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32055271">
                    <field>11-05-21 17:35</field>
                    <field>Yard Move</field>
                    <field>Export</field>
                    <field>ZW17405</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32055296">
                    <field>11-05-21 17:37</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>APHU7056559</field>
                    <field />
                    <field />
                    <field />
                    <field>4533</field>
                    <field>GPA</field>
                    <field />
                </row>
                <row primary-key="32055298">
                    <field>11-05-21 17:38</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>SEGU1139664</field>
                    <field />
                    <field />
                    <field />
                    <field>4538</field>
                    <field>JVA</field>
                    <field />
                </row>
                <row primary-key="32055348">
                    <field>11-05-21 17:41</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>CMAU1282876</field>
                    <field />
                    <field />
                    <field />
                    <field>4539</field>
                    <field>AAM</field>
                    <field />
                </row>
                <row primary-key="32055350">
                    <field>11-05-21 17:41</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>MRKU9998254</field>
                    <field />
                    <field />
                    <field />
                    <field>4538</field>
                    <field>JVA</field>
                    <field />
                </row>
                <row primary-key="32055363">
                    <field>11-05-21 17:42</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>TRLU3902860</field>
                    <field />
                    <field />
                    <field />
                    <field>4532</field>
                    <field>RJE</field>
                    <field />
                </row>
                <row primary-key="32055368">
                    <field>11-05-21 17:44</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>TRHU4622167</field>
                    <field />
                    <field />
                    <field />
                    <field>4533</field>
                    <field>GPA</field>
                    <field />
                </row>
                <row primary-key="32055379">
                    <field>11-05-21 17:44</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>TRHU1038756</field>
                    <field />
                    <field />
                    <field />
                    <field>4532</field>
                    <field>RJE</field>
                    <field />
                </row>
                <row primary-key="32055395">
                    <field>11-05-21 17:45</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>SEGU1184703</field>
                    <field />
                    <field />
                    <field />
                    <field>4538</field>
                    <field>JVA</field>
                    <field />
                </row>
                <row primary-key="32055399">
                    <field>11-05-21 17:45</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>TRHU3026456</field>
                    <field />
                    <field />
                    <field />
                    <field>4532</field>
                    <field>RJE</field>
                    <field />
                </row>
                <row primary-key="32055426">
                    <field>11-05-21 17:48</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>CMAU1979393</field>
                    <field />
                    <field />
                    <field />
                    <field>4532</field>
                    <field>RJE</field>
                    <field />
                </row>
                <row primary-key="32055456">
                    <field>11-05-21 17:50</field>
                    <field>Delivery</field>
                    <field>Storage</field>
                    <field>PCIU8709630</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32055461">
                    <field>11-05-21 17:50</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>TRHU1372953</field>
                    <field />
                    <field />
                    <field />
                    <field>4539</field>
                    <field>AAM</field>
                    <field />
                </row>
                <row primary-key="32055473">
                    <field>11-05-21 17:50</field>
                    <field>Receival</field>
                    <field>Storage</field>
                    <field>SUDU7875390</field>
                    <field />
                    <field />
                    <field />
                    <field>4529</field>
                    <field>DLE</field>
                    <field />
                </row>
                <row primary-key="32055474">
                    <field>11-05-21 17:51</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>MRKU9435292</field>
                    <field />
                    <field />
                    <field />
                    <field>4538</field>
                    <field>JVA</field>
                    <field />
                </row>
                <row primary-key="32055476">
                    <field>11-05-21 17:51</field>
                    <field>Yard Move</field>
                    <field>Export</field>
                    <field>TRHU1038756</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32055497">
                    <field>11-05-21 17:52</field>
                    <field>Yard Move</field>
                    <field>Export</field>
                    <field>TRHU3026456</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32055506">
                    <field>11-05-21 17:52</field>
                    <field>Yard Move</field>
                    <field>Export</field>
                    <field>CMAU1979393</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32055507">
                    <field>11-05-21 17:52</field>
                    <field>Receival</field>
                    <field>Storage</field>
                    <field>MSKU5901579</field>
                    <field />
                    <field />
                    <field />
                    <field>4529</field>
                    <field>DLE</field>
                    <field />
                </row>
                <row primary-key="32055540">
                    <field>11-05-21 17:55</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>TEMU5315639</field>
                    <field />
                    <field />
                    <field />
                    <field>4538</field>
                    <field>JVA</field>
                    <field />
                </row>
                <row primary-key="32055551">
                    <field>11-05-21 17:56</field>
                    <field>Delivery</field>
                    <field>Storage</field>
                    <field>GCXU5184536</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32055552">
                    <field>11-05-21 17:56</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>APZU3695410</field>
                    <field />
                    <field />
                    <field />
                    <field>4538</field>
                    <field>JVA</field>
                    <field />
                </row>
                <row primary-key="32055565">
                    <field>11-05-21 17:56</field>
                    <field>Receival</field>
                    <field>Storage</field>
                    <field>MSKU2819195</field>
                    <field />
                    <field />
                    <field />
                    <field>4529</field>
                    <field>DLE</field>
                    <field />
                </row>
                <row primary-key="32055571">
                    <field>11-05-21 17:57</field>
                    <field>Receival</field>
                    <field>Storage</field>
                    <field>MRKU7921741</field>
                    <field />
                    <field />
                    <field />
                    <field>4529</field>
                    <field>DLE</field>
                    <field />
                </row>
                <row primary-key="32055575">
                    <field>11-05-21 17:57</field>
                    <field>Delivery</field>
                    <field>Storage</field>
                    <field>PCIU8546554</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32055583">
                    <field>11-05-21 17:59</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>CMAU5101528</field>
                    <field />
                    <field />
                    <field />
                    <field>4533</field>
                    <field>GPA</field>
                    <field />
                </row>
                <row primary-key="32055605">
                    <field>11-05-21 18:00</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>CLHU3842806</field>
                    <field />
                    <field />
                    <field />
                    <field>4539</field>
                    <field>AAM</field>
                    <field />
                </row>
                <row primary-key="32055607">
                    <field>11-05-21 18:00</field>
                    <field>Yard Shift</field>
                    <field>Import</field>
                    <field>MRKU6425161</field>
                    <field />
                    <field>4532</field>
                    <field>RJE</field>
                    <field>4532</field>
                    <field>RJE</field>
                    <field>4532</field>
                </row>
                <row primary-key="32055608">
                    <field>11-05-21 18:00</field>
                    <field>Yard Shift</field>
                    <field>Import</field>
                    <field>TCNU6283475</field>
                    <field />
                    <field>4532</field>
                    <field>RJE</field>
                    <field>4532</field>
                    <field>RJE</field>
                    <field>4532</field>
                </row>
                <row primary-key="32055611">
                    <field>11-05-21 18:01</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>ZIQ9665</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32055623">
                    <field>11-05-21 18:02</field>
                    <field>Receival</field>
                    <field>Storage</field>
                    <field>MRKU7654603</field>
                    <field />
                    <field />
                    <field />
                    <field>4529</field>
                    <field>DLE</field>
                    <field />
                </row>
                <row primary-key="32055632">
                    <field>11-05-21 18:03</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>CAIU9989184</field>
                    <field />
                    <field>4541</field>
                    <field>MSB</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32055634">
                    <field>11-05-21 18:03</field>
                    <field>Yard Move</field>
                    <field>Export</field>
                    <field>ZIQ9665</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32055640">
                    <field>11-05-21 18:03</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>MSCU7948149</field>
                    <field />
                    <field />
                    <field />
                    <field>4538</field>
                    <field>JVA</field>
                    <field />
                </row>
                <row primary-key="32055647">
                    <field>11-05-21 18:03</field>
                    <field>Receival</field>
                    <field>Storage</field>
                    <field>MSKU4288708</field>
                    <field />
                    <field />
                    <field />
                    <field>4529</field>
                    <field>DLE</field>
                    <field />
                </row>
                <row primary-key="32055649">
                    <field>11-05-21 18:04</field>
                    <field>Yard Move</field>
                    <field>Export</field>
                    <field>ZIQ9653</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32055650">
                    <field>11-05-21 18:04</field>
                    <field>Yard Move</field>
                    <field>Export</field>
                    <field>ZIQ9651</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32055652">
                    <field>11-05-21 18:04</field>
                    <field>Yard Move</field>
                    <field>Export</field>
                    <field>ZIQ9672</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32055673">
                    <field>11-05-21 18:05</field>
                    <field>Yard Move</field>
                    <field>Export</field>
                    <field>ZIQ9629</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32055674">
                    <field>11-05-21 18:05</field>
                    <field>Yard Move</field>
                    <field>Export</field>
                    <field>ZIQ9776</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32055688">
                    <field>11-05-21 18:06</field>
                    <field>Yard Move</field>
                    <field>Export</field>
                    <field>ST93565</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32055696">
                    <field>11-05-21 18:06</field>
                    <field>Receival</field>
                    <field>Storage</field>
                    <field>PCIU9361679</field>
                    <field />
                    <field />
                    <field />
                    <field>4529</field>
                    <field>DLE</field>
                    <field />
                </row>
                <row primary-key="32055698">
                    <field>11-05-21 18:06</field>
                    <field>Yard Move</field>
                    <field>Export</field>
                    <field>ZIQ9615</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32056349">
                    <field>11-05-21 18:07</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>CAIU3682225</field>
                    <field />
                    <field />
                    <field />
                    <field>4538</field>
                    <field>JVA</field>
                    <field />
                </row>
                <row primary-key="32056350">
                    <field>11-05-21 18:07</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>GESU1172863</field>
                    <field />
                    <field />
                    <field />
                    <field>4538</field>
                    <field>JVA</field>
                    <field />
                </row>
                <row primary-key="32056348">
                    <field>11-05-21 18:07</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>CRXU3320011</field>
                    <field />
                    <field />
                    <field />
                    <field>4538</field>
                    <field>JVA</field>
                    <field />
                </row>
                <row primary-key="32056360">
                    <field>11-05-21 18:08</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>CMAU6424715</field>
                    <field />
                    <field>4532</field>
                    <field>RJE</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32056389">
                    <field>11-05-21 18:09</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>HASU1310202</field>
                    <field />
                    <field />
                    <field />
                    <field>4538</field>
                    <field>JVA</field>
                    <field />
                </row>
                <row primary-key="32056393">
                    <field>11-05-21 18:09</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>MRKU8392447</field>
                    <field />
                    <field />
                    <field />
                    <field>4538</field>
                    <field>JVA</field>
                    <field />
                </row>
                <row primary-key="32056410">
                    <field>11-05-21 18:10</field>
                    <field>Delivery</field>
                    <field>Storage</field>
                    <field>MSKU2819195</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32056415">
                    <field>11-05-21 18:11</field>
                    <field>Delivery</field>
                    <field>Storage</field>
                    <field>MRKU7921741</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32056428">
                    <field>11-05-21 18:11</field>
                    <field>Receival</field>
                    <field>Storage</field>
                    <field>PCIU0200565</field>
                    <field />
                    <field />
                    <field />
                    <field>4529</field>
                    <field>DLE</field>
                    <field />
                </row>
                <row primary-key="32056441">
                    <field>11-05-21 18:13</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>SEGU4037856</field>
                    <field />
                    <field />
                    <field />
                    <field>4539</field>
                    <field>AAM</field>
                    <field />
                </row>
                <row primary-key="32056444">
                    <field>11-05-21 18:14</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>TRHU3888297</field>
                    <field />
                    <field />
                    <field />
                    <field>4528</field>
                    <field>AAL</field>
                    <field />
                </row>
                <row primary-key="32056459">
                    <field>11-05-21 18:15</field>
                    <field>Yard Shift</field>
                    <field>Import</field>
                    <field>TCNU6283475</field>
                    <field />
                    <field>4539</field>
                    <field>AAM</field>
                    <field>4539</field>
                    <field>AAM</field>
                    <field>4539</field>
                </row>
                <row primary-key="32056462">
                    <field>11-05-21 18:15</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>INKU2522330</field>
                    <field />
                    <field />
                    <field />
                    <field>4538</field>
                    <field>JVA</field>
                    <field />
                </row>
                <row primary-key="32056464">
                    <field>11-05-21 18:15</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>CMAU1451410</field>
                    <field />
                    <field />
                    <field />
                    <field>4532</field>
                    <field>RJE</field>
                    <field />
                </row>
                <row primary-key="32056466">
                    <field>11-05-21 18:16</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>GESU3460642</field>
                    <field />
                    <field />
                    <field />
                    <field>4528</field>
                    <field>AAL</field>
                    <field />
                </row>
                <row primary-key="32056478">
                    <field>11-05-21 18:17</field>
                    <field>Yard Move</field>
                    <field>Export</field>
                    <field>CMAU1451410</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32056532">
                    <field>11-05-21 18:20</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>MRKU6425161</field>
                    <field />
                    <field>4539</field>
                    <field>AAM</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32056534">
                    <field>11-05-21 18:20</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>FCIU4036125</field>
                    <field />
                    <field />
                    <field />
                    <field>4528</field>
                    <field>AAL</field>
                    <field />
                </row>
                <row primary-key="32056536">
                    <field>11-05-21 18:21</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>CAIU2087383</field>
                    <field />
                    <field />
                    <field />
                    <field>4538</field>
                    <field>JVA</field>
                    <field />
                </row>
                <row primary-key="32056537">
                    <field>11-05-21 18:21</field>
                    <field>Yard Move</field>
                    <field>Export</field>
                    <field>FCIU4036125</field>
                    <field />
                    <field>4528</field>
                    <field>AAL</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32056543">
                    <field>11-05-21 18:22</field>
                    <field>Delivery</field>
                    <field>Storage</field>
                    <field>PCIU9126427</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32056549">
                    <field>11-05-21 18:23</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>CMAU0785433</field>
                    <field />
                    <field />
                    <field />
                    <field>4528</field>
                    <field>AAL</field>
                    <field />
                </row>
                <row primary-key="32056559">
                    <field>11-05-21 18:24</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>TCLU7190678</field>
                    <field />
                    <field />
                    <field />
                    <field>4539</field>
                    <field>AAM</field>
                    <field />
                </row>
                <row primary-key="32056570">
                    <field>11-05-21 18:24</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>TCLU8847690</field>
                    <field />
                    <field />
                    <field />
                    <field>4533</field>
                    <field>GPA</field>
                    <field />
                </row>
                <row primary-key="32056592">
                    <field>11-05-21 18:25</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>MEDU6124594</field>
                    <field />
                    <field>4532</field>
                    <field>RJE</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32056603">
                    <field>11-05-21 18:28</field>
                    <field>Yard Shift</field>
                    <field>Import</field>
                    <field>SUDU5942191</field>
                    <field />
                    <field>4538</field>
                    <field>JVA</field>
                    <field>4538</field>
                    <field>JVA</field>
                    <field>4538</field>
                </row>
                <row primary-key="32056612">
                    <field>11-05-21 18:29</field>
                    <field>Yard Shift</field>
                    <field>Import</field>
                    <field>MRSU3390001</field>
                    <field />
                    <field>4538</field>
                    <field>JVA</field>
                    <field>4538</field>
                    <field>JVA</field>
                    <field>4538</field>
                </row>
                <row primary-key="32056629">
                    <field>11-05-21 18:30</field>
                    <field>Delivery</field>
                    <field>Storage</field>
                    <field>SUDU7761696</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32056632">
                    <field>11-05-21 18:30</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>FSCU4575337</field>
                    <field />
                    <field>4538</field>
                    <field>JVA</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32056639">
                    <field>11-05-21 18:32</field>
                    <field>Delivery</field>
                    <field>Storage</field>
                    <field>APZU3530446</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32056640">
                    <field>11-05-21 18:32</field>
                    <field>Yard Shift</field>
                    <field>Import</field>
                    <field>CMAU0862416</field>
                    <field />
                    <field>4532</field>
                    <field>RJE</field>
                    <field>4532</field>
                    <field>RJE</field>
                    <field>4532</field>
                </row>
                <row primary-key="32056644">
                    <field>11-05-21 18:32</field>
                    <field>Yard Shift</field>
                    <field>Import</field>
                    <field>TEMU2737332</field>
                    <field />
                    <field>4532</field>
                    <field>RJE</field>
                    <field>4532</field>
                    <field>RJE</field>
                    <field>4532</field>
                </row>
                <row primary-key="32056647">
                    <field>11-05-21 18:32</field>
                    <field>Delivery</field>
                    <field>Storage</field>
                    <field>CMAU2050860</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32056656">
                    <field>11-05-21 18:32</field>
                    <field>Delivery</field>
                    <field>Storage</field>
                    <field>MRKU7067289</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32056685">
                    <field>11-05-21 18:36</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>DFSU2049847</field>
                    <field />
                    <field />
                    <field />
                    <field>4528</field>
                    <field>AAL</field>
                    <field />
                </row>
                <row primary-key="32056693">
                    <field>11-05-21 18:37</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>UETU2226766</field>
                    <field />
                    <field />
                    <field />
                    <field>4538</field>
                    <field>JVA</field>
                    <field />
                </row>
                <row primary-key="32056697">
                    <field>11-05-21 18:39</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>CMAU1798040</field>
                    <field />
                    <field>4532</field>
                    <field>RJE</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32056723">
                    <field>11-05-21 18:40</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>CAIU3858850</field>
                    <field />
                    <field />
                    <field />
                    <field>4538</field>
                    <field>JVA</field>
                    <field />
                </row>
                <row primary-key="32056725">
                    <field>11-05-21 18:40</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>CMAU1791512</field>
                    <field />
                    <field />
                    <field />
                    <field>4538</field>
                    <field>JVA</field>
                    <field />
                </row>
                <row primary-key="32056745">
                    <field>11-05-21 18:43</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>UETU5516877</field>
                    <field />
                    <field />
                    <field />
                    <field>4538</field>
                    <field>JVA</field>
                    <field />
                </row>
                <row primary-key="32056757">
                    <field>11-05-21 18:44</field>
                    <field>Yard Shift</field>
                    <field>Import</field>
                    <field>TGHU1023380</field>
                    <field />
                    <field>4529</field>
                    <field>DLE</field>
                    <field>4529</field>
                    <field>DLE</field>
                    <field>4529</field>
                </row>
                <row primary-key="32056769">
                    <field>11-05-21 18:45</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>TRLU9184478</field>
                    <field />
                    <field>4528</field>
                    <field>AAL</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32056806">
                    <field>11-05-21 18:49</field>
                    <field>Yard Shift</field>
                    <field>Import</field>
                    <field>PCIU8896932</field>
                    <field />
                    <field>4533</field>
                    <field>GPA</field>
                    <field>4533</field>
                    <field>GPA</field>
                    <field>4533</field>
                </row>
                <row primary-key="32056807">
                    <field>11-05-21 18:49</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>CXDU2086827</field>
                    <field />
                    <field>4529</field>
                    <field>DLE</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32056822">
                    <field>11-05-21 18:50</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>TGHU1331696</field>
                    <field />
                    <field />
                    <field />
                    <field>4528</field>
                    <field>AAL</field>
                    <field />
                </row>
                <row primary-key="32056824">
                    <field>11-05-21 18:51</field>
                    <field>Yard Shift</field>
                    <field>Import</field>
                    <field>TCNU4051280</field>
                    <field />
                    <field>4533</field>
                    <field>GPA</field>
                    <field>4533</field>
                    <field>GPA</field>
                    <field>4533</field>
                </row>
                <row primary-key="32056835">
                    <field>11-05-21 18:52</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>APHU7059429</field>
                    <field />
                    <field />
                    <field />
                    <field>4528</field>
                    <field>AAL</field>
                    <field />
                </row>
                <row primary-key="32056840">
                    <field>11-05-21 18:53</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>PCIU8725879</field>
                    <field />
                    <field>4532</field>
                    <field>RJE</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32056874">
                    <field>11-05-21 18:57</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>TGBU5813879</field>
                    <field />
                    <field />
                    <field />
                    <field>4528</field>
                    <field>AAL</field>
                    <field />
                </row>
                <row primary-key="32056878">
                    <field>11-05-21 18:59</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>MRSU3822363</field>
                    <field />
                    <field>4533</field>
                    <field>GPA</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32056880">
                    <field>11-05-21 18:59</field>
                    <field>Yard Move</field>
                    <field>Export</field>
                    <field>TGBU5813879</field>
                    <field />
                    <field>4528</field>
                    <field>AAL</field>
                    <field>4528</field>
                    <field>AAL</field>
                    <field>4528</field>
                </row>
                <row primary-key="32056910">
                    <field>11-05-21 19:02</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>APHU7165586</field>
                    <field />
                    <field>4532</field>
                    <field>RJE</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32057052">
                    <field>11-05-21 19:20</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>ST14997</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32057084">
                    <field>11-05-21 19:27</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>TRHU1848612</field>
                    <field />
                    <field />
                    <field />
                    <field>4538</field>
                    <field>JLA</field>
                    <field />
                </row>
                <row primary-key="32057088">
                    <field>11-05-21 19:29</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>XINU1099270</field>
                    <field />
                    <field>4541</field>
                    <field>JAM</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32057105">
                    <field>11-05-21 19:30</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>APZU3370327</field>
                    <field />
                    <field />
                    <field />
                    <field>4533</field>
                    <field>LBO</field>
                    <field />
                </row>
                <row primary-key="32057109">
                    <field>11-05-21 19:31</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>TCKU7322951</field>
                    <field />
                    <field />
                    <field />
                    <field>4538</field>
                    <field>JLA</field>
                    <field />
                </row>
                <row primary-key="32057113">
                    <field>11-05-21 19:33</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>HASU4315738</field>
                    <field />
                    <field />
                    <field />
                    <field>4538</field>
                    <field>JLA</field>
                    <field />
                </row>
                <row primary-key="32057119">
                    <field>11-05-21 19:34</field>
                    <field>Yard Shift</field>
                    <field>Import</field>
                    <field>TCNU4051280</field>
                    <field />
                    <field>4533</field>
                    <field>LBO</field>
                    <field>4533</field>
                    <field>LBO</field>
                    <field>4533</field>
                </row>
                <row primary-key="32057120">
                    <field>11-05-21 19:34</field>
                    <field>Yard Shift</field>
                    <field>Import</field>
                    <field>TCLU3415550</field>
                    <field />
                    <field>4540</field>
                    <field>PMA</field>
                    <field>4540</field>
                    <field>PMA</field>
                    <field>4540</field>
                </row>
                <row primary-key="32057121">
                    <field>11-05-21 19:34</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>CMAU9044961</field>
                    <field />
                    <field>4533</field>
                    <field>LBO</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32057123">
                    <field>11-05-21 19:34</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>CMAU1863084</field>
                    <field />
                    <field>4540</field>
                    <field>PMA</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32057138">
                    <field>11-05-21 19:35</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>APHU7182855</field>
                    <field />
                    <field />
                    <field />
                    <field>4538</field>
                    <field>JLA</field>
                    <field />
                </row>
                <row primary-key="32057142">
                    <field>11-05-21 19:36</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>UETU5147779</field>
                    <field />
                    <field>4539</field>
                    <field>ALO</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32057146">
                    <field>11-05-21 19:37</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>MSKU7565730</field>
                    <field />
                    <field />
                    <field />
                    <field>4541</field>
                    <field>JAM</field>
                    <field />
                </row>
                <row primary-key="32057148">
                    <field>11-05-21 19:38</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>MEDU5518340</field>
                    <field />
                    <field />
                    <field />
                    <field>4538</field>
                    <field>JLA</field>
                    <field />
                </row>
                <row primary-key="32057165">
                    <field>11-05-21 19:41</field>
                    <field>Yard Shift</field>
                    <field>Import</field>
                    <field>MRKU4440341</field>
                    <field />
                    <field>4532</field>
                    <field>GAS</field>
                    <field>4532</field>
                    <field>GAS</field>
                    <field>4532</field>
                </row>
                <row primary-key="32057166">
                    <field>11-05-21 19:42</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>TCLU2173718</field>
                    <field />
                    <field>4539</field>
                    <field>ALO</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32057167">
                    <field>11-05-21 19:42</field>
                    <field>Yard Shift</field>
                    <field>Import</field>
                    <field>MSDU7806277</field>
                    <field />
                    <field>4531</field>
                    <field>DAE</field>
                    <field>4531</field>
                    <field>DAE</field>
                    <field>4531</field>
                </row>
                <row primary-key="32057169">
                    <field>11-05-21 19:43</field>
                    <field>Yard Shift</field>
                    <field>Import</field>
                    <field>MEDU6053187</field>
                    <field />
                    <field>4540</field>
                    <field>PMA</field>
                    <field>4540</field>
                    <field>PMA</field>
                    <field>4540</field>
                </row>
                <row primary-key="32057170">
                    <field>11-05-21 19:43</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>MAGU2325503</field>
                    <field />
                    <field>4540</field>
                    <field>PMA</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32057174">
                    <field>11-05-21 19:44</field>
                    <field>Yard Shift</field>
                    <field>Import</field>
                    <field>MSMU7861769</field>
                    <field />
                    <field>4531</field>
                    <field>DAE</field>
                    <field>4531</field>
                    <field>DAE</field>
                    <field>4531</field>
                </row>
                <row primary-key="32057193">
                    <field>11-05-21 19:45</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>ZIQ9613</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32057198">
                    <field>11-05-21 19:45</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>PONU7656280</field>
                    <field />
                    <field>4533</field>
                    <field>LBO</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32057199">
                    <field>11-05-21 19:45</field>
                    <field>Yard Move</field>
                    <field>Export</field>
                    <field>ST14997</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32057201">
                    <field>11-05-21 19:46</field>
                    <field>Receival</field>
                    <field>Storage</field>
                    <field>MRKU8043996</field>
                    <field />
                    <field />
                    <field />
                    <field>4525</field>
                    <field>AMV</field>
                    <field />
                </row>
                <row primary-key="32057202">
                    <field>11-05-21 19:46</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>MRKU5953061</field>
                    <field />
                    <field>4532</field>
                    <field>GAS</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32057205">
                    <field>11-05-21 19:48</field>
                    <field>Receival</field>
                    <field>Storage</field>
                    <field>TEMU4482143</field>
                    <field />
                    <field />
                    <field />
                    <field>4525</field>
                    <field>AMV</field>
                    <field />
                </row>
                <row primary-key="32057209">
                    <field>11-05-21 19:49</field>
                    <field>Receival</field>
                    <field>Storage</field>
                    <field>PCIU9303142</field>
                    <field />
                    <field />
                    <field />
                    <field>4535</field>
                    <field>VJE</field>
                    <field />
                </row>
                <row primary-key="32057224">
                    <field>11-05-21 19:50</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>CMAU0849986</field>
                    <field />
                    <field />
                    <field />
                    <field>4538</field>
                    <field>JLA</field>
                    <field />
                </row>
                <row primary-key="32057226">
                    <field>11-05-21 19:50</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>FFAU1212413</field>
                    <field />
                    <field>4531</field>
                    <field>DAE</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32057235">
                    <field>11-05-21 19:53</field>
                    <field>Receival</field>
                    <field>Storage</field>
                    <field>PCIU8987307</field>
                    <field />
                    <field />
                    <field />
                    <field>4535</field>
                    <field>VJE</field>
                    <field />
                </row>
                <row primary-key="32057237">
                    <field>11-05-21 19:54</field>
                    <field>Yard Shift</field>
                    <field>Import</field>
                    <field>TRHU1642468</field>
                    <field />
                    <field>4532</field>
                    <field>GAS</field>
                    <field>4532</field>
                    <field>GAS</field>
                    <field>4532</field>
                </row>
                <row primary-key="32057240">
                    <field>11-05-21 19:54</field>
                    <field>Yard Shift</field>
                    <field>Import</field>
                    <field>CMAU0964845</field>
                    <field />
                    <field>4531</field>
                    <field>DAE</field>
                    <field>4531</field>
                    <field>DAE</field>
                    <field>4531</field>
                </row>
                <row primary-key="32057263">
                    <field>11-05-21 19:56</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>TEMU2865272</field>
                    <field />
                    <field>4531</field>
                    <field>DAE</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32057276">
                    <field>11-05-21 19:57</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>FCIU2596141</field>
                    <field />
                    <field>4532</field>
                    <field>GAS</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32057281">
                    <field>11-05-21 19:58</field>
                    <field>Receival</field>
                    <field>Storage</field>
                    <field>CMAU8252744</field>
                    <field />
                    <field />
                    <field />
                    <field>4535</field>
                    <field>VJE</field>
                    <field />
                </row>
                <row primary-key="32057284">
                    <field>11-05-21 19:59</field>
                    <field>Receival</field>
                    <field>Storage</field>
                    <field>PCIU9023440</field>
                    <field />
                    <field />
                    <field />
                    <field>4535</field>
                    <field>VJE</field>
                    <field />
                </row>
                <row primary-key="32057316">
                    <field>11-05-21 20:03</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>MSKU2391635</field>
                    <field />
                    <field />
                    <field />
                    <field>4531</field>
                    <field>DAE</field>
                    <field />
                </row>
                <row primary-key="32057319">
                    <field>11-05-21 20:04</field>
                    <field>Yard Shift</field>
                    <field>Import</field>
                    <field>MSKU0541612</field>
                    <field />
                    <field>4525</field>
                    <field>AMV</field>
                    <field>4525</field>
                    <field>AMV</field>
                    <field>4525</field>
                </row>
                <row primary-key="32057337">
                    <field>11-05-21 20:05</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>MSKU7034559</field>
                    <field />
                    <field />
                    <field />
                    <field>4528</field>
                    <field>JAI</field>
                    <field />
                </row>
                <row primary-key="32057343">
                    <field>11-05-21 20:05</field>
                    <field>Yard Shift</field>
                    <field>Import</field>
                    <field>PCIU8930636</field>
                    <field />
                    <field>4525</field>
                    <field>AMV</field>
                    <field>4525</field>
                    <field>AMV</field>
                    <field>4525</field>
                </row>
                <row primary-key="32057344">
                    <field>11-05-21 20:05</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>TCLU7155260</field>
                    <field />
                    <field>4541</field>
                    <field>JAM</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32057366">
                    <field>11-05-21 20:06</field>
                    <field>Delivery</field>
                    <field>Storage</field>
                    <field>MSKU4143113</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32057369">
                    <field>11-05-21 20:07</field>
                    <field>Delivery</field>
                    <field>Storage</field>
                    <field>MSKU7080180</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32057375">
                    <field>11-05-21 20:07</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>TCNU3154854</field>
                    <field />
                    <field />
                    <field />
                    <field>4518</field>
                    <field>JMV</field>
                    <field />
                </row>
                <row primary-key="32057378">
                    <field>11-05-21 20:08</field>
                    <field>Yard Move</field>
                    <field>Export</field>
                    <field>MSKU7034559</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32057377">
                    <field>11-05-21 20:08</field>
                    <field>Yard Move</field>
                    <field>Export</field>
                    <field>CAIU2087383</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32057379">
                    <field>11-05-21 20:08</field>
                    <field>Yard Move</field>
                    <field>Export</field>
                    <field>MRKU8392447</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32057391">
                    <field>11-05-21 20:08</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>PCIU9451685</field>
                    <field />
                    <field>4538</field>
                    <field>JLA</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32057393">
                    <field>11-05-21 20:08</field>
                    <field>Yard Shift</field>
                    <field>Import</field>
                    <field>PONU7421389</field>
                    <field />
                    <field>4525</field>
                    <field>AMV</field>
                    <field>4525</field>
                    <field>AMV</field>
                    <field>4525</field>
                </row>
                <row primary-key="32057412">
                    <field>11-05-21 20:09</field>
                    <field>Yard Shift</field>
                    <field>Import</field>
                    <field>MRKU3312984</field>
                    <field />
                    <field>4531</field>
                    <field>DAE</field>
                    <field>4531</field>
                    <field>DAE</field>
                    <field>4531</field>
                </row>
                <row primary-key="32057426">
                    <field>11-05-21 20:10</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>TCNU4022873</field>
                    <field />
                    <field>4535</field>
                    <field>VJE</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32057434">
                    <field>11-05-21 20:11</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>CAIU9443383</field>
                    <field />
                    <field>4538</field>
                    <field>JLA</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32057439">
                    <field>11-05-21 20:11</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>SUDU6800078</field>
                    <field />
                    <field>4525</field>
                    <field>AMV</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32057451">
                    <field>11-05-21 20:12</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>MEDU4184320</field>
                    <field />
                    <field>4531</field>
                    <field>DAE</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32057461">
                    <field>11-05-21 20:14</field>
                    <field>Delivery</field>
                    <field>Storage</field>
                    <field>TEMU4482143</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32057462">
                    <field>11-05-21 20:14</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>TGBU5821220</field>
                    <field />
                    <field />
                    <field />
                    <field>4529</field>
                    <field>RJS</field>
                    <field />
                </row>
                <row primary-key="32057469">
                    <field>11-05-21 20:14</field>
                    <field>Delivery</field>
                    <field>Storage</field>
                    <field>MRKU8043996</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32057497">
                    <field>11-05-21 20:16</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>CMAU1759450</field>
                    <field />
                    <field />
                    <field />
                    <field>4532</field>
                    <field>GAS</field>
                    <field />
                </row>
                <row primary-key="32057516">
                    <field>11-05-21 20:18</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>TLLU8311854</field>
                    <field />
                    <field />
                    <field />
                    <field>4528</field>
                    <field>JAI</field>
                    <field />
                </row>
                <row primary-key="32057518">
                    <field>11-05-21 20:18</field>
                    <field>Yard Shift</field>
                    <field>Import</field>
                    <field>SEGU1533528</field>
                    <field />
                    <field>4535</field>
                    <field>VJE</field>
                    <field>4535</field>
                    <field>VJE</field>
                    <field>4535</field>
                </row>
                <row primary-key="32057519">
                    <field>11-05-21 20:18</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>APZU3703217</field>
                    <field />
                    <field />
                    <field />
                    <field>4528</field>
                    <field>JAI</field>
                    <field />
                </row>
                <row primary-key="32057521">
                    <field>11-05-21 20:18</field>
                    <field>Yard Shift</field>
                    <field>Import</field>
                    <field>CMAU0255752</field>
                    <field />
                    <field>4535</field>
                    <field>VJE</field>
                    <field>4535</field>
                    <field>VJE</field>
                    <field>4535</field>
                </row>
                <row primary-key="32057526">
                    <field>11-05-21 20:19</field>
                    <field>Yard Shift</field>
                    <field>Import</field>
                    <field>TEMU4469563</field>
                    <field />
                    <field>4535</field>
                    <field>VJE</field>
                    <field>4535</field>
                    <field>VJE</field>
                    <field>4535</field>
                </row>
                <row primary-key="32057553">
                    <field>11-05-21 20:20</field>
                    <field>Yard Move</field>
                    <field>Export</field>
                    <field>CMAU1759450</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32057551">
                    <field>11-05-21 20:20</field>
                    <field>Yard Move</field>
                    <field>Export</field>
                    <field>APZU3370327</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32057552">
                    <field>11-05-21 20:20</field>
                    <field>Yard Move</field>
                    <field>Export</field>
                    <field>CMAU0849986</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32057554">
                    <field>11-05-21 20:20</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>PCIU8515086</field>
                    <field />
                    <field>4525</field>
                    <field>AMV</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32057556">
                    <field>11-05-21 20:20</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>PCIU1933232</field>
                    <field />
                    <field>4535</field>
                    <field>VJE</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32057584">
                    <field>11-05-21 20:22</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>MSDU1489072</field>
                    <field />
                    <field />
                    <field />
                    <field>4531</field>
                    <field>DAE</field>
                    <field />
                </row>
                <row primary-key="32057631">
                    <field>11-05-21 20:27</field>
                    <field>Receival</field>
                    <field>Storage</field>
                    <field>CMAU9090930</field>
                    <field />
                    <field />
                    <field />
                    <field>4519</field>
                    <field>JSO</field>
                    <field />
                </row>
                <row primary-key="32057634">
                    <field>11-05-21 20:27</field>
                    <field>Yard Shift</field>
                    <field>Import</field>
                    <field>MSCU5072885</field>
                    <field />
                    <field>4518</field>
                    <field>JMV</field>
                    <field>4518</field>
                    <field>JMV</field>
                    <field>4518</field>
                </row>
                <row primary-key="32057635">
                    <field>11-05-21 20:27</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>MSKU9540330</field>
                    <field />
                    <field />
                    <field />
                    <field>4532</field>
                    <field>GAS</field>
                    <field />
                </row>
                <row primary-key="32057636">
                    <field>11-05-21 20:27</field>
                    <field>Yard Shift</field>
                    <field>Import</field>
                    <field>MSDU7957695</field>
                    <field />
                    <field>4518</field>
                    <field>JMV</field>
                    <field>4518</field>
                    <field>JMV</field>
                    <field>4518</field>
                </row>
                <row primary-key="32057638">
                    <field>11-05-21 20:27</field>
                    <field>Yard Shift</field>
                    <field>Import</field>
                    <field>PCIU8995154</field>
                    <field />
                    <field>4518</field>
                    <field>JMV</field>
                    <field>4518</field>
                    <field>JMV</field>
                    <field>4518</field>
                </row>
                <row primary-key="32057639">
                    <field>11-05-21 20:27</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>PCIU8844230</field>
                    <field />
                    <field>4518</field>
                    <field>JMV</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32057644">
                    <field>11-05-21 20:29</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>MEDU8275291</field>
                    <field />
                    <field />
                    <field />
                    <field>4528</field>
                    <field>JAI</field>
                    <field />
                </row>
                <row primary-key="32057667">
                    <field>11-05-21 20:30</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>TCNU5654632</field>
                    <field />
                    <field />
                    <field />
                    <field>4529</field>
                    <field>RJS</field>
                    <field />
                </row>
                <row primary-key="32057678">
                    <field>11-05-21 20:31</field>
                    <field>Yard Shift</field>
                    <field>Import</field>
                    <field>PCIU1292946</field>
                    <field />
                    <field>4539</field>
                    <field>ALO</field>
                    <field>4539</field>
                    <field>ALO</field>
                    <field>4539</field>
                </row>
                <row primary-key="32057679">
                    <field>11-05-21 20:31</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>BSIU2934821</field>
                    <field />
                    <field>4539</field>
                    <field>ALO</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32057681">
                    <field>11-05-21 20:32</field>
                    <field>Yard Shift</field>
                    <field>Import</field>
                    <field>PCIU9343551</field>
                    <field />
                    <field>4518</field>
                    <field>JMV</field>
                    <field>4518</field>
                    <field>JMV</field>
                    <field>4518</field>
                </row>
                <row primary-key="32057688">
                    <field>11-05-21 20:33</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>GLDU5283516</field>
                    <field />
                    <field />
                    <field />
                    <field>4531</field>
                    <field>DAE</field>
                    <field />
                </row>
                <row primary-key="32057690">
                    <field>11-05-21 20:34</field>
                    <field>Yard Shift</field>
                    <field>Import</field>
                    <field>DFSU4226957</field>
                    <field />
                    <field>4538</field>
                    <field>JLA</field>
                    <field>4538</field>
                    <field>JLA</field>
                    <field>4538</field>
                </row>
                <row primary-key="32057691">
                    <field>11-05-21 20:34</field>
                    <field>Yard Shift</field>
                    <field>Import</field>
                    <field>GLDU0963207</field>
                    <field />
                    <field>4538</field>
                    <field>JLA</field>
                    <field>4538</field>
                    <field>JLA</field>
                    <field>4538</field>
                </row>
                <row primary-key="32057692">
                    <field>11-05-21 20:34</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>BMOU5890151</field>
                    <field />
                    <field>4538</field>
                    <field>JLA</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32057716">
                    <field>11-05-21 20:37</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>MNBU3725864</field>
                    <field />
                    <field />
                    <field />
                    <field>4540</field>
                    <field>PMA</field>
                    <field />
                </row>
                <row primary-key="32057721">
                    <field>11-05-21 20:38</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>PCIU8662050</field>
                    <field />
                    <field>4518</field>
                    <field>JMV</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32057726">
                    <field>11-05-21 20:38</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>TRHU3831901</field>
                    <field />
                    <field />
                    <field />
                    <field>4532</field>
                    <field>GAS</field>
                    <field />
                </row>
                <row primary-key="32057729">
                    <field>11-05-21 20:39</field>
                    <field>Yard Shift</field>
                    <field>Import</field>
                    <field>PCIU8666626</field>
                    <field />
                    <field>4518</field>
                    <field>JMV</field>
                    <field>4518</field>
                    <field>JMV</field>
                    <field>4518</field>
                </row>
                <row primary-key="32057731">
                    <field>11-05-21 20:39</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>TGHU9190547</field>
                    <field />
                    <field>4519</field>
                    <field>JSO</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32057746">
                    <field>11-05-21 20:40</field>
                    <field>Discharge</field>
                    <field>Import</field>
                    <field>TGBU9902130</field>
                    <field>QC2</field>
                    <field>QC2</field>
                    <field>MLS</field>
                    <field>4538</field>
                    <field>JLA</field>
                    <field>2512</field>
                </row>
                <row primary-key="32057754">
                    <field>11-05-21 20:40</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>CMAU0614786</field>
                    <field />
                    <field>4540</field>
                    <field>PMA</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32057762">
                    <field>11-05-21 20:42</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>TGBU5197650</field>
                    <field />
                    <field />
                    <field />
                    <field>4528</field>
                    <field>JAI</field>
                    <field />
                </row>
                <row primary-key="32057763">
                    <field>11-05-21 20:42</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>CMAU5793257</field>
                    <field />
                    <field>4525</field>
                    <field>AMV</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32057766">
                    <field>11-05-21 20:42</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>CMAU2185443</field>
                    <field />
                    <field />
                    <field />
                    <field>4532</field>
                    <field>GAS</field>
                    <field />
                </row>
                <row primary-key="32057768">
                    <field>11-05-21 20:43</field>
                    <field>Yard Move</field>
                    <field>Storage</field>
                    <field>MSKU4329330</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32057770">
                    <field>11-05-21 20:43</field>
                    <field>Yard Move</field>
                    <field>Storage</field>
                    <field>HASU1193723</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32057769">
                    <field>11-05-21 20:43</field>
                    <field>Yard Move</field>
                    <field>Storage</field>
                    <field>TCKU2749637</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32057771">
                    <field>11-05-21 20:43</field>
                    <field>Discharge</field>
                    <field>Import</field>
                    <field>MSMU7613567</field>
                    <field>QC2</field>
                    <field>QC2</field>
                    <field>MLS</field>
                    <field>4538</field>
                    <field>JLA</field>
                    <field>7003</field>
                </row>
                <row primary-key="32057788">
                    <field>11-05-21 20:44</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>APHU6320076</field>
                    <field />
                    <field />
                    <field />
                    <field>4528</field>
                    <field>JAI</field>
                    <field />
                </row>
                <row primary-key="32057785">
                    <field>11-05-21 20:44</field>
                    <field>Yard Move</field>
                    <field>Storage</field>
                    <field>FCIU4529203</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32057786">
                    <field>11-05-21 20:44</field>
                    <field>Yard Move</field>
                    <field>Storage</field>
                    <field>TEMU3914495</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32057787">
                    <field>11-05-21 20:44</field>
                    <field>Yard Move</field>
                    <field>Storage</field>
                    <field>PONU0285573</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32057789">
                    <field>11-05-21 20:44</field>
                    <field>Yard Move</field>
                    <field>Storage</field>
                    <field>TGHU1142394</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32057814">
                    <field>11-05-21 20:45</field>
                    <field>Yard Shift</field>
                    <field>Import</field>
                    <field>GLDU0963207</field>
                    <field />
                    <field>4529</field>
                    <field>RJS</field>
                    <field>4529</field>
                    <field>RJS</field>
                    <field>4529</field>
                </row>
                <row primary-key="32057816">
                    <field>11-05-21 20:45</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>TCNU7847097</field>
                    <field />
                    <field>4531</field>
                    <field>DAE</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32057818">
                    <field>11-05-21 20:45</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>TCKU6514965</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32057822">
                    <field>11-05-21 20:46</field>
                    <field>Yard Move</field>
                    <field>Storage</field>
                    <field>MSKU7816753</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32057821">
                    <field>11-05-21 20:46</field>
                    <field>Yard Move</field>
                    <field>Storage</field>
                    <field>MRKU6956912</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32057824">
                    <field>11-05-21 20:46</field>
                    <field>Receival</field>
                    <field>Storage</field>
                    <field>GCXU5130988</field>
                    <field />
                    <field />
                    <field />
                    <field>4519</field>
                    <field>JSO</field>
                    <field />
                </row>
                <row primary-key="32057828">
                    <field>11-05-21 20:46</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>DFSU4226957</field>
                    <field />
                    <field>4529</field>
                    <field>RJS</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32057831">
                    <field>11-05-21 20:47</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>MRKU0409944</field>
                    <field />
                    <field>4518</field>
                    <field>JMV</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32057841">
                    <field>11-05-21 20:47</field>
                    <field>Discharge</field>
                    <field>Import</field>
                    <field>MSDU7008298</field>
                    <field>QC2</field>
                    <field>QC2</field>
                    <field>MLS</field>
                    <field>4533</field>
                    <field>LBO</field>
                    <field>7001</field>
                </row>
                <row primary-key="32057857">
                    <field>11-05-21 20:47</field>
                    <field>Discharge</field>
                    <field>Import</field>
                    <field>DFSU7791102</field>
                    <field>QC2</field>
                    <field>QC2</field>
                    <field>MLS</field>
                    <field>4533</field>
                    <field>LBO</field>
                    <field>2518</field>
                </row>
                <row primary-key="32057858">
                    <field>11-05-21 20:47</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>TCKU3736758</field>
                    <field />
                    <field>4540</field>
                    <field>PMA</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32057900">
                    <field>11-05-21 20:50</field>
                    <field>Discharge</field>
                    <field>Import</field>
                    <field>MEDU4351500</field>
                    <field>QC2</field>
                    <field>QC2</field>
                    <field>MLS</field>
                    <field>4538</field>
                    <field>JLA</field>
                    <field>6013</field>
                </row>
                <row primary-key="32057928">
                    <field>11-05-21 20:51</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>MRKU7104865</field>
                    <field />
                    <field />
                    <field />
                    <field>4528</field>
                    <field>JAI</field>
                    <field />
                </row>
                <row primary-key="32057932">
                    <field>11-05-21 20:52</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>PCIU1383440</field>
                    <field />
                    <field>4531</field>
                    <field>DAE</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32057938">
                    <field>11-05-21 20:53</field>
                    <field>Discharge</field>
                    <field>Import</field>
                    <field>CAIU7551516</field>
                    <field>QC2</field>
                    <field>QC2</field>
                    <field>MLS</field>
                    <field>4533</field>
                    <field>LBO</field>
                    <field>2510</field>
                </row>
                <row primary-key="32057946">
                    <field>11-05-21 20:53</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>MSDU7534271</field>
                    <field />
                    <field>4529</field>
                    <field>RJS</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32057948">
                    <field>11-05-21 20:53</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>PCIU8811895</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32057949">
                    <field>11-05-21 20:54</field>
                    <field>Discharge</field>
                    <field>Import</field>
                    <field>MSCU5399266</field>
                    <field>QC2</field>
                    <field>QC2</field>
                    <field>MLS</field>
                    <field>4533</field>
                    <field>LBO</field>
                    <field>2518</field>
                </row>
                <row primary-key="32057959">
                    <field>11-05-21 20:54</field>
                    <field>Yard Shift</field>
                    <field>Import</field>
                    <field>CAIU6289398</field>
                    <field />
                    <field>4518</field>
                    <field>JMV</field>
                    <field>4518</field>
                    <field>JMV</field>
                    <field>4518</field>
                </row>
                <row primary-key="32057960">
                    <field>11-05-21 20:54</field>
                    <field>Discharge</field>
                    <field>Import</field>
                    <field>FFAU2577191</field>
                    <field>QC2</field>
                    <field>QC2</field>
                    <field>MLS</field>
                    <field>4538</field>
                    <field>JLA</field>
                    <field>7003</field>
                </row>
                <row primary-key="32057981">
                    <field>11-05-21 20:55</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>DRYU9976450</field>
                    <field />
                    <field>4532</field>
                    <field>GAS</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32057991">
                    <field>11-05-21 20:56</field>
                    <field>Discharge</field>
                    <field>Import</field>
                    <field>TOLU8997349</field>
                    <field>QC2</field>
                    <field>QC2</field>
                    <field>MLS</field>
                    <field>4533</field>
                    <field>LBO</field>
                    <field>2518</field>
                </row>
                <row primary-key="32058000">
                    <field>11-05-21 20:56</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>TLLU2102950</field>
                    <field />
                    <field>4525</field>
                    <field>AMV</field>
                    <field>4525</field>
                    <field>AMV</field>
                    <field>4525</field>
                </row>
                <row primary-key="32058002">
                    <field>11-05-21 20:57</field>
                    <field>Discharge</field>
                    <field>Import</field>
                    <field>BMOU6900362</field>
                    <field>QC2</field>
                    <field>QC2</field>
                    <field>MLS</field>
                    <field>4540</field>
                    <field>PMA</field>
                    <field>2522</field>
                </row>
                <row primary-key="32058010">
                    <field>11-05-21 20:57</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>TCLU6190349</field>
                    <field />
                    <field>4525</field>
                    <field>AMV</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32058022">
                    <field>11-05-21 20:57</field>
                    <field>Yard Shift</field>
                    <field>Import</field>
                    <field>PCIU1567792</field>
                    <field />
                    <field>4531</field>
                    <field>DAE</field>
                    <field>4531</field>
                    <field>DAE</field>
                    <field>4531</field>
                </row>
                <row primary-key="32058026">
                    <field>11-05-21 20:58</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>MEDU2374677</field>
                    <field />
                    <field>4518</field>
                    <field>JMV</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32058038">
                    <field>11-05-21 20:58</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>BEAU2227752</field>
                    <field />
                    <field />
                    <field />
                    <field>4528</field>
                    <field>JAI</field>
                    <field />
                </row>
                <row primary-key="32058045">
                    <field>11-05-21 20:59</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>GESU3390036</field>
                    <field />
                    <field />
                    <field />
                    <field>4528</field>
                    <field>JAI</field>
                    <field />
                </row>
                <row primary-key="32058059">
                    <field>11-05-21 20:59</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>PCIU1220756</field>
                    <field />
                    <field>4531</field>
                    <field>DAE</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32058074">
                    <field>11-05-21 21:00</field>
                    <field>Discharge</field>
                    <field>Import</field>
                    <field>CLHU4379213</field>
                    <field>QC2</field>
                    <field>QC2</field>
                    <field>MLS</field>
                    <field>4533</field>
                    <field>LBO</field>
                    <field>7004</field>
                </row>
                <row primary-key="32058096">
                    <field>11-05-21 21:01</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>SEGU1471180</field>
                    <field />
                    <field />
                    <field />
                    <field>4528</field>
                    <field>JAI</field>
                    <field />
                </row>
                <row primary-key="32058098">
                    <field>11-05-21 21:01</field>
                    <field>Discharge</field>
                    <field>Import</field>
                    <field>MEDU4666934</field>
                    <field>QC2</field>
                    <field>QC2</field>
                    <field>MLS</field>
                    <field>4538</field>
                    <field>JLA</field>
                    <field>2515</field>
                </row>
                <row primary-key="32058117">
                    <field>11-05-21 21:03</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>MEDU1069663</field>
                    <field />
                    <field />
                    <field />
                    <field>4525</field>
                    <field>AMV</field>
                    <field />
                </row>
                <row primary-key="32058135">
                    <field>11-05-21 21:04</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>PONU0619618</field>
                    <field />
                    <field>4529</field>
                    <field>RJS</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32058136">
                    <field>11-05-21 21:04</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>CMAU7952445</field>
                    <field />
                    <field />
                    <field />
                    <field>4528</field>
                    <field>JAI</field>
                    <field />
                </row>
                <row primary-key="32058151">
                    <field>11-05-21 21:05</field>
                    <field>Discharge</field>
                    <field>Import</field>
                    <field>MSCU7031294</field>
                    <field>QC2</field>
                    <field>QC2</field>
                    <field>MLS</field>
                    <field>4538</field>
                    <field>JLA</field>
                    <field>7003</field>
                </row>
                <row primary-key="32058168">
                    <field>11-05-21 21:06</field>
                    <field>Yard Shift</field>
                    <field>Import</field>
                    <field>SUDU8855151</field>
                    <field />
                    <field>4532</field>
                    <field>GAS</field>
                    <field>4532</field>
                    <field>GAS</field>
                    <field>4532</field>
                </row>
                <row primary-key="32058167">
                    <field>11-05-21 21:06</field>
                    <field>Discharge</field>
                    <field>Import</field>
                    <field>MEDU7742690</field>
                    <field>QC2</field>
                    <field>QC2</field>
                    <field>MLS</field>
                    <field>4533</field>
                    <field>LBO</field>
                    <field>6005</field>
                </row>
                <row primary-key="32058176">
                    <field>11-05-21 21:06</field>
                    <field>Yard Shift</field>
                    <field>Import</field>
                    <field>TCNU1029658</field>
                    <field />
                    <field>4532</field>
                    <field>GAS</field>
                    <field>4532</field>
                    <field>GAS</field>
                    <field>4532</field>
                </row>
                <row primary-key="32058186">
                    <field>11-05-21 21:07</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>CMAU7172095</field>
                    <field />
                    <field />
                    <field />
                    <field>4528</field>
                    <field>JAI</field>
                    <field />
                </row>
                <row primary-key="32058189">
                    <field>11-05-21 21:07</field>
                    <field>Discharge</field>
                    <field>Import</field>
                    <field>MEDU8207240</field>
                    <field>QC2</field>
                    <field>QC2</field>
                    <field>MLS</field>
                    <field>4540</field>
                    <field>PMA</field>
                    <field>6015</field>
                </row>
                <row primary-key="32058197">
                    <field>11-05-21 21:07</field>
                    <field>Yard Shift</field>
                    <field>Import</field>
                    <field>MRKU3240544</field>
                    <field />
                    <field>4518</field>
                    <field>JMV</field>
                    <field>4518</field>
                    <field>JMV</field>
                    <field>4518</field>
                </row>
                <row primary-key="32058205">
                    <field>11-05-21 21:09</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>CMAU5592186</field>
                    <field />
                    <field>4532</field>
                    <field>GAS</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32058207">
                    <field>11-05-21 21:09</field>
                    <field>Discharge</field>
                    <field>Import</field>
                    <field>MEDU6278075</field>
                    <field>QC1</field>
                    <field>QC1</field>
                    <field>EGE</field>
                    <field>4539</field>
                    <field>ALO</field>
                    <field>2525</field>
                </row>
                <row primary-key="32058235">
                    <field>11-05-21 21:10</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>TEMU5924996</field>
                    <field />
                    <field />
                    <field />
                    <field>4519</field>
                    <field>JSO</field>
                    <field />
                </row>
                <row primary-key="32058238">
                    <field>11-05-21 21:11</field>
                    <field>Discharge</field>
                    <field>Import</field>
                    <field>XINU1338518</field>
                    <field>QC1</field>
                    <field>QC1</field>
                    <field>EGE</field>
                    <field>4539</field>
                    <field>ALO</field>
                    <field>2515</field>
                </row>
                <row primary-key="32058249">
                    <field>11-05-21 21:11</field>
                    <field>Yard Shift</field>
                    <field>Import</field>
                    <field>TRHU4802641</field>
                    <field />
                    <field>4525</field>
                    <field>AMV</field>
                    <field>4525</field>
                    <field>AMV</field>
                    <field>4525</field>
                </row>
                <row primary-key="32058250">
                    <field>11-05-21 21:11</field>
                    <field>Yard Shift</field>
                    <field>Import</field>
                    <field>TCNU7731954</field>
                    <field />
                    <field>4525</field>
                    <field>AMV</field>
                    <field>4525</field>
                    <field>AMV</field>
                    <field>4525</field>
                </row>
                <row primary-key="32058251">
                    <field>11-05-21 21:11</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>GCXU5287977</field>
                    <field />
                    <field>4533</field>
                    <field>LBO</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32058255">
                    <field>11-05-21 21:12</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>MSCU7780440</field>
                    <field />
                    <field />
                    <field />
                    <field>4531</field>
                    <field>DAE</field>
                    <field />
                </row>
                <row primary-key="32058256">
                    <field>11-05-21 21:12</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>TCLU9316868</field>
                    <field />
                    <field>4518</field>
                    <field>JMV</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32058264">
                    <field>11-05-21 21:12</field>
                    <field>Discharge</field>
                    <field>Import</field>
                    <field>TCLU6001316</field>
                    <field>QC2</field>
                    <field>QC2</field>
                    <field>MLS</field>
                    <field>4533</field>
                    <field>LBO</field>
                    <field>2516</field>
                </row>
                <row primary-key="32058274">
                    <field>11-05-21 21:13</field>
                    <field>Discharge</field>
                    <field>Import</field>
                    <field>BEAU2815144</field>
                    <field>QC1</field>
                    <field>QC1</field>
                    <field>EGE</field>
                    <field>4539</field>
                    <field>ALO</field>
                    <field>2520</field>
                </row>
                <row primary-key="32058284">
                    <field>11-05-21 21:13</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>MEDU2352702</field>
                    <field />
                    <field />
                    <field />
                    <field>4532</field>
                    <field>GAS</field>
                    <field />
                </row>
                <row primary-key="32058290">
                    <field>11-05-21 21:14</field>
                    <field>Discharge</field>
                    <field>Import</field>
                    <field>TCLU6028739</field>
                    <field>QC2</field>
                    <field>QC2</field>
                    <field>MLS</field>
                    <field>4533</field>
                    <field>LBO</field>
                    <field>2516</field>
                </row>
                <row primary-key="32058298">
                    <field>11-05-21 21:14</field>
                    <field>Yard Shift</field>
                    <field>Import</field>
                    <field>MRKU7826322</field>
                    <field />
                    <field>4534</field>
                    <field>AJO</field>
                    <field>4534</field>
                    <field>AJO</field>
                    <field>4534</field>
                </row>
                <row primary-key="32058299">
                    <field>11-05-21 21:14</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>TLLU8407529</field>
                    <field />
                    <field>4534</field>
                    <field>AJO</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32058322">
                    <field>11-05-21 21:15</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>CMAU6114875</field>
                    <field />
                    <field />
                    <field />
                    <field>4531</field>
                    <field>DAE</field>
                    <field />
                </row>
                <row primary-key="32058323">
                    <field>11-05-21 21:15</field>
                    <field>Yard Shift</field>
                    <field>Import</field>
                    <field>HASU5021609</field>
                    <field />
                    <field>4518</field>
                    <field>JMV</field>
                    <field>4518</field>
                    <field>JMV</field>
                    <field>4518</field>
                </row>
                <row primary-key="32058324">
                    <field>11-05-21 21:15</field>
                    <field>Discharge</field>
                    <field>Import</field>
                    <field>TOLU8953438</field>
                    <field>QC2</field>
                    <field>QC2</field>
                    <field>MLS</field>
                    <field>4533</field>
                    <field>LBO</field>
                    <field>2515</field>
                </row>
                <row primary-key="32058352">
                    <field>11-05-21 21:15</field>
                    <field>Discharge</field>
                    <field>Import</field>
                    <field>AMZU4179433</field>
                    <field>QC2</field>
                    <field>QC2</field>
                    <field>MLS</field>
                    <field>4533</field>
                    <field>LBO</field>
                    <field>2528</field>
                </row>
                <row primary-key="32058377">
                    <field>11-05-21 21:17</field>
                    <field>Discharge</field>
                    <field>Through</field>
                    <field>MEDU1956863</field>
                    <field>QC2</field>
                    <field>QC2</field>
                    <field>MLS</field>
                    <field>4529</field>
                    <field>RJS</field>
                    <field>7001</field>
                </row>
                <row primary-key="32058381">
                    <field>11-05-21 21:18</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>FSCU8103112</field>
                    <field />
                    <field>4525</field>
                    <field>AMV</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32058385">
                    <field>11-05-21 21:19</field>
                    <field>Discharge</field>
                    <field>Through</field>
                    <field>TCKU1604937</field>
                    <field>QC2</field>
                    <field>QC2</field>
                    <field>MLS</field>
                    <field>4529</field>
                    <field>RJS</field>
                    <field>7001</field>
                </row>
                <row primary-key="32058411">
                    <field>11-05-21 21:20</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>MRKU6220475</field>
                    <field />
                    <field>4518</field>
                    <field>JMV</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32058414">
                    <field>11-05-21 21:20</field>
                    <field>Discharge</field>
                    <field>Through</field>
                    <field>TEMU3632927</field>
                    <field>QC2</field>
                    <field>QC2</field>
                    <field>MLS</field>
                    <field>4529</field>
                    <field>RJS</field>
                    <field>2510</field>
                </row>
                <row primary-key="32058420">
                    <field>11-05-21 21:20</field>
                    <field>Discharge</field>
                    <field>Through</field>
                    <field>INBU3662057</field>
                    <field>QC2</field>
                    <field>QC2</field>
                    <field>MLS</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32058421">
                    <field>11-05-21 21:20</field>
                    <field>Discharge</field>
                    <field>Through</field>
                    <field>TRHU3002921</field>
                    <field>QC2</field>
                    <field>QC2</field>
                    <field>MLS</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32058428">
                    <field>11-05-21 21:20</field>
                    <field>Yard Shift</field>
                    <field>Import</field>
                    <field>PCIU8513329</field>
                    <field />
                    <field>4528</field>
                    <field>JAI</field>
                    <field>4528</field>
                    <field>JAI</field>
                    <field>4528</field>
                </row>
                <row primary-key="32058431">
                    <field>11-05-21 21:21</field>
                    <field>Yard Move</field>
                    <field>Export</field>
                    <field>MEDU1069663</field>
                    <field />
                    <field>4525</field>
                    <field>AMV</field>
                    <field>4525</field>
                    <field>AMV</field>
                    <field>4525</field>
                </row>
                <row primary-key="32058432">
                    <field>11-05-21 21:21</field>
                    <field>Discharge</field>
                    <field>Through</field>
                    <field>TCLU2655807</field>
                    <field>QC2</field>
                    <field>QC2</field>
                    <field>MLS</field>
                    <field>4529</field>
                    <field>RJS</field>
                    <field>6005</field>
                </row>
                <row primary-key="32058436">
                    <field>11-05-21 21:22</field>
                    <field>Discharge</field>
                    <field>Import</field>
                    <field>CRSU9213868</field>
                    <field>QC2</field>
                    <field>QC2</field>
                    <field>MLS</field>
                    <field>4533</field>
                    <field>LBO</field>
                    <field>6003</field>
                </row>
                <row primary-key="32058451">
                    <field>11-05-21 21:23</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>SITU4966010</field>
                    <field />
                    <field>4528</field>
                    <field>JAI</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32058453">
                    <field>11-05-21 21:23</field>
                    <field>Discharge</field>
                    <field>Through</field>
                    <field>TCLU6974211</field>
                    <field>QC2</field>
                    <field>QC2</field>
                    <field>MLS</field>
                    <field>4529</field>
                    <field>RJS</field>
                    <field>6005</field>
                </row>
                <row primary-key="32058457">
                    <field>11-05-21 21:23</field>
                    <field>Discharge</field>
                    <field>Import</field>
                    <field>MEDU8335003</field>
                    <field>QC2</field>
                    <field>QC2</field>
                    <field>MLS</field>
                    <field>4533</field>
                    <field>LBO</field>
                    <field>7001</field>
                </row>
                <row primary-key="32058469">
                    <field>11-05-21 21:24</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>MSKU0590448</field>
                    <field />
                    <field>4532</field>
                    <field>GAS</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32058491">
                    <field>11-05-21 21:25</field>
                    <field>Delivery</field>
                    <field>Storage</field>
                    <field>TCLU6701876</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32058495">
                    <field>11-05-21 21:25</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>MRKU8482540</field>
                    <field />
                    <field />
                    <field />
                    <field>4525</field>
                    <field>AMV</field>
                    <field />
                </row>
                <row primary-key="32058496">
                    <field>11-05-21 21:26</field>
                    <field>Discharge</field>
                    <field>Import</field>
                    <field>CAAU2115672</field>
                    <field>QC1</field>
                    <field>QC1</field>
                    <field>EGE</field>
                    <field>4540</field>
                    <field>PMA</field>
                    <field>2515</field>
                </row>
                <row primary-key="32058504">
                    <field>11-05-21 21:26</field>
                    <field>Discharge</field>
                    <field>Import</field>
                    <field>TRLU7635778</field>
                    <field>QC2</field>
                    <field>QC2</field>
                    <field>MLS</field>
                    <field>4529</field>
                    <field>RJS</field>
                    <field />
                </row>
                <row primary-key="32058512">
                    <field>11-05-21 21:26</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>TRLU7635778</field>
                    <field />
                    <field>4538</field>
                    <field>JLA</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32058531">
                    <field>11-05-21 21:29</field>
                    <field>Yard Shift</field>
                    <field>Import</field>
                    <field>TCNU8594331</field>
                    <field />
                    <field>4532</field>
                    <field>GAS</field>
                    <field>4532</field>
                    <field>GAS</field>
                    <field>4532</field>
                </row>
                <row primary-key="32058537">
                    <field>11-05-21 21:29</field>
                    <field>Discharge</field>
                    <field>Import</field>
                    <field>MSMU7194537</field>
                    <field>QC2</field>
                    <field>QC2</field>
                    <field>MLS</field>
                    <field>4533</field>
                    <field>LBO</field>
                    <field>7003</field>
                </row>
                <row primary-key="32058587">
                    <field>11-05-21 21:33</field>
                    <field>Discharge</field>
                    <field>Import</field>
                    <field>GLDU3519198</field>
                    <field>QC1</field>
                    <field>QC1</field>
                    <field>EGE</field>
                    <field>4534</field>
                    <field>AJO</field>
                    <field>2515</field>
                </row>
                <row primary-key="32058595">
                    <field>11-05-21 21:33</field>
                    <field>Yard Shift</field>
                    <field>Import</field>
                    <field>TGBU4138117</field>
                    <field />
                    <field>4518</field>
                    <field>JMV</field>
                    <field>4518</field>
                    <field>JMV</field>
                    <field>4518</field>
                </row>
                <row primary-key="32058596">
                    <field>11-05-21 21:33</field>
                    <field>Yard Shift</field>
                    <field>Import</field>
                    <field>PCIU8942977</field>
                    <field />
                    <field>4518</field>
                    <field>JMV</field>
                    <field>4518</field>
                    <field>JMV</field>
                    <field>4518</field>
                </row>
                <row primary-key="32058597">
                    <field>11-05-21 21:33</field>
                    <field>Discharge</field>
                    <field>Import</field>
                    <field>DFSU6526280</field>
                    <field>QC2</field>
                    <field>QC2</field>
                    <field>MLS</field>
                    <field>4538</field>
                    <field>JLA</field>
                    <field>7001</field>
                </row>
                <row primary-key="32058605">
                    <field>11-05-21 21:33</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>MRKU3613735</field>
                    <field />
                    <field>4518</field>
                    <field>JMV</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32058608">
                    <field>11-05-21 21:33</field>
                    <field>Yard Shift</field>
                    <field>Import</field>
                    <field>PCIU9337902</field>
                    <field />
                    <field>4532</field>
                    <field>GAS</field>
                    <field>4532</field>
                    <field>GAS</field>
                    <field>4532</field>
                </row>
                <row primary-key="32058620">
                    <field>11-05-21 21:34</field>
                    <field>Discharge</field>
                    <field>Import</field>
                    <field>MSDU1231771</field>
                    <field>QC1</field>
                    <field>QC1</field>
                    <field>EGE</field>
                    <field>4540</field>
                    <field>PMA</field>
                    <field>2515</field>
                </row>
                <row primary-key="32058631">
                    <field>11-05-21 21:34</field>
                    <field>Yard Shift</field>
                    <field>Import</field>
                    <field>TRHU1969023</field>
                    <field />
                    <field>4531</field>
                    <field>DAE</field>
                    <field>4531</field>
                    <field>DAE</field>
                    <field>4531</field>
                </row>
                <row primary-key="32058647">
                    <field>11-05-21 21:35</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>CCLU4265099</field>
                    <field />
                    <field>4532</field>
                    <field>GAS</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32058651">
                    <field>11-05-21 21:35</field>
                    <field>Discharge</field>
                    <field>Import</field>
                    <field>BEAU2771010</field>
                    <field>QC1</field>
                    <field>QC1</field>
                    <field>EGE</field>
                    <field>4534</field>
                    <field>AJO</field>
                    <field>2517</field>
                </row>
                <row primary-key="32058665">
                    <field>11-05-21 21:35</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>CLHU3598515</field>
                    <field />
                    <field />
                    <field />
                    <field>4528</field>
                    <field>JAI</field>
                    <field />
                </row>
                <row primary-key="32058667">
                    <field>11-05-21 21:36</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>XINU1338518</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32058671">
                    <field>11-05-21 21:36</field>
                    <field>Discharge</field>
                    <field>Import</field>
                    <field>FTAU1434362</field>
                    <field>QC2</field>
                    <field>QC2</field>
                    <field>MLS</field>
                    <field>4539</field>
                    <field>ALO</field>
                    <field>6015</field>
                </row>
                <row primary-key="32058688">
                    <field>11-05-21 21:37</field>
                    <field>Discharge</field>
                    <field>Import</field>
                    <field>BEAU2967804</field>
                    <field>QC1</field>
                    <field>QC1</field>
                    <field>EGE</field>
                    <field>4534</field>
                    <field>AJO</field>
                    <field>2512</field>
                </row>
                <row primary-key="32058699">
                    <field>11-05-21 21:37</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>PCIU8942977</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32058711">
                    <field>11-05-21 21:38</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>MSMU7613567</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32058712">
                    <field>11-05-21 21:38</field>
                    <field>Yard Shift</field>
                    <field>Import</field>
                    <field>TCNU8594331</field>
                    <field />
                    <field>4532</field>
                    <field>GAS</field>
                    <field>4532</field>
                    <field>GAS</field>
                    <field>4532</field>
                </row>
                <row primary-key="32058713">
                    <field>11-05-21 21:38</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>PCIU1269186</field>
                    <field />
                    <field>4531</field>
                    <field>DAE</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32058716">
                    <field>11-05-21 21:38</field>
                    <field>Yard Shift</field>
                    <field>Import</field>
                    <field>TGBU4138117</field>
                    <field />
                    <field>4532</field>
                    <field>GAS</field>
                    <field>4532</field>
                    <field>GAS</field>
                    <field>4532</field>
                </row>
                <row primary-key="32058719">
                    <field>11-05-21 21:38</field>
                    <field>Yard Shift</field>
                    <field>Import</field>
                    <field>CAIU8370338</field>
                    <field />
                    <field>4532</field>
                    <field>GAS</field>
                    <field>4532</field>
                    <field>GAS</field>
                    <field>4532</field>
                </row>
                <row primary-key="32058725">
                    <field>11-05-21 21:39</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>TLLU2102950</field>
                    <field />
                    <field>4525</field>
                    <field>AMV</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32058727">
                    <field>11-05-21 21:39</field>
                    <field>Discharge</field>
                    <field>Import</field>
                    <field>BEAU5836388</field>
                    <field>QC2</field>
                    <field>QC2</field>
                    <field>MLS</field>
                    <field>4533</field>
                    <field>LBO</field>
                    <field>2528</field>
                </row>
                <row primary-key="32058735">
                    <field>11-05-21 21:39</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>BEAU2815144</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32058752">
                    <field>11-05-21 21:40</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>TRHU5093767</field>
                    <field />
                    <field>4532</field>
                    <field>GAS</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32058755">
                    <field>11-05-21 21:41</field>
                    <field>Discharge</field>
                    <field>Import</field>
                    <field>TGBU5852638</field>
                    <field>QC2</field>
                    <field>QC2</field>
                    <field>MLS</field>
                    <field>4533</field>
                    <field>LBO</field>
                    <field>7003</field>
                </row>
                <row primary-key="32058768">
                    <field>11-05-21 21:42</field>
                    <field>Yard Move</field>
                    <field>Storage</field>
                    <field>TRHU1972222</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32058769">
                    <field>11-05-21 21:42</field>
                    <field>Discharge</field>
                    <field>Import</field>
                    <field>MSDU1319733</field>
                    <field>QC1</field>
                    <field>QC1</field>
                    <field>EGE</field>
                    <field>4534</field>
                    <field>AJO</field>
                    <field>2515</field>
                </row>
                <row primary-key="32058785">
                    <field>11-05-21 21:43</field>
                    <field>Discharge</field>
                    <field>Import</field>
                    <field>CXRU1424740</field>
                    <field>QC2</field>
                    <field>QC2</field>
                    <field>MLS</field>
                    <field>4540</field>
                    <field>PMA</field>
                    <field>2522</field>
                </row>
                <row primary-key="32058797">
                    <field>11-05-21 21:43</field>
                    <field>Yard Move</field>
                    <field>Storage</field>
                    <field>FCIU3434320</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32058800">
                    <field>11-05-21 21:43</field>
                    <field>Discharge</field>
                    <field>Import</field>
                    <field>FCIU8402006</field>
                    <field>QC2</field>
                    <field>QC2</field>
                    <field>MLS</field>
                    <field>4538</field>
                    <field>JLA</field>
                    <field>7001</field>
                </row>
                <row primary-key="32058813">
                    <field>11-05-21 21:43</field>
                    <field>Yard Move</field>
                    <field>Storage</field>
                    <field>FCIU2517630</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32058839">
                    <field>11-05-21 21:44</field>
                    <field>Yard Move</field>
                    <field>Storage</field>
                    <field>ECMU2142552</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32058886">
                    <field>11-05-21 21:45</field>
                    <field>Yard Move</field>
                    <field>Storage</field>
                    <field>CNCU1529505</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32058982">
                    <field>11-05-21 21:45</field>
                    <field>Discharge</field>
                    <field>Import</field>
                    <field>MSDU7933693</field>
                    <field>QC2</field>
                    <field>QC2</field>
                    <field>MLS</field>
                    <field>4533</field>
                    <field>LBO</field>
                    <field>6005</field>
                </row>
                <row primary-key="32059922">
                    <field>11-05-21 21:45</field>
                    <field>Yard Move</field>
                    <field>Storage</field>
                    <field>CMAU3106710</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32061963">
                    <field>11-05-21 21:46</field>
                    <field>Yard Move</field>
                    <field>Storage</field>
                    <field>CMAU0283184</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32061986">
                    <field>11-05-21 21:46</field>
                    <field>Yard Move</field>
                    <field>Export</field>
                    <field>GLDU5283516</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32061987">
                    <field>11-05-21 21:46</field>
                    <field>Yard Move</field>
                    <field>Export</field>
                    <field>BEAU2227752</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32061988">
                    <field>11-05-21 21:46</field>
                    <field>Yard Move</field>
                    <field>Export</field>
                    <field>CMAU2185443</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32061989">
                    <field>11-05-21 21:46</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>CNCU1516344</field>
                    <field />
                    <field />
                    <field />
                    <field>4518</field>
                    <field>JMV</field>
                    <field />
                </row>
                <row primary-key="32061991">
                    <field>11-05-21 21:46</field>
                    <field>Yard Move</field>
                    <field>Export</field>
                    <field>GESU3390036</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32061992">
                    <field>11-05-21 21:47</field>
                    <field>Yard Move</field>
                    <field>Export</field>
                    <field>SEGU1471180</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32061997">
                    <field>11-05-21 21:48</field>
                    <field>Discharge</field>
                    <field>Import</field>
                    <field>MEDU6638504</field>
                    <field>QC1</field>
                    <field>QC1</field>
                    <field>EGE</field>
                    <field>4539</field>
                    <field>ALO</field>
                    <field>2512</field>
                </row>
                <row primary-key="32062023">
                    <field>11-05-21 21:49</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>CMAU0808518</field>
                    <field />
                    <field />
                    <field />
                    <field>4531</field>
                    <field>DAE</field>
                    <field />
                </row>
                <row primary-key="32062060">
                    <field>11-05-21 21:50</field>
                    <field>Discharge</field>
                    <field>Import</field>
                    <field>CLVU2508731</field>
                    <field>QC2</field>
                    <field>QC2</field>
                    <field>MLS</field>
                    <field>4534</field>
                    <field>AJO</field>
                    <field>6009</field>
                </row>
                <row primary-key="32062068">
                    <field>11-05-21 21:50</field>
                    <field>Discharge</field>
                    <field>Import</field>
                    <field>GLDU5077449</field>
                    <field>QC1</field>
                    <field>QC1</field>
                    <field>EGE</field>
                    <field>4539</field>
                    <field>ALO</field>
                    <field>2512</field>
                </row>
                <row primary-key="32062085">
                    <field>11-05-21 21:52</field>
                    <field>Discharge</field>
                    <field>Import</field>
                    <field>MSDU8324330</field>
                    <field>QC2</field>
                    <field>QC2</field>
                    <field>MLS</field>
                    <field>4533</field>
                    <field>LBO</field>
                    <field>7003</field>
                </row>
                <row primary-key="32062097">
                    <field>11-05-21 21:53</field>
                    <field>Discharge</field>
                    <field>Import</field>
                    <field>MSCU2687401</field>
                    <field>QC1</field>
                    <field>QC1</field>
                    <field>EGE</field>
                    <field>4534</field>
                    <field>AJO</field>
                    <field>2512</field>
                </row>
                <row primary-key="32062105">
                    <field>11-05-21 21:53</field>
                    <field>Discharge</field>
                    <field>Import</field>
                    <field>MEDU8337639</field>
                    <field>QC2</field>
                    <field>QC2</field>
                    <field>MLS</field>
                    <field>4533</field>
                    <field>LBO</field>
                    <field>2528</field>
                </row>
                <row primary-key="32062117">
                    <field>11-05-21 21:53</field>
                    <field>Yard Shift</field>
                    <field>Import</field>
                    <field>CAIU7071564</field>
                    <field />
                    <field>4531</field>
                    <field>DAE</field>
                    <field>4531</field>
                    <field>DAE</field>
                    <field>4531</field>
                </row>
                <row primary-key="32062119">
                    <field>11-05-21 21:53</field>
                    <field>Discharge</field>
                    <field>Import</field>
                    <field>BMOU5913344</field>
                    <field>QC2</field>
                    <field>QC2</field>
                    <field>MLS</field>
                    <field>4538</field>
                    <field>JLA</field>
                    <field>7001</field>
                </row>
                <row primary-key="32062134">
                    <field>11-05-21 21:53</field>
                    <field>Yard Move</field>
                    <field>Storage</field>
                    <field>GLDU5099453</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32062135">
                    <field>11-05-21 21:54</field>
                    <field>Yard Shift</field>
                    <field>Import</field>
                    <field>PCIU9217609</field>
                    <field />
                    <field>4531</field>
                    <field>DAE</field>
                    <field>4531</field>
                    <field>DAE</field>
                    <field>4531</field>
                </row>
                <row primary-key="32062136">
                    <field>11-05-21 21:54</field>
                    <field>Yard Shift</field>
                    <field>Import</field>
                    <field>MEDU4351500</field>
                    <field />
                    <field>4531</field>
                    <field>DAE</field>
                    <field>4531</field>
                    <field>DAE</field>
                    <field>4531</field>
                </row>
                <row primary-key="32062153">
                    <field>11-05-21 21:55</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>CAIU7381810</field>
                    <field />
                    <field />
                    <field />
                    <field>4529</field>
                    <field>RJS</field>
                    <field />
                </row>
                <row primary-key="32062155">
                    <field>11-05-21 21:55</field>
                    <field>Discharge</field>
                    <field>Import</field>
                    <field>MSCU6371366</field>
                    <field>QC1</field>
                    <field>QC1</field>
                    <field>EGE</field>
                    <field>4539</field>
                    <field>ALO</field>
                    <field>2515</field>
                </row>
                <row primary-key="32062165">
                    <field>11-05-21 21:55</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>CMAU1978519</field>
                    <field />
                    <field />
                    <field />
                    <field>4528</field>
                    <field>JAI</field>
                    <field />
                </row>
                <row primary-key="32062166">
                    <field>11-05-21 21:55</field>
                    <field>Receival</field>
                    <field>Storage</field>
                    <field>TEMU6868500</field>
                    <field />
                    <field />
                    <field />
                    <field>4519</field>
                    <field>JSO</field>
                    <field />
                </row>
                <row primary-key="32062167">
                    <field>11-05-21 21:55</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>GATU0372033</field>
                    <field />
                    <field />
                    <field />
                    <field>4518</field>
                    <field>JMV</field>
                    <field />
                </row>
                <row primary-key="32062182">
                    <field>11-05-21 21:57</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>TRHU2537111</field>
                    <field />
                    <field />
                    <field />
                    <field>4529</field>
                    <field>RJS</field>
                    <field />
                </row>
                <row primary-key="32062183">
                    <field>11-05-21 21:57</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>PCIU9417000</field>
                    <field />
                    <field>4531</field>
                    <field>DAE</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32062211">
                    <field>11-05-21 21:58</field>
                    <field>Discharge</field>
                    <field>Import</field>
                    <field>TOLU8790829</field>
                    <field>QC2</field>
                    <field>QC2</field>
                    <field>MLS</field>
                    <field>4533</field>
                    <field>LBO</field>
                    <field>6009</field>
                </row>
                <row primary-key="32062219">
                    <field>11-05-21 21:58</field>
                    <field>Discharge</field>
                    <field>Import</field>
                    <field>MSCU4468526</field>
                    <field>QC2</field>
                    <field>QC2</field>
                    <field>MLS</field>
                    <field>4533</field>
                    <field>LBO</field>
                    <field>6005</field>
                </row>
                <row primary-key="32062227">
                    <field>11-05-21 21:58</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>TCNU6545488</field>
                    <field />
                    <field />
                    <field />
                    <field>4529</field>
                    <field>RJS</field>
                    <field />
                </row>
                <row primary-key="32062231">
                    <field>11-05-21 21:59</field>
                    <field>Receival</field>
                    <field>Storage</field>
                    <field>SZLU9352751</field>
                    <field />
                    <field />
                    <field />
                    <field>4532</field>
                    <field>GAS</field>
                    <field />
                </row>
                <row primary-key="32062237">
                    <field>11-05-21 21:59</field>
                    <field>Receival</field>
                    <field>Storage</field>
                    <field>GESU9395837</field>
                    <field />
                    <field />
                    <field />
                    <field>4532</field>
                    <field>GAS</field>
                    <field />
                </row>
                <row primary-key="32062239">
                    <field>11-05-21 21:59</field>
                    <field>Discharge</field>
                    <field>Import</field>
                    <field>MSCU1263712</field>
                    <field>QC1</field>
                    <field>QC1</field>
                    <field>EGE</field>
                    <field>4534</field>
                    <field>AJO</field>
                    <field>2512</field>
                </row>
                <row primary-key="32062287">
                    <field>11-05-21 22:00</field>
                    <field>Yard Move</field>
                    <field>Storage</field>
                    <field>APZU3366250</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32062290">
                    <field>11-05-21 22:00</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>TEMU2374200</field>
                    <field />
                    <field />
                    <field />
                    <field>4528</field>
                    <field>JAI</field>
                    <field />
                </row>
                <row primary-key="32062300">
                    <field>11-05-21 22:01</field>
                    <field>Receival</field>
                    <field>Storage</field>
                    <field>GESU9444016</field>
                    <field />
                    <field />
                    <field />
                    <field>4525</field>
                    <field>AMV</field>
                    <field />
                </row>
                <row primary-key="32062305">
                    <field>11-05-21 22:02</field>
                    <field>Receival</field>
                    <field>Storage</field>
                    <field>CMAU8266727</field>
                    <field />
                    <field />
                    <field />
                    <field>4519</field>
                    <field>JSO</field>
                    <field />
                </row>
                <row primary-key="32062306">
                    <field>11-05-21 22:02</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>CMAU0993289</field>
                    <field />
                    <field />
                    <field />
                    <field>4528</field>
                    <field>JAI</field>
                    <field />
                </row>
                <row primary-key="32062326">
                    <field>11-05-21 22:02</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>TCNU6904037</field>
                    <field />
                    <field>4518</field>
                    <field>JMV</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32062328">
                    <field>11-05-21 22:03</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>GLDU9306440</field>
                    <field />
                    <field />
                    <field />
                    <field>4528</field>
                    <field>JAI</field>
                    <field />
                </row>
                <row primary-key="32062338">
                    <field>11-05-21 22:03</field>
                    <field>Yard Shift</field>
                    <field>Import</field>
                    <field>PCIU0076238</field>
                    <field />
                    <field>4531</field>
                    <field>DAE</field>
                    <field>4531</field>
                    <field>DAE</field>
                    <field>4531</field>
                </row>
                <row primary-key="32062343">
                    <field>11-05-21 22:04</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>TCKU2769422</field>
                    <field />
                    <field />
                    <field />
                    <field>4529</field>
                    <field>RJS</field>
                    <field />
                </row>
                <row primary-key="32062344">
                    <field>11-05-21 22:04</field>
                    <field>Discharge</field>
                    <field>Import</field>
                    <field>MEDU9069485</field>
                    <field>QC2</field>
                    <field>QC2</field>
                    <field>MLS</field>
                    <field>4540</field>
                    <field>PMA</field>
                    <field>6008</field>
                </row>
                <row primary-key="32062378">
                    <field>11-05-21 22:05</field>
                    <field>Yard Shift</field>
                    <field>Import</field>
                    <field>MSKU7108076</field>
                    <field />
                    <field>4531</field>
                    <field>DAE</field>
                    <field>4531</field>
                    <field>DAE</field>
                    <field>4531</field>
                </row>
                <row primary-key="32062382">
                    <field>11-05-21 22:06</field>
                    <field>Discharge</field>
                    <field>Import</field>
                    <field>CXRU1456259</field>
                    <field>QC2</field>
                    <field>QC2</field>
                    <field>MLS</field>
                    <field>4540</field>
                    <field>PMA</field>
                    <field>7003</field>
                </row>
                <row primary-key="32062392">
                    <field>11-05-21 22:07</field>
                    <field>Discharge</field>
                    <field>Import</field>
                    <field>GLDU5326270</field>
                    <field>QC1</field>
                    <field>QC1</field>
                    <field>EGE</field>
                    <field>4534</field>
                    <field>AJO</field>
                    <field>2515</field>
                </row>
                <row primary-key="32062409">
                    <field>11-05-21 22:07</field>
                    <field>Receival</field>
                    <field>Storage</field>
                    <field>PCIU9300502</field>
                    <field />
                    <field />
                    <field />
                    <field>4519</field>
                    <field>JSO</field>
                    <field />
                </row>
                <row primary-key="32062410">
                    <field>11-05-21 22:07</field>
                    <field>Discharge</field>
                    <field>Import</field>
                    <field>CXRU1432051</field>
                    <field>QC2</field>
                    <field>QC2</field>
                    <field>MLS</field>
                    <field>4540</field>
                    <field>PMA</field>
                    <field>7004</field>
                </row>
                <row primary-key="32062422">
                    <field>11-05-21 22:08</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>PCIU1777741</field>
                    <field />
                    <field>4531</field>
                    <field>DAE</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32062424">
                    <field>11-05-21 22:08</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>CXDU1417983</field>
                    <field />
                    <field />
                    <field />
                    <field>4518</field>
                    <field>JMV</field>
                    <field />
                </row>
                <row primary-key="32062426">
                    <field>11-05-21 22:09</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>MEDU7353738</field>
                    <field />
                    <field />
                    <field />
                    <field>4538</field>
                    <field>JLA</field>
                    <field />
                </row>
                <row primary-key="32062432">
                    <field>11-05-21 22:09</field>
                    <field>Yard Move</field>
                    <field>Export</field>
                    <field>GATU0372033</field>
                    <field />
                    <field>4518</field>
                    <field>JMV</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32062427">
                    <field>11-05-21 22:09</field>
                    <field>Discharge</field>
                    <field>Import</field>
                    <field>MEDU5004681</field>
                    <field>QC1</field>
                    <field>QC1</field>
                    <field>EGE</field>
                    <field>4539</field>
                    <field>ALO</field>
                    <field>2512</field>
                </row>
                <row primary-key="32062436">
                    <field>11-05-21 22:09</field>
                    <field>Yard Shift</field>
                    <field>Import</field>
                    <field>MEDU8720210</field>
                    <field />
                    <field>4528</field>
                    <field>JAI</field>
                    <field>4528</field>
                    <field>JAI</field>
                    <field>4528</field>
                </row>
                <row primary-key="32062438">
                    <field>11-05-21 22:09</field>
                    <field>Discharge</field>
                    <field>Import</field>
                    <field>CRLU1280015</field>
                    <field>QC2</field>
                    <field>QC2</field>
                    <field>MLS</field>
                    <field>4540</field>
                    <field>PMA</field>
                    <field>6003</field>
                </row>
                <row primary-key="32062446">
                    <field>11-05-21 22:09</field>
                    <field>Discharge</field>
                    <field>Import</field>
                    <field>MSCU4464161</field>
                    <field>QC2</field>
                    <field>QC2</field>
                    <field>MLS</field>
                    <field>4534</field>
                    <field>AJO</field>
                    <field>6009</field>
                </row>
                <row primary-key="32062454">
                    <field>11-05-21 22:09</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>FTAU1351885</field>
                    <field />
                    <field />
                    <field />
                    <field>4529</field>
                    <field>RJS</field>
                    <field />
                </row>
                <row primary-key="32062477">
                    <field>11-05-21 22:10</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>TCLU4755805</field>
                    <field />
                    <field>4528</field>
                    <field>JAI</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32063267">
                    <field>11-05-21 22:12</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>FCGU2254706</field>
                    <field />
                    <field />
                    <field />
                    <field>4518</field>
                    <field>JMV</field>
                    <field />
                </row>
                <row primary-key="32063280">
                    <field>11-05-21 22:14</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>APZU3452214</field>
                    <field />
                    <field />
                    <field />
                    <field>4529</field>
                    <field>RJS</field>
                    <field />
                </row>
                <row primary-key="32063282">
                    <field>11-05-21 22:14</field>
                    <field>Discharge</field>
                    <field>Import</field>
                    <field>TRIU8863211</field>
                    <field>QC2</field>
                    <field>QC2</field>
                    <field>MLS</field>
                    <field>4540</field>
                    <field>PMA</field>
                    <field>2528</field>
                </row>
                <row primary-key="32063283">
                    <field>11-05-21 22:14</field>
                    <field>Yard Shift</field>
                    <field>Export</field>
                    <field>CMAU1968146</field>
                    <field />
                    <field>4532</field>
                    <field>GAS</field>
                    <field>4532</field>
                    <field>GAS</field>
                    <field>4532</field>
                </row>
                <row primary-key="32063308">
                    <field>11-05-21 22:16</field>
                    <field>Delivery</field>
                    <field>Storage</field>
                    <field>CMAU4675012</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32063313">
                    <field>11-05-21 22:16</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>APZU3241248</field>
                    <field />
                    <field />
                    <field />
                    <field>4529</field>
                    <field>RJS</field>
                    <field />
                </row>
                <row primary-key="32063319">
                    <field>11-05-21 22:17</field>
                    <field>Discharge</field>
                    <field>Import</field>
                    <field>MEDU3666884</field>
                    <field>QC1</field>
                    <field>QC1</field>
                    <field>EGE</field>
                    <field>4534</field>
                    <field>AJO</field>
                    <field>2515</field>
                </row>
                <row primary-key="32063340">
                    <field>11-05-21 22:18</field>
                    <field>Discharge</field>
                    <field>Import</field>
                    <field>MEDU7141364</field>
                    <field>QC1</field>
                    <field>QC1</field>
                    <field>EGE</field>
                    <field>4538</field>
                    <field>JLA</field>
                    <field>2515</field>
                </row>
                <row primary-key="32063348">
                    <field>11-05-21 22:19</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>TRHU1097893</field>
                    <field />
                    <field>4532</field>
                    <field>GAS</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32063379">
                    <field>11-05-21 22:20</field>
                    <field>Delivery</field>
                    <field>Storage</field>
                    <field>GESU6185919</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32063384">
                    <field>11-05-21 22:20</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>MSKU5550535</field>
                    <field />
                    <field />
                    <field />
                    <field>4525</field>
                    <field>AMV</field>
                    <field />
                </row>
                <row primary-key="32063385">
                    <field>11-05-21 22:20</field>
                    <field>Discharge</field>
                    <field>Import</field>
                    <field>MEDU4562858</field>
                    <field>QC1</field>
                    <field>QC1</field>
                    <field>EGE</field>
                    <field>4538</field>
                    <field>JLA</field>
                    <field>2515</field>
                </row>
                <row primary-key="32063412">
                    <field>11-05-21 22:22</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>UETU2326214</field>
                    <field />
                    <field />
                    <field />
                    <field>4528</field>
                    <field>JAI</field>
                    <field />
                </row>
                <row primary-key="32063415">
                    <field>11-05-21 22:22</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>SUDU5942191</field>
                    <field />
                    <field>4518</field>
                    <field>JMV</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32063433">
                    <field>11-05-21 22:23</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>CAIU9397518</field>
                    <field />
                    <field>4531</field>
                    <field>DAE</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32063444">
                    <field>11-05-21 22:23</field>
                    <field>Discharge</field>
                    <field>Import</field>
                    <field>SEGU6274203</field>
                    <field>QC2</field>
                    <field>QC2</field>
                    <field>MLS</field>
                    <field>4533</field>
                    <field>LBO</field>
                    <field>7001</field>
                </row>
                <row primary-key="32063454">
                    <field>11-05-21 22:24</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>MEDU4562858</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32063455">
                    <field>11-05-21 22:24</field>
                    <field>Discharge</field>
                    <field>Import</field>
                    <field>BMOU4252002</field>
                    <field>QC2</field>
                    <field>QC2</field>
                    <field>MLS</field>
                    <field>4529</field>
                    <field>RJS</field>
                    <field>7003</field>
                </row>
                <row primary-key="32063476">
                    <field>11-05-21 22:24</field>
                    <field>Discharge</field>
                    <field>Import</field>
                    <field>MEDU9388292</field>
                    <field>QC1</field>
                    <field>QC1</field>
                    <field>EGE</field>
                    <field>4538</field>
                    <field>JLA</field>
                    <field>2512</field>
                </row>
                <row primary-key="32063487">
                    <field>11-05-21 22:24</field>
                    <field>Yard Shift</field>
                    <field>Import</field>
                    <field>MRSU0162625</field>
                    <field />
                    <field>4525</field>
                    <field>AMV</field>
                    <field>4525</field>
                    <field>AMV</field>
                    <field>4525</field>
                </row>
                <row primary-key="32063488">
                    <field>11-05-21 22:24</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>TGCU2040038</field>
                    <field />
                    <field />
                    <field />
                    <field>4528</field>
                    <field>JAI</field>
                    <field />
                </row>
                <row primary-key="32063507">
                    <field>11-05-21 22:25</field>
                    <field>Discharge</field>
                    <field>Import</field>
                    <field>TCLU9097950</field>
                    <field>QC1</field>
                    <field>QC1</field>
                    <field>EGE</field>
                    <field>4533</field>
                    <field>LBO</field>
                    <field>2515</field>
                </row>
                <row primary-key="32063522">
                    <field>11-05-21 22:26</field>
                    <field>Discharge</field>
                    <field>Import</field>
                    <field>MSDU8220249</field>
                    <field>QC2</field>
                    <field>QC2</field>
                    <field>MLS</field>
                    <field>4538</field>
                    <field>JLA</field>
                    <field>2510</field>
                </row>
                <row primary-key="32063532">
                    <field>11-05-21 22:27</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>TCLU7187036</field>
                    <field />
                    <field />
                    <field />
                    <field>4528</field>
                    <field>JAI</field>
                    <field />
                </row>
                <row primary-key="32063542">
                    <field>11-05-21 22:27</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>TEMU3183913</field>
                    <field />
                    <field>4525</field>
                    <field>AMV</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32063548">
                    <field>11-05-21 22:28</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>PCIU0083010</field>
                    <field />
                    <field>4534</field>
                    <field>AJO</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32063550">
                    <field>11-05-21 22:28</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>ECMU2164905</field>
                    <field />
                    <field />
                    <field />
                    <field>4531</field>
                    <field>DAE</field>
                    <field />
                </row>
                <row primary-key="32063564">
                    <field>11-05-21 22:29</field>
                    <field>Discharge</field>
                    <field>Import</field>
                    <field>MEDU7795998</field>
                    <field>QC1</field>
                    <field>QC1</field>
                    <field>EGE</field>
                    <field>4538</field>
                    <field>JLA</field>
                    <field>2515</field>
                </row>
                <row primary-key="32063573">
                    <field>11-05-21 22:29</field>
                    <field>Discharge</field>
                    <field>Import</field>
                    <field>TEMU9522655</field>
                    <field>QC2</field>
                    <field>QC2</field>
                    <field>MLS</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32063601">
                    <field>11-05-21 22:30</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>TCNU7618423</field>
                    <field />
                    <field />
                    <field />
                    <field>4532</field>
                    <field>GAS</field>
                    <field />
                </row>
                <row primary-key="32063611">
                    <field>11-05-21 22:31</field>
                    <field>Discharge</field>
                    <field>Import</field>
                    <field>MSCU7548775</field>
                    <field>QC2</field>
                    <field>QC2</field>
                    <field>MLS</field>
                    <field>4538</field>
                    <field>JLA</field>
                    <field>6013</field>
                </row>
                <row primary-key="32063619">
                    <field>11-05-21 22:31</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>TCLU3415550</field>
                    <field />
                    <field>4528</field>
                    <field>JAI</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32063640">
                    <field>11-05-21 22:32</field>
                    <field>Discharge</field>
                    <field>Import</field>
                    <field>MSCU5353563</field>
                    <field>QC1</field>
                    <field>QC1</field>
                    <field>EGE</field>
                    <field>4533</field>
                    <field>LBO</field>
                    <field>2515</field>
                </row>
                <row primary-key="32063650">
                    <field>11-05-21 22:32</field>
                    <field>Delivery</field>
                    <field>Storage</field>
                    <field>CAIU9680385</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32063654">
                    <field>11-05-21 22:32</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>XINU1493089</field>
                    <field />
                    <field />
                    <field />
                    <field>4518</field>
                    <field>JMV</field>
                    <field />
                </row>
                <row primary-key="32063656">
                    <field>11-05-21 22:32</field>
                    <field>Discharge</field>
                    <field>Import</field>
                    <field>CXDU2117023</field>
                    <field>QC1</field>
                    <field>QC1</field>
                    <field>EGE</field>
                    <field>4538</field>
                    <field>JLA</field>
                    <field>2512</field>
                </row>
                <row primary-key="32063664">
                    <field>11-05-21 22:33</field>
                    <field>Discharge</field>
                    <field>Import</field>
                    <field>CAIU7122785</field>
                    <field>QC2</field>
                    <field>QC2</field>
                    <field>MLS</field>
                    <field>4533</field>
                    <field>LBO</field>
                    <field>2528</field>
                </row>
                <row primary-key="32063672">
                    <field>11-05-21 22:33</field>
                    <field>Yard Shift</field>
                    <field>Import</field>
                    <field>APZU3663032</field>
                    <field />
                    <field>4525</field>
                    <field>AMV</field>
                    <field>4525</field>
                    <field>AMV</field>
                    <field>4525</field>
                </row>
                <row primary-key="32063673">
                    <field>11-05-21 22:34</field>
                    <field>Discharge</field>
                    <field>Import</field>
                    <field>TEMU3600447</field>
                    <field>QC2</field>
                    <field>QC2</field>
                    <field>MLS</field>
                    <field>4539</field>
                    <field>ALO</field>
                    <field>6009</field>
                </row>
                <row primary-key="32063685">
                    <field>11-05-21 22:34</field>
                    <field>Discharge</field>
                    <field>Import</field>
                    <field>GLDU7292986</field>
                    <field>QC1</field>
                    <field>QC1</field>
                    <field>EGE</field>
                    <field>4538</field>
                    <field>JLA</field>
                    <field>2515</field>
                </row>
                <row primary-key="32063703">
                    <field>11-05-21 22:34</field>
                    <field>Delivery</field>
                    <field>Storage</field>
                    <field>PCIU8944049</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32063717">
                    <field>11-05-21 22:35</field>
                    <field>Yard Shift</field>
                    <field>Import</field>
                    <field>TEMU2895997</field>
                    <field />
                    <field>4525</field>
                    <field>AMV</field>
                    <field>4525</field>
                    <field>AMV</field>
                    <field>4525</field>
                </row>
                <row primary-key="32063723">
                    <field>11-05-21 22:35</field>
                    <field>Discharge</field>
                    <field>Import</field>
                    <field>FCIU3014076</field>
                    <field>QC2</field>
                    <field>QC2</field>
                    <field>MLS</field>
                    <field>4539</field>
                    <field>ALO</field>
                    <field>7003</field>
                </row>
                <row primary-key="32063735">
                    <field>11-05-21 22:35</field>
                    <field>Receival</field>
                    <field>Storage</field>
                    <field>TRHU4144793</field>
                    <field />
                    <field />
                    <field />
                    <field>4519</field>
                    <field>JSO</field>
                    <field />
                </row>
                <row primary-key="32063737">
                    <field>11-05-21 22:35</field>
                    <field>Discharge</field>
                    <field>Import</field>
                    <field>MSDU1228870</field>
                    <field>QC2</field>
                    <field>QC2</field>
                    <field>MLS</field>
                    <field>4534</field>
                    <field>AJO</field>
                    <field>6009</field>
                </row>
                <row primary-key="32063745">
                    <field>11-05-21 22:36</field>
                    <field>Discharge</field>
                    <field>Import</field>
                    <field>TCNU8991690</field>
                    <field>QC1</field>
                    <field>QC1</field>
                    <field>EGE</field>
                    <field>4538</field>
                    <field>JLA</field>
                    <field>2517</field>
                </row>
                <row primary-key="32063753">
                    <field>11-05-21 22:36</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>TGHU1354618</field>
                    <field />
                    <field />
                    <field />
                    <field>4531</field>
                    <field>DAE</field>
                    <field />
                </row>
                <row primary-key="32063754">
                    <field>11-05-21 22:36</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>APHU6908476</field>
                    <field />
                    <field />
                    <field />
                    <field>4532</field>
                    <field>GAS</field>
                    <field />
                </row>
                <row primary-key="32063770">
                    <field>11-05-21 22:37</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>CMAU7405005</field>
                    <field />
                    <field />
                    <field />
                    <field>4518</field>
                    <field>JMV</field>
                    <field />
                </row>
                <row primary-key="32063774">
                    <field>11-05-21 22:37</field>
                    <field>Delivery</field>
                    <field>Storage</field>
                    <field>PCIU9481057</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32063775">
                    <field>11-05-21 22:37</field>
                    <field>Discharge</field>
                    <field>Import</field>
                    <field>MEDU8340777</field>
                    <field>QC1</field>
                    <field>QC1</field>
                    <field>EGE</field>
                    <field>4538</field>
                    <field>JLA</field>
                    <field>2522</field>
                </row>
                <row primary-key="32063783">
                    <field>11-05-21 22:37</field>
                    <field>Yard Shift</field>
                    <field>Import</field>
                    <field>TCKU3635602</field>
                    <field />
                    <field>4525</field>
                    <field>AMV</field>
                    <field>4525</field>
                    <field>AMV</field>
                    <field>4525</field>
                </row>
                <row primary-key="32063784">
                    <field>11-05-21 22:37</field>
                    <field>Discharge</field>
                    <field>Import</field>
                    <field>FCIU4655897</field>
                    <field>QC2</field>
                    <field>QC2</field>
                    <field>MLS</field>
                    <field>4534</field>
                    <field>AJO</field>
                    <field>7003</field>
                </row>
                <row primary-key="32063806">
                    <field>11-05-21 22:38</field>
                    <field>Yard Move</field>
                    <field>Export</field>
                    <field>TCLU2914024</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32063808">
                    <field>11-05-21 22:38</field>
                    <field>Yard Move</field>
                    <field>Export</field>
                    <field>TEMU3509445</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32063810">
                    <field>11-05-21 22:38</field>
                    <field>Yard Move</field>
                    <field>Export</field>
                    <field>TGHU0611244</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32063811">
                    <field>11-05-21 22:38</field>
                    <field>Yard Move</field>
                    <field>Export</field>
                    <field>MEDU2185890</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32063814">
                    <field>11-05-21 22:38</field>
                    <field>Discharge</field>
                    <field>Import</field>
                    <field>DFSU6663730</field>
                    <field>QC2</field>
                    <field>QC2</field>
                    <field>MLS</field>
                    <field>4533</field>
                    <field>LBO</field>
                    <field>7004</field>
                </row>
                <row primary-key="32063840">
                    <field>11-05-21 22:39</field>
                    <field>Yard Move</field>
                    <field>Export</field>
                    <field>TCLU3159864</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32063839">
                    <field>11-05-21 22:39</field>
                    <field>Yard Move</field>
                    <field>Export</field>
                    <field>CMAU1959695</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32063838">
                    <field>11-05-21 22:39</field>
                    <field>Yard Move</field>
                    <field>Export</field>
                    <field>SEGU1139664</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32063841">
                    <field>11-05-21 22:39</field>
                    <field>Yard Move</field>
                    <field>Export</field>
                    <field>TRLU3902860</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32063856">
                    <field>11-05-21 22:40</field>
                    <field>Discharge</field>
                    <field>Import</field>
                    <field>MEDU3368787</field>
                    <field>QC2</field>
                    <field>QC2</field>
                    <field>MLS</field>
                    <field>4539</field>
                    <field>ALO</field>
                    <field>6015</field>
                </row>
                <row primary-key="32063880">
                    <field>11-05-21 22:41</field>
                    <field>Discharge</field>
                    <field>Import</field>
                    <field>MEDU5167380</field>
                    <field>QC2</field>
                    <field>QC2</field>
                    <field>MLS</field>
                    <field>4539</field>
                    <field>ALO</field>
                    <field>7003</field>
                </row>
                <row primary-key="32063904">
                    <field>11-05-21 22:42</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>FCIU4088685</field>
                    <field />
                    <field />
                    <field />
                    <field>4532</field>
                    <field>GAS</field>
                    <field />
                </row>
                <row primary-key="32063913">
                    <field>11-05-21 22:43</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>XINU8190757</field>
                    <field />
                    <field />
                    <field />
                    <field>4518</field>
                    <field>JMV</field>
                    <field />
                </row>
                <row primary-key="32063923">
                    <field>11-05-21 22:44</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>TRLU9297140</field>
                    <field />
                    <field />
                    <field />
                    <field>4532</field>
                    <field>GAS</field>
                    <field />
                </row>
                <row primary-key="32063924">
                    <field>11-05-21 22:44</field>
                    <field>Discharge</field>
                    <field>Import</field>
                    <field>MEDU6352927</field>
                    <field>QC2</field>
                    <field>QC2</field>
                    <field>MLS</field>
                    <field>4534</field>
                    <field>AJO</field>
                    <field>6015</field>
                </row>
                <row primary-key="32063933">
                    <field>11-05-21 22:44</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>TLLU2758742</field>
                    <field />
                    <field>4525</field>
                    <field>AMV</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32063935">
                    <field>11-05-21 22:44</field>
                    <field>Yard Move</field>
                    <field>Export</field>
                    <field>CAIU3858850</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32063950">
                    <field>11-05-21 22:45</field>
                    <field>Discharge</field>
                    <field>Import</field>
                    <field>OTPU6095339</field>
                    <field>QC2</field>
                    <field>QC2</field>
                    <field>MLS</field>
                    <field>4540</field>
                    <field>PMA</field>
                    <field>2515</field>
                </row>
                <row primary-key="32063949">
                    <field>11-05-21 22:45</field>
                    <field>Yard Move</field>
                    <field>Export</field>
                    <field>CMAU1791512</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32063962">
                    <field>11-05-21 22:45</field>
                    <field>Discharge</field>
                    <field>Import</field>
                    <field>MEDU6969668</field>
                    <field>QC2</field>
                    <field>QC2</field>
                    <field>MLS</field>
                    <field>4539</field>
                    <field>ALO</field>
                    <field>6015</field>
                </row>
                <row primary-key="32063970">
                    <field>11-05-21 22:45</field>
                    <field>Discharge</field>
                    <field>Import</field>
                    <field>MSCU2696126</field>
                    <field>QC2</field>
                    <field>QC2</field>
                    <field>MLS</field>
                    <field>4534</field>
                    <field>AJO</field>
                    <field>7003</field>
                </row>
                <row primary-key="32063982">
                    <field>11-05-21 22:45</field>
                    <field>Yard Move</field>
                    <field>Export</field>
                    <field>TRHU1848612</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32063993">
                    <field>11-05-21 22:46</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>TCKU7174664</field>
                    <field />
                    <field>4538</field>
                    <field>JLA</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32063994">
                    <field>11-05-21 22:46</field>
                    <field>Discharge</field>
                    <field>Import</field>
                    <field>CAIU8097440</field>
                    <field>QC1</field>
                    <field>QC1</field>
                    <field>EGE</field>
                    <field>4533</field>
                    <field>LBO</field>
                    <field>2517</field>
                </row>
                <row primary-key="32064007">
                    <field>11-05-21 22:47</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>CMAU7864750</field>
                    <field />
                    <field />
                    <field />
                    <field>4531</field>
                    <field>DAE</field>
                    <field />
                </row>
                <row primary-key="32064010">
                    <field>11-05-21 22:47</field>
                    <field>Discharge</field>
                    <field>Import</field>
                    <field>MEDU2797600</field>
                    <field>QC2</field>
                    <field>QC2</field>
                    <field>MLS</field>
                    <field>4539</field>
                    <field>ALO</field>
                    <field>6015</field>
                </row>
                <row primary-key="32064031">
                    <field>11-05-21 22:48</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>CMAU4197628</field>
                    <field />
                    <field />
                    <field />
                    <field>4532</field>
                    <field>GAS</field>
                    <field />
                </row>
                <row primary-key="32064049">
                    <field>11-05-21 22:49</field>
                    <field>Discharge</field>
                    <field>Import</field>
                    <field>XINU1246216</field>
                    <field>QC2</field>
                    <field>QC2</field>
                    <field>MLS</field>
                    <field>4539</field>
                    <field>ALO</field>
                    <field>7001</field>
                </row>
                <row primary-key="32064057">
                    <field>11-05-21 22:49</field>
                    <field>Discharge</field>
                    <field>Import</field>
                    <field>TCLU1626018</field>
                    <field>QC1</field>
                    <field>QC1</field>
                    <field>EGE</field>
                    <field>4533</field>
                    <field>LBO</field>
                    <field>2517</field>
                </row>
                <row primary-key="32064065">
                    <field>11-05-21 22:49</field>
                    <field>Discharge</field>
                    <field>Import</field>
                    <field>CAXU9352921</field>
                    <field>QC1</field>
                    <field>QC1</field>
                    <field>EGE</field>
                    <field>4538</field>
                    <field>JLA</field>
                    <field>2512</field>
                </row>
                <row primary-key="32064073">
                    <field>11-05-21 22:49</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>APZU3241973</field>
                    <field />
                    <field />
                    <field />
                    <field>4528</field>
                    <field>JAI</field>
                    <field />
                </row>
                <row primary-key="32064095">
                    <field>11-05-21 22:50</field>
                    <field>Discharge</field>
                    <field>Import</field>
                    <field>DRYU2436634</field>
                    <field>QC2</field>
                    <field>QC2</field>
                    <field>MLS</field>
                    <field>4534</field>
                    <field>AJO</field>
                    <field>6005</field>
                </row>
                <row primary-key="32064105">
                    <field>11-05-21 22:50</field>
                    <field>Discharge</field>
                    <field>Import</field>
                    <field>FCIU4200959</field>
                    <field>QC2</field>
                    <field>QC2</field>
                    <field>MLS</field>
                    <field>4539</field>
                    <field>ALO</field>
                    <field>7001</field>
                </row>
                <row primary-key="32064116">
                    <field>11-05-21 22:50</field>
                    <field>Discharge</field>
                    <field>Import</field>
                    <field>MEDU9600729</field>
                    <field>QC2</field>
                    <field>QC2</field>
                    <field>MLS</field>
                    <field>4540</field>
                    <field>PMA</field>
                    <field>2517</field>
                </row>
                <row primary-key="32064134">
                    <field>11-05-21 22:51</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>CMAU2071245</field>
                    <field />
                    <field />
                    <field />
                    <field>4528</field>
                    <field>JAI</field>
                    <field />
                </row>
                <row primary-key="32064136">
                    <field>11-05-21 22:51</field>
                    <field>Yard Shift</field>
                    <field>Import</field>
                    <field>PCIU1654325</field>
                    <field />
                    <field>4525</field>
                    <field>AMV</field>
                    <field>4525</field>
                    <field>AMV</field>
                    <field>4525</field>
                </row>
                <row primary-key="32064138">
                    <field>11-05-21 22:51</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>MEDU8535655</field>
                    <field />
                    <field />
                    <field />
                    <field>4532</field>
                    <field>GAS</field>
                    <field />
                </row>
                <row primary-key="32064150">
                    <field>11-05-21 22:51</field>
                    <field>Discharge</field>
                    <field>Import</field>
                    <field>GLDU3085888</field>
                    <field>QC2</field>
                    <field>QC2</field>
                    <field>MLS</field>
                    <field>4534</field>
                    <field>AJO</field>
                    <field>6005</field>
                </row>
                <row primary-key="32064160">
                    <field>11-05-21 22:51</field>
                    <field>Yard Shift</field>
                    <field>Import</field>
                    <field>CMAU7176892</field>
                    <field />
                    <field>4518</field>
                    <field>JMV</field>
                    <field>4518</field>
                    <field>JMV</field>
                    <field>4518</field>
                </row>
                <row primary-key="32064161">
                    <field>11-05-21 22:52</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>MEDU3867852</field>
                    <field />
                    <field />
                    <field />
                    <field>4531</field>
                    <field>DAE</field>
                    <field />
                </row>
                <row primary-key="32064163">
                    <field>11-05-21 22:52</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>TCNU1166537</field>
                    <field />
                    <field />
                    <field />
                    <field>4532</field>
                    <field>GAS</field>
                    <field />
                </row>
                <row primary-key="32064168">
                    <field>11-05-21 22:52</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>TGHU2474140</field>
                    <field />
                    <field>4540</field>
                    <field>PMA</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32064181">
                    <field>11-05-21 22:53</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>MEDU3465529</field>
                    <field />
                    <field>4525</field>
                    <field>AMV</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32064185">
                    <field>11-05-21 22:53</field>
                    <field>Discharge</field>
                    <field>Import</field>
                    <field>GLDU3542367</field>
                    <field>QC2</field>
                    <field>QC2</field>
                    <field>MLS</field>
                    <field>4539</field>
                    <field>ALO</field>
                    <field>7002</field>
                </row>
                <row primary-key="32064210">
                    <field>11-05-21 22:54</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>FCIU6334448</field>
                    <field />
                    <field />
                    <field />
                    <field>4532</field>
                    <field>GAS</field>
                    <field />
                </row>
                <row primary-key="32064211">
                    <field>11-05-21 22:54</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>CMAU0552998</field>
                    <field />
                    <field>4525</field>
                    <field>AMV</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32064214">
                    <field>11-05-21 22:54</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>GLDU5361223</field>
                    <field />
                    <field />
                    <field />
                    <field>4528</field>
                    <field>JAI</field>
                    <field />
                </row>
                <row primary-key="32064231">
                    <field>11-05-21 22:55</field>
                    <field>Discharge</field>
                    <field>Import</field>
                    <field>FDCU0301299</field>
                    <field>QC2</field>
                    <field>QC2</field>
                    <field>MLS</field>
                    <field>4538</field>
                    <field>JLA</field>
                    <field>2515</field>
                </row>
                <row primary-key="32064239">
                    <field>11-05-21 22:55</field>
                    <field>Discharge</field>
                    <field>Import</field>
                    <field>TGCU2154426</field>
                    <field>QC2</field>
                    <field>QC2</field>
                    <field>MLS</field>
                    <field>4539</field>
                    <field>ALO</field>
                    <field>6016</field>
                </row>
                <row primary-key="32064257">
                    <field>11-05-21 22:56</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>PCIU9317336</field>
                    <field />
                    <field>4518</field>
                    <field>JMV</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32064263">
                    <field>11-05-21 22:57</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>TLLU4574852</field>
                    <field />
                    <field />
                    <field />
                    <field>4531</field>
                    <field>DAE</field>
                    <field />
                </row>
                <row primary-key="32064265">
                    <field>11-05-21 22:57</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>CAXU9352921</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32064266">
                    <field>11-05-21 22:58</field>
                    <field>Discharge</field>
                    <field>Import</field>
                    <field>MEDU5584131</field>
                    <field>QC2</field>
                    <field>QC2</field>
                    <field>MLS</field>
                    <field>4539</field>
                    <field>ALO</field>
                    <field>6009</field>
                </row>
                <row primary-key="32064276">
                    <field>11-05-21 22:58</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>CLHU4796201</field>
                    <field />
                    <field />
                    <field />
                    <field>4532</field>
                    <field>GAS</field>
                    <field />
                </row>
                <row primary-key="32064277">
                    <field>11-05-21 22:58</field>
                    <field>Discharge</field>
                    <field>Import</field>
                    <field>FCIU2662109</field>
                    <field>QC2</field>
                    <field>QC2</field>
                    <field>MLS</field>
                    <field>4534</field>
                    <field>AJO</field>
                    <field>7002</field>
                </row>
                <row primary-key="32064287">
                    <field>11-05-21 22:58</field>
                    <field>Discharge</field>
                    <field>Import</field>
                    <field>FBLU0064965</field>
                    <field>QC2</field>
                    <field>QC2</field>
                    <field>MLS</field>
                    <field>4538</field>
                    <field>JLA</field>
                    <field>2517</field>
                </row>
                <row primary-key="32064295">
                    <field>11-05-21 22:58</field>
                    <field>Discharge</field>
                    <field>Import</field>
                    <field>MEDU5480923</field>
                    <field>QC2</field>
                    <field>QC2</field>
                    <field>MLS</field>
                    <field>4534</field>
                    <field>AJO</field>
                    <field>6016</field>
                </row>
                <row primary-key="32064330">
                    <field>11-05-21 23:01</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>CAIU8184729</field>
                    <field />
                    <field />
                    <field />
                    <field>4532</field>
                    <field>GAS</field>
                    <field />
                </row>
                <row primary-key="32064333">
                    <field>11-05-21 23:01</field>
                    <field>Discharge</field>
                    <field>Import</field>
                    <field>TCKU3190461</field>
                    <field>QC2</field>
                    <field>QC2</field>
                    <field>MLS</field>
                    <field>4539</field>
                    <field>ALO</field>
                    <field>7001</field>
                </row>
                <row primary-key="32064348">
                    <field>11-05-21 23:02</field>
                    <field>Discharge</field>
                    <field>Import</field>
                    <field>TEMU3300856</field>
                    <field>QC2</field>
                    <field>QC2</field>
                    <field>MLS</field>
                    <field>4534</field>
                    <field>AJO</field>
                    <field>6009</field>
                </row>
                <row primary-key="32064365">
                    <field>11-05-21 23:03</field>
                    <field>Discharge</field>
                    <field>Import</field>
                    <field>FCIU3934876</field>
                    <field>QC2</field>
                    <field>QC2</field>
                    <field>MLS</field>
                    <field>4540</field>
                    <field>PMA</field>
                    <field>7003</field>
                </row>
                <row primary-key="32064373">
                    <field>11-05-21 23:03</field>
                    <field>Discharge</field>
                    <field>Import</field>
                    <field>TCLU7268349</field>
                    <field>QC2</field>
                    <field>QC2</field>
                    <field>MLS</field>
                    <field>4539</field>
                    <field>ALO</field>
                    <field>7003</field>
                </row>
                <row primary-key="32064381">
                    <field>11-05-21 23:03</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>TEMU5874895</field>
                    <field />
                    <field>4531</field>
                    <field>DAE</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32064391">
                    <field>11-05-21 23:03</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>APHU6678429</field>
                    <field />
                    <field />
                    <field />
                    <field>4532</field>
                    <field>GAS</field>
                    <field />
                </row>
                <row primary-key="32064395">
                    <field>11-05-21 23:04</field>
                    <field>Discharge</field>
                    <field>Import</field>
                    <field>MEDU2945122</field>
                    <field>QC2</field>
                    <field>QC2</field>
                    <field>MLS</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32064394">
                    <field>11-05-21 23:04</field>
                    <field>Discharge</field>
                    <field>Import</field>
                    <field>MEDU6516018</field>
                    <field>QC2</field>
                    <field>QC2</field>
                    <field>MLS</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32064425">
                    <field>11-05-21 23:05</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>MSDU7957695</field>
                    <field />
                    <field>4519</field>
                    <field>JSO</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32064435">
                    <field>11-05-21 23:05</field>
                    <field>Discharge</field>
                    <field>Import</field>
                    <field>FCIU4376296</field>
                    <field>QC2</field>
                    <field>QC2</field>
                    <field>MLS</field>
                    <field>4534</field>
                    <field>AJO</field>
                    <field>7001</field>
                </row>
                <row primary-key="32064453">
                    <field>11-05-21 23:06</field>
                    <field>Discharge</field>
                    <field>Import</field>
                    <field>MSDU1423115</field>
                    <field>QC2</field>
                    <field>QC2</field>
                    <field>MLS</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32064452">
                    <field>11-05-21 23:06</field>
                    <field>Discharge</field>
                    <field>Import</field>
                    <field>MAGU2470311</field>
                    <field>QC2</field>
                    <field>QC2</field>
                    <field>MLS</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32064469">
                    <field>11-05-21 23:06</field>
                    <field>Yard Shift</field>
                    <field>Import</field>
                    <field>GCXU5094010</field>
                    <field />
                    <field>4518</field>
                    <field>JMV</field>
                    <field>4518</field>
                    <field>JMV</field>
                    <field>4518</field>
                </row>
                <row primary-key="32064470">
                    <field>11-05-21 23:06</field>
                    <field>Yard Shift</field>
                    <field>Import</field>
                    <field>SEGU4096118</field>
                    <field />
                    <field>4518</field>
                    <field>JMV</field>
                    <field>4518</field>
                    <field>JMV</field>
                    <field>4518</field>
                </row>
                <row primary-key="32064471">
                    <field>11-05-21 23:06</field>
                    <field>Discharge</field>
                    <field>Import</field>
                    <field>FFAU1734172</field>
                    <field>QC1</field>
                    <field>QC1</field>
                    <field>JAS</field>
                    <field>4538</field>
                    <field>JLA</field>
                    <field>2517</field>
                </row>
                <row primary-key="32064479">
                    <field>11-05-21 23:07</field>
                    <field>Discharge</field>
                    <field>Import</field>
                    <field>FCGU1675568</field>
                    <field>QC1</field>
                    <field>QC1</field>
                    <field>JAS</field>
                    <field>4533</field>
                    <field>LBO</field>
                    <field>2517</field>
                </row>
                <row primary-key="32064481">
                    <field>11-05-21 23:07</field>
                    <field>Yard Shift</field>
                    <field>Import</field>
                    <field>CMAU0843041</field>
                    <field />
                    <field>4531</field>
                    <field>DAE</field>
                    <field>4531</field>
                    <field>DAE</field>
                    <field>4531</field>
                </row>
                <row primary-key="32064488">
                    <field>11-05-21 23:07</field>
                    <field>Discharge</field>
                    <field>Import</field>
                    <field>MEDU6903974</field>
                    <field>QC2</field>
                    <field>QC2</field>
                    <field>MLS</field>
                    <field>4539</field>
                    <field>ALO</field>
                    <field>6015</field>
                </row>
                <row primary-key="32064496">
                    <field>11-05-21 23:07</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>PCIU0101433</field>
                    <field />
                    <field>4531</field>
                    <field>DAE</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32064498">
                    <field>11-05-21 23:07</field>
                    <field>Discharge</field>
                    <field>Import</field>
                    <field>FDCU0324041</field>
                    <field>QC1</field>
                    <field>QC1</field>
                    <field>JAS</field>
                    <field>4533</field>
                    <field>LBO</field>
                    <field>2517</field>
                </row>
                <row primary-key="32064506">
                    <field>11-05-21 23:08</field>
                    <field>Discharge</field>
                    <field>Import</field>
                    <field>TCKU2383553</field>
                    <field>QC2</field>
                    <field>QC2</field>
                    <field>MLS</field>
                    <field>4540</field>
                    <field>PMA</field>
                    <field>6015</field>
                </row>
                <row primary-key="32064514">
                    <field>11-05-21 23:08</field>
                    <field>Discharge</field>
                    <field>Import</field>
                    <field>TCNU7326165</field>
                    <field>QC1</field>
                    <field>QC1</field>
                    <field>JAS</field>
                    <field>4538</field>
                    <field>JLA</field>
                    <field>2512</field>
                </row>
                <row primary-key="32064522">
                    <field>11-05-21 23:08</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>TTNU1202832</field>
                    <field />
                    <field />
                    <field />
                    <field>4525</field>
                    <field>AMV</field>
                    <field />
                </row>
                <row primary-key="32064526">
                    <field>11-05-21 23:09</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>CMAU1317139</field>
                    <field />
                    <field />
                    <field />
                    <field>4528</field>
                    <field>JAI</field>
                    <field />
                </row>
                <row primary-key="32064530">
                    <field>11-05-21 23:09</field>
                    <field>Discharge</field>
                    <field>Import</field>
                    <field>MEDU6012167</field>
                    <field>QC2</field>
                    <field>QC2</field>
                    <field>MLS</field>
                    <field>4540</field>
                    <field>PMA</field>
                    <field>6013</field>
                </row>
                <row primary-key="32064538">
                    <field>11-05-21 23:09</field>
                    <field>Discharge</field>
                    <field>Import</field>
                    <field>MEDU5579670</field>
                    <field>QC2</field>
                    <field>QC2</field>
                    <field>MLS</field>
                    <field>4534</field>
                    <field>AJO</field>
                    <field>6005</field>
                </row>
                <row primary-key="32064559">
                    <field>11-05-21 23:10</field>
                    <field>Discharge</field>
                    <field>Import</field>
                    <field>FFAU2189880</field>
                    <field>QC1</field>
                    <field>QC1</field>
                    <field>JAS</field>
                    <field>4538</field>
                    <field>JLA</field>
                    <field>2517</field>
                </row>
                <row primary-key="32064567">
                    <field>11-05-21 23:10</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>PCIU8732986</field>
                    <field />
                    <field>4518</field>
                    <field>JMV</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32064570">
                    <field>11-05-21 23:11</field>
                    <field>Discharge</field>
                    <field>Import</field>
                    <field>MEDU7236536</field>
                    <field>QC1</field>
                    <field>QC1</field>
                    <field>JAS</field>
                    <field>4533</field>
                    <field>LBO</field>
                    <field>2512</field>
                </row>
                <row primary-key="32064580">
                    <field>11-05-21 23:11</field>
                    <field>Delivery</field>
                    <field>Storage</field>
                    <field>TCKU6302966</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32064581">
                    <field>11-05-21 23:11</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>PONU0005543</field>
                    <field />
                    <field />
                    <field />
                    <field>4525</field>
                    <field>AMV</field>
                    <field />
                </row>
                <row primary-key="32064593">
                    <field>11-05-21 23:11</field>
                    <field>Discharge</field>
                    <field>Import</field>
                    <field>FCIU6353134</field>
                    <field>QC2</field>
                    <field>QC2</field>
                    <field>MLS</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32064591">
                    <field>11-05-21 23:11</field>
                    <field>Discharge</field>
                    <field>Import</field>
                    <field>GLDU3424148</field>
                    <field>QC2</field>
                    <field>QC2</field>
                    <field>MLS</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32064613">
                    <field>11-05-21 23:11</field>
                    <field>Discharge</field>
                    <field>Import</field>
                    <field>MEDU5366248</field>
                    <field>QC2</field>
                    <field>QC2</field>
                    <field>MLS</field>
                    <field>4534</field>
                    <field>AJO</field>
                    <field>6005</field>
                </row>
                <row primary-key="32064621">
                    <field>11-05-21 23:12</field>
                    <field>Discharge</field>
                    <field>Import</field>
                    <field>TOLU8783286</field>
                    <field>QC2</field>
                    <field>QC2</field>
                    <field>MLS</field>
                    <field>4533</field>
                    <field>LBO</field>
                    <field>6005</field>
                </row>
                <row primary-key="32064634">
                    <field>11-05-21 23:12</field>
                    <field>Discharge</field>
                    <field>Import</field>
                    <field>MEDU6961517</field>
                    <field>QC2</field>
                    <field>QC2</field>
                    <field>MLS</field>
                    <field>4534</field>
                    <field>AJO</field>
                    <field>6013</field>
                </row>
                <row primary-key="32064654">
                    <field>11-05-21 23:12</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>CLHU2674550</field>
                    <field />
                    <field />
                    <field />
                    <field>4531</field>
                    <field>DAE</field>
                    <field />
                </row>
                <row primary-key="32064657">
                    <field>11-05-21 23:13</field>
                    <field>Delivery</field>
                    <field>Storage</field>
                    <field>CMAU4806112</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32064658">
                    <field>11-05-21 23:13</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>TRHU1085212</field>
                    <field />
                    <field />
                    <field />
                    <field>4518</field>
                    <field>JMV</field>
                    <field />
                </row>
                <row primary-key="32064695">
                    <field>11-05-21 23:15</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>CAIU3471840</field>
                    <field />
                    <field />
                    <field />
                    <field>4528</field>
                    <field>JAI</field>
                    <field />
                </row>
                <row primary-key="32064705">
                    <field>11-05-21 23:15</field>
                    <field>Discharge</field>
                    <field>Import</field>
                    <field>TRHU1549714</field>
                    <field>QC3</field>
                    <field>QC3</field>
                    <field />
                    <field>4540</field>
                    <field>PMA</field>
                    <field>7002</field>
                </row>
                <row primary-key="32064732">
                    <field>11-05-21 23:15</field>
                    <field>Yard Move</field>
                    <field>Export</field>
                    <field>CAIU3471840</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32064741">
                    <field>11-05-21 23:16</field>
                    <field>Yard Move</field>
                    <field>Export</field>
                    <field>TRLU9297140</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32064744">
                    <field>11-05-21 23:16</field>
                    <field>Discharge</field>
                    <field>Import</field>
                    <field>INKU6626328</field>
                    <field>QC1</field>
                    <field>QC1</field>
                    <field>JAS</field>
                    <field>4533</field>
                    <field>LBO</field>
                    <field>2515</field>
                </row>
                <row primary-key="32064752">
                    <field>11-05-21 23:16</field>
                    <field>Discharge</field>
                    <field>Import</field>
                    <field>MEDU3923072</field>
                    <field>QC3</field>
                    <field>QC3</field>
                    <field />
                    <field>4534</field>
                    <field>AJO</field>
                    <field>6010</field>
                </row>
                <row primary-key="32064771">
                    <field>11-05-21 23:17</field>
                    <field>Yard Shift</field>
                    <field>Import</field>
                    <field>MSKU0881572</field>
                    <field />
                    <field>4532</field>
                    <field>GAS</field>
                    <field>4532</field>
                    <field>GAS</field>
                    <field>4532</field>
                </row>
                <row primary-key="32064801">
                    <field>11-05-21 23:18</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>BEAU5889650</field>
                    <field />
                    <field />
                    <field />
                    <field>4531</field>
                    <field>DAE</field>
                    <field />
                </row>
                <row primary-key="32064804">
                    <field>11-05-21 23:19</field>
                    <field>Discharge</field>
                    <field>Import</field>
                    <field>CAIU4718364</field>
                    <field>QC1</field>
                    <field>QC1</field>
                    <field>JAS</field>
                    <field>4538</field>
                    <field>JLA</field>
                    <field>2515</field>
                </row>
                <row primary-key="32064812">
                    <field>11-05-21 23:19</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>TGHU8569095</field>
                    <field />
                    <field>4532</field>
                    <field>GAS</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32064841">
                    <field>11-05-21 23:21</field>
                    <field>Discharge</field>
                    <field>Import</field>
                    <field>SEGU2794146</field>
                    <field>QC3</field>
                    <field>QC3</field>
                    <field />
                    <field>4540</field>
                    <field>PMA</field>
                    <field>6005</field>
                </row>
                <row primary-key="32064858">
                    <field>11-05-21 23:21</field>
                    <field>Yard Move</field>
                    <field>Export</field>
                    <field>TRHU1085212</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32064864">
                    <field>11-05-21 23:21</field>
                    <field>Discharge</field>
                    <field>Import</field>
                    <field>BMOU2613636</field>
                    <field>QC3</field>
                    <field>QC3</field>
                    <field />
                    <field>4534</field>
                    <field>AJO</field>
                    <field>7002</field>
                </row>
                <row primary-key="32064884">
                    <field>11-05-21 23:22</field>
                    <field>Discharge</field>
                    <field>Import</field>
                    <field>CAXU3234114</field>
                    <field>QC3</field>
                    <field>QC3</field>
                    <field />
                    <field>4539</field>
                    <field>ALO</field>
                    <field>6005</field>
                </row>
                <row primary-key="32064938">
                    <field>11-05-21 23:23</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>ZIQ9757</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32064939">
                    <field>11-05-21 23:23</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>SEGU4009160</field>
                    <field />
                    <field />
                    <field />
                    <field>4528</field>
                    <field>JAI</field>
                    <field />
                </row>
                <row primary-key="32064969">
                    <field>11-05-21 23:25</field>
                    <field>Discharge</field>
                    <field>Import</field>
                    <field>SEGU1940400</field>
                    <field>QC3</field>
                    <field>QC3</field>
                    <field />
                    <field>4540</field>
                    <field>PMA</field>
                    <field>6006</field>
                </row>
                <row primary-key="32064982">
                    <field>11-05-21 23:25</field>
                    <field>Discharge</field>
                    <field>Import</field>
                    <field>TEMU8250505</field>
                    <field>QC1</field>
                    <field>QC1</field>
                    <field>JAS</field>
                    <field>4538</field>
                    <field>JLA</field>
                    <field>2518</field>
                </row>
                <row primary-key="32064992">
                    <field>11-05-21 23:25</field>
                    <field>Yard Shift</field>
                    <field>Import</field>
                    <field>SUDU1356715</field>
                    <field />
                    <field>4532</field>
                    <field>GAS</field>
                    <field>4532</field>
                    <field>GAS</field>
                    <field>4532</field>
                </row>
                <row primary-key="32064996">
                    <field>11-05-21 23:26</field>
                    <field>Discharge</field>
                    <field>Import</field>
                    <field>MEDU1455687</field>
                    <field>QC2</field>
                    <field>QC2</field>
                    <field>MLS</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32064998">
                    <field>11-05-21 23:26</field>
                    <field>Discharge</field>
                    <field>Import</field>
                    <field>FCIU3699099</field>
                    <field>QC2</field>
                    <field>QC2</field>
                    <field>MLS</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32065013">
                    <field>11-05-21 23:26</field>
                    <field>Discharge</field>
                    <field>Import</field>
                    <field>GLDU3821320</field>
                    <field>QC3</field>
                    <field>QC3</field>
                    <field />
                    <field>4539</field>
                    <field>ALO</field>
                    <field>6006</field>
                </row>
                <row primary-key="32065022">
                    <field>11-05-21 23:27</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>MEDU5507623</field>
                    <field />
                    <field />
                    <field />
                    <field>4528</field>
                    <field>JAI</field>
                    <field />
                </row>
                <row primary-key="32065024">
                    <field>11-05-21 23:27</field>
                    <field>Yard Shift</field>
                    <field>Import</field>
                    <field>CMAU1645837</field>
                    <field />
                    <field>4532</field>
                    <field>GAS</field>
                    <field>4532</field>
                    <field>GAS</field>
                    <field>4532</field>
                </row>
                <row primary-key="32065035">
                    <field>11-05-21 23:29</field>
                    <field>Discharge</field>
                    <field>Import</field>
                    <field>FCIU9046070</field>
                    <field>QC1</field>
                    <field>QC1</field>
                    <field>JAS</field>
                    <field>4538</field>
                    <field>JLA</field>
                    <field>2517</field>
                </row>
                <row primary-key="32065043">
                    <field>11-05-21 23:29</field>
                    <field>Yard Shift</field>
                    <field>Import</field>
                    <field>PCIU9164216</field>
                    <field />
                    <field>4518</field>
                    <field>JMV</field>
                    <field>4518</field>
                    <field>JMV</field>
                    <field>4518</field>
                </row>
                <row primary-key="32065044">
                    <field>11-05-21 23:29</field>
                    <field>Yard Shift</field>
                    <field>Import</field>
                    <field>SEGU1627289</field>
                    <field />
                    <field>4531</field>
                    <field>DAE</field>
                    <field>4531</field>
                    <field>DAE</field>
                    <field>4531</field>
                </row>
                <row primary-key="32065045">
                    <field>11-05-21 23:29</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>FCIU5879910</field>
                    <field />
                    <field />
                    <field />
                    <field>4528</field>
                    <field>JAI</field>
                    <field />
                </row>
                <row primary-key="32065083">
                    <field>11-05-21 23:30</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>INBU3755720</field>
                    <field />
                    <field>4532</field>
                    <field>GAS</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32065086">
                    <field>11-05-21 23:30</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>ST93575</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32065091">
                    <field>11-05-21 23:31</field>
                    <field>Delivery</field>
                    <field>Storage</field>
                    <field>TCNU3686116</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32065092">
                    <field>11-05-21 23:31</field>
                    <field>Discharge</field>
                    <field>Import</field>
                    <field>AMFU3197068</field>
                    <field>QC2</field>
                    <field>QC2</field>
                    <field>MLS</field>
                    <field>4539</field>
                    <field>ALO</field>
                    <field>6012</field>
                </row>
                <row primary-key="32065100">
                    <field>11-05-21 23:31</field>
                    <field>Discharge</field>
                    <field>Import</field>
                    <field>TGHU6149365</field>
                    <field>QC1</field>
                    <field>QC1</field>
                    <field>JAS</field>
                    <field>4533</field>
                    <field>LBO</field>
                    <field>2513</field>
                </row>
                <row primary-key="32065116">
                    <field>11-05-21 23:31</field>
                    <field>Discharge</field>
                    <field>Import</field>
                    <field>MSDU7150194</field>
                    <field>QC1</field>
                    <field>QC1</field>
                    <field>JAS</field>
                    <field>4538</field>
                    <field>JLA</field>
                    <field>2517</field>
                </row>
                <row primary-key="32065124">
                    <field>11-05-21 23:32</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>FCIU6353134</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32065125">
                    <field>11-05-21 23:32</field>
                    <field>Discharge</field>
                    <field>Import</field>
                    <field>GLDU3489909</field>
                    <field>QC3</field>
                    <field>QC3</field>
                    <field />
                    <field>4540</field>
                    <field>PMA</field>
                    <field>6004</field>
                </row>
                <row primary-key="32065133">
                    <field>11-05-21 23:32</field>
                    <field>Discharge</field>
                    <field>Import</field>
                    <field>MEDU5722312</field>
                    <field>QC3</field>
                    <field>QC3</field>
                    <field />
                    <field>4539</field>
                    <field>ALO</field>
                    <field>6004</field>
                </row>
                <row primary-key="32065142">
                    <field>11-05-21 23:33</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>XINU1545686</field>
                    <field />
                    <field />
                    <field />
                    <field>4528</field>
                    <field>JAI</field>
                    <field />
                </row>
                <row primary-key="32065143">
                    <field>11-05-21 23:33</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>MEDU5756251</field>
                    <field />
                    <field />
                    <field />
                    <field>4525</field>
                    <field>AMV</field>
                    <field />
                </row>
                <row primary-key="32065149">
                    <field>11-05-21 23:33</field>
                    <field>Delivery</field>
                    <field>Storage</field>
                    <field>TCNU5341812</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32065157">
                    <field>11-05-21 23:34</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>CMAU0424240</field>
                    <field />
                    <field />
                    <field />
                    <field>4528</field>
                    <field>JAI</field>
                    <field />
                </row>
                <row primary-key="32065159">
                    <field>11-05-21 23:34</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>MSKU4153718</field>
                    <field />
                    <field>4531</field>
                    <field>DAE</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32065160">
                    <field>11-05-21 23:34</field>
                    <field>Yard Shift</field>
                    <field>Import</field>
                    <field>PCIU8753762</field>
                    <field />
                    <field>4518</field>
                    <field>JMV</field>
                    <field>4518</field>
                    <field>JMV</field>
                    <field>4518</field>
                </row>
                <row primary-key="32065176">
                    <field>11-05-21 23:35</field>
                    <field>Discharge</field>
                    <field>Import</field>
                    <field>MEDU3255348</field>
                    <field>QC2</field>
                    <field>QC2</field>
                    <field>MLS</field>
                    <field>4534</field>
                    <field>AJO</field>
                    <field>6012</field>
                </row>
                <row primary-key="32065185">
                    <field>11-05-21 23:35</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>TGBU6816173</field>
                    <field />
                    <field />
                    <field />
                    <field>4525</field>
                    <field>AMV</field>
                    <field />
                </row>
                <row primary-key="32065187">
                    <field>11-05-21 23:35</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>GLDU5520156</field>
                    <field />
                    <field />
                    <field />
                    <field>4525</field>
                    <field>AMV</field>
                    <field />
                </row>
                <row primary-key="32065200">
                    <field>11-05-21 23:36</field>
                    <field>Discharge</field>
                    <field>Import</field>
                    <field>MEDU5144560</field>
                    <field>QC2</field>
                    <field>QC2</field>
                    <field>MLS</field>
                    <field>4540</field>
                    <field>PMA</field>
                    <field>6008</field>
                </row>
                <row primary-key="32065218">
                    <field>11-05-21 23:36</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>APZU3841710</field>
                    <field />
                    <field />
                    <field />
                    <field>4528</field>
                    <field>JAI</field>
                    <field />
                </row>
                <row primary-key="32065220">
                    <field>11-05-21 23:36</field>
                    <field>Discharge</field>
                    <field>Import</field>
                    <field>MEDU5318928</field>
                    <field>QC2</field>
                    <field>QC2</field>
                    <field>MLS</field>
                    <field>4539</field>
                    <field>ALO</field>
                    <field>6005</field>
                </row>
                <row primary-key="32065230">
                    <field>11-05-21 23:36</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>FCIU8119450</field>
                    <field />
                    <field />
                    <field />
                    <field>4532</field>
                    <field>GAS</field>
                    <field />
                </row>
                <row primary-key="32065229">
                    <field>11-05-21 23:36</field>
                    <field>Discharge</field>
                    <field>Import</field>
                    <field>FCIU6376171</field>
                    <field>QC2</field>
                    <field>QC2</field>
                    <field>MLS</field>
                    <field>4534</field>
                    <field>AJO</field>
                    <field>6005</field>
                </row>
                <row primary-key="32065239">
                    <field>11-05-21 23:36</field>
                    <field>Discharge</field>
                    <field>Import</field>
                    <field>FFAU2141058</field>
                    <field>QC1</field>
                    <field>QC1</field>
                    <field>JAS</field>
                    <field>4533</field>
                    <field>LBO</field>
                    <field>2512</field>
                </row>
                <row primary-key="32065247">
                    <field>11-05-21 23:37</field>
                    <field>Discharge</field>
                    <field>Import</field>
                    <field>MSMU7388810</field>
                    <field>QC1</field>
                    <field>QC1</field>
                    <field>JAS</field>
                    <field>4538</field>
                    <field>JLA</field>
                    <field>2513</field>
                </row>
                <row primary-key="32065257">
                    <field>11-05-21 23:38</field>
                    <field>Discharge</field>
                    <field>Import</field>
                    <field>DFSU2087596</field>
                    <field>QC3</field>
                    <field>QC3</field>
                    <field />
                    <field>4540</field>
                    <field>PMA</field>
                    <field>6001</field>
                </row>
                <row primary-key="32065265">
                    <field>11-05-21 23:38</field>
                    <field>Discharge</field>
                    <field>Import</field>
                    <field>FCIU5867695</field>
                    <field>QC3</field>
                    <field>QC3</field>
                    <field />
                    <field>4539</field>
                    <field>ALO</field>
                    <field>6001</field>
                </row>
                <row primary-key="32065283">
                    <field>11-05-21 23:38</field>
                    <field>Delivery</field>
                    <field>Storage</field>
                    <field>SEGU4308618</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32065297">
                    <field>11-05-21 23:39</field>
                    <field>Discharge</field>
                    <field>Import</field>
                    <field>MEDU5428102</field>
                    <field>QC2</field>
                    <field>QC2</field>
                    <field>MLS</field>
                    <field>4534</field>
                    <field>AJO</field>
                    <field>6008</field>
                </row>
                <row primary-key="32065319">
                    <field>11-05-21 23:40</field>
                    <field>Discharge</field>
                    <field>Import</field>
                    <field>TGHU0453730</field>
                    <field>QC3</field>
                    <field>QC3</field>
                    <field />
                    <field>4540</field>
                    <field>PMA</field>
                    <field>7003</field>
                </row>
                <row primary-key="32065328">
                    <field>11-05-21 23:40</field>
                    <field>Discharge</field>
                    <field>Import</field>
                    <field>SEGU2788204</field>
                    <field>QC3</field>
                    <field>QC3</field>
                    <field />
                    <field>4539</field>
                    <field>ALO</field>
                    <field>7003</field>
                </row>
                <row primary-key="32065343">
                    <field>11-05-21 23:41</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>GESU6435664</field>
                    <field />
                    <field />
                    <field />
                    <field>4532</field>
                    <field>GAS</field>
                    <field />
                </row>
                <row primary-key="32065345">
                    <field>11-05-21 23:42</field>
                    <field>Discharge</field>
                    <field>Import</field>
                    <field>MSCU7966733</field>
                    <field>QC1</field>
                    <field>QC1</field>
                    <field>JAS</field>
                    <field>4533</field>
                    <field>LBO</field>
                    <field>2513</field>
                </row>
                <row primary-key="32065360">
                    <field>11-05-21 23:42</field>
                    <field>Yard Shift</field>
                    <field>Import</field>
                    <field>PCIU8520159</field>
                    <field />
                    <field>4518</field>
                    <field>JMV</field>
                    <field>4518</field>
                    <field>JMV</field>
                    <field>4518</field>
                </row>
                <row primary-key="32065363">
                    <field>11-05-21 23:42</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>BSIU9240191</field>
                    <field />
                    <field>4518</field>
                    <field>JMV</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32065374">
                    <field>11-05-21 23:42</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>MAGU2470311</field>
                    <field />
                    <field>4534</field>
                    <field>AJO</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32065380">
                    <field>11-05-21 23:43</field>
                    <field>Discharge</field>
                    <field>Import</field>
                    <field>DFSU2469900</field>
                    <field>QC3</field>
                    <field>QC3</field>
                    <field />
                    <field>4540</field>
                    <field>PMA</field>
                    <field>7003</field>
                </row>
                <row primary-key="32065392">
                    <field>11-05-21 23:43</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>MRKU7820999</field>
                    <field />
                    <field />
                    <field />
                    <field>4525</field>
                    <field>AMV</field>
                    <field />
                </row>
                <row primary-key="32065422">
                    <field>11-05-21 23:45</field>
                    <field>Discharge</field>
                    <field>Through</field>
                    <field>MEDU1644401</field>
                    <field>QC3</field>
                    <field>QC3</field>
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32065427">
                    <field>11-05-21 23:45</field>
                    <field>Discharge</field>
                    <field>Through</field>
                    <field>MEDU5558220</field>
                    <field>QC3</field>
                    <field>QC3</field>
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32065438">
                    <field>11-05-21 23:46</field>
                    <field>Discharge</field>
                    <field>Import</field>
                    <field>CAIU3291323</field>
                    <field>QC3</field>
                    <field>QC3</field>
                    <field />
                    <field>4539</field>
                    <field>ALO</field>
                    <field>7004</field>
                </row>
                <row primary-key="32065446">
                    <field>11-05-21 23:46</field>
                    <field>Discharge</field>
                    <field>Import</field>
                    <field>CAAU5800495</field>
                    <field>QC1</field>
                    <field>QC1</field>
                    <field>JAS</field>
                    <field>4538</field>
                    <field>JLA</field>
                    <field>2518</field>
                </row>
                <row primary-key="32065454">
                    <field>11-05-21 23:46</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>MEDU2945122</field>
                    <field />
                    <field>4534</field>
                    <field>AJO</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32065455">
                    <field>11-05-21 23:47</field>
                    <field>Discharge</field>
                    <field>Import</field>
                    <field>MSCU5465558</field>
                    <field>QC1</field>
                    <field>QC1</field>
                    <field>JAS</field>
                    <field>4533</field>
                    <field>LBO</field>
                    <field>2512</field>
                </row>
                <row primary-key="32065463">
                    <field>11-05-21 23:47</field>
                    <field>Yard Shift</field>
                    <field>Import</field>
                    <field>GESU3718090</field>
                    <field />
                    <field>4525</field>
                    <field>AMV</field>
                    <field>4525</field>
                    <field>AMV</field>
                    <field>4525</field>
                </row>
                <row primary-key="32065486">
                    <field>11-05-21 23:48</field>
                    <field>Yard Shift</field>
                    <field>Import</field>
                    <field>PCIU1679874</field>
                    <field />
                    <field>4525</field>
                    <field>AMV</field>
                    <field>4525</field>
                    <field>AMV</field>
                    <field>4525</field>
                </row>
                <row primary-key="32065496">
                    <field>11-05-21 23:49</field>
                    <field>Discharge</field>
                    <field>Through</field>
                    <field>CAXU6625998</field>
                    <field>QC3</field>
                    <field>QC3</field>
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32065515">
                    <field>11-05-21 23:50</field>
                    <field>Yard Shift</field>
                    <field>Import</field>
                    <field>PCIU1096727</field>
                    <field />
                    <field>4525</field>
                    <field>AMV</field>
                    <field>4525</field>
                    <field>AMV</field>
                    <field>4525</field>
                </row>
                <row primary-key="32065517">
                    <field>11-05-21 23:50</field>
                    <field>Discharge</field>
                    <field>Through</field>
                    <field>TGHU3321357</field>
                    <field>QC3</field>
                    <field>QC3</field>
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32065523">
                    <field>11-05-21 23:50</field>
                    <field>Delivery</field>
                    <field>Storage</field>
                    <field>CMAU5380551</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32065553">
                    <field>11-05-21 23:53</field>
                    <field>Discharge</field>
                    <field>Through</field>
                    <field>MEDU5245462</field>
                    <field>QC3</field>
                    <field>QC3</field>
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32065558">
                    <field>11-05-21 23:53</field>
                    <field>Discharge</field>
                    <field>Through</field>
                    <field>MEDU3586475</field>
                    <field>QC3</field>
                    <field>QC3</field>
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32065564">
                    <field>11-05-21 23:53</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>TLLU2313150</field>
                    <field />
                    <field>4525</field>
                    <field>AMV</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32065565">
                    <field>11-05-21 23:53</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>TCNU5287809</field>
                    <field />
                    <field />
                    <field />
                    <field>4532</field>
                    <field>GAS</field>
                    <field />
                </row>
                <row primary-key="32065563">
                    <field>11-05-21 23:53</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>SEGU4392845</field>
                    <field />
                    <field />
                    <field />
                    <field>4531</field>
                    <field>DAE</field>
                    <field />
                </row>
                <row primary-key="32065570">
                    <field>11-05-21 23:54</field>
                    <field>Discharge</field>
                    <field>Import</field>
                    <field>FSCU9927678</field>
                    <field>QC2</field>
                    <field>QC2</field>
                    <field>MLS</field>
                    <field>4538</field>
                    <field>JLA</field>
                    <field>6013</field>
                </row>
                <row primary-key="32065592">
                    <field>11-05-21 23:55</field>
                    <field>Receival</field>
                    <field>Storage</field>
                    <field>PCIU9274804</field>
                    <field />
                    <field />
                    <field />
                    <field>4519</field>
                    <field>JSO</field>
                    <field />
                </row>
                <row primary-key="32065603">
                    <field>11-05-21 23:56</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>CMAU0973019</field>
                    <field />
                    <field />
                    <field />
                    <field>4518</field>
                    <field>JMV</field>
                    <field />
                </row>
                <row primary-key="32065607">
                    <field>11-05-21 23:57</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>APZU3652172</field>
                    <field />
                    <field />
                    <field />
                    <field>4518</field>
                    <field>JMV</field>
                    <field />
                </row>
                <row primary-key="32065609">
                    <field>11-05-21 23:57</field>
                    <field>Discharge</field>
                    <field>Through</field>
                    <field>BMOU2308170</field>
                    <field>QC3</field>
                    <field>QC3</field>
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32065613">
                    <field>11-05-21 23:57</field>
                    <field>Discharge</field>
                    <field>Import</field>
                    <field>TCNU9002782</field>
                    <field>QC2</field>
                    <field>QC2</field>
                    <field>MLS</field>
                    <field>4538</field>
                    <field>JLA</field>
                    <field>7003</field>
                </row>
                <row primary-key="32065625">
                    <field>11-05-21 23:58</field>
                    <field>Discharge</field>
                    <field>Import</field>
                    <field>FFAU1728987</field>
                    <field>QC2</field>
                    <field>QC2</field>
                    <field>MLS</field>
                    <field>4533</field>
                    <field>LBO</field>
                    <field>2528</field>
                </row>
                <row primary-key="32065635">
                    <field>11-05-21 23:58</field>
                    <field>Discharge</field>
                    <field>Through</field>
                    <field>MSCU3937737</field>
                    <field>QC3</field>
                    <field>QC3</field>
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32065641">
                    <field>11-05-21 23:58</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>CMAU5260920</field>
                    <field />
                    <field />
                    <field />
                    <field>4532</field>
                    <field>GAS</field>
                    <field />
                </row>
                <row primary-key="32065643">
                    <field>11-05-21 23:58</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>ZIQ9721</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32065645">
                    <field>11-05-21 23:58</field>
                    <field>Discharge</field>
                    <field>Import</field>
                    <field>MEDU8530566</field>
                    <field>QC2</field>
                    <field>QC2</field>
                    <field>MLS</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32065654">
                    <field>11-05-21 23:58</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>ZIQ9634</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32065660">
                    <field>11-05-21 23:59</field>
                    <field>Discharge</field>
                    <field>Import</field>
                    <field>FTAU1375260</field>
                    <field>QC1</field>
                    <field>QC1</field>
                    <field>JAS</field>
                    <field>4539</field>
                    <field>ALO</field>
                    <field>2517</field>
                </row>
                <row primary-key="32065668">
                    <field>11-05-21 23:59</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>FCIU4157699</field>
                    <field />
                    <field />
                    <field />
                    <field>4518</field>
                    <field>JMV</field>
                    <field />
                </row>
                <row primary-key="32065699">
                    <field>12-05-21 00:01</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>TGBU5295316</field>
                    <field />
                    <field />
                    <field />
                    <field>4532</field>
                    <field>GAS</field>
                    <field />
                </row>
                <row primary-key="32065701">
                    <field>12-05-21 00:01</field>
                    <field>Yard Move</field>
                    <field>Export</field>
                    <field>ST93575</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32065706">
                    <field>12-05-21 00:01</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>GLDU9768161</field>
                    <field />
                    <field />
                    <field />
                    <field>4531</field>
                    <field>DAE</field>
                    <field />
                </row>
                <row primary-key="32065713">
                    <field>12-05-21 00:01</field>
                    <field>Discharge</field>
                    <field>Import</field>
                    <field>MSMU7194326</field>
                    <field>QC2</field>
                    <field>QC2</field>
                    <field>MLS</field>
                    <field>4538</field>
                    <field>JLA</field>
                    <field>6015</field>
                </row>
                <row primary-key="32065734">
                    <field>12-05-21 00:02</field>
                    <field>Discharge</field>
                    <field>Import</field>
                    <field>BEAU2822098</field>
                    <field>QC1</field>
                    <field>QC1</field>
                    <field>JAS</field>
                    <field>4534</field>
                    <field>AJO</field>
                    <field>2516</field>
                </row>
                <row primary-key="32065763">
                    <field>12-05-21 00:03</field>
                    <field>Discharge</field>
                    <field>Import</field>
                    <field>CAIU7533533</field>
                    <field>QC2</field>
                    <field>QC2</field>
                    <field>MLS</field>
                    <field>4538</field>
                    <field>JLA</field>
                    <field>6013</field>
                </row>
                <row primary-key="32065772">
                    <field>12-05-21 00:03</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>TGHU3975487</field>
                    <field />
                    <field />
                    <field />
                    <field>4536</field>
                    <field>JAI</field>
                    <field />
                </row>
                <row primary-key="32065775">
                    <field>12-05-21 00:04</field>
                    <field>Discharge</field>
                    <field>Through</field>
                    <field>GLDU9432710</field>
                    <field>QC3</field>
                    <field>QC3</field>
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32065779">
                    <field>12-05-21 00:04</field>
                    <field>Receival</field>
                    <field>Storage</field>
                    <field>PCIU8663910</field>
                    <field />
                    <field />
                    <field />
                    <field>4519</field>
                    <field>JSO</field>
                    <field />
                </row>
                <row primary-key="32065781">
                    <field>12-05-21 00:04</field>
                    <field>Yard Move</field>
                    <field>Export</field>
                    <field>TGHU3975487</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32065783">
                    <field>12-05-21 00:04</field>
                    <field>Discharge</field>
                    <field>Through</field>
                    <field>TGHU1839542</field>
                    <field>QC3</field>
                    <field>QC3</field>
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32065799">
                    <field>12-05-21 00:05</field>
                    <field>Yard Move</field>
                    <field>Import</field>
                    <field>MEDU8530566</field>
                    <field />
                    <field>4538</field>
                    <field>JLA</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32065817">
                    <field>12-05-21 00:05</field>
                    <field>Yard Move</field>
                    <field>Export</field>
                    <field>ZIQ9757</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32065829">
                    <field>12-05-21 00:05</field>
                    <field>Delivery</field>
                    <field>Storage</field>
                    <field>PCIU9274804</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32065830">
                    <field>12-05-21 00:05</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>TCLU5873886</field>
                    <field />
                    <field />
                    <field />
                    <field>4525</field>
                    <field>AMV</field>
                    <field />
                </row>
                <row primary-key="32065832">
                    <field>12-05-21 00:05</field>
                    <field>Discharge</field>
                    <field>Import</field>
                    <field>MEDU6686734</field>
                    <field>QC1</field>
                    <field>QC1</field>
                    <field>JAS</field>
                    <field>4534</field>
                    <field>AJO</field>
                    <field>2515</field>
                </row>
                <row primary-key="32065863">
                    <field>12-05-21 00:07</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>PCIU9189111</field>
                    <field />
                    <field>4518</field>
                    <field>JMV</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32065866">
                    <field>12-05-21 00:07</field>
                    <field>Discharge</field>
                    <field>Through</field>
                    <field>MEDU5306167</field>
                    <field>QC3</field>
                    <field>QC3</field>
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32065876">
                    <field>12-05-21 00:08</field>
                    <field>Discharge</field>
                    <field>Through</field>
                    <field>BMOU2015742</field>
                    <field>QC3</field>
                    <field>QC3</field>
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32065900">
                    <field>12-05-21 00:08</field>
                    <field>Discharge</field>
                    <field>Import</field>
                    <field>FFAU1906944</field>
                    <field>QC2</field>
                    <field>QC2</field>
                    <field>MLS</field>
                    <field>4538</field>
                    <field>JLA</field>
                    <field>7003</field>
                </row>
                <row primary-key="32065921">
                    <field>12-05-21 00:09</field>
                    <field>Discharge</field>
                    <field>Import</field>
                    <field>TCLU5481740</field>
                    <field>QC2</field>
                    <field>QC2</field>
                    <field>MLS</field>
                    <field>4538</field>
                    <field>JLA</field>
                    <field>6005</field>
                </row>
                <row primary-key="32065941">
                    <field>12-05-21 00:10</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>CBHU1810116</field>
                    <field />
                    <field>4532</field>
                    <field>GAS</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32065945">
                    <field>12-05-21 00:10</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>CXDU2162228</field>
                    <field />
                    <field />
                    <field />
                    <field>4536</field>
                    <field>JAI</field>
                    <field />
                </row>
                <row primary-key="32065948">
                    <field>12-05-21 00:11</field>
                    <field>Discharge</field>
                    <field>Import</field>
                    <field>MEDU6217212</field>
                    <field>QC1</field>
                    <field>QC1</field>
                    <field>JAS</field>
                    <field>4534</field>
                    <field>AJO</field>
                    <field>2512</field>
                </row>
                <row primary-key="32065956">
                    <field>12-05-21 00:12</field>
                    <field>Yard Move</field>
                    <field>Export</field>
                    <field>CXDU2162228</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32065957">
                    <field>12-05-21 00:12</field>
                    <field>Discharge</field>
                    <field>Import</field>
                    <field>MEDU2929332</field>
                    <field>QC1</field>
                    <field>QC1</field>
                    <field>JAS</field>
                    <field>4534</field>
                    <field>AJO</field>
                    <field>2517</field>
                </row>
                <row primary-key="32065976">
                    <field>12-05-21 00:13</field>
                    <field>Discharge</field>
                    <field>Through</field>
                    <field>TCLU2984314</field>
                    <field>QC3</field>
                    <field>QC3</field>
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32065980">
                    <field>12-05-21 00:13</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>MSKU5056590</field>
                    <field />
                    <field />
                    <field />
                    <field>4525</field>
                    <field>AMV</field>
                    <field />
                </row>
                <row primary-key="32065982">
                    <field>12-05-21 00:13</field>
                    <field>Discharge</field>
                    <field>Through</field>
                    <field>MEDU3779094</field>
                    <field>QC3</field>
                    <field>QC3</field>
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32065986">
                    <field>12-05-21 00:13</field>
                    <field>Discharge</field>
                    <field>Import</field>
                    <field>TCKU1693934</field>
                    <field>QC1</field>
                    <field>QC1</field>
                    <field>JAS</field>
                    <field>4539</field>
                    <field>ALO</field>
                    <field>2513</field>
                </row>
                <row primary-key="32066015">
                    <field>12-05-21 00:15</field>
                    <field>Discharge</field>
                    <field>Import</field>
                    <field>MSDU8344430</field>
                    <field>QC2</field>
                    <field>QC2</field>
                    <field>MLS</field>
                    <field>4540</field>
                    <field>PMA</field>
                    <field>6005</field>
                </row>
                <row primary-key="32066023">
                    <field>12-05-21 00:15</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>CMAU4811947</field>
                    <field />
                    <field />
                    <field />
                    <field>4531</field>
                    <field>DAE</field>
                    <field />
                </row>
                <row primary-key="32066028">
                    <field>12-05-21 00:15</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>TCKU2122375</field>
                    <field />
                    <field />
                    <field />
                    <field>4536</field>
                    <field>JAI</field>
                    <field />
                </row>
                <row primary-key="32066030">
                    <field>12-05-21 00:15</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>BMOU2034779</field>
                    <field />
                    <field />
                    <field />
                    <field>4533</field>
                    <field>LBO</field>
                    <field />
                </row>
                <row primary-key="32066031">
                    <field>12-05-21 00:16</field>
                    <field>Receival</field>
                    <field>Storage</field>
                    <field>MSKU9412452</field>
                    <field />
                    <field />
                    <field />
                    <field>4519</field>
                    <field>JSO</field>
                    <field />
                </row>
                <row primary-key="32066032">
                    <field>12-05-21 00:16</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>ECMU2195465</field>
                    <field />
                    <field />
                    <field />
                    <field>4533</field>
                    <field>LBO</field>
                    <field />
                </row>
                <row primary-key="32066038">
                    <field>12-05-21 00:17</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>TGHU1403040</field>
                    <field />
                    <field />
                    <field />
                    <field>4536</field>
                    <field>JAI</field>
                    <field />
                </row>
                <row primary-key="32066042">
                    <field>12-05-21 00:18</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>TCNU1029658</field>
                    <field />
                    <field>4532</field>
                    <field>GAS</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32066054">
                    <field>12-05-21 00:18</field>
                    <field>Discharge</field>
                    <field>Import</field>
                    <field>MEDU1452630</field>
                    <field>QC1</field>
                    <field>QC1</field>
                    <field>JAS</field>
                    <field>4539</field>
                    <field>ALO</field>
                    <field>2518</field>
                </row>
                <row primary-key="32066064">
                    <field>12-05-21 00:18</field>
                    <field>Receival</field>
                    <field>Storage</field>
                    <field>MSKU0668253</field>
                    <field />
                    <field />
                    <field />
                    <field>4519</field>
                    <field>JSO</field>
                    <field />
                </row>
                <row primary-key="32066065">
                    <field>12-05-21 00:19</field>
                    <field>Discharge</field>
                    <field>Import</field>
                    <field>MEDU6543482</field>
                    <field>QC1</field>
                    <field>QC1</field>
                    <field>JAS</field>
                    <field>4534</field>
                    <field>AJO</field>
                    <field>2516</field>
                </row>
                <row primary-key="32066098">
                    <field>12-05-21 00:20</field>
                    <field>Discharge</field>
                    <field>Import</field>
                    <field>MSCU6900346</field>
                    <field>QC1</field>
                    <field>QC1</field>
                    <field>JAS</field>
                    <field>4534</field>
                    <field>AJO</field>
                    <field>2515</field>
                </row>
                <row primary-key="32066106">
                    <field>12-05-21 00:20</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>SUDU7393906</field>
                    <field />
                    <field />
                    <field />
                    <field>4518</field>
                    <field>JMV</field>
                    <field />
                </row>
                <row primary-key="32066141">
                    <field>12-05-21 00:23</field>
                    <field>Receival</field>
                    <field>Storage</field>
                    <field>MRKU6065770</field>
                    <field />
                    <field />
                    <field />
                    <field>4519</field>
                    <field>JSO</field>
                    <field />
                </row>
                <row primary-key="32066151">
                    <field>12-05-21 00:23</field>
                    <field>Yard Move</field>
                    <field>Export</field>
                    <field>ZIQ9721</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32066152">
                    <field>12-05-21 00:24</field>
                    <field>Yard Move</field>
                    <field>Export</field>
                    <field>ST93575</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32066198">
                    <field>12-05-21 00:26</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>BEAU4037387</field>
                    <field />
                    <field />
                    <field />
                    <field>4518</field>
                    <field>JMV</field>
                    <field />
                </row>
                <row primary-key="32066197">
                    <field>12-05-21 00:26</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>PCIU9031872</field>
                    <field />
                    <field>4525</field>
                    <field>AMV</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32066212">
                    <field>12-05-21 00:27</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>TCLU8267780</field>
                    <field />
                    <field />
                    <field />
                    <field>4518</field>
                    <field>JMV</field>
                    <field />
                </row>
                <row primary-key="32066214">
                    <field>12-05-21 00:27</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>SUDU7896916</field>
                    <field />
                    <field />
                    <field />
                    <field>4536</field>
                    <field>JAI</field>
                    <field />
                </row>
                <row primary-key="32066218">
                    <field>12-05-21 00:28</field>
                    <field>Receival</field>
                    <field>Storage</field>
                    <field>BMOU4062614</field>
                    <field />
                    <field />
                    <field />
                    <field>4519</field>
                    <field>JSO</field>
                    <field />
                </row>
                <row primary-key="32066221">
                    <field>12-05-21 00:29</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>APHU7212461</field>
                    <field />
                    <field />
                    <field />
                    <field>4518</field>
                    <field>JMV</field>
                    <field />
                </row>
                <row primary-key="32066252">
                    <field>12-05-21 00:30</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>TEMU3181633</field>
                    <field />
                    <field />
                    <field />
                    <field>4533</field>
                    <field>LBO</field>
                    <field />
                </row>
                <row primary-key="32066259">
                    <field>12-05-21 00:31</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>CMAU0196407</field>
                    <field />
                    <field />
                    <field />
                    <field>4525</field>
                    <field>AMV</field>
                    <field />
                </row>
                <row primary-key="32066267">
                    <field>12-05-21 00:32</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>TRHU1284467</field>
                    <field />
                    <field />
                    <field />
                    <field>4531</field>
                    <field>DAE</field>
                    <field />
                </row>
                <row primary-key="32066266">
                    <field>12-05-21 00:32</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>CMAU4706540</field>
                    <field />
                    <field />
                    <field />
                    <field>4518</field>
                    <field>JMV</field>
                    <field />
                </row>
                <row primary-key="32066270">
                    <field>12-05-21 00:32</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>ZIQ9758</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32066272">
                    <field>12-05-21 00:33</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>ZIQ9668</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32066293">
                    <field>12-05-21 00:35</field>
                    <field>Discharge</field>
                    <field>Import</field>
                    <field>MEDU6900954</field>
                    <field>QC3</field>
                    <field>QC3</field>
                    <field />
                    <field>4534</field>
                    <field>AJO</field>
                    <field>7003</field>
                </row>
                <row primary-key="32066301">
                    <field>12-05-21 00:35</field>
                    <field>Receival</field>
                    <field>Storage</field>
                    <field>CGMU5152966</field>
                    <field />
                    <field />
                    <field />
                    <field>4532</field>
                    <field>GAS</field>
                    <field />
                </row>
                <row primary-key="32066310">
                    <field>12-05-21 00:35</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>GVTU5016424</field>
                    <field />
                    <field />
                    <field />
                    <field>4525</field>
                    <field>AMV</field>
                    <field />
                </row>
                <row primary-key="32066312">
                    <field>12-05-21 00:35</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>TEMU7237005</field>
                    <field />
                    <field />
                    <field />
                    <field>4518</field>
                    <field>JMV</field>
                    <field />
                </row>
                <row primary-key="32066314">
                    <field>12-05-21 00:36</field>
                    <field>Yard Move</field>
                    <field>Export</field>
                    <field>ZIQ9634</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32066320">
                    <field>12-05-21 00:36</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>AXIU2162809</field>
                    <field />
                    <field />
                    <field />
                    <field>4531</field>
                    <field>DAE</field>
                    <field />
                </row>
                <row primary-key="32066328">
                    <field>12-05-21 00:37</field>
                    <field>Discharge</field>
                    <field>Import</field>
                    <field>DFSU1529965</field>
                    <field>QC3</field>
                    <field>QC3</field>
                    <field />
                    <field>4534</field>
                    <field>AJO</field>
                    <field>2528</field>
                </row>
                <row primary-key="32066390">
                    <field>12-05-21 00:40</field>
                    <field>Discharge</field>
                    <field>Import</field>
                    <field>IRNU1527983</field>
                    <field>QC3</field>
                    <field>QC3</field>
                    <field />
                    <field>4534</field>
                    <field>AJO</field>
                    <field>6013</field>
                </row>
                <row primary-key="32066402">
                    <field>12-05-21 00:41</field>
                    <field>Yard Move</field>
                    <field>Export</field>
                    <field>ZIQ9758</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32066413">
                    <field>12-05-21 00:42</field>
                    <field>Delivery</field>
                    <field>Storage</field>
                    <field>MSKDMY2229</field>
                    <field />
                    <field>4519</field>
                    <field>JSO</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32066417">
                    <field>12-05-21 00:42</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>TGCU0055701</field>
                    <field />
                    <field />
                    <field />
                    <field>4536</field>
                    <field>JAI</field>
                    <field />
                </row>
                <row primary-key="32066418">
                    <field>12-05-21 00:43</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>MSKU2039007</field>
                    <field />
                    <field>4518</field>
                    <field>JMV</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32066420">
                    <field>12-05-21 00:43</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>PCIU1121579</field>
                    <field />
                    <field />
                    <field />
                    <field>4531</field>
                    <field>DAE</field>
                    <field />
                </row>
                <row primary-key="32066474">
                    <field>12-05-21 00:46</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>MWCU6753877</field>
                    <field />
                    <field>4532</field>
                    <field>GAS</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32066486">
                    <field>12-05-21 00:46</field>
                    <field>Discharge</field>
                    <field>Through</field>
                    <field>MEDU6481396</field>
                    <field>QC3</field>
                    <field>QC3</field>
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32066490">
                    <field>12-05-21 00:47</field>
                    <field>Discharge</field>
                    <field>Import</field>
                    <field>TCKU1799865</field>
                    <field>QC3</field>
                    <field>QC3</field>
                    <field />
                    <field>4534</field>
                    <field>AJO</field>
                    <field>2515</field>
                </row>
                <row primary-key="32066517">
                    <field>12-05-21 00:49</field>
                    <field>Yard Move</field>
                    <field>Export</field>
                    <field>ZIQ9668</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32066539">
                    <field>12-05-21 00:50</field>
                    <field>Discharge</field>
                    <field>Import</field>
                    <field>CARU3811798</field>
                    <field>QC3</field>
                    <field>QC3</field>
                    <field />
                    <field>4534</field>
                    <field>AJO</field>
                    <field>6010</field>
                </row>
                <row primary-key="32066548">
                    <field>12-05-21 00:50</field>
                    <field>Discharge</field>
                    <field>Through</field>
                    <field>MSCU6843858</field>
                    <field>QC3</field>
                    <field>QC3</field>
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32066552">
                    <field>12-05-21 00:50</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>PCIU8520159</field>
                    <field />
                    <field>4525</field>
                    <field>AMV</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32066563">
                    <field>12-05-21 00:51</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>BMOU6409913</field>
                    <field />
                    <field />
                    <field />
                    <field>4532</field>
                    <field>GAS</field>
                    <field />
                </row>
                <row primary-key="32066567">
                    <field>12-05-21 00:51</field>
                    <field>Delivery</field>
                    <field>Storage</field>
                    <field>GAOU6121103</field>
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32066577">
                    <field>12-05-21 00:52</field>
                    <field>Delivery</field>
                    <field>Storage</field>
                    <field>MSKDMY2230</field>
                    <field />
                    <field>4519</field>
                    <field>JSO</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32066582">
                    <field>12-05-21 00:53</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>PCIU9346062</field>
                    <field />
                    <field>4525</field>
                    <field>AMV</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32066585">
                    <field>12-05-21 00:53</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>CXDU1454210</field>
                    <field />
                    <field />
                    <field />
                    <field>4531</field>
                    <field>DAE</field>
                    <field />
                </row>
                <row primary-key="32066587">
                    <field>12-05-21 00:53</field>
                    <field>Discharge</field>
                    <field>Import</field>
                    <field>MSCU4390201</field>
                    <field>QC2</field>
                    <field>QC2</field>
                    <field>MLS</field>
                    <field>4540</field>
                    <field>PMA</field>
                    <field>2525</field>
                </row>
                <row primary-key="32066605">
                    <field>12-05-21 00:54</field>
                    <field>Delivery</field>
                    <field>Import</field>
                    <field>PCIU8673517</field>
                    <field />
                    <field>4538</field>
                    <field>JLA</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32066618">
                    <field>12-05-21 00:54</field>
                    <field>Discharge</field>
                    <field>Through</field>
                    <field>TGHU1914332</field>
                    <field>QC3</field>
                    <field>QC3</field>
                    <field />
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32066649">
                    <field>12-05-21 00:57</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>DRYU2809091</field>
                    <field />
                    <field />
                    <field />
                    <field>4525</field>
                    <field>AMV</field>
                    <field />
                </row>
                <row primary-key="32066651">
                    <field>12-05-21 00:57</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>TRHU2786177</field>
                    <field />
                    <field />
                    <field />
                    <field>4532</field>
                    <field>GAS</field>
                    <field />
                </row>
                <row primary-key="32066661">
                    <field>12-05-21 00:58</field>
                    <field>Load</field>
                    <field>Export</field>
                    <field>GATU1157462</field>
                    <field>QC3</field>
                    <field>4533</field>
                    <field>LBO</field>
                    <field>QC3</field>
                    <field />
                    <field>6012</field>
                </row>
                <row primary-key="32066667">
                    <field>12-05-21 00:58</field>
                    <field>Discharge</field>
                    <field>Import</field>
                    <field>MEDU2863050</field>
                    <field>QC2</field>
                    <field>QC2</field>
                    <field>MLS</field>
                    <field>4534</field>
                    <field>AJO</field>
                    <field>6001</field>
                </row>
                <row primary-key="32066678">
                    <field>12-05-21 00:58</field>
                    <field>Discharge</field>
                    <field>Import</field>
                    <field>TEMU5841818</field>
                    <field>QC2</field>
                    <field>QC2</field>
                    <field>MLS</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32066676">
                    <field>12-05-21 00:58</field>
                    <field>Discharge</field>
                    <field>Import</field>
                    <field>MEDU3938004</field>
                    <field>QC2</field>
                    <field>QC2</field>
                    <field>MLS</field>
                    <field />
                    <field />
                    <field />
                </row>
                <row primary-key="32066693">
                    <field>12-05-21 00:59</field>
                    <field>Discharge</field>
                    <field>Import</field>
                    <field>TTNU1063634</field>
                    <field>QC2</field>
                    <field>QC2</field>
                    <field>MLS</field>
                    <field>4540</field>
                    <field>PMA</field>
                    <field>6001</field>
                </row>
                <row primary-key="32066722">
                    <field>12-05-21 01:00</field>
                    <field>Receival</field>
                    <field>Export</field>
                    <field>MSKU5689650</field>
                    <field />
                    <field />
                    <field />
                    <field>4518</field>
                    <field>JMV</field>
                    <field />
                </row>
                <row primary-key="32066734">
                    <field>12-05-21 01:00</field>
                    <field>Discharge</field>
                    <field>Import</field>
                    <field>MEDU3864220</field>
                    <field>QC1</field>
                    <field>QC1</field>
                    <field>JAS</field>
                    <field>4534</field>
                    <field>AJO</field>
                    <field>2515</field>
                </row>
                <row primary-key="32066748">
                    <field>12-05-21 01:01</field>
                    <field>Discharge</field>
                    <field>Import</field>
                    <field>MEDU6169942</field>
                    <field>QC1</field>
                    <field>QC1</field>
                    <field>JAS</field>
                    <field>4540</field>
                    <field>PMA</field>
                    <field>2515</field>
                </row>
            </rows>
        </data-table>
    </query-response>`;
    // objectName.map((item)=>{
    //   let data= item.objectName.split(" ");
    //   console.log(data)
    // })
    let parser = new xml2js.Parser();
    parser.parseString(data, function (err, result) {
      let count =  0, receivalCount=[], dischargeCount=[] , loadCount= [];
    
      let rows = result['query-response']['data-table'][0]['rows'][0]
      filtered_obj.map((item)=>{
       receivalCount= rows['row'].filter((items)=>{
         return items.field[7] == item && items.field[1] === 'Receival'
       })
       dischargeCount= rows['row'].filter((items)=>{
         return items.field[7] == item && items.field[1] === 'Discharge'
       })
       loadCount= rows['row'].filter((items)=>{
         return items.field[7] == item && items.field[1] === 'Load'
       })
       let obj = {
         name:item,
         receivalCount: receivalCount.length,
         dischargeCount: dischargeCount.length,
         loadCount: loadCount.length
       }
       objectCount = [...objectCount, obj]
      })
     console.log("recizsfkjbiu " ,receivalCount)
     console.log("recizsfkjbiu " ,objectCount)
    })
    request({
      uri: 'https://fleetapi.geeksapi.app/api/statisticsByPeriod?api_token=01a7e2aa1e56ab03c56b7f2aa0580e5af63958fcdaa0a1e7e59ce14803f2&timeBegin=1615006800&timeEnd=1615050000&objectType=0&aggregate=0',
    }, function (error, response, body) {
      if (!error && response.statusCode === 200) {
        body = JSON.parse(body);
        var arrOfObj = [];
        Object.keys(body.statistics).map((item) => {
          if (id_filter.indexOf(item) !== -1) {
            console.log("here is the item", item)
            body.statistics[item].id = item;
            console.log("oobjectName[index]", objectName[indexs + 1])
            body.statistics[item].objectName = objectName[indexs + 1] || 0;
            indexs++;
            arrOfObj = [...arrOfObj,
              body.statistics[item]
            ]
          }
        });
        arrOfObj.map((item)=>{
          var res = item.objectName.split(" ");
          var ress = res[1].split("-")
          console.log(ress[0], ress[1])
          var resss = ress[0]?ress[0] : ''
          var ressss= ress[1]? ress[1]: ''
          var dataaa= resss + ressss
          objectCount.map((items)=>{
            if(items.name == dataaa){
              item.Receival= items.receivalCount
              item.Discharge= items.dischargeCount
              item.Load= items.loadCount
            }
          })
          
        })

        res.json({
          status: 0,
          message: "Object details is fetched Successfully.",
          data: {
            arrOfObj
          }
        });
      } else {
        res.json(error);
      }
    })
  } catch (err) {
    console.log(err)
    res.json({
      status: 1,
      message: "Internal Server Error",
      data: [err]
    })
  }
});
router.get('/map', async function (req, res, next) {
  try {
    let assignType = req.query.assignType || null;
    let id_filters = await objectModel.find({
      assignType: assignType
    }).select('id');
    // let id_filter = [];
    let mapArry = [];
    // id_filters.map((item)=>{
    //   id_filter = [...id_filter, `${item.id}`]
    // })
    let count = 1;
    id_filters.map((item, index) => {
      request({
        uri: `https://fleetapi.geeksapi.app/api/currentObjectState?api_token=01a7e2aa1e56ab03c56b7f2aa0580e5af63958fcdaa0a1e7e59ce14803f2&objectId=${item.id}`,
      }, function (error, response, body) {
        if (!error && response.statusCode === 200) {
          body = JSON.parse(body)
          mapArry = [...mapArry, body]
          console.log(body)
          console.log("values", id_filters.length, count)
          if (count === id_filters.length) {
            res.json({
              status: 1,
              message: "map data is fetched successfuly",
              data: mapArry
            })
          }
          count++
        }
      }) // end of request
    })

  } catch (err) {
    console.log(err)
    res.json({
      status: 1,
      message: "Internal Server Error",
      data: [err]
    })
  }
});



module.exports = router;