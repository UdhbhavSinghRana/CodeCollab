import { createContext, useState } from "react";

const codeContext = createContext(null);
function CodeContextProvider(props) {
    const [code, setCode] = useState("");

    return (
        <codeContext.Provider value={{ code, setCode }}>
            {props.children}
        </codeContext.Provider >
    )
}

export default CodeContextProvider
export { codeContext }