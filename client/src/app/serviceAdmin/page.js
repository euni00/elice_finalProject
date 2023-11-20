// 서비스 관리자 페이지
//import StoreForm from "./_components/StoreForm.js";
import PopupStoreList from "./components/PopupStoreList/PopupStoreList";
import Search from "./components/NavBar/NavBar";
import Pagination from "./components/Pagination/Pagination";

async function getData() {
  try {
    const res = await fetch(`http://localhost:4000/api/popupStore`, {
      cache: "no-store",
    });
    return res.json();
  } catch (err) {
    console.log(err);
  }
}

export default async function ServiceAdmin() {
  const { data } = await getData();
  console.log(data);
  return (
    <>
      <PopupStoreList storeData={data} />
    </>
  );
}
