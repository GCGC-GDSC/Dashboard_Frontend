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
export const DBUpdateKeys = [
    "total_students",
    "total_final_years",
    "total_higher_study_and_pay_crt",
    "total_opted_for_higher_studies_only",
    "total_not_intrested_in_placments",
    "total_backlogs_opted_for_placements",
    "total_backlogs_opted_for_higherstudies",
    "total_backlogs_opted_for_other_career_options",
    "total_offers",
    "total_multiple_offers",
    "highest_salary",
    "average_salary", 
    "lowest_salary"
  ]
export const DBPreviewKeys = [ //31
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
  "total_backlogs",  // 39 + 40 + 41
  "total_students_eligible",// 35-37-36-38-39
  "total_offers",
  "total_multiple_offers",
  "total_placed", // 44 - 45
  "total_yet_to_place", // 43 - 46
  "highest_salary",
  "average_salary",
  "lowest_salary",
  // "is_ug" ,
]
// 
export const parsedStudentDetailsRef = {
  "under_campus_name":"Campus Name",
  "under_institute_name":"Select the Institute",
  "is_ug":"Is it Undergraduate",
  "total_students":"Number of students",
  "total_final_years": "Number of Final Year Students",
  "total_higher_study_and_pay_crt": "Number of students that are choosing higher studies and paid CRT Fee (Defered Placements)",
  "total_opted_for_higher_studies_only":"No. of students opted for higher studies who paid CRT fee/opted for Placements (Deferred)", 
  "total_not_intrested_in_placments": "Number of students not intrested in placements(No response)",
  "total_backlogs_opted_for_placements":" No. of students having Backlogs of opted for Placements",
  "total_backlogs_opted_for_higherstudies":"No. of students having Backlogs of opted for Higher studies",
  "total_backlogs_opted_for_other_career_options":" No. of students having Backlogs of opted out of any Career Fulfillment activties including No response",
  "total_backlogs":"Backlogs count",
  "total_students_eligible":"No. of students eligible for and requiring placements.", 
  "total_offers": "Offers Count",
  "total_multiple_offers": "Number of Multiple Offers",
  "total_placed":"No. of students placed", 
  "total_yet_to_place":"No. of students yet to be placed.", 
  "highest_salary":"What is the Highest Salary",
  "average_salary" :"What is the average salary",
  "lowest_salary":"What is the Lowest Salary",
  "vskp":"CGC Visakhapatnam",
  "blr":"CGC Bengaluru",
  "hyd":"CGC Hyderabad",
  "overall":"GCGC Overall"
}
export const instMap = {
  'git': 'GIT',
  'gim': 'GIM',
  'gis': 'GIS',
  'gsoa': 'GSoA',
  'gin': 'GIN',
  'gip': 'GIP',
  'gsol': 'GSoL',
  'gsgs': 'GSGS',
  'soth': 'SoTH',
  'hbs': 'HBS',
  'soph': 'SoPH',
  'sosh': 'SoSH',
  'sotb': 'SoTB',
  'sosp': 'SoSP',
  'gsbb': 'GSBB',
  'sosb':"SoSB  "
}

export default studentDetailsRef;
