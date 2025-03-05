import { createClient } from "@supabase/supabase-js";
import fs from "fs";

const supabaseUrl = "https://eqcxgfbixykafjjiqpac.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVxY3hnZmJpeHlrYWZqamlxcGFjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk2NDY1MDEsImV4cCI6MjA1NTIyMjUwMX0.J1zrvxVXErEWW37j0Q0u8cBiv-hBdI-jsXusPabppEg";
const supabase = createClient(supabaseUrl, supabaseKey);

const jsonData = [
    {
      "brand": "Toyota",
      "model": "Corolla",
      "year": 2020
    },
    {
      "brand": "BMW",
      "model": "X5",
      "year": 2018
    },
    {
      "brand": "Ford",
      "model": "Focus",
      "year": 2019
    }
  ];  

async function uploadData() {
  const { data, error } = await supabase.from("auto").insert(jsonData);

  if (error) {
    console.error("Chyba při nahrávání dat:", error);
  } else {
    console.log("Data úspěšně nahrána:", data);
  }
}

uploadData();