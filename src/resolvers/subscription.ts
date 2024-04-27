export const Subscription = {
    TestCv: {
      subscribe: (parent:any, args:any, { pubSub }:any, info:any) => {
        return pubSub.subscribe("TestCv");
      },
      resolve: (payload:any) => {
        return payload;
      },
    },
  };