import create from "zustand";
// import { HttpErrorHandling } from "../services/httpErrorHandling";

const BASE_URL = "https://strapi-meshv.herokuapp.com/api";
const LOCAL_URL = "http://localhost:1337/api";

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
      res = await fetch(`${LOCAL_URL}/auth/local/${type}`, {
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
  taxAmount: 0,
  shipAmount: 0,
  /**
   * Find by id and update state
   * @param {itemObject} item {id,name,qty,price,pic}
   */
  add: (item) => {
    set((state) => {
      const cart = [...state.cart];
      const index = cart.findIndex((i) => i.idOfItem === item.id);
      let { name, price, pic, qty, Slug } = item;
      console.log(cart, "cart");

      // New item
      if (index === -1) {
        let addItem = {
          idOfItem: item.id,
          item: {
            name,
            price: price,
            pic: pic,
            qty: cart[index]?.item?.qty + 1 || 1,
            Slug,
          },
        };

        cart.push(addItem);

        //increase total item
        state.totalItems += cart[index]?.item?.qty + 1 || 1;
        console.log(index, cart[index]?.item?.qty, "cart add");

        //increase total amount
        state.totalAmount += price;
      } else {
        cart[index].item.qty += 1;

        // incerement total item
        state.totalItems += 1;
        //increase total amount
        state.totalAmount += price;
      }
      return { cart };
    });
  },
  /**
   * Find by id and remove from state
   * @param {id} item
   */
  remove: (id) => {
    set((state) => {
      const cart = [...state.cart];
      const index = cart.findIndex((i) => i.idOfItem === id);
      let item = cart[index].item.qty;

      if (index !== -1) {
        //decrease total item
        state.totalItems -= item;

        //decrease total amount
        state.totalAmount -= item * cart[index].item.price;
        cart.splice(index, 1);
      }
      return { cart };
    });
  },

  /**
   * Get id Of item and increament quantity
   * @param {idOfItem} id
   */
  increase: (id) => {
    set((state) => {
      const cart = [...state.cart];
      const index = cart.findIndex((i) => i.idOfItem === id);

      // item found
      if (index !== -1) {
        cart[index].item.qty = cart[index].item?.qty + 1;

        //increase total item
        state.totalItems += 1;

        //increase total amount
        state.totalAmount += cart[index].item.price;
      }

      return { cart };
    });
  },
  /**
   * Get id Of item and decrement quantity
   * @param {idOfItem} id
   */
  decrease: (id) => {
    set((state) => {
      const cart = [...state.cart];
      const index = cart.findIndex((i) => i.idOfItem === id);
      console.log(index, cart, "index");

      // item found and quantity is greater than 1
      if (index !== -1 && cart[index].item.qty >= 1) {
        cart[index].item.qty -= 1;

        //decrease total item
        state.totalItems -= 1;

        //decrease total amount
        state.totalAmount -= cart[index].item.price;
      }

      // if quantity is 0 then remove item
      if (cart[index].item.qty < 1) {
        //decrease total item
        // state.totalItems -= 1;

        //decrease total amount
        // state.totalAmount -= cart[index].item.price;
        cart.splice(index, 1);

        return { cart, totalItems: state.totalItems };
      }

      return { cart };
    });
  },
  clear: () => {
    set((state) => {
      return { cart: [], totalAmount: 0, totalItems: 0 };
    });
  },

  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
}));
