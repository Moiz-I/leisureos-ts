"use client";

import { useState, useEffect } from "react";
import { getShowLinks } from "./utils/getShowLinks";

interface getShowProps {
  showQuery: string;
  region: string;
}

export default function GetShow() {
  const [showData, setShowData] = useState<any>(null);

  useEffect(() => {
    // Call getShow with the required props
    getShowLinks({ showQuery: "rick", region: "en_US" }).then((data) => {
      setShowData(data);
      console.log("getshow data ", data);
    });
  }, []);

  return <div>hello</div>;
}
