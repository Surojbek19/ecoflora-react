import { useContext, createContext } from "react";
import { Member } from "../../lib/data/types/member";


interface GlobalInterface {
    authMember: Member | null;
    setAuthMember: (member: Member | null) => void; 
}

export const GlobalContext = createContext<GlobalInterface | undefined>(
    undefined
); 

export const useGlobals = () => {
    const context = useContext(GlobalContext);
    if(context === undefined) throw new Error("useGlobals within Provider");
    return context; 
}