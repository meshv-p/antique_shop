import create from "zustand";
// import { HttpErrorHandling } from "../services/httpErrorHandling";

const BASE_URL = "https://strapi-meshv.herokuapp.com/api";

export const useBearStore = create((set) => ({
  bears: 0,
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
}));

export const useSearch = create((set) => ({
  isSearch: false,
  open: () => set((state) => ({ isSearch: true })),
  close: () => set((state) => ({ isSearch: !state.isSearch })),
}));

export const useAuth = create((set) => ({
  user: null,
  fetchReq: async (type = "", details) => {
    let res;
    try {
      res = await fetch(`${BASE_URL}/auth/local/${type}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(details),
      });
      console.log(res);
      return await res;
    } catch (error) {
      console.log(error);
      return error;
    }
  },
  login: (user) => {
    console.log("middle");
    localStorage.setItem("token", user.jwt);
    localStorage.setItem("user", JSON.stringify(user.user));
    set((state) => ({ user: user.user }));
  },
  logout: (user) => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    set((state) => ({ user: null }));
  },
  isLoggedinUser: () => {
    const user = localStorage?.getItem("user");
    const token = localStorage?.getItem("token");
    if (user && token) {
      set((state) => ({ user: JSON?.parse(user) }));
    }
  },
}));

export const useAlert = create((set) => ({
  //  For Alert
  isShow: false,
  message: "",
  subMessage: "",
  type: "success",
  open: (sms, subSms, type) =>
    set((state) => ({
      isShow: true,
      message: sms,
      subMessage: subSms,
      type: type,
    })),
  close: () => set((state) => ({ isShow: false })),
}));

export const useCartStore = create((set) => ({
  store: null,
  cart: [],
  totalAmount: 0,
  totalItems: 0,
  add: (item) => {
    set((state) => {
      const cart = [...state.cart];
      const index = cart.findIndex((i) => i.id === item.id);
      if (index === -1) {
        cart.push({ ...item, quantity: 1 });

        //increase total item
        state.totalItems += 1;
      } else {
        cart[index].quantity += 1;

        // incerement total item
        state.totalItems += 1;
      }
      return { cart };
    });
  },
  remove: (name) => {
    set((state) => {
      const cart = [...state.cart];
      const index = cart.findIndex((i) => i.name === name);
      if (index !== -1) {
        cart.splice(index, 1);
      }
      return { cart };
    });
  },
  increase: (id) => {
    set((state) => {
      const cart = [...state.cart];
      const index = cart.findIndex((i) => i.id === id);
      if (index !== -1) {
        cart[index].quantity += 1;
      }
      return { cart };
    });
  },
  decrease: (id) => {
    set((state) => {
      const cart = [...state.cart];
      const index = cart.findIndex((i) => i.id === id);
      if (index !== -1) {
        cart[index].quantity += 1;
      }
      return { cart };
    });
  },
  clear: () => {
    set((state) => ({ cart: [] }));
  },

  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
}));
