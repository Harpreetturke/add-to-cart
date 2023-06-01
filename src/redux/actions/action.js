export const ADD = (item) => {
    return {
        type: "ADD_CART",
        //item de vich data add houge jdo click kraga cart te
        payload: item
    }
}
//remove items
export const DLT = (id) => {
    return {
        type: "RMV_CART",
        //item de vich data add houge jdo click kraga cart te
        payload: id
    }
}

//remove individual item

export const REMOVE = (iteam) => {
    return {
        type: "RMV_ONE",
        //item de vich data add houge jdo click kraga cart te
        payload: iteam
    }
}