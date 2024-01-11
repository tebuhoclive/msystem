import React from "react";
import Card from "./components/Card/Card";

import Table from "./components/Table/Table";
import DrinksMain from "./DrinksMain";


function Client() {
  return (
    <>
      <h1>Analytics</h1>
 <div className="analyse">

     <Card title="Total Sales" value="$65,024" percentage="+81%" styleClass="sales" />
    <Card title="Site Visit" value="24,981" percentage="-48%" styleClass="visits" />
    <Card title="Searches" value="14,147" percentage="+21%" styleClass="searches" />
</div>

    
      <DrinksMain/>
    
    </>
  );
}

export default Client;
