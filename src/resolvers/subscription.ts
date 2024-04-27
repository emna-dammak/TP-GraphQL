export const Subscription = {
  cv: {
    subscribe: (parent: any, args: any, { pubSub }: any, info: any) => {
      return pubSub.subscribe("cv");
    },
    resolve: (payload: any) => {
      console.log(payload);
      return payload;
    },
  },
};
