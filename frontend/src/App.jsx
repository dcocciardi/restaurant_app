import { useState } from "react";

function App() {
  const [page, setPage] = useState("menu");
  const [orderMode, setOrderMode] = useState(null);
  const [orderDetails, setOrderDetails] = useState(null);
  const [selectedDish, setSelectedDish] = useState(null);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);


  const addToCart = (item) => {
  setCart(prev => {
    const index = prev.findIndex(
      i => i.name === item.name && i.size === item.size
    );

    if (index !== -1) {
      return prev.map((i, idx) =>
        idx === index
          ? { ...i, qty: i.qty + 1 }
          : i
      );
    }

    return [...prev, { ...item, qty: 1 }];
  });
};



  return (
    <div className="min-h-screen bg-[#F5F1EA] pb-20 font-sans">
      
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-sm mx-auto px-4 py-4 text-center">
          <h1 className="text-xl font-bold">Efregn</h1>
          <p className="text-sm text-gray-500">
            {page === "menu" && "Order from your table"}
            {page === "home" && "Welcome"}
            {page === "fidelity" && "Loyalty card"}
          </p>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-sm mx-auto px-4 py-6 space-y-4">
        {page === "menu" && (
          orderMode === null ? (
            <OrderModeSelect setOrderMode={setOrderMode} />
          ) : orderDetails === null ? (
            <OrderDetailsForm
              orderMode={orderMode}
              onConfirm={setOrderDetails}
              onBack={() => setOrderMode(null)}
            />
          ) : (
            <Menu
              orderMode={orderMode}
              resetMode={() => {
                setOrderMode(null);
                setOrderDetails(null);
              }}
              setSelectedDish={setSelectedDish}
              addToCart={addToCart}
            />

          )
        )}

        {page === "home" && <Home />}
        {page === "fidelity" && <Fidelity />}
      </main>

      {selectedDish && (
        <DishDetail
          dish={selectedDish}
          onClose={() => setSelectedDish(null)}
          addToCart={addToCart}
        />
      )}

      {isCartOpen && (
        <Cart
          cart={cart}
          setCart={setCart}
          onClose={() => setIsCartOpen(false)}
        />
      )}


      {cart.length > 0 && !isCartOpen && (
        <div
          onClick={() => setIsCartOpen(true)}
          className="fixed bottom-16 left-4 right-4 bg-[#7c9425] text-white rounded-2xl px-5 py-4 shadow-xl flex justify-between items-center z-40"
        >
          <span className="font-semibold">
            {cart.length} item{cart.length > 1 ? "s" : ""} in cart
          </span>
          <span className="font-bold">
            €{cart.reduce((sum, i) => sum + i.price * i.qty, 0).toFixed(2)}
          </span>
        </div>
      )}

      {/* Bottom navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-inner">
        <div className="max-w-sm mx-auto flex justify-around py-2 text-sm">
          <NavButton label="Home" active={page === "home"} onClick={() => setPage("home")} />
          <NavButton label="Order" active={page === "menu"} onClick={() => setPage("menu")} />
          <NavButton label="Loyalty" active={page === "fidelity"} onClick={() => setPage("fidelity")} />
        </div>
      </nav>
    </div>
  );
}

/* COMPONENTS */

function NavButton({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center px-4 py-1 rounded-xl ${
        active ? "text-[#7c9425] font-semibold" : "text-gray-400"
      }`}
    >
      {label}
    </button>
  );
}

function Menu({ orderMode, resetMode, setSelectedDish, addToCart }) {
  return (
    <>
      {/* Order mode banner */}
      <div className="bg-white rounded-2xl shadow p-4 mb-4">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium">
            You are ordering:{" "}
            <strong>
              {orderMode === "table" && "At the table"}
              {orderMode === "takeaway" && "Takeaway"}
              {orderMode === "delivery" && "Delivery"}
            </strong>
          </span>
          <button
            onClick={resetMode}
            className="text-[#7c9425] text-sm font-semibold"
          >
            Change mode
          </button>
        </div>
      </div>

      {/* Section jump bar */}
      <div className="sticky top-[80px] z-10 bg-[#F5F1EA] py-2 px-1 mb-4">
        <div className="flex gap-3 overflow-x-auto text-sm font-semibold">
          <SectionLink label="Starters" to="starters" />
          <SectionLink label="Pasta" to="pasta" />
          <SectionLink label="Drinks" to="drinks" />
          <SectionLink label="Sweets" to="sweets" />
        </div>
      </div>

      {/* SECTIONS */}
      <MenuSection id="starters" title="Starters">
        <div className="grid grid-cols-2 gap-4">
          <ImageDishCard
            name="Oven roasted potatoes"
            price="€2.50"
            image="/src/assets/dishes/potatoes.jpg"
            onAdd={() =>
              addToCart({
                name: "Oven roasted potatoes",
                price: 2.5
              })
            }
          />

          <ImageDishCard
            name="Bella di Cerignola olives"
            price="€3.00"
            image="/src/assets/dishes/olives.jpg"
            onAdd={() =>
              addToCart({
                name: "Bella di Cerignola olives",
                price: 3
              })
            }
          />

          <ImageDishCard
            name="Bruschetta Duo"
            price="€6.00"
            image="/src/assets/dishes/bruschetta.jpg"
            onAdd={() =>
              addToCart({
                name: "Bruschetta Duo",
                price: 6
              })
            }
          />
        </div>
      </MenuSection>



      <MenuSection id="pasta" title="Main courses & pasta">
        <Dish
          name="Orecchiette with broccoli rabe"
          price="€9.50"
          onOpen={() =>
            setSelectedDish({
              name: "Orecchiette with broccoli rabe",
              price: "€9.50",
              image: "/src/assets/dishes/orecchiette.jpg"
            })
          }
          onAdd={() =>
            addToCart({
              name: "Orecchiette with broccoli rabe",
              price: 9.5
            })
              }
         />

        <Dish name="Ciceri e tria" price="€8.50" />
        <Dish name="Zuppetta" price="€10.00" />
      </MenuSection>

      <MenuSection id="drinks" title="Drinks & coffee">
        <Dish name="Water (75 cl)" price="€1.50" />
        <Dish name="Italian craft beer" price="€4.00" />
        <Dish name="Coffee" price="€1.00" />
      </MenuSection>

      <MenuSection id="sweets" title="Sweets">
        <Dish name="Pupurati" price="€5.50" />
        <Dish name="Pasticciotti Leccesi" price="€5.50" />
      </MenuSection>
    </>
  );
}

function SectionLink({ label, to }) {
  return (
    <a
      href={`#${to}`}
      className="bg-white px-4 py-2 rounded-full shadow text-[#7c9425] whitespace-nowrap"
    >
      {label}
    </a>
  );
}

function MenuSection({ id, title, children }) {
  return (
    <section id={id} className="mb-8 scroll-mt-32">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

function Dish({ name, price, onAdd, onOpen }) {
  return (
    <div
      onClick={onOpen}
      className="bg-white rounded-2xl shadow p-4 cursor-pointer"
    >
      <h2 className="font-semibold text-lg">{name}</h2>

      <div className="flex justify-between items-center mt-3">
        <span className="font-bold">{price}</span>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onAdd();
          }}
          className="bg-[#7c9425] text-white px-3 py-1 rounded-lg text-sm"
        >
          Add
        </button>
      </div>
    </div>
  );
}



function ImageDishCard({ name, price, image, onAdd }) {
  return (
    <div className="bg-white rounded-2xl shadow overflow-hidden">
      <div className="aspect-square">
        <img src={image} alt={name} className="w-full h-full object-cover" />
      </div>

      <div className="p-3 space-y-1">
        <h3 className="font-semibold text-sm">{name}</h3>

        <div className="flex justify-between items-center">
          <span className="font-bold text-sm">{price}</span>
          <button
            onClick={onAdd}
            className="bg-[#7c9425] text-white px-3 py-1 rounded-lg text-sm"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}



function Home() {
  return (
    <div className="bg-white rounded-2xl shadow p-6 text-center">
      <h2 className="text-lg font-semibold mb-2">Welcome to Efregn</h2>
      <p className="text-gray-600">
        This section will soon link to the restaurant’s main website.
      </p>
    </div>
  );
}

function Fidelity() {
  return (
    <div className="bg-white rounded-2xl shadow p-6 text-center">
      <h2 className="text-lg font-semibold mb-2">Loyalty card</h2>
      <p className="text-gray-600 mb-4">
        Log in or sign up to collect points and unlock exclusive rewards.
      </p>
      <button className="bg-[#7c9425] text-white px-4 py-2 rounded-xl">
        Log in / Sign up
      </button>
    </div>
  );
}

function OrderModeSelect({ setOrderMode }) {
  return (
    <div className="space-y-4">
      <OrderCard
        title="Dine at the restaurant"
        text="Order from your table and pay without queuing."
        onClick={() => setOrderMode("table")}
        bg="bg-[#E6B8B0]"
      />

      <OrderCard
        title="Takeaway"
        text="Order now and pick up when you arrive."
        onClick={() => setOrderMode("takeaway")}
        bg="bg-[#C7CBBF]"
      />

      <OrderCard
        title="Delivery"
        text="Get your order delivered wherever you are."
        // onClick={() => setOrderMode("delivery")}
        // bg="bg-[#F2C98A]"
        bg="bg-gray-200 opacity-50"
        disabled
      />

    </div>
  );
}

function OrderCard({ title, text, onClick, bg, disabled }) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`${bg} w-full rounded-2xl p-5 text-left shadow ${
        disabled ? "cursor-not-allowed" : ""
      }`}
    >
      <h2 className="font-bold text-lg mb-1">{title}</h2>
      <p className="text-sm text-gray-800">{text}</p>
    </button>
  );
}


