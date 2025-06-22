export interface Class {
  id: number;
  name: string;
  code: string;
  students: number;
  assignments: number;
  pendingGrading: number;
  semester: string;
}

export const classes: Class[] = [
  {
    id: 1,
    name: "Reading and Composition",
    code: "ENGR1B",
    students: 5,
    assignments: 5,
    pendingGrading: 6,
    semester: "Fall 2025",
  },
  {
    id: 2,
    name: "Linear Algebra",
    code: "MATH54",
    students: 5,
    assignments: 5,
    pendingGrading: 3,
    semester: "Fall 2025",
  },
];

// Helper function to get class by ID
export const getClassById = (id: number): Class | undefined => {
  return classes.find(cls => cls.id === id);
}; 