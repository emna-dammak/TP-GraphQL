import { GraphQLError } from "graphql";

export const Mutation = {
    addCv: (parent : any, args : any, { db } : any, info : any) => {
        const id = db.cvs.length + 1;
        const { name, age, job, skillIds, userId } = args.cvAddInput;
        console.log(args.cvAddInput);
        const skills = db.skills.filter((skill: any) => skillIds.includes(skill.id));
        console.log(skills);
        const user = db.users.find((user: any) => args.cvAddInput.userId == user.id);
        if (!user) {
            throw new GraphQLError (`user d'id ${userId} n'existe pas`);
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
}