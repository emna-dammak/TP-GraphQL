import { GraphQLError } from "graphql";

export const Mutation = {
  addCv: (parent: any, args: any, { db, pubSub }: any, info: any) => {
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
    pubSub.publish("cv", { Mutation: "ADD", cv });
    console.log(cv);
    return cv;
  },

  updateCv: (
    parent: any,
    { id, cvUpdateInput }: any,
    { db, pubSub }: any,
    infos: any
  ) => {
    console.log(id, cvUpdateInput);
    if (!existInArray(db.cvs, "id", id)) {
      throw new GraphQLError(`This ID ${id} does not correspond to any cv.`);
    }

    if (
      cvUpdateInput.userId &&
      !existInArray(db.users, "id", cvUpdateInput.userId)
    ) {
      throw new GraphQLError(
        `  This ID ${cvUpdateInput.userId} does not correspond to any user.`
      );
    }

    if (cvUpdateInput.skillIds) {
      for (let i = 0; i < cvUpdateInput.skillIds.length; i++) {
        if (!existInArray(db.skills, "id", cvUpdateInput.skillIds[i])) {
          throw new GraphQLError(
            `This ID ${cvUpdateInput.skillIds[i]} does not correspond to any skill.`
          );
        }
      }

      const cvSkillsToUpdate = cvUpdateInput.skillIds.map(
        (skillId: string) => ({
          id_cv: id,
          id_skill: skillId,
        })
      );

      db.cv_skill = db.cv_skill.filter(
        (cvSkill: any) =>
          cvSkill.id_cv !== id ||
          cvUpdateInput.skillIds.includes(cvSkill.id_skill)
      );

      cvSkillsToUpdate.forEach((cvSkill: any) => {
        if (
          !db.cv_skill.some((existingCvSkill: any) =>
            compareCvSkills(existingCvSkill, cvSkill)
          )
        ) {
          db.cv_skill.push(cvSkill);
        }
      });
    }

    let cv = db.cvs.find((cv: any) => cv.id === id);
    for (let key in cvUpdateInput) {
      cv[key] = cvUpdateInput[key];
    }
    const user = db.users.find((user: any) => cvUpdateInput.owner == user.id);
    if (user) {
      cv = {
        user,
        ...cv,
      };
    }
    pubSub.publish("cv", { Mutation: "UPDATE", cv });
    return cv;
  },
  deleteCv: (parent: any, { id }: any, { db, pubSub }: any, info: any) => {
    const indexCv = db.cvs.findIndex((cv: any) => cv.id === id);
    if (indexCv === -1) {
      throw new GraphQLError("cv innexistant !");
    } else {
      const [cv] = db.cvs.splice(indexCv, 1);
      pubSub.publish("cv", { Mutation: "DELETE", cv });
      return cv;
    }
  },
};
function existInArray(array: any[], attribut: string, value: string): boolean {
  return array.some((element) => element[attribut] == value);
}

function compareCvSkills(skill1: any, skill2: any): boolean {
  return skill1.id_cv === skill2.id_cv && skill1.id_skill === skill2.id_skill;
}
