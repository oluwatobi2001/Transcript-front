export const year = [
  
    {value: "01/02", label: '01/02'}, 
    {value: "02/03", label: '02/03'}, 
    {value: "03/04", label: "03/04",}, 
    {value: "04/05", label: "04/05"}, 
    {value: "05/06", label:"05/06",}, 
    {value: "06/07", label: "06/07"}, 
    {value: "07/08", label: "07/08",}, 
    {value: "08/09", label: "08/09",}, 
    {value: "09/10", label: "09/10",}, 
    {value: "10/11", label: "10/11",}, 
    {value: "11/12", label: "11/12",}, 
    {value: "12/13", label: "12/13",}, 
    {value: "13/14", label: "13/14",}, 
    {value: "14/15", label: "14/15",}, 
    {value: "15/16", label: "15/16",}, 
    {value: "16/17", label: "16/17",}, 
    {value: "17/18", label: "17/18",}, 
    {value: "18/19", label: "18/19",}, 
    {value: "19/20", label: "19/20",}, 
    {value: "20/21", label: "20/21",},
    {value: "21/22", label: "21/22",},
    {value: "22/23", label: "22/23",},
    {value: "23/24", label: "23/24",},
    {value: "24/25", label: "24/25",},
    {value: "25/26", label: "25/26",},
    {value: "26/27", label: "26/27",},
    {value: "27/28", label: "27/28",},
    {value: "28/29", label: "28/29",},



]

 export const sessionType = [
    {label: "active", value: "active"},
    {label: "cancelled ", value: "cancelled"},
    {label: "leave of absence" , value: "leave of absence"}
]
export const levels= [
    {label:  "200 L", value: 200},
    {label:  "300 L", value: 300},
    {label:  "400 L", value: 400},
    {label:  "500 L", value: 500},
    {label:  "600 L", value: 600},
   
]



const courseTitles = {
    twohundredlevel: ["Anatomy", "Physiology", "Biochemistry"],
    threehundredlevel: ["Anatomy", "Physiology", "Biochemistry"],
    fourhundredlevel: ["Pathology", "Pharmacology"],
    fivehundredlevel: [
      "Obstetrics and Gynaecology",
      "Paediatrics",
      "Dermatology",
      "Mental health",
    ],
    sixhundredlevel: ["Medicine", "Surgery", "Community Health"],
  };
  

 export const data = {
    "_id": {
      "$oid": "67c89318154db8dc9b9628ec"
    },
    "name": "CosmosDB",
    "email": "eportal2016@gmail.com",
    "matricNo": "CLI/2016/063",
    "academicSessionAdmitted": "14/15",
    "details": [
      {
        "level": 200,
        "session": "active",
        "studentStatus": "Promoted",
        "courses": [
          {
            "courseTitle": "Anatomy",
            "courseScore": "67",
            "courseGrade": "Pass",
            "resitScore": "",
            "resitGrade": "",
            "_id": {
              "$oid": "67c89318154db8dc9b9628ee"
            }
          },
          {
            "courseTitle": "Physiology",
            "courseScore": "56",
            "courseGrade": "Pass",
            "resitScore": "",
            "resitGrade": "",
            "_id": {
              "$oid": "67c89318154db8dc9b9628ef"
            }
          },
          {
            "courseTitle": "Biochemistry",
            "courseScore": "56",
            "courseGrade": "Pass",
            "resitScore": "",
            "resitGrade": "",
            "_id": {
              "$oid": "67c89318154db8dc9b9628f0"
            }
          }
        ],
        "_id": {
          "$oid": "67c89318154db8dc9b9628ed"
        },
        "createdAt": {
          "$date": "2025-03-05T18:08:24.471Z"
        },
        "updatedAt": {
          "$date": "2025-03-05T18:08:24.471Z"
        }
      }
    ],
    "__v": 0
  }