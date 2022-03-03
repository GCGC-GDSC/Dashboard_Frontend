const InstituteStudentDataFormatCampusWise = {
  placement_details: [
    "total_students_eligible",
    "total_offers",
    "total_multiple_offers",
    "placed",
    // "total_not_intrested_in_placments",
    "yet_to_place",
  ],
  salary: ["highest", "lowest", "average"],
  student_details: [
    "total_students",
    "total_opted_for_higher_studies_only",
    "total_backlogs",
    "total_not_intrested_in_placments",
    "total_higher_study_and_pay_crt",
    "total_students_eligible",
  ],
};

export const parsedInstituteStudentDataFormatCampusWise = {
  placement_details: [
    "Eligible For Placements",
    "Total Offers",
    "Multiple Offers",
    "Placed",
    // "Not Intrested",
    "Yet To Be Place",
  ],

  salary: ["Highest", "Lowest", "Average"],
  student_details: [
    "Total Students",
    "Higher Studies",
    "Backlogs",
    "Yet To Decide",
    "Deferred Placements",
    "Eligible For Placements",
  ],
};

export default InstituteStudentDataFormatCampusWise;
