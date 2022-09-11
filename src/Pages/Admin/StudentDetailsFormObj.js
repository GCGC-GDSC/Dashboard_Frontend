const studentDetailsRef = [
  // "under_campus_name",
  // "under_institute_name",
  // "is_ug",
  "total_students",
  "total_final_years",
  "total_higher_study_and_pay_crt",
  "total_not_intrested_in_placments",
  "total_backlogs",
  "total_offers",
  "total_multiple_offers",
  "highest_salary",
  "average_salary",
  "lowest_salary",
];

export const DBDisabledKeys = [
  "self_percent_opted_hs_final",
  "self_percent_back_final",
  "self_percent_eligible_final",
  "self_percent_yet_to_place_eligible",
  "total_students_eligible",
  "total_backlogs",
  "total_placed",
  "total_yet_to_place",
  "self_percentage_of_students_placed_out_of_students_requiring_placements",
];
export const DBUpdateKeys = [
  "total_students",
  "total_final_years",
  "total_higher_study_and_pay_crt",
  "total_opted_for_higher_studies_only",
  "total_not_intrested_in_placments",
  "total_backlogs_opted_for_placements",
  "total_backlogs_opted_for_higherstudies",
  "total_backlogs_opted_for_other_career_options",
  "total_backlogs", // 39 + 40 + 41
  "total_students_eligible", // 35-37-36-38-39
  "total_offers",
  "total_multiple_offers",
  "total_placed", // 44 - 45
  "total_yet_to_place", // 43 - 46
  "highest_salary",
  "lowest_salary",
  "average_salary",
  //   // @ -- ask
  "self_percent_opted_hs_final",
  "self_percent_back_final",
  "self_percent_eligible_final",
  "self_percentage_of_students_placed_out_of_students_requiring_placements",
  "self_percent_yet_to_place_eligible",
];
export const DBPreviewKeys = [
  //31
  // "under_institute_name",
  // "under_campus_name",
  "total_students",
  "total_final_years",
  "total_higher_study_and_pay_crt",
  "total_opted_for_higher_studies_only",
  "total_not_intrested_in_placments",
  "total_backlogs_opted_for_placements",
  "total_backlogs_opted_for_higherstudies",
  "total_backlogs_opted_for_other_career_options",
  "total_backlogs", // 39 + 40 + 41
  "total_students_eligible", // 35-37-36-38-39
  "total_offers",
  "total_multiple_offers",
  "total_placed", // 44 - 45
  "total_yet_to_place", // 43 - 46
  "highest_salary",
  "lowest_salary",
  "average_salary",

  "Percentage_of_students_opted_HS_to_the_total_number",
  "Percentage_of_students_having_backlogs_to_the_total_number_of_students",
  "Percentage_of_students_eligible_for_and_requiring_placement",
  "Percentage_of_students_placed_out_of_eligible_students",
  "Percentage_of_students_yet_to_be_placed_out_of_eligible_students",
];
//
export const parsedStudentDetailsRef = {
  under_campus_name: "Campus Name",
  under_institute_name: "Select the Institute",
  is_ug: "Is it Undergraduate",
  total_students: "Number of students",
  total_final_years: "Number of Final Year Students",
  total_higher_study_and_pay_crt:
    "Number of students that are choosing higher studies and paid CRT Fee (Defered Placements)",
  total_opted_for_higher_studies_only:
    "No. of students opted for higher studies only",
  total_not_intrested_in_placments:
    "Number of students not intrested in placements(No response)",
  total_backlogs_opted_for_placements:
    " No. of students having Backlogs and opted for Placements",
  total_backlogs_opted_for_higherstudies:
    "No. of students having Backlogs and opted for Higher studies(Including Defered)",
  total_backlogs_opted_for_other_career_options:
    " No. of students having Backlogs and opted out of any Career Fulfillment activties including No response",
  total_backlogs: "Total Number of Students having Backlogs",
  total_students_eligible:
    "No. of students eligible for and requiring placements.",
  total_offers: "Total No. of offers",
  total_multiple_offers: "Number of Multiple Offers",
  total_placed: "Total No. of Unique Offers",
  total_yet_to_place: "No. of students yet to be placed.",
  highest_salary: "Highest Package",
  lowest_salary: "Lowest Package",
  average_salary: "Average Package",

  Percentage_of_students_opted_HS_to_the_total_number:
    "Percentage of students opted for HS (higher studies) to the total number of final years.",
  Percentage_of_students_having_backlogs_to_the_total_number_of_students:
    "Percentage of students having backlogs to the number of students in final years.",
  Percentage_of_students_eligible_for_and_requiring_placement:
    "Precentage of students eligible for and requirung placements to the total number of students in final years.",
  Percentage_of_students_placed_out_of_eligible_students:
    "Percentage of students placed out of eligible students requirung placements",
  Percentage_of_students_yet_to_be_placed_out_of_eligible_students:
    "Percentage of students yet to be placed out of the total number of elgible students.",

  self_percent_opted_hs_final:
    "Percentage of students opted for HS (higher studies) to the total number of final years.",
  self_percent_back_final:
    "Percentage of students having backlogs to the number of students in final years.",
  self_percent_eligible_final:
    "Precentage of students eligible for and requirung placements to the total number of students in final years.",
  self_percentage_of_students_placed_out_of_students_requiring_placements:
    "Percentage of students placed out of students requiring placements",
  self_percent_yet_to_place_eligible:
    "Percentage of students yet to be placed out of eligible students requirung placements",

  vskp: "CGC Visakhapatnam",
  blr: "CGC Bengaluru",
  hyd: "CGC Hyderabad",
  overall: "GCGC Overall",
};
export const instMap = {
  git: "GIT",
  gim: "GIM",
  gis: "GIS",
  gsoa: "GSoA",
  gin: "GIN",
  gip: "GIP",
  gsol: "GSoL",
  gsgs: "GSGS",
  soth: "SoTH",
  hbs: "HBS",
  soph: "SoPH",
  sosh: "SoSH",
  sotb: "SoTB",
  sosp: "SoSP",
  gsbb: "GSBB",
  sosb: "SoSB  ",
};

export default studentDetailsRef;
