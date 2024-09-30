import React, { useEffect, useState } from "react";
import axios from "axios";
import ShopComp from "../Inventory/ShopComp";

const URL = "http://localhost:5000/inventory";

const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};

function InventoryComp() {
  const [inventory, setInventory] = useState();

  useEffect(() => {
    fetchHandler().then((data) => {
      console.log("Inventory data:", data.inventory);
      setInventory(data.inventory);
    });
  }, []);
  return (
    <div>
      <h1>inventory details display page</h1>
      <div>
        {inventory?.length > 0 &&
          inventory.map((INVENTORY) => (
            <div key={INVENTORY._id}>
              <ShopComp INVENTORY={INVENTORY} />
            </div>
          ))}
      </div>
    </div>
  );
}

export default InventoryComp;
