import { useContext } from "react";
import { WOWContext } from "../context/WOWContext";

function useWOW() {
    const context = useContext(WOWContext);
    if (!context) {
        throw new Error("WOWContext must be used within a WOWProvider");
    }
    return context;
}

export default useWOW;
