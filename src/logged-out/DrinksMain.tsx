import React, { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useAppContext } from "../shared/functions/Context";
// import "uikit/dist/css/uikit.min.css";
import { IDrink, defaultDrink } from "../shared/models/DrinkModel";
import Table from "./components/Table/Table";
const DrinksMain: React.FC = observer(() => {
  const { api, store } = useAppContext();

  const drinkList = store.drink.all;
  // Load To-Do items from the API when the component mounts
  useEffect(() => {
    const loadData = async () => {
      await api.drink.getAll();
      
    };
    loadData();
  }, [api.drink]);


  const [drink, setDrink] = useState<IDrink>({ ...defaultDrink });
  const [allItem, setAllItems] = useState<IDrink[]>([]);
  const [createMode, setCreateMode] = useState(true);
  const [render, setRender] = useState(false);

  // Api functions from the TodoApi
  const handleCreateDrinks = async () => {
    await api.drink.create(drink);
    setDrink({ ...defaultDrink });
  };

  const onDelete = async (drink: IDrink) => {
    await api.drink.delete(drink);
  };

  const updateTodo = (updateDrinks: IDrink) => {
    setRender(true);
    store.drink.select(updateDrinks);

    const selectedDrink = store.drink.selected;
    if (selectedDrink) {
      setDrink(selectedDrink);
      setCreateMode(false);
      // setRender(false)
    }
  };

  const onUpdate = async (item: IDrink) => {
    await api.drink.update(item);
    setDrink({ ...defaultDrink });
    setRender(false);
  };

  const getAll = async () => {
    const allDrinks = store.drink.all.map((item) => {
      return item.asJson;
    });
    setAllItems(allDrinks);
  };

  const handleRemoveTodo = async (drink: IDrink) => {
    store.drink.remove(drink.id); // Call the API to remove the Todo
  };

  const handleRemoveallTodo = async (drink: IDrink) => {
    store.drink.removeAll();
    <button onClick={() => handleRemoveallTodo(drink)}> remove Drinks</button>;
  };

  const handleSelectDrink = (drink: IDrink) => {
    store.drink.select(drink); // Call the select method from the store
    console.log("Selected Product:", store.drink.selected); // Print the selected todo
  };

  return (
    <div className="uk-container uk-padding">
      <div className="recent-orders">
        <h2>Recent Orders</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Quality</th>
            </tr>
          </thead>
          <tbody>
            {drinkList.map((drink) => (
              <tr key={drink.asJson.id}>
                <td>{drink.asJson.name}</td>
                <td>{drink.asJson.quantity}</td>

                <td>
                  <button
                    className="uk-button uk-button-secondary uk-button-small"
                    onClick={() => onDelete(drink.asJson)}>
                    Delete
                  </button>
                </td>
                <td>
                  <button
                    className="uk-button uk-button-secondary uk-button-small"
                    onClick={() => updateTodo(drink.asJson)}>
                    {" "}
                    Update drink{" "}
                  </button>
                </td>
                <td>
                  <button
                    className="uk-button uk-button-secondary uk-button-small"
                    onClick={() => handleRemoveTodo(drink.asJson)}>
                    Remove
                  </button>
                </td>
                <td></td>
              </tr>
            ))}
          </tbody>
        </table>
        <a href="#">Show All</a>
      </div>

      <div className="uk-card uk-card-default uk-card-body uk-width-1-3@m uk-margin-auto">
        {createMode && (
          <>
            <h3 className="uk-card-title">Add Drink</h3>
            <div className="uk-margin">
              <input
                className="uk-input"
                type="number"
                placeholder="Enter quantity"
                value={drink.quantity || ""}
                onChange={(e) => {
                  const quantity = e.target.valueAsNumber;
                  if (!isNaN(quantity)) {
                    setDrink({
                      ...drink,
                      quantity: quantity,
                    });
                  }
                }}
              />
              <input
                className="uk-input"
                type="text"
                placeholder="Enter Name"
                value={drink.name}
                onChange={(e) =>
                  setDrink({
                    ...drink,
                    name: e.target.value,
                  })
                }
              />
            </div>
            <button
              className="uk-button uk-button-secondary uk-button-small"
              onClick={handleCreateDrinks}>
              Add Drink
            </button>
            <hr />
            <button
              className="uk-button uk-button-primary uk-margin-top"
              onClick={getAll}>
              List All
            </button>
          </>
        )}

        {!createMode && (
          <>
            <h3 className="uk-card-title">Create New To-Do</h3>
            <div className="uk-margin">
              <input
                className="uk-input"
                type="text"
                placeholder="Enter quantity"
                value={drink.quantity}
                onChange={(e) =>
                  setDrink({
                    ...drink,
                    quantity: e.target.valueAsNumber,
                  })
                }
              />
              <input
                className="uk-input"
                type="text"
                placeholder="Enter Drink Name"
                value={drink.name}
                onChange={(e) =>
                  setDrink({
                    ...drink,
                    name: e.target.value,
                  })
                }
              />
            </div>
            {render === false ? (
              <button
                className="uk-button uk-button-primary"
                onClick={handleCreateDrinks}>
                Add Drinks
              </button>
            ) : (
              <button
                className="uk-button uk-button-secondary"
                onClick={() => onUpdate(drink)}>
                Edit
              </button>
            )}
          </>
        )}
      </div>
    
    </div>
  );
});

export default DrinksMain;
