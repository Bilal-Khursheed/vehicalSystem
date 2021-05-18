const groupDetials = async () => {
    // console.log("working....")
    // let api_token = '01a7e2aa1e56ab03c56b7f2aa0580e5af63958fcdaa0a1e7e59ce14803f2';
    // let groupData = await fetch(`https://fleetapi.geeksapi.app/api/objects?api_token=${api_token}`)
    // console.log(JSON.parse(JSON.stringify(groupData)));
    // return groupData;
    let data = [
        {
            "groupList": {
                "group": {
                    "groupName": "MATERIAL HANDLER",
                    "ID": 9927
                }
            },
            "garageNumber": "Cornelder port",
            "id": 1204003544,
            "mnfID": "359632100576385",
            "objectName": "MH 02",
            "objectType": "FAS",
            "phone": ""
        },
        {
            "groupList": {
                "group": {
                    "groupName": "SANY",
                    "ID": 3605
                }
            },
            "garageNumber": "CORNELDER",
            "id": 1204005855,
            "mnfID": "359632107275361",
            "objectName": "Sany 45-41",
            "objectType": "FAS",
            "phone": ""
        },
        {
            "groupList": {
                "group": {
                    "groupName": "HELI",
                    "ID": 3631
                }
            },
            "garageNumber": "CORNELDER",
            "id": 1204004831,
            "mnfID": "359633101727266",
            "objectName": "HELI 05-03",
            "objectType": "FAS",
            "phone": "843163185"
        },
        {
            "groupList": {
                "group": {
                    "groupName": "FORK LIFT",
                    "ID": 9921
                }
            },
            "garageNumber": "CORNELDER",
            "id": 1204006367,
            "mnfID": "359632109441490",
            "objectName": "FORK LIFT JJCC 02",
            "objectType": "FAS",
            "phone": ""
        },
        {
            "groupList": {
                "group": {
                    "groupName": "OTTAWA",
                    "ID": 3606
                }
            },
            "garageNumber": "Cornelder Port",
            "id": 1095996274,
            "mnfID": "865209039425146",
            "objectName": "OTTAWA 25-28",
            "objectType": "FAS",
            "phone": "258844149402"
        },
        {
            "groupList": {
                "group": {
                    "groupName": "HELI",
                    "ID": 3631
                }
            },
            "garageNumber": "CORNELDER",
            "id": 1204006368,
            "mnfID": "359632109426541",
            "objectName": "HELI 05-02",
            "objectType": "FAS",
            "phone": ""
        },
        {
            "groupList": {
                "group": {
                    "groupName": "OTTAWA",
                    "ID": 3606
                }
            },
            "garageNumber": "Cornelder port",
            "id": 1204003567,
            "mnfID": "359632100562062",
            "objectName": "OTTAWA 25-22",
            "objectType": "FAS",
            "phone": "258844187017"
        },
        {
            "groupList": {
                "group": {
                    "groupName": "SINO TRUCK",
                    "ID": 9924
                }
            },
            "garageNumber": "CORNELDER",
            "id": 1204006386,
            "mnfID": "359633100879027",
            "objectName": "AAR 014 SF",
            "objectType": "FAS",
            "phone": "258843210367"
        },
        {
            "groupList": {
                "group": {
                    "groupName": "SANY",
                    "ID": 3605
                }
            },
            "garageNumber": "Cornelder Port",
            "id": 265010175,
            "mnfID": "20265010175",
            "objectName": "SANY 45-19",
            "objectType": "FAS",
            "phone": "258842025342"
        },
        {
            "groupList": {
                "group": {
                    "groupName": "SANY",
                    "ID": 3605
                }
            },
            "garageNumber": "Cornelder Port",
            "id": 265010174,
            "mnfID": "20265010174",
            "objectName": "SANY 45-34",
            "objectType": "FAS",
            "phone": "258842032871"
        },
        {
            "groupList": {
                "group": {
                    "groupName": "SANY",
                    "ID": 3605
                }
            },
            "garageNumber": "Cornelder Porto",
            "id": 1204004085,
            "mnfID": "359632102803779",
            "objectName": "SANY 09-05",
            "objectType": "FAS",
            "phone": "258842076175"
        },
        {
            "groupList": {
                "group": {
                    "groupName": "OTTAWA",
                    "ID": 3606
                }
            },
            "garageNumber": "Cornelder Port",
            "id": 265010173,
            "mnfID": "20265010173",
            "objectName": "OTTAWA 25-27",
            "objectType": "FAS",
            "phone": "258842032907"
        },
        {
            "groupList": {
                "group": {
                    "groupName": "SANY",
                    "ID": 3605
                }
            },
            "garageNumber": "CORNELDER",
            "id": 1204003838,
            "mnfID": "359632102710636",
            "objectName": "SANY 45-18",
            "objectType": "FAS",
            "phone": "258842063902"
        },
        {
            "groupList": {
                "group": {
                    "groupName": "CARO ELETRICO",
                    "ID": 9920
                }
            },
            "garageNumber": "Cornelder port",
            "id": 369004991,
            "mnfID": "20369004991",
            "objectName": "Carro Eletrico 6",
            "objectType": "FAS",
            "phone": "+258843163184"
        },
        {
            "groupList": {
                "group": {
                    "groupName": "SANY",
                    "ID": 3605
                }
            },
            "garageNumber": "CORNELDER",
            "id": 369004982,
            "mnfID": "20369004982",
            "objectName": "SANY 45-33",
            "objectType": "FAS",
            "phone": "+258843921918"
        },
        {
            "groupList": {
                "group": {
                    "groupName": "SANY",
                    "ID": 3605
                }
            },
            "garageNumber": "CORNELDER",
            "id": 1204006537,
            "mnfID": "359633107532207",
            "objectName": "Sany 45-40",
            "objectType": "FAS",
            "phone": ""
        },
        {
            "groupList": {
                "group": {
                    "groupName": "Small Vehicles",
                    "ID": 3772
                }
            },
            "garageNumber": "",
            "id": 1204000145,
            "mnfID": "352093080491201",
            "objectName": "AFR 466 MC",
            "objectType": "FAS",
            "phone": "258842010698"
        },
        {
            "groupList": {
                "group": {
                    "groupName": "SANY",
                    "ID": 3605
                }
            },
            "garageNumber": "CORNELDER",
            "id": 1204004758,
            "mnfID": "359633101773450",
            "objectName": "SANY PLY 01",
            "objectType": "FAS",
            "phone": "+258843901919"
        },
        {
            "groupList": {
                "group": {
                    "groupName": "SANY",
                    "ID": 3605
                }
            },
            "garageNumber": "SANY",
            "id": 369004962,
            "mnfID": "20369004962",
            "objectName": "SANY ESC-01",
            "objectType": "FAS",
            "phone": "+258848929980"
        },
        {
            "groupList": {
                "group": {
                    "groupName": "SANY",
                    "ID": 3605
                }
            },
            "garageNumber": "CORNELDER",
            "id": 369004960,
            "mnfID": "20369004960",
            "objectName": "SANY ESC-02",
            "objectType": "FAS",
            "phone": "+258842182242"
        },
        {
            "groupList": {
                "group": {
                    "groupName": "OTTAWA",
                    "ID": 3606
                }
            },
            "garageNumber": "Cornelder Port",
            "id": 369004958,
            "mnfID": "20369004958",
            "objectName": "OTTAWA 25-18",
            "objectType": "FAS",
            "phone": "+258842677400"
        },
        {
            "groupList": {
                "group": {
                    "groupName": "CARO ELETRICO",
                    "ID": 9920
                }
            },
            "garageNumber": "Cornelder port",
            "id": 1204003491,
            "mnfID": "359632102882294",
            "objectName": "Carro eletrico 2",
            "objectType": "FAS",
            "phone": "258849603754"
        },
        {
            "groupList": {
                "group": {
                    "groupName": "SANY",
                    "ID": 3605
                }
            },
            "garageNumber": "cornelder port",
            "id": 369004959,
            "mnfID": "20369004959",
            "objectName": "SANY PLY 02",
            "objectType": "FAS",
            "phone": "+258843163157"
        },
        {
            "groupList": {
                "group": {
                    "groupName": "CARO ELETRICO",
                    "ID": 9920
                }
            },
            "garageNumber": "Cornelder port",
            "id": 1204003490,
            "mnfID": "359632102861561",
            "objectName": "Carro eletrico 4",
            "objectType": "FAS",
            "phone": "258843163222"
        },
        {
            "groupList": {
                "group": {
                    "groupName": "CARO ELETRICO",
                    "ID": 9920
                }
            },
            "garageNumber": "Cornelder port",
            "id": 1204003494,
            "mnfID": "359632102867857",
            "objectName": "Carro eletrico 3",
            "objectType": "FAS",
            "phone": "258848930095"
        },
        {
            "groupList": {
                "group": {
                    "groupName": "CARO ELETRICO",
                    "ID": 9920
                }
            },
            "garageNumber": "",
            "id": 1204003493,
            "mnfID": "359632103075948",
            "objectName": "Carro eletrico 1",
            "objectType": "FAS",
            "phone": "258843163146"
        },
        {
            "groupList": {
                "group": {
                    "groupName": "CARO ELETRICO",
                    "ID": 9920
                }
            },
            "garageNumber": "Cornelder port",
            "id": 1204003492,
            "mnfID": "359632102886725",
            "objectName": "Carro eletrico 7",
            "objectType": "FAS",
            "phone": "258844147066"
        },
        {
            "groupList": {
                "group": {
                    "groupName": "Small Vehicles",
                    "ID": 3772
                }
            },
            "garageNumber": "Cornelder port",
            "id": 1204003499,
            "mnfID": "359632100576393",
            "objectName": "AHE 559 MP",
            "objectType": "FAS",
            "phone": "258843163148"
        },
        {
            "groupList": {
                "group": {
                    "groupName": "Small Vehicles",
                    "ID": 3772
                }
            },
            "garageNumber": "Cornelder port",
            "id": 1204003498,
            "mnfID": "359632100562021",
            "objectName": "AHE 501 MP",
            "objectType": "FAS",
            "phone": "258843163190"
        },
        {
            "groupList": {
                "group": {
                    "groupName": "Generators",
                    "ID": 3608
                }
            },
            "garageNumber": "Cornelder Port",
            "id": 236025723,
            "mnfID": "20236025723",
            "objectName": "Generator 7",
            "objectType": "FAS",
            "phone": "+258842027185"
        },
        {
            "groupList": {
                "group": {
                    "groupName": "Small Vehicles",
                    "ID": 3772
                }
            },
            "garageNumber": "Cornelder port",
            "id": 1204003497,
            "mnfID": "359632100562070",
            "objectName": "AHE 504 MP",
            "objectType": "FAS",
            "phone": "258843163165"
        },
        {
            "groupList": {
                "group": {
                    "groupName": "Small Vehicles",
                    "ID": 3772
                }
            },
            "garageNumber": "Cornelder port",
            "id": 1204003501,
            "mnfID": "359632100561924",
            "objectName": "AHE 503 MP",
            "objectType": "FAS",
            "phone": "258843163211"
        },
        {
            "groupList": {
                "group": {
                    "groupName": "Small Vehicles",
                    "ID": 3772
                }
            },
            "garageNumber": "Cornelder-Port",
            "id": 236025726,
            "mnfID": "20236025726",
            "objectName": "ADQ 232 MP",
            "objectType": "FAS",
            "phone": "258842033180"
        },
        {
            "groupList": {
                "group": {
                    "groupName": "Small Vehicles",
                    "ID": 3772
                }
            },
            "garageNumber": "Cornelder port",
            "id": 1204003500,
            "mnfID": "359632100576450",
            "objectName": "AHE 578 MP",
            "objectType": "FAS",
            "phone": "258843163135"
        },
        {
            "groupList": {
                "group": {
                    "groupName": "SANY",
                    "ID": 3605
                }
            },
            "garageNumber": "CORNELDER",
            "id": 1204005810,
            "mnfID": "359633102564841",
            "objectName": "Sany 45-38",
            "objectType": "FAS",
            "phone": ""
        },
        {
            "groupList": {
                "group": {
                    "groupName": "Small Vehicles",
                    "ID": 3772
                }
            },
            "garageNumber": "cornelder",
            "id": 369004938,
            "mnfID": "20369004938",
            "objectName": "AHB 393 MP",
            "objectType": "FAS",
            "phone": "+258842103367"
        },
        {
            "groupList": {
                "group": {
                    "groupName": "Small Vehicles",
                    "ID": 3772
                }
            },
            "garageNumber": "Cornelder",
            "id": 369004936,
            "mnfID": "20369004936",
            "objectName": "AGS-144-MP",
            "objectType": "FAS",
            "phone": "+258843163156"
        },
        {
            "groupList": {
                "group": {
                    "groupName": "SANY",
                    "ID": 3605
                }
            },
            "garageNumber": "CORNELDER",
            "id": 1204005817,
            "mnfID": "359633100386080",
            "objectName": "Sany 45-39",
            "objectType": "FAS",
            "phone": ""
        },
        {
            "groupList": {
                "group": {
                    "groupName": "SANY",
                    "ID": 3605
                }
            },
            "garageNumber": "CORNELDER",
            "id": 369004933,
            "mnfID": "20369004933",
            "objectName": "SANY 45-35",
            "objectType": "FAS",
            "phone": "+258843915120"
        },
        {
            "groupList": {
                "group": {
                    "groupName": "OTTAWA",
                    "ID": 3606
                }
            },
            "garageNumber": "Cornelder Port",
            "id": 236900766,
            "mnfID": "20236900766",
            "objectName": "OTTAWA 60-160",
            "objectType": "FAS",
            "phone": "258842098726"
        },
        {
            "groupList": {
                "group": {
                    "groupName": "SANY",
                    "ID": 3605
                }
            },
            "garageNumber": "Cornelder Port",
            "id": 236900767,
            "mnfID": "20236900767",
            "objectName": "SANY 45-30",
            "objectType": "FAS",
            "phone": "258842073631"
        },
        {
            "groupList": {
                "group": {
                    "groupName": "OTTAWA",
                    "ID": 3606
                }
            },
            "garageNumber": "Cornelder Port",
            "id": 236900764,
            "mnfID": "20236900764",
            "objectName": "OTTAWA 60-040",
            "objectType": "FAS",
            "phone": "258842069770"
        },
        {
            "groupList": {
                "group": {
                    "groupName": "SANY",
                    "ID": 3605
                }
            },
            "garageNumber": "Cornelder Port",
            "id": 236900765,
            "mnfID": "20236900765",
            "objectName": "SANY 45-20",
            "objectType": "FAS",
            "phone": "258842095851"
        },
        {
            "groupList": {
                "group": {
                    "groupName": "OTTAWA",
                    "ID": 3606
                }
            },
            "garageNumber": "CORNELDER",
            "id": 1204005184,
            "mnfID": "359633102128100",
            "objectName": "OTTAWA 60-04",
            "objectType": "FAS",
            "phone": ""
        },
        {
            "groupList": {
                "group": {
                    "groupName": "OTTAWA",
                    "ID": 3606
                }
            },
            "garageNumber": "Cornelder Port",
            "id": 236900762,
            "mnfID": "20236900762",
            "objectName": "OTTAWA 60-10",
            "objectType": "FAS",
            "phone": "258842106535"
        },
        {
            "groupList": {
                "group": {
                    "groupName": "SANY",
                    "ID": 3605
                }
            },
            "garageNumber": "Cornelder Port",
            "id": 236900763,
            "mnfID": "20236900763",
            "objectName": "SANY 45-32",
            "objectType": "FAS",
            "phone": "258842072716"
        },
        {
            "groupList": {
                "group": {
                    "groupName": "OTTAWA",
                    "ID": 3606
                }
            },
            "garageNumber": "Cornelder Port",
            "id": 236900760,
            "mnfID": "20236900760",
            "objectName": "OTTAWA 25-24",
            "objectType": "FAS",
            "phone": "258842075918"
        },
        {
            "groupList": {
                "group": {
                    "groupName": "HELI",
                    "ID": 3631
                }
            },
            "garageNumber": "",
            "id": 1204002885,
            "mnfID": "359632102800395",
            "objectName": "HELI 05-01",
            "objectType": "FAS",
            "phone": "258849452847"
        },
        {
            "groupList": {
                "group": {
                    "groupName": "OTTAWA",
                    "ID": 3606
                }
            },
            "garageNumber": "Cornelder Port",
            "id": 236900761,
            "mnfID": "20236900761",
            "objectName": "OTTAWA 25-29",
            "objectType": "FAS",
            "phone": "258842071441"
        },
        {
            "groupList": {
                "group": {
                    "groupName": "Generators",
                    "ID": 3608
                }
            },
            "garageNumber": "Cornelder Port",
            "id": 236900758,
            "mnfID": "20236900758",
            "objectName": "BIG GENERATOR TANK",
            "objectType": "FAS",
            "phone": "258842077226"
        },
        {
            "groupList": {
                "group": {
                    "groupName": "Small Vehicles",
                    "ID": 3772
                }
            },
            "garageNumber": "",
            "id": 1204000075,
            "mnfID": "352093082146159",
            "objectName": "MMR 18-18",
            "objectType": "FAS",
            "phone": "25884"
        },
        {
            "groupList": {
                "group": {
                    "groupName": "SANY",
                    "ID": 3605
                }
            },
            "garageNumber": "Cornelder port",
            "id": 236900759,
            "mnfID": "20236900759",
            "objectName": "SANY 45-17",
            "objectType": "FAS",
            "phone": "+258842095122"
        },
        {
            "groupList": {
                "group": {
                    "groupName": "Small Vehicles",
                    "ID": 3772
                }
            },
            "garageNumber": "Cornelder Port",
            "id": 1204000074,
            "mnfID": "352093082285304",
            "objectName": "AFL 399 MP",
            "objectType": "FAS",
            "phone": "258842018048"
        },
        {
            "groupList": {
                "group": {
                    "groupName": "OTTAWA",
                    "ID": 3606
                }
            },
            "garageNumber": "Cornelder Port",
            "id": 236900756,
            "mnfID": "20236900756",
            "objectName": "OTTAWA 25-17",
            "objectType": "FAS",
            "phone": "258842059739"
        },
        {
            "groupList": {
                "group": {
                    "groupName": "SANY",
                    "ID": 3605
                }
            },
            "garageNumber": "Cornelder Port",
            "id": 265010240,
            "mnfID": "20265010240",
            "objectName": "SANY 46-02",
            "objectType": "FAS",
            "phone": "258842273326"
        },
        {
            "groupList": {
                "group": {
                    "groupName": "SANY",
                    "ID": 3605
                }
            },
            "garageNumber": "Cornelder Port",
            "id": 236900754,
            "mnfID": "20236900754",
            "objectName": "SANY 45-29",
            "objectType": "FAS",
            "phone": "258842081516"
        },
        {
            "groupList": {
                "group": {
                    "groupName": "Bombeiros",
                    "ID": 3619
                }
            },
            "garageNumber": "Cornelder Port",
            "id": 1095996383,
            "mnfID": "862057043793246",
            "objectName": "AAG 879 SF",
            "objectType": "FAS",
            "phone": "258848931257"
        },
        {
            "groupList": {
                "group": {
                    "groupName": "Small Vehicles",
                    "ID": 3772
                }
            },
            "garageNumber": "Cornelder Port",
            "id": 1204000079,
            "mnfID": "352093082119180",
            "objectName": "AEY 102 MP",
            "objectType": "FAS",
            "phone": "258842002817"
        },
        {
            "groupList": {
                "group": {
                    "groupName": "OTTAWA",
                    "ID": 3606
                }
            },
            "garageNumber": "Cornelder Port",
            "id": 236900755,
            "mnfID": "20236900755",
            "objectName": "OTTAWA 60-110",
            "objectType": "FAS",
            "phone": "258842114353"
        },
        {
            "groupList": {
                "group": {
                    "groupName": "OTTAWA",
                    "ID": 3606
                }
            },
            "garageNumber": "Cornelder Port",
            "id": 236900752,
            "mnfID": "20236900752",
            "objectName": "OTTAWA 60-120",
            "objectType": "FAS",
            "phone": "258842114844"
        },
        {
            "groupList": {
                "group": {
                    "groupName": "OTTAWA",
                    "ID": 3606
                }
            },
            "garageNumber": "Cornelder Port",
            "id": 236900753,
            "mnfID": "20236900753",
            "objectName": "OTTAWA 60-150",
            "objectType": "FAS",
            "phone": "258842096662"
        },
        {
            "groupList": {
                "group": {
                    "groupName": "SANY",
                    "ID": 3605
                }
            },
            "garageNumber": "Cornelder Port",
            "id": 236900750,
            "mnfID": "20236900750",
            "objectName": "SANY 45-27",
            "objectType": "FAS",
            "phone": "258842098836"
        },
        {
            "groupList": {
                "group": {
                    "groupName": "HELI",
                    "ID": 3631
                }
            },
            "garageNumber": "Cornelder Port",
            "id": 236900751,
            "mnfID": "20236900751",
            "objectName": "HELI 16-07",
            "objectType": "FAS",
            "phone": "258842088160"
        },
        {
            "groupList": {
                "group": {
                    "groupName": "SANY",
                    "ID": 3605
                }
            },
            "garageNumber": "Cornelder Port",
            "id": 265000287,
            "mnfID": "20265000287",
            "objectName": "SANY 45-23",
            "objectType": "FAS",
            "phone": "258842051984"
        },
        {
            "groupList": {
                "group": {
                    "groupName": "Small Vehicles",
                    "ID": 3772
                }
            },
            "garageNumber": "Cornelder Port",
            "id": 1204000086,
            "mnfID": "352093082262394",
            "objectName": "AFE 964 MP",
            "objectType": "FAS",
            "phone": "258842025037"
        },
        {
            "groupList": {
                "group": {
                    "groupName": "Small Vehicles",
                    "ID": 3772
                }
            },
            "garageNumber": "Cornelder Port",
            "id": 1204000090,
            "mnfID": "352093081316688",
            "objectName": "AFF 470 MP",
            "objectType": "FAS",
            "phone": "2588420632"
        },
        {
            "groupList": {
                "group": {
                    "groupName": "MATERIAL HANDLER",
                    "ID": 9927
                }
            },
            "garageNumber": "",
            "id": 1204002906,
            "mnfID": "358480080025192",
            "objectName": "TEREX-01",
            "objectType": "FAS",
            "phone": "258845009170"
        },
        {
            "groupList": {
                "group": {
                    "groupName": "Small Vehicles",
                    "ID": 3772
                }
            },
            "garageNumber": "Cornelder Port",
            "id": 1204000088,
            "mnfID": "352093082230128",
            "objectName": "AEW 839 MP",
            "objectType": "FAS",
            "phone": "258842025577"
        },
        {
            "groupList": {
                "group": {
                    "groupName": "SANY",
                    "ID": 3605
                }
            },
            "garageNumber": "Cornelder Port",
            "id": 265000279,
            "mnfID": "20265000279",
            "objectName": "SANY 45-26",
            "objectType": "FAS",
            "phone": "258842055182"
        },
        {
            "groupList": {
                "group": {
                    "groupName": "SINO TRUCK",
                    "ID": 9924
                }
            },
            "garageNumber": "Cornelder port",
            "id": 1204003678,
            "mnfID": "359632102710487",
            "objectName": "SINOTRUK-70-01",
            "objectType": "FAS",
            "phone": "258843912985"
        },
        {
            "groupList": {
                "group": {
                    "groupName": "SANY",
                    "ID": 3605
                }
            },
            "garageNumber": "Cornelder",
            "id": 265000277,
            "mnfID": "20265000277",
            "objectName": "SANY 45-22",
            "objectType": "FAS",
            "phone": "258842050481"
        },
        {
            "groupList": {
                "group": {
                    "groupName": "OTTAWA",
                    "ID": 3606
                }
            },
            "garageNumber": "Cornelder Port",
            "id": 265000299,
            "mnfID": "20265000299",
            "objectName": "OTTAWA 60-05",
            "objectType": "FAS",
            "phone": "258842068953"
        },
        {
            "groupList": {
                "group": {
                    "groupName": "SINO TRUCK",
                    "ID": 9924
                }
            },
            "garageNumber": "Cornelder port",
            "id": 1204003681,
            "mnfID": "359632102710545",
            "objectName": "SINOTRUK-70-04",
            "objectType": "FAS",
            "phone": "258843163188"
        },
        {
            "groupList": {
                "group": {
                    "groupName": "SANY",
                    "ID": 3605
                }
            },
            "garageNumber": "Cornelder Port",
            "id": 1095996400,
            "mnfID": "862057043793170",
            "objectName": "SANY  30-07",
            "objectType": "FAS",
            "phone": "258848342833"
        },
        {
            "groupList": {
                "group": {
                    "groupName": "Small Vehicles",
                    "ID": 3772
                }
            },
            "garageNumber": "",
            "id": 1204000096,
            "mnfID": "352093082111302",
            "objectName": "MBP-62-11",
            "objectType": "FAS",
            "phone": "258842022848"
        },
        {
            "groupList": {
                "group": {
                    "groupName": "OTTAWA",
                    "ID": 3606
                }
            },
            "garageNumber": "Cornelder Port",
            "id": 265000303,
            "mnfID": "20265000303",
            "objectName": "OTTAWA 60-080",
            "objectType": "FAS",
            "phone": "258842068546"
        },
        {
            "groupList": {
                "group": {
                    "groupName": "SINO TRUCK",
                    "ID": 9924
                }
            },
            "garageNumber": "Cornelder port",
            "id": 1204003687,
            "mnfID": "359632102808620",
            "objectName": "SINOTRUK-70-02",
            "objectType": "FAS",
            "phone": "258843163215"
        },
        {
            "groupList": {
                "group": {
                    "groupName": "SINO TRUCK",
                    "ID": 9924
                }
            },
            "garageNumber": "Cornelder port",
            "id": 1204003686,
            "mnfID": "359632102710537",
            "objectName": "SINOTRUK-70-03",
            "objectType": "FAS",
            "phone": "258843163138"
        },
        {
            "groupList": {
                "group": {
                    "groupName": "MATERIAL HANDLER",
                    "ID": 9927
                }
            },
            "garageNumber": "",
            "id": 1204002918,
            "mnfID": "358480081494710",
            "objectName": "TEREX-02",
            "objectType": "FAS",
            "phone": "258844745848"
        },
        {
            "groupList": {
                "group": {
                    "groupName": "JOHN DEERE",
                    "ID": 9982
                }
            },
            "garageNumber": "",
            "id": 1204000102,
            "mnfID": "352093081987413",
            "objectName": "JOHN DEERE TC",
            "objectType": "FAS",
            "phone": "258842009809"
        },
        {
            "groupList": {
                "group": {
                    "groupName": "OTTAWA",
                    "ID": 3606
                }
            },
            "garageNumber": "Cornelder Port",
            "id": 265000301,
            "mnfID": "20265000301",
            "objectName": "OTTAWA 25-26",
            "objectType": "FAS",
            "phone": "258842056632"
        },
        {
            "groupList": {
                "group": {
                    "groupName": "OTTAWA",
                    "ID": 3606
                }
            },
            "garageNumber": "Cornelder Port",
            "id": 265000300,
            "mnfID": "20265000300",
            "objectName": "OTTAWA 60-09O",
            "objectType": "FAS",
            "phone": "258842106442"
        },
        {
            "groupList": {
                "group": {
                    "groupName": "Small Vehicles",
                    "ID": 3772
                }
            },
            "garageNumber": "",
            "id": 1204000100,
            "mnfID": "352093082441451",
            "objectName": "ACB 968 MC",
            "objectType": "FAS",
            "phone": "258845062502"
        },
        {
            "groupList": {
                "group": {
                    "groupName": "MATERIAL HANDLER",
                    "ID": 9927
                }
            },
            "garageNumber": "Cornelder port",
            "id": 1204003428,
            "mnfID": "359632102868079",
            "objectName": "MH 01",
            "objectType": "FAS",
            "phone": "258843163162"
        },
        {
            "groupList": {
                "group": {
                    "groupName": "Small Vehicles",
                    "ID": 3772
                }
            },
            "garageNumber": "",
            "id": 1204000107,
            "mnfID": "352093082349423",
            "objectName": "ADW 690 MP",
            "objectType": "FAS",
            "phone": "258842031402"
        },
        {
            "groupList": {
                "group": {
                    "groupName": "SV TRUCKS",
                    "ID": 9928
                }
            },
            "garageNumber": "Cornelder Port",
            "id": 265000289,
            "mnfID": "20265000289",
            "objectName": "SVETRUCK 50-01",
            "objectType": "FAS",
            "phone": "258842052350"
        },
        {
            "groupList": {
                "group": {
                    "groupName": "Small Vehicles",
                    "ID": 3772
                }
            },
            "garageNumber": "",
            "id": 1204000104,
            "mnfID": "352093082349506",
            "objectName": "AFR 468 MC",
            "objectType": "FAS",
            "phone": "258842287284"
        },
        {
            "groupList": {
                "group": {
                    "groupName": "SV TRUCKS",
                    "ID": 9928
                }
            },
            "garageNumber": "Cornelder Port",
            "id": 265000295,
            "mnfID": "20265000295",
            "objectName": "SVETRUCK 50-02",
            "objectType": "FAS",
            "phone": "258842087339"
        },
        {
            "groupList": {
                "group": {
                    "groupName": "OTTAWA",
                    "ID": 3606
                }
            },
            "garageNumber": "Cornelder Port",
            "id": 265000294,
            "mnfID": "20265000294",
            "objectName": "OTTAWA 25-21",
            "objectType": "FAS",
            "phone": "258842060105"
        },
        {
            "groupList": {
                "group": {
                    "groupName": "Generators",
                    "ID": 3608
                }
            },
            "garageNumber": "Cornelder Port Beira",
            "id": 236025791,
            "mnfID": "20236025791",
            "objectName": "Generator 2",
            "objectType": "FAS",
            "phone": "+258843136064"
        },
        {
            "groupList": {
                "group": {
                    "groupName": "SANY",
                    "ID": 3605
                }
            },
            "garageNumber": "Conelder ",
            "id": 1204002924,
            "mnfID": "359632102883193",
            "objectName": "SANY PLY-03",
            "objectType": "FAS",
            "phone": "258846736786"
        },
        {
            "groupList": {
                "group": {
                    "groupName": "JCB",
                    "ID": 9929
                }
            },
            "garageNumber": "Cornelder Port",
            "id": 265000315,
            "mnfID": "20265000315",
            "objectName": "JCB-01",
            "objectType": "FAS",
            "phone": "258842067481"
        },
        {
            "groupList": {
                "group": {
                    "groupName": "SANY",
                    "ID": 3605
                }
            },
            "garageNumber": "Cornelder Port",
            "id": 265000314,
            "mnfID": "20265000314",
            "objectName": "SANY 45-14",
            "objectType": "FAS",
            "phone": "258842056194"
        },
        {
            "groupList": {
                "group": {
                    "groupName": "OTTAWA",
                    "ID": 3606
                }
            },
            "garageNumber": "CORNELDER",
            "id": 1204004722,
            "mnfID": "359632102710396",
            "objectName": "OTTAWA  25-11",
            "objectType": "FAS",
            "phone": ""
        },
        {
            "groupList": {
                "group": {
                    "groupName": "OTTAWA",
                    "ID": 3606
                }
            },
            "garageNumber": "Cornelder Port",
            "id": 265000312,
            "mnfID": "20265000312",
            "objectName": "OTTAWA 60-140",
            "objectType": "FAS",
            "phone": "258842117739"
        },
        {
            "groupList": {
                "group": {
                    "groupName": "Small Vehicles",
                    "ID": 3772
                }
            },
            "garageNumber": "Cornelder Port",
            "id": 1204000112,
            "mnfID": "352093082112508",
            "objectName": "AFF 019 MP",
            "objectType": "FAS",
            "phone": "258842032538"
        },
        {
            "groupList": {
                "group": {
                    "groupName": "FUEL TANKS",
                    "ID": 9926
                }
            },
            "garageNumber": "CORNELDER",
            "id": 265000319,
            "mnfID": "20265000319",
            "objectName": "TANK 1 (26000 ltrs)",
            "objectType": "FAS",
            "phone": "258842091592"
        },
        {
            "groupList": {
                "group": {
                    "groupName": "HELI",
                    "ID": 3631
                }
            },
            "garageNumber": "Cornelder Port",
            "id": 265000317,
            "mnfID": "20265000317",
            "objectName": "HELI 16-03",
            "objectType": "FAS",
            "phone": "258842048642"
        },
        {
            "groupList": {
                "group": {
                    "groupName": "HELI",
                    "ID": 3631
                }
            },
            "garageNumber": "Cornelder Port",
            "id": 265000316,
            "mnfID": "20265000316",
            "objectName": "HELI 16-06",
            "objectType": "FAS",
            "phone": "258842045935"
        },
        {
            "groupList": {
                "group": {
                    "groupName": "SANY",
                    "ID": 3605
                }
            },
            "garageNumber": "Cornelder Port",
            "id": 265000307,
            "mnfID": "20265000307",
            "objectName": "SANY 45-21",
            "objectType": "FAS",
            "phone": "258842044904"
        },
        {
            "groupList": {
                "group": {
                    "groupName": "Bombeiros",
                    "ID": 3619
                }
            },
            "garageNumber": "Cornelder Port",
            "id": 1204000379,
            "mnfID": "352093081455155",
            "objectName": "MBP-53-43",
            "objectType": "FAS",
            "phone": "258842279674"
        },
        {
            "groupList": {
                "group": {
                    "groupName": "HELI",
                    "ID": 3631
                }
            },
            "garageNumber": "Cornelder Port",
            "id": 236900775,
            "mnfID": "20236900775",
            "objectName": "HELI 30-05",
            "objectType": "FAS",
            "phone": "258842055017"
        },
        {
            "groupList": {
                "group": {
                    "groupName": "SV TRUCKS",
                    "ID": 9928
                }
            },
            "garageNumber": "Cornelder Port",
            "id": 265000306,
            "mnfID": "20265000306",
            "objectName": "SVETRUCK 30-06",
            "objectType": "FAS",
            "phone": "258842050470"
        },
        {
            "groupList": {
                "group": {
                    "groupName": "SANY",
                    "ID": 3605
                }
            },
            "garageNumber": "Cornelder Port",
            "id": 236900772,
            "mnfID": "20236900772",
            "objectName": "SANY 45-28",
            "objectType": "FAS",
            "phone": "258842099279"
        },
        {
            "groupList": {
                "group": {
                    "groupName": "SANY",
                    "ID": 3605
                }
            },
            "garageNumber": "Cornelder Port",
            "id": 265000305,
            "mnfID": "20265000305",
            "objectName": "SANY 45-31",
            "objectType": "FAS",
            "phone": "258842103671"
        },
        {
            "groupList": {
                "group": {
                    "groupName": "OTTAWA",
                    "ID": 3606
                }
            },
            "garageNumber": "Cornelder Port",
            "id": 236900773,
            "mnfID": "20236900773",
            "objectName": "OTTAWA 25-15",
            "objectType": "FAS",
            "phone": "258842099826"
        },
        {
            "groupList": {
                "group": {
                    "groupName": "OTTAWA",
                    "ID": 3606
                }
            },
            "garageNumber": "Cornelder Port",
            "id": 236900770,
            "mnfID": "20236900770",
            "objectName": "OTTAWA 25-14",
            "objectType": "FAS",
            "phone": "258842100463"
        },
        {
            "groupList": {
                "group": {
                    "groupName": "OTTAWA",
                    "ID": 3606
                }
            },
            "garageNumber": "Cornelder Port",
            "id": 265000311,
            "mnfID": "20265000311",
            "objectName": "OTTAWA 25-16",
            "objectType": "FAS",
            "phone": "258842079900"
        },
        {
            "groupList": {
                "group": {
                    "groupName": "Bombeiros",
                    "ID": 3619
                }
            },
            "garageNumber": "",
            "id": 1095996399,
            "mnfID": "862057043890976",
            "objectName": "AAG 880 SF",
            "objectType": "FAS",
            "phone": "258844187017"
        },
        {
            "groupList": {
                "group": {
                    "groupName": "OTTAWA",
                    "ID": 3606
                }
            },
            "garageNumber": "Cornelder Port ",
            "id": 236900771,
            "mnfID": "20236900771",
            "objectName": "OTTAWA 25-13",
            "objectType": "FAS",
            "phone": "258842102513"
        },
        {
            "groupList": {
                "group": {
                    "groupName": "OTTAWA",
                    "ID": 3606
                }
            },
            "garageNumber": "Cornelder Port",
            "id": 265000310,
            "mnfID": "20265000310",
            "objectName": "OTTAWA 60-130",
            "objectType": "FAS",
            "phone": "258842117611"
        },
        {
            "groupList": {
                "group": {
                    "groupName": "HELI",
                    "ID": 3631
                }
            },
            "garageNumber": "Cornelder Port",
            "id": 1095996398,
            "mnfID": "862057043891024",
            "objectName": "HELI 16-05",
            "objectType": "FAS",
            "phone": "258844149761"
        },
        {
            "groupList": {
                "group": {
                    "groupName": "SANY",
                    "ID": 3605
                }
            },
            "garageNumber": "Cornelder port",
            "id": 236900768,
            "mnfID": "20236900768",
            "objectName": "SANY 45-25",
            "objectType": "FAS",
            "phone": "258842095149"
        },
        {
            "groupList": {
                "group": {
                    "groupName": "OTTAWA",
                    "ID": 3606
                }
            },
            "garageNumber": "Cornelder Port",
            "id": 1095996397,
            "mnfID": "862057043795282",
            "objectName": "OTTAWA 25-12",
            "objectType": "FAS",
            "phone": "258844180085"
        },
        {
            "groupList": {
                "group": {
                    "groupName": "FUEL TANKS",
                    "ID": 9926
                }
            },
            "garageNumber": "CORNELDER",
            "id": 265000309,
            "mnfID": "20265000309",
            "objectName": "TANK 2(21000 ltrs)",
            "objectType": "FAS",
            "phone": "258842103517"
        },
        {
            "groupList": {
                "group": {
                    "groupName": "SANY",
                    "ID": 3605
                }
            },
            "garageNumber": "Cornelder Port",
            "id": 265000308,
            "mnfID": "20265000308",
            "objectName": "SANY 45-16",
            "objectType": "FAS",
            "phone": "258842067533"
        },
        {
            "groupList": {
                "group": {
                    "groupName": "KALMAR",
                    "ID": 9922
                }
            },
            "garageNumber": "Cornelder Port",
            "id": 1095996306,
            "mnfID": "865209039426763",
            "objectName": "KALMAR 30-03",
            "objectType": "FAS",
            "phone": "258842037582"
        },
        {
            "groupList": {
                "group": {
                    "groupName": "SANY",
                    "ID": 3605
                }
            },
            "garageNumber": "Cornelder",
            "id": 1204004357,
            "mnfID": "359633101792948",
            "objectName": "SANY 45-36",
            "objectType": "FAS",
            "phone": "258843163174"
        },
        {
            "groupList": {
                "group": {
                    "groupName": "HELI",
                    "ID": 3631
                }
            },
            "garageNumber": "Cornelder Port",
            "id": 1204000267,
            "mnfID": "352093081477464",
            "objectName": "HELI 16-04",
            "objectType": "FAS",
            "phone": "258842037582"
        },
        {
            "groupList": {
                "group": {
                    "groupName": "OTTAWA",
                    "ID": 3606
                }
            },
            "garageNumber": "Porto da Beira",
            "id": 216000278,
            "mnfID": "20216000278",
            "objectName": "OTTAWA 60-03",
            "objectType": "FAS",
            "phone": "+258845664837"
        },
        {
            "groupList": {
                "group": {
                    "groupName": "OTTAWA",
                    "ID": 3606
                }
            },
            "garageNumber": "Porto da Beira",
            "id": 216000277,
            "mnfID": "20216000277",
            "objectName": "OTTAWA 25-20",
            "objectType": "FAS",
            "phone": "+258843146061"
        },
        {
            "groupList": {
                "group": {
                    "groupName": "SANY",
                    "ID": 3605
                }
            },
            "garageNumber": "Cornelder Port",
            "id": 265010176,
            "mnfID": "20265010176",
            "objectName": "SANY 46-01",
            "objectType": "FAS",
            "phone": "258848930434"
        },
        {
            "groupList": {
                "group": {
                    "groupName": "OTTAWA",
                    "ID": 3606
                }
            },
            "garageNumber": "Cornelder",
            "id": 216000275,
            "mnfID": "20216000275",
            "objectName": "OTTAWA 60-06",
            "objectType": "FAS",
            "phone": "+258848994476"
        },
        {
            "groupList": {
                "group": {
                    "groupName": "CARO ELETRICO",
                    "ID": 9920
                }
            },
            "garageNumber": "Cornelder port",
            "id": 369005362,
            "mnfID": "20369005362",
            "objectName": "Carro Eletrico 5",
            "objectType": "FAS",
            "phone": "+258843163233"
        },
        {
            "groupList": {
                "group": {
                    "groupName": "OTTAWA",
                    "ID": 3606
                }
            },
            "garageNumber": "Cornelder Port",
            "id": 216000272,
            "mnfID": "20216000272",
            "objectName": "OTTAWA 25-25",
            "objectType": "FAS",
            "phone": "+258845404511"
        },
        {
            "groupList": {
                "group": {
                    "groupName": "Generators",
                    "ID": 3608
                }
            },
            "garageNumber": "Cornelder Port Beira",
            "id": 236025793,
            "mnfID": "20236025793",
            "objectName": "Generator 1",
            "objectType": "FAS",
            "phone": "+258843146065"
        },
        {
            "groupList": {
                "group": {
                    "groupName": "OTTAWA",
                    "ID": 3606
                }
            },
            "garageNumber": "Cornelder Port",
            "id": 216000270,
            "mnfID": "20216000270",
            "objectName": "OTTAWA 60-01",
            "objectType": "FAS",
            "phone": "+258844490204"
        },
        {
            "groupList": {
                "group": {
                    "groupName": "Generators",
                    "ID": 3608
                }
            },
            "garageNumber": "Cornelder Port Beira",
            "id": 236025792,
            "mnfID": "20236025792",
            "objectName": "Generator 4",
            "objectType": "FAS",
            "phone": "+258843146062"
        },
        {
            "groupList": {
                "group": {
                    "groupName": "FORK LIFT",
                    "ID": 9921
                }
            },
            "garageNumber": "",
            "id": 369005359,
            "mnfID": "20369005359",
            "objectName": "FORK LIFT (JJCC) 01",
            "objectType": "FAS",
            "phone": "+258840252994"
        },
        {
            "groupList": {
                "group": {
                    "groupName": "VOLVO",
                    "ID": 9986
                }
            },
            "garageNumber": "Cornelder Port",
            "id": 216000269,
            "mnfID": "20216000269",
            "objectName": "VOLVO FL6- MBP3443 Big Tanker",
            "objectType": "FAS",
            "phone": "+258844493568"
        },
        {
            "groupList": {
                "group": {
                    "groupName": "OTTAWA",
                    "ID": 3606
                }
            },
            "garageNumber": "Porto da Beira",
            "id": 216000268,
            "mnfID": "20216000268",
            "objectName": "OTTAWA 60-07",
            "objectType": "FAS",
            "phone": "+258843146066"
        },
        {
            "groupList": {
                "group": {
                    "groupName": "Generators",
                    "ID": 3608
                }
            },
            "garageNumber": "Cornelder Port Beira",
            "id": 236025794,
            "mnfID": "20236025794",
            "objectName": "Generator 3",
            "objectType": "FAS",
            "phone": "+258843146059"
        },
        {
            "groupList": {
                "group": {
                    "groupName": "Generators",
                    "ID": 3608
                }
            },
            "garageNumber": "Cornelder Port-Beira",
            "id": 1095996295,
            "mnfID": "865209039498499",
            "objectName": "Generator 5",
            "objectType": "FAS",
            "phone": "258842035339"
        },
        {
            "groupList": {
                "group": {
                    "groupName": "LAYLAND",
                    "ID": 9923
                }
            },
            "garageNumber": "Cornelder Port",
            "id": 1095996294,
            "mnfID": "865209039432027",
            "objectName": "LEYLAND",
            "objectType": "FAS",
            "phone": "258842004921"
        },
        {
            "groupList": {
                "group": {
                    "groupName": "HELI",
                    "ID": 3631
                }
            },
            "garageNumber": "Cornelder Port",
            "id": 1095996292,
            "mnfID": "865209039494480",
            "objectName": "HELI 16-08",
            "objectType": "FAS",
            "phone": "258848322843"
        },
        {
            "groupList": {
                "group": {
                    "groupName": "Generators",
                    "ID": 3608
                }
            },
            "garageNumber": "Cornelder Port",
            "id": 1095996296,
            "mnfID": "865209039494563",
            "objectName": "Generator 6",
            "objectType": "FAS",
            "phone": "258842029845"
        },
        {
            "groupList": {
                "group": {
                    "groupName": "SINO TRUCK",
                    "ID": 9924
                }
            },
            "garageNumber": "CORNELDER",
            "id": 1204004380,
            "mnfID": "359632102806160",
            "objectName": "AAP-666-SF",
            "objectType": "FAS",
            "phone": "258843912985"
        },
        {
            "groupList": {
                "group": {
                    "groupName": "OTTAWA",
                    "ID": 3606
                }
            },
            "garageNumber": "Cornelder port",
            "id": 1204003618,
            "mnfID": "359632102710495",
            "objectName": "OTTAWA 25-19",
            "objectType": "FAS",
            "phone": "258847852609"
        },
        {
            "groupList": {
                "group": {
                    "groupName": "Small Vehicles",
                    "ID": 3772
                }
            },
            "garageNumber": "Cornelder Port",
            "id": 1204000039,
            "mnfID": "352093082125781",
            "objectName": "AEW 673 MP",
            "objectType": "FAS",
            "phone": "258842035839"
        },
        {
            "groupList": {
                "group": {
                    "groupName": "Small Vehicles",
                    "ID": 3772
                }
            },
            "garageNumber": "",
            "id": 1204000038,
            "mnfID": "352093080495665",
            "objectName": "MMJ-58-09",
            "objectType": "FAS",
            "phone": "258842025272"
        },
        {
            "groupList": {
                "group": {
                    "groupName": "Small Vehicles",
                    "ID": 3772
                }
            },
            "garageNumber": "Cornelder Port",
            "id": 1204000036,
            "mnfID": "352093080839011",
            "objectName": "ADD 353 MP",
            "objectType": "FAS",
            "phone": "258842023345"
        },
        {
            "groupList": {
                "group": {
                    "groupName": "TRACTOR",
                    "ID": 9930
                }
            },
            "garageNumber": "Cornelder Port",
            "id": 1204000299,
            "mnfID": "352093082229401",
            "objectName": "Tractor 03",
            "objectType": "FAS",
            "phone": "258842290426"
        },
        {
            "groupList": {
                "group": {
                    "groupName": "Small Vehicles",
                    "ID": 3772
                }
            },
            "garageNumber": "Cornelder Port",
            "id": 1204000042,
            "mnfID": "352093082238196",
            "objectName": "AEW 455 MP",
            "objectType": "FAS",
            "phone": "258842003568"
        },
        {
            "groupList": {
                "group": {
                    "groupName": "Small Vehicles",
                    "ID": 3772
                }
            },
            "garageNumber": "",
            "id": 1204000041,
            "mnfID": "352093081372665",
            "objectName": "AEI 862 MP",
            "objectType": "FAS",
            "phone": "258842019096"
        },
        {
            "groupList": {
                "group": {
                    "groupName": "Small Vehicles",
                    "ID": 3772
                }
            },
            "garageNumber": "Cornelder Port",
            "id": 1204000040,
            "mnfID": "352093081316779",
            "objectName": "ADH 496 MP",
            "objectType": "FAS",
            "phone": "258842009923"
        },
        {
            "groupList": {
                "group": {
                    "groupName": "JCB",
                    "ID": 9929
                }
            },
            "garageNumber": "CONELDER",
            "id": 1204001839,
            "mnfID": "359632102867667",
            "objectName": "JCB-03",
            "objectType": "FAS",
            "phone": "258843163218"
        },
        {
            "groupList": {
                "group": {
                    "groupName": "Small Vehicles",
                    "ID": 3772
                }
            },
            "garageNumber": "",
            "id": 1204000045,
            "mnfID": "352093082318584",
            "objectName": "MMM -67-29",
            "objectType": "FAS",
            "phone": "258842035923"
        },
        {
            "groupList": {
                "group": {
                    "groupName": "Small Vehicles",
                    "ID": 3772
                }
            },
            "garageNumber": "",
            "id": 1204000044,
            "mnfID": "352093080493652",
            "objectName": "MMQ 92 - 00",
            "objectType": "FAS",
            "phone": "258842020255"
        },
        {
            "groupList": {
                "group": {
                    "groupName": "SANY",
                    "ID": 3605
                }
            },
            "garageNumber": "CORNELDER",
            "id": 1204005170,
            "mnfID": "359632107294073",
            "objectName": "SANY 09-03",
            "objectType": "FAS",
            "phone": "258843328314"
        },
        {
            "groupList": {
                "group": {
                    "groupName": "SANY",
                    "ID": 3605
                }
            },
            "garageNumber": "CORNELDER",
            "id": 1204005169,
            "mnfID": "359633100947683",
            "objectName": "SANY 09-04",
            "objectType": "FAS",
            "phone": "258843328313"
        },
        {
            "groupList": {
                "group": {
                    "groupName": "TRACTOR",
                    "ID": 9930
                }
            },
            "garageNumber": "Cornelder Port",
            "id": 1204000305,
            "mnfID": "352093081471665",
            "objectName": "Tractor 02",
            "objectType": "FAS",
            "phone": "258842276950"
        },
        {
            "groupList": {
                "group": {
                    "groupName": "SANY TRUCKS",
                    "ID": 9925
                }
            },
            "garageNumber": "CORNELDER",
            "id": 1204005936,
            "mnfID": "359633101926595",
            "objectName": "AAQ 806 SF",
            "objectType": "FAS",
            "phone": "258842050481"
        },
        {
            "groupList": {
                "group": {
                    "groupName": "SANY TRUCKS",
                    "ID": 9925
                }
            },
            "garageNumber": "CORNELDER",
            "id": 1204005943,
            "mnfID": "359633102042335",
            "objectName": "AAQ 803 SF",
            "objectType": "FAS",
            "phone": ""
        },
        {
            "groupList": {
                "group": {
                    "groupName": "TRACTOR",
                    "ID": 9930
                }
            },
            "garageNumber": "Cornelder Port",
            "id": 1204000311,
            "mnfID": "352093081458076",
            "objectName": "Tractor 01",
            "objectType": "FAS",
            "phone": "258844120117"
        },
        {
            "groupList": {
                "group": {
                    "groupName": "SANY TRUCKS",
                    "ID": 9925
                }
            },
            "garageNumber": "CORNELDER",
            "id": 1204005942,
            "mnfID": "359633100943161",
            "objectName": "AAQ 804 SF",
            "objectType": "FAS",
            "phone": ""
        },
        {
            "groupList": {
                "group": {
                    "groupName": "VOLVO",
                    "ID": 9986
                }
            },
            "garageNumber": "Cornelder Port",
            "id": 1095996324,
            "mnfID": "865209039434601",
            "objectName": "VOLVO FL6 main tank",
            "objectType": "FAS",
            "phone": "258842257044"
        },
        {
            "groupList": {
                "group": {
                    "groupName": "SANY",
                    "ID": 3605
                }
            },
            "garageNumber": "Cornelder",
            "id": 1204003130,
            "mnfID": "358480089979118",
            "objectName": "SANY 45-37",
            "objectType": "FAS",
            "phone": "258845540764"
        },
        {
            "groupList": {
                "group": {
                    "groupName": "JCB",
                    "ID": 9929
                }
            },
            "garageNumber": "CONELDER",
            "id": 1204002361,
            "mnfID": "359632102800387",
            "objectName": "JCB-02",
            "objectType": "FAS",
            "phone": "258843163137"
        },
        {
            "groupList": {
                "group": {
                    "groupName": "OTTAWA",
                    "ID": 3606
                }
            },
            "garageNumber": "Cornelder Port",
            "id": 1204000312,
            "mnfID": "352093081194291",
            "objectName": "OTTAWA 25-23",
            "objectType": "FAS",
            "phone": "258842034924"
        },
        {
            "groupList": {
                "group": {
                    "groupName": "SANY TRUCKS",
                    "ID": 9925
                }
            },
            "garageNumber": "CORNELDER",
            "id": 1204005944,
            "mnfID": "359633101816994",
            "objectName": "AAQ 805 SF",
            "objectType": "FAS",
            "phone": ""
        }
    ]
    return data
}



 export {
    groupDetials
}