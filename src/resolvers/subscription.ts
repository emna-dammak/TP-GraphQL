export const Subscription = {
    newCv: {
      subscribe: (parent:any, args:any, { pubSub }:any, info:any) => {
        return pubSub.subscribe("newCv");
      },
      resolve: (payload:any) => {
        return payload;
      },
    },
    updateCv: {
      subscribe: (parent:any, args:any, { pubSub }:any, info:any) => {
        return pubSub.subscribe("updateCv");
      },
      resolve: (payload:any) => {
        return payload;
      },
    },
    deletedCv: {
      subscribe: (parent:any, args:any, { pubSub }:any, info:any) => {
        return pubSub.subscribe("deletedCv");
      },
      resolve: (payload:any) => {
        return payload;
      },
    },
  };