import { toast } from "react-hot-toast";
import {apiConnector} from '../apiConnector';
import {catalog} from '../apis';

export const getCatalogPageData = async (categoryId) => {
    const toastId = toast.loading("Loading...");
    let result = [];
    
    try{
        const response = await apiConnector('POST', catalog.CATALOG_PAGE_DATA, {categoryId : categoryId});

        if(!response?.data?.success){
            throw new Error(response.data.message);
        }

        console.log("GET CATEGORY PAGE DETAILS RESPONSE...", response);

        result = response?.data;

    }catch(error){
        console.log("GET CATEGORY PAGE DETAILS ERROR...", error);
        toast.error(error.message);
    }

    toast.dismiss(toastId);
    return result;
}