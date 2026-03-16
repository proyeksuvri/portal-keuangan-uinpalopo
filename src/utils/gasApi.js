// src/utils/gasApi.js
// Fungsi-fungsi pemanggil Google Apps Script (login, CRUD)

import { GAS_WEB_APP_URL } from "../config";

/**
 * Login via GAS
 * @returns {Promise<{success, name, role, message}>}
 */
export async function gasLogin(username, password) {
  const res = await fetch(
    `${GAS_WEB_APP_URL}?action=login&username=${encodeURIComponent(
      username
    )}&password=${encodeURIComponent(password)}`
  );
  return res.json();
}

/**
 * Simpan (tambah / edit) satu item ke GAS
 * @param {"berita"|"links"|"peraturan"|"hero"|"sections"} type
 * @param {"add"|"edit"} mode
 * @param {object} item
 */
export async function gasSave(type, mode, item) {
  const res = await fetch(GAS_WEB_APP_URL, {
    method: "POST",
    body: JSON.stringify({ action: "save", type, mode, item }),
    headers: { "Content-Type": "text/plain;charset=utf-8" },
  });
  return res.json();
}

/**
 * Hapus item dari GAS
 */
export async function gasDelete(type, id) {
  const res = await fetch(
    `${GAS_WEB_APP_URL}?action=delete&type=${encodeURIComponent(
      type
    )}&id=${encodeURIComponent(id)}`
  );
  return res.json();
}
