import create from "zustand";
// import { HttpErrorHandling } from "../services/httpErrorHandling";

const BASE_URL = "https://strapi-meshv.herokuapp.com/api";
const LOCAL_URL = "http://localhost:1337/api";

export const useTopBar = create((set) => ({
  progress: 0,
  setTopBar: (progress) => set((state) => ({ progress })),
  removeAllBears: () => set({ bears: 0 }),
}));

export const useSearch = create((set) => ({
  isSearch: false,
  query: "",
  open: () => set((state) => ({ isSearch: true })),
  close: () => set((state) => ({ isSearch: !state.isSearch })),
  setQuery: (query) => set((state) => ({ query })),
}));

export const useAuth = create((set) => ({
  user: null,
  MAIN_URL: BASE_URL,
  fetchReq: async (type = "", details) => {
    set(async (state) => {
      let res;
      try {
        res = await fetch(`${state.MAIN_URL}/auth/local/${type}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(details),
        });
        console.log(res, "res in 33");
        return await res;
      } catch (error) {
        console.log(error);
        return error;
      }
    });
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
  setURL: (mode) => {
    set((state) => ({
      MAIN_URL: mode === "production" ? BASE_URL : LOCAL_URL,
    }));

    // set((state) => ({ url: url }));
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

  // get all from localstorage
  getAllItems: () => {
    if (
      localStorage.getItem("cart") &&
      localStorage.getItem("totalAmount") &&
      localStorage.getItem("totalItems")
    ) {
      let cart = localStorage?.getItem("cart");
      let amount = localStorage?.getItem("totalAmount");
      let items = localStorage?.getItem("totalItems");
      set((state) => ({
        cart: JSON.parse(cart),
        totalAmount: JSON.parse(amount),
        totalItems: JSON.parse(items),
      }));
    }
    console.log("seeting al litem");
  },

  //set all value to local storage
  setAllItems: (cart, amt, items) => {
    localStorage?.setItem("cart", JSON.stringify(cart));
    localStorage?.setItem("totalAmount", JSON.stringify(amt));
    localStorage?.setItem("totalItems", JSON.stringify(items));
    console.log("seeting al litem");

    console.log("not setting al litem");
  },
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

      // call set All Value
      state.setAllItems(cart, state.totalAmount, state.totalItems);

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

      // call set All Value
      state.setAllItems(cart, state.totalAmount, state.totalItems);
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

      // call set All Value
      state.setAllItems(cart, state.totalAmount, state.totalItems);
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

        // call set All Value
        state.setAllItems(cart, state.totalAmount, state.totalItems);
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

//make a custom hook for fetching data
export const useFetch = create((set) => ({
  //url: "http://localhost:1337",
  B_URL: BASE_URL,

  //fetching data
  data: null,
  loading: false,
  error: null,

  //set URL
  setURL: (mode) => {
    set((state) => ({
      B_URL: mode === "production" ? BASE_URL : LOCAL_URL,
    }));
  },
  urlFetch: async (endPoint, method, body, getBody = true) => {
    set((state) => ({ loading: true }));
    try {
      // url = "http://localhost:1337" + url;

      const response = await fetch(`${BASE_URL}${endPoint}`, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      if (!getBody) {
        return response;
        set((state) => ({ data, loading: false }));
      }
      const data = await response.json();
      set((state) => ({ data, loading: false }));
      return data;
    } catch (error) {
      //show alert message

      set((state) => ({ error, loading: false }));
    }
  },
}));
