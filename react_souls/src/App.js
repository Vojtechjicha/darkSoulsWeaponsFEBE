// import React, { useState, useEffect } from "react";

// function App() {
//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetch("http://localhost:5000/api/data")
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error("Chyba při načítání dat");
//         }
//         return response.json();
//       })
//       .then((data) => {
//         setCategories(data);
//         setLoading(false);
//       })
//       .catch((error) => {
//         setError(error.message);
//         setLoading(false);
//       });
//   }, []);

//   if (loading) return <div>Načítám data...</div>;
//   if (error) return <div>Chyba: {error}</div>;

//   return (
//     <div>
//       <h1>Seznam zbraní</h1>
//       {categories.map((category, index) => (
//         <div key={index}>
//           <h2>{category.category}</h2>
//           {Object.keys(category)
//             .filter((key) => key !== "category") // Vynecháme název kategorie
//             .map((weaponKey) => (
//               <div key={weaponKey}>
//                 <h3>{weaponKey}</h3>
//                 <ul>
//                   {category[weaponKey].map((weapon, weaponIndex) => (
//                     <li key={weaponIndex}>
//                       <strong>{weapon.name}</strong>
//                       <p>Poškození: {weapon.regular_phy_dmg} (regular)</p>
//                       <p>Váha: {weapon.weight}</p>
//                       <p>Požadavky: STR: {weapon.requirements.str}, DEX: {weapon.requirements.dex}</p>
//                       <p>Enchantable: {weapon.enchantable ? "Ano" : "Ne"}</p>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             ))}
//         </div>
//       ))}
//     </div>
//   );
// }

// export default App;   


// ----- be fe express react app without database -------------






// // App.js
// import React, { useState, useEffect } from "react";

// function App() {
//   const [daggers, setDaggers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     // Fetchujeme data z backendu
//     fetch("http://localhost:5000/api/data")
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error("Síťová chyba");
//         }
//         return response.json(); // Vracíme JSON data
//       })
//       .then((data) => {
//         // Získáme seznam "daggers" z první kategorie
//         setDaggers(data[0]?.daggers || []);
//         setLoading(false); // Načítání je dokončeno
//       })
//       .catch((error) => {
//         setError(error.message); // Ošetření chyb
//         setLoading(false); // Načítání je dokončeno
//       });
//   }, []);

//   if (loading) {
//     return <div>Načítám...</div>;
//   }

//   if (error) {
//     return <div>Chyba: {error}</div>;
//   }

//   return (
//     <div>
//       <h1>Seznam nožů:</h1>
//       <ul>
//         {daggers.map((dagger, index) => (
//           <li key={index}>
//             <h2>{dagger.name}</h2>
//             <p><strong>Poškození:</strong> {dagger.regular_phy_dmg} (regular), {dagger.regular15_phy_dmg} (15%)</p>
//             <p><strong>Váha:</strong> {dagger.weight}</p>
//             <p><strong>Požadavky:</strong> STR: {dagger.requirements.str}, DEX: {dagger.requirements.dex}</p>
//             <p><strong>Enchantable:</strong> {dagger.enchantable ? "Ano" : "Ne"}</p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default App;




// import React, { useState, useEffect } from "react";

// function App() {
//   const [items, setItems] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     // Fetchujeme data z backendu
//     fetch("http://localhost:5000/api/data")
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error("Síťová chyba");
//         }
//         return response.json(); // Vracíme JSON data
//       })
//       .then((data) => {
//         setItems(data); // Uložíme všechny kategorie a jejich zbraně
//         setLoading(false); // Načítání je dokončeno
//       })
//       .catch((error) => {
//         setError(error.message); // Ošetření chyb
//         setLoading(false); // Načítání je dokončeno
//       });
//   }, []);

//   if (loading) {
//     return <div>Načítám...</div>;
//   }

//   if (error) {
//     return <div>Chyba: {error}</div>;
//   }

//   return (
//     <div>
//       <h1>Zbraně ve hře:</h1>
//       {items.map((category, index) => (
//         <div key={index}>
//           <h2>{category.category}</h2>
//           <ul>
//             {(category.daggers || category.st_swords || []).map((item, itemIndex) => (
//               <li key={itemIndex}>
//                 <h3>{item.name}</h3>
//                 <p><strong>Poškození:</strong> {item.regular_phy_dmg} (regular), {item.regular15_phy_dmg} (15%)</p>
//                 <p><strong>Váha:</strong> {item.weight}</p>
//                 <p><strong>Požadavky:</strong> STR: {item.requirements.str}, DEX: {item.requirements.dex}</p>
//                 <p><strong>Enchantable:</strong> {item.enchantable ? "Ano" : "Ne"}</p>
//               </li>
//             ))}
//           </ul>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default App;



//   -------- data from database ----------

import React, { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://eqcxgfbixykafjjiqpac.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVxY3hnZmJpeHlrYWZqamlxcGFjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk2NDY1MDEsImV4cCI6MjA1NTIyMjUwMX0.J1zrvxVXErEWW37j0Q0u8cBiv-hBdI-jsXusPabppEg";
const supabase = createClient(supabaseUrl, supabaseKey);

function App() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const { data, error } = await supabase
        .from("categories")
        .select("id, name, weapons(*)");

      if (error) {
        console.error("Chyba při načítání dat:", error);
      } else {
        setCategories(data);
      }
      setLoading(false);
    }

    fetchData();
  }, []);

  if (loading) return <div>Načítání...</div>;

  return (
    <div>
      <h1>Seznam zbraní</h1>
      {categories.map((category) => (
        <div key={category.id}>
          <h2>{category.name}</h2>
          <ul>
            {category.weapons.map((weapon) => (
              <li key={weapon.id}>
                <strong>{weapon.name}</strong> - Poškození: {weapon.regular_phy_dmg}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default App;
