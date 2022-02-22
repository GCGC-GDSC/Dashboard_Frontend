const InstituteStudentDataFormat = {
  placement_details: [
    "total_students_eligible",
    "total_offers",
    "total_multiple_offers",
    "placed",
    // "total_not_intrested_in_placments",
    "yet_to_place",
  ],

  salary: ["highest", "lowest","average"],
  student_details: [
    "total_students",
    "total_not_intrested_in_placments",
    "total_backlogs",
    "total_opted_for_higher_studies_only",
    "total_higher_study_and_pay_crt",
    // "total_final_years",
    "total_students_eligible"
  ],
};

export const parsedDataFormat = {
  placement_details: [
    "Eligible",
    "Offers",
    "Multiple Offers",
    "Placed",
    // "Not Intrested", 
    "Yet to be Placed",
  ],

  salary: [ "Highest", "Lowest","Average"],
  student_details: [
    "Total Students",
    "Other Career Options",
    "Backlogs",
    "Yet to Decide",
    "Deferred Placements",
    "Placements",
    // "FinalYears",
  ],
};

export default InstituteStudentDataFormat;
// hs, back, defered placements,