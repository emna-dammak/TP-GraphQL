export const Query = {
  hello: () => "Hello from Yoga!",
  getCvs: (parent: any, args: any, { db }: any, info: any) => {
    return db.cvs;
  },
  getCvById: (parent: any, { cvId }: any, { db }: any, info: any) => {
    const cv = db.cvs.find((cv: any) => cv.id === cvId);
    if (!cv) {
      throw new Error(`aucun cv ne porte l'id ${cvId}`);
    } else {
      return cv;
    }
  },
  getCvUsers: (parent: any, { cvid }: any, { db }: any, info: any) => {
    const userId = db.cvs.find((cv: any) => cv.id === cvid).owner.toString();
    return db.users.find((user: any) => user.id === userId);
  },
  getCvSkills: (parent: any, { cvid }: any, { db }: any, info: any) => {
    const myElemts = db.cv_skill.filter((elmt: any) => elmt.id_cv === cvid);
    const mySkills = [];
    for (let i = 0; i < myElemts.length; i++) {
      const skillId = myElemts[i].id_skill;
      const skill = db.skills.find((skill: any) => skill.id === skillId);
      if (skill) {
        mySkills.push(skill);
      }
    }
    return mySkills;
  },
};