function DishDetail({ dish, onClose, addToCart }) {
  const basePrice = parseFloat(dish.price.replace("€", ""));
  const [size, setSize] = useState("regular");

  const finalPrice = (() => {
    if (size === "xl") return (basePrice * 1.5).toFixed(2);
    if (size === "xxl") return (basePrice * 1.75).toFixed(2);
    return basePrice.toFixed(2);
  })();


  const [ingredients, setIngredients] = useState([
    { name: "Broccoli rabe", qty: 1 },
    { name: "Garlic", qty: 1 },
    { name: "Chilli", qty: 1 },
    { name: "Anchovies", qty: 1 }
  ]);

  const updateQty = (index, delta) => {
    setCart(prev => {
      // 1. Clona l'array
      const updated = [...prev];
      
      // 2. IMPORTANTE: Crea una nuova copia dell'oggetto specifico che stai modificando
      updated[index] = { ...updated[index], qty: updated[index].qty + delta };

      // 3. Rimuovi se quantità <= 0
      if (updated[index].qty <= 0) {
        updated.splice(index, 1);
      }

      return updated;
    });
  };


  return (
    <div className="fixed inset-0 bg-[#F5F1EA] z-50 overflow-y-auto pb-28">
      
      {/* Dish image */}
        <div className="relative">
          <img
            src={dish.image}
            alt={dish.name}
            className="w-full h-64 object-cover"
          />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white/80 backdrop-blur rounded-full w-10 h-10 flex items-center justify-center text-xl font-bold"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="px-6 pt-4 space-y-2">

          <div className="flex gap-3">
            <button
              onClick={() => setSize("regular")}
              className={`flex-1 rounded-2xl p-3 text-center font-semibold ${
                size === "regular"
                  ? "bg-[#7c9425] text-white"
                  : "bg-[#C8D6C5]"
              }`}
            >
              Regular
            </button>

            <button
              onClick={() => setSize("xl")}
              className={`flex-1 rounded-2xl p-3 text-center font-semibold ${
                size === "xl"
                  ? "bg-[#7c9425] text-white"
                  : "bg-[#C8D6C5]"
              }`}
            >
              XL
            </button>
            {/* <p className="text-sm text-gray-500">Hungry?</p> */}

            <button
              onClick={() => setSize("xxl")}
              className={`flex-1 rounded-2xl p-3 text-center font-semibold ${
                size === "xxl"
                  ? "bg-[#7c9425] text-white"
                  : "bg-[#C8D6C5]"
              }`}
            >
              XXL
            </button>
            {/*<p className="text-sm text-gray-500">Hungrier?</p>*/}
          </div>


        <h1 className="text-2xl font-bold mt-4">{dish.name}</h1>
        <p className="text-lg font-semibold">€{finalPrice}</p>
      </div>

      {/* Ingredients */}
      <div className="px-6 mt-6 space-y-4">
        <h2 className="font-semibold text-lg">Customise ingredients</h2>

        {ingredients.map((ing, index) => (
          <div
            key={ing.name}
            className="bg-white rounded-xl shadow p-4 flex justify-between items-center"
          >
            <span>{ing.name}</span>
            <div className="flex items-center gap-3">
              <button
                onClick={() => updateQty(index, -1)}
                className="w-8 h-8 rounded-full bg-gray-200"
              >
                −
              </button>
              <span className="font-semibold">{ing.qty}</span>
              <button
                onClick={() => updateQty(index, 1)}
                className="w-8 h-8 rounded-full bg-[#7c9425] text-white"
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-white p-4 shadow-inner">
        <button
            onClick={() => {
              addToCart({
                name: dish.name,
                size,
                price: Number(finalPrice),
                ingredients: ingredients.filter(i => i.qty > 0)
              });
              onClose();
            }}
            className="w-full bg-[#7c9425] text-white py-4 rounded-xl text-lg font-semibold"
          >
            Add to cart · €{finalPrice}
        </button>

      </div>
    </div>
  );
}

function OrderDetailsForm({ orderMode, onConfirm, onBack }) {
  const [table, setTable] = useState("");
  const [name, setName] = useState("");
  const [time, setTime] = useState("");

  const times = [
    "12:00", "12:15", "12:30",
    "12:45", "13:00", "13:15",
    "13:30", "13:45", "14:00",
    "14:15", "14:30", "14:45",
    "19:00", "19:15", "19:30",
    "19:45", "20:00"
  ];

  return (
    <div className="space-y-6">
      <button
        onClick={onBack}
        className="text-[#7c9425] font-semibold"
      >
        ← Change order mode
      </button>

      {/* DINE IN */}
      {orderMode === "table" && (
        <div className="bg-white rounded-2xl shadow p-6 space-y-4">
          <h2 className="text-lg font-bold">Table number</h2>

          <input
            type="number"
            placeholder="e.g. 12"
            value={table}
            onChange={(e) => setTable(e.target.value)}
            className="w-full border rounded-xl px-4 py-3 text-lg"
          />

          <button
            disabled={!table}
            onClick={() => onConfirm({ table })}
            className={`w-full py-3 rounded-xl font-semibold text-white ${
              table ? "bg-[#7c9425]" : "bg-gray-300"
            }`}
          >
            Continue to menu
          </button>
        </div>
      )}

      {/* TAKEAWAY */}
      {orderMode === "takeaway" && (
        <div className="bg-white rounded-2xl shadow p-6 space-y-4">
          <h2 className="text-lg font-bold">Pick-up details</h2>

          <input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border rounded-xl px-4 py-3"
          />

          <select
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full border rounded-xl px-4 py-3"
          >
            <option value="">Select pick-up time</option>
            {times.map(t => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>

          <button
            disabled={!name || !time}
            onClick={() => onConfirm({ name, time })}
            className={`w-full py-3 rounded-xl font-semibold text-white ${
              name && time ? "bg-[#7c9425]" : "bg-gray-300"
            }`}
          >
            Continue to menu
          </button>
        </div>
      )}
    </div>
  );
}

function Cart({ cart, setCart, onClose }) {
  const isLoggedIn = false;

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  // SOLUZIONE DEFINITIVA PER L'AGGIORNAMENTO QUANTITÀ
  const updateQty = (index, delta) => {
    setCart(prev => {
      return prev.map((item, i) => {
        // Se è l'elemento che stiamo modificando...
        if (i === index) {
          // ...creiamo una NUOVA copia dell'oggetto con la nuova quantità
          return { ...item, qty: item.qty + delta };
        }
        // Altrimenti ritorniamo l'oggetto invariato
        return item;
      })
      // Alla fine, rimuoviamo gli elementi che hanno quantità <= 0
      .filter(item => item.qty > 0);
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40">
      <div className="absolute bottom-0 left-0 right-0 bg-[#F5F1EA] rounded-t-3xl p-6 max-h-[85vh] overflow-y-auto">

        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Your order</h2>
          <button onClick={onClose} className="text-2xl font-bold">×</button>
        </div>

        {/* Loyalty prompt */}
        {!isLoggedIn && (
          <div className="bg-[#c59257] text-white rounded-xl p-4 mb-4 text-sm">
            {/* <p className="font-semibold mb-1">Collect loyalty points?</p> */}
            {/* Rimossa la classe text-gray-600 affinché erediti il bianco */}
            <p className="mb-2">
              Log in or sign up to earn rewards with this order.
            </p>
            {/* Cambiato il colore del bottone in bianco e aggiunto underline per contrasto */}
            <button className="text-white underline font-semibold">
              Log in / Sign up
            </button>
          </div>
        )}

        {/* Items */}
        <div className="space-y-4">
          {cart.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow p-4 flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">{item.name}</p>
                {item.size && (
                  <p className="text-sm text-gray-500">
                    Size: {item.size.toUpperCase()}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-3">
                {/* BOTTONE MENO */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    updateQty(index, -1);
                  }}
                  className="w-8 h-8 rounded-full bg-gray-200 text-white flex items-center justify-center pb-1"
                >
                  −
                </button>

                <span className="font-semibold">{item.qty}</span>

                {/* BOTTONE PIÙ */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    updateQty(index, 1);
                  }}
                  className="w-8 h-8 rounded-full bg-[#7c9425] text-white flex items-center justify-center pb-1"
                >
                  +
                </button>
              </div>

              <div className="font-bold">
                €{(item.price * item.qty).toFixed(2)}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-6 space-y-3">
          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>€{total.toFixed(2)}</span>
          </div>

          <button className="w-full bg-[#7c9425] text-white py-4 rounded-xl text-lg font-semibold">
            Confirm order
          </button>

          <p className="text-sm text-gray-500 text-center">
            You will be asked to pay shortly.
          </p>

          {/* <p className="text-sm text-gray-500 text-center">
            Made with ♡, React JSX and Django by Dan.
          </p> */}
        </div>
      </div>
    </div>
  );
}



export default App;
