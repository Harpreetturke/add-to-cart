const INIT_STATE = {
    carts: []
};


export const cartreducer = (state = INIT_STATE, action) => {
    //eh type check krn lyi a
    switch (action.type) {

        case "ADD_CART":

            const IteamIndex = state.carts.findIndex((iteam) => iteam.id === action.payload.id)

            if (IteamIndex >= 0) {
                state.carts[IteamIndex].qnty += 1
            }
            else {
                const temp = { ...action.payload, qnty: 1 }

                return {
                    //state te cart nal previous item v ude vich rhugi
                    ...state,
                    //action.payload  nal data add hojuga pr previous item delete hoju
                    carts: [...state.carts, temp]
                }
            }
        case "RMV_CART":
            const data = state.carts.filter((el) => el.id !== action.payload);
            return {
                ...state,
                carts: data
            }
        case "RMV_ONE":
            const IteamIndex_dec = state.carts.findIndex((iteam) => iteam.id === action.payload.id)
            if (state.carts[IteamIndex_dec].qnty >= 1) {
                const dltitem = state.carts[IteamIndex_dec].qnty -= 1
                console.log([...state.carts, dltitem]);

                return {
                    ...state,
                    carts: [...state.carts]
                }
            }
            else if (state.carts[IteamIndex_dec].qnty == 1) {

                const data = state.carts.filter((el) => el.id !== action.payload);
                return {
                    ...state,
                    carts: data
                }
            }

        default:
            //agar kuj ni  hoga tan by default oh state return krdu
            return state
    }
}