// Generate dynamic session years from current year down to 1970/1971
const currentYear = new Date().getFullYear();
const startYear = 1970;
export const year = [];

for (let y = currentYear; y >= startYear; y--) {
  const sessionLabel = `${String(y).slice(-2)}/${String(y + 1).slice(-2)}`;
  year.push({ value: sessionLabel, label: sessionLabel });
}

export const sessionType = [
  { label: "active", value: "active" },
  { label: "cancelled", value: "cancelled" },
  { label: "leave of absence", value: "leave of absence" }
];

export const levels = [
  { label: "200 L", value: 200 },
  { label: "300 L", value: 300 },
  { label: "400 L", value: 400 },
  { label: "500 L", value: 500 },
  { label: "600 L", value: 600 },
];

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