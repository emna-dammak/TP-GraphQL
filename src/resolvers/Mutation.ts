import { GraphQLError } from "graphql";

export const Mutation = {
  addCv: (parent: any, args: any, { db }: any, info: any) => {
    const id = db.cvs.length + 1;
    const { name, age, job, skillIds, userId } = args.cvAddInput;
    console.log(args.cvAddInput);
    const skills = db.skills.filter((skill: any) =>
      skillIds.includes(skill.id)
    );
    console.log(skills);
    const user = db.users.find(
      (user: any) => args.cvAddInput.userId == user.id
    );
    if (!user) {
      throw new GraphQLError(`user d'id ${userId} n'existe pas`);
    }
    const cv = {
      id,
      name,
      age,
      job,
      skills,
      user,
    };
    db.cvs.push(cv);
    console.log(cv);
    return cv;
  },

  updateCv: (
    parent: any,
    { id, cvUpdateInput }: any,
    { db }: any,
    infos: any
  ) => {
    console.log(id, cvUpdateInput);
    if (!existInArray(db.cvs, "id", id)) {
      throw new GraphQLError(`cet id ${id} ne correspond à aucun cv`);
    }
    if (
      cvUpdateInput.userId &&
      !existInArray(db.users, "id", cvUpdateInput.userId)
    ) {
      throw new GraphQLError(
        `cet id ${cvUpdateInput.userId} ne correspond à aucun user`
      );
    }
    console.log(cvUpdateInput.skillIds);
    if (cvUpdateInput.skillIds) {
      for (let i = 0; i < cvUpdateInput.skillIds.length; i++) {
        if (!existInArray(db.skills, "id", cvUpdateInput.skillIds[i])) {
          throw new GraphQLError(
            `This ID ${cvUpdateInput.skillIds[i]} does not correspond to any skill.`
          );
        }
      }
      for (let i = 0; i < cvUpdateInput.skillIds.length; i++) {
        if (
          !db.cv_skill.some((e: any) => compareCvSkills(e, cvUpdateInput, i))
        ) {
          const newCvSkill = {
            id_cv: id,
            id_skill: cvUpdateInput.skillIds[i],
          };
          db.cv_skill.push(newCvSkill);
          console.log(newCvSkill);
        }
      }
    }

    const cv = db.cvs.find((cv: any) => cv.id === id);
    for (let key in cvUpdateInput) {
      cv[key] = cvUpdateInput[key];
    }
    cv.user = db.users.find((user: any) => cvUpdateInput.owner == user.id);

    return cv;
  },
  deleteCv: (parent: any, { id }: any, { db }: any, info: any) => {
    const indexCv = db.cvs.findIndex((cv: any) => cv.id === id);
    if (indexCv === -1) {
      throw new GraphQLError("cv innexistant !");
    } else {
      const [cv] = db.cvs.splice(indexCv, 1);
      return cv;
    }
  },
};
function existInArray(array: any[], attribut: string, value: string): boolean {
  return array.some((element) => element[attribut] == value);
}

function compareCvSkills(skill1: any, skill2: any, i: any): boolean {
  return skill1.id_cv === skill2.id && skill1.id_skill === skill2.skillIds[i];
}
