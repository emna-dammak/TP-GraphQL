export const Query = {
        hello: () => "Hello from Yoga!",
        getCvs: (parent : any, args : any, { db } : any, info : any) => {
            return db.cvs;
        },
        getCvById: (parent : any,   { cvId } : any  , { db }: any, info : any) => {
            const cv = db.cvs.find((cv : any) => cv.id === cvId);
            if (!cv) {
                throw new Error(`aucun cv ne porte l'id ${cvId}`);
            } else {
                return cv;
            }
        },
    };
