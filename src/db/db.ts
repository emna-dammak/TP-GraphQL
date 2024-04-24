enum Role {
  ADMIN = "ADMIN",
  USER = "USER",
}
interface CV {
  id: string;
  name: string;
  age: number;
  job: string;
  owner: string;
}

interface Skill {
  id: string;
  designation: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
}
interface CvSkill {
  id_cv: string;
  id_skill: string;
}
const skills: Skill[] = [
  { id: "1", designation: "NestJS" },
  { id: "2", designation: "ReactJS " },
  { id: "3", designation: "GraphQL" },
  { id: "4", designation: "TypeScript" },
];

const users: User[] = [
  {
    id: "1",
    name: "emna",
    email: "emna@gmail.com",
    role: Role.USER,
  },
  {
    id: "2",
    name: "Rabeb ",
    email: "rabeb@test.com",
    role: Role.ADMIN,
  },
  {
    id: "3",
    name: "manef",
    email: "manef@test.com",
    role: Role.USER,
  },
  {
    id: "4",
    name: "khalil",
    email: "khalil@test.com",
    role: Role.USER,
  },
];

const cvs: CV[] = [
  {
    id: "1",
    name: "cv1",
    age: 50,
    job: "job1",
    owner: "1",
  },
  {
    id: "2",
    name: "cv2",
    age: 60,
    job: "job4",
    owner: "2",
  },
  {
    id: "3",
    name: "cv3",
    age: 21,
    job: "job3",
    owner: "3",
  },
  {
    id: "4",
    name: "cv4",
    age: 30,
    job: "job4",
    owner: "4",
  },
];
const cv_skill: CvSkill[] = [
  {
    id_cv: "1",
    id_skill: "1",
  },
  {
    id_cv: "1",
    id_skill: "2",
  },
  {
    id_cv: "2",
    id_skill: "2",
  },
  {
    id_cv: "3",
    id_skill: "3",
  },
  {
    id_cv: "4",
    id_skill: "3",
  },
];

export const db = {
  skills,
  users,
  cvs,
  cv_skill,
};
