const InstituteStudentDataFormat = {
  placement_details: [
    "placed",
    "total_students_eligible",
    "total_offers",
    "total_multiple_offers",
    // "total_not_intrested_in_placments",
    "yet_to_place",
  ],

  salary: ["average", "highest", "lowest"],
  student_details: [
    "total_backlogs",
    "total_final_years",
    "total_higher_study_and_pay_crt",
    "total_students",
  ],
};

export const parsedDataFormat = {
  placement_details: [
    "Placed",
    "Eligible",
    "Offers",
    "Multiple Offers",
    // "Not Intrested",
    "Yet To Place",
  ],

  salary: ["Average", "Highest", "Lowest"],
  student_details: [
    "Backlogs",
    "FinalYears",
    "PayCRT & HigherStudies",
    "TotalStudents",
  ],
};

export default InstituteStudentDataFormat;
