import ReactLoading from "react-loading";
import React from "react";

export function Loading({scale}) {
    const scaleStyle = scale * 100 + "%"
    return <div style={{height: "100%", width: "100%", display: "flex", justifyContent: "center", alignItems: "center"}}>
        <ReactLoading type={"spin"} color={"#9c88ff"} width={scaleStyle} />
    </div>
}