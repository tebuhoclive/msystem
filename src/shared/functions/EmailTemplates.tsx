
import { currencyFormat } from "./Directives";

var today: Date = new Date();
var currentHour: number = today.getHours();
var greeting: string = "";
const link: string = "https//dinapama.unicomms.app";
const username: string = "IJG Money Market System";

if (currentHour < 12) {
  greeting = "Good Morning";
} else if (currentHour < 18) {
  greeting = "Good Afternoon";
} else {
  greeting = "Good Evening";
}


export const MAIL = (
  name: string | null = ""
) => {
  const SUBJECT = `${name} - Scorecard Submission`;
  const BODY = [
    `${greeting},`,
    "",
    `${name} has submitted a draft scorecard for review.`,
    "",
    "Visit Project Management System: https:/dinapama.unicomms.app for more.",
    "",
    "Sincerely,",
    // name,
    "Project Management System",
  ];

  return {
    SUBJECT: SUBJECT,
    BODY: BODY.join("<br/>"),
  };
};


// export const MAIL_TB_DESK_DEALING_SHEET = (
//   name: string | null = "",
//   instrument : string | null = "",
//   dealingDeskSheet: []
// ) => {
//   const SUBJECT = `${name} -  Tender Submission for `;
//   const BODY = [
//     `${greeting} Leon,`,
//     "",
//     `${name} has submitted a tender for submission.`,
//     "",
//     "",
//     "Sincerely,",
//     // name,
//     "IJG Monery Market System",
//   ];

//   return {
//     SUBJECT: SUBJECT,
//     BODY: BODY.join("<br/>"),
//   };
// };


export const MAIL_TB_DESK_DEALING_SHEET = (
  name: string | null = "",
  instrument: string | null = "",
  dealingDeskSheet: any
) => {
  const SUBJECT = `${name} - Tender Submission for ${instrument}`;
  const greeting = "Hello";

  // Table header
  const tableHeader = `
    <table>
      <thead>
        <tr>
          <th>Tender Rate</th>
          <th>Nominal</th>
          <th>Consideration BON</th>
        </tr>
      </thead>
      <tbody>
  `;

 
  

  
};













