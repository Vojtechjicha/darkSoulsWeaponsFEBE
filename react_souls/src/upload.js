import { createClient } from "@supabase/supabase-js";
// import { readFile } from "fs/promises";
import fs from "fs";


// Připojení k Supabase
const supabaseUrl = "https://eqcxgfbixykafjjiqpac.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVxY3hnZmJpeHlrYWZqamlxcGFjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk2NDY1MDEsImV4cCI6MjA1NTIyMjUwMX0.J1zrvxVXErEWW37j0Q0u8cBiv-hBdI-jsXusPabppEg";
const supabase = createClient(supabaseUrl, supabaseKey);

// Tvůj JSON soubor (nahraď vlastním JSON)

  const jsonData = JSON.parse(fs.readFileSync("../../public/dark_souls_weapons.json", "utf8"));
// [
//   {
//     "category": "Daggers",
//     "daggers": [
//       {
//         "name": "Dagger",
//         "regular_phy_dmg": 56,
//         "regular15_phy_dmg": 140,
//         "weight": 0.5,
//         "durability": 200,
//         "attack_type": "Slash / Thrust",
//         "enchantable": true,
//         "requirements": { "str": 5, "dex": 8, "int": 0, "faith": 0 }
//       }
//     ]
//   }
// ];

async function uploadData() {
  for (const category of jsonData) {
    // Vložení kategorie do tabulky
    const { data: categoryData, error: categoryError } = await supabase
      .from("categories")
      .insert([{ name: category.category }])
      .select();

    if (categoryError) {
      console.error("Chyba při vkládání kategorie:", categoryError);
      continue;
    }

    const categoryId = categoryData[0].id;

    // Najít klíč obsahující seznam zbraní
    const weaponKey = Object.keys(category).find((key) => key !== "category");

    // Vložení zbraní do tabulky
    for (const weapon of category[weaponKey]) {
      const { error: weaponError } = await supabase.from("weapons").insert([
        {
          category_id: categoryId,
          name: weapon.name,
          regular_phy_dmg: weapon.regular_phy_dmg,
          regular15_phy_dmg: weapon.regular15_phy_dmg || null,
          regular5_phy_dmg: weapon.regular5_phy_dmg || null,
          weight: weapon.weight,
          durability: weapon.durability,
          attack_type: weapon.attack_type,
          enchantable: weapon.enchantable,
          str_req: weapon.requirements.str,
          dex_req: weapon.requirements.dex,
          int_req: weapon.requirements.int,
          faith_req: weapon.requirements.faith
        }
      ]);

      if (weaponError) {
        console.error("Chyba při vkládání zbraně:", weaponError);
      }
    }
  }
}

uploadData();
