"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "../../../../../utils/instance";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceSmile } from "@fortawesome/free-regular-svg-icons";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faCalendar } from "@fortawesome/free-regular-svg-icons";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import "./PopupStore.scss";

export default function PopupStore({ store }) {
  const [isAdded, setIsAdded] = useState(false);
  const [interestModal, setInterestModal] = useState(false);
  const [interestStatus, setInterestStatus] = useState("");
  const router = useRouter();
  const currentDate = new Date();
  const popupEndDate = new Date(store.end_date);
  const diff = popupEndDate - currentDate;

  async function addInterestPopupStore(id) {
    try {
      const response = await axios.post("/interest", {
        popupStoreId: id,
      });
      if (response.status === 201) {
        setIsAdded(true);
        setInterestModal(true);
        setInterestStatus("add");
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function deleteInterestPopupStore(id) {
    try {
      const response = await axios.delete(`/interest/${id}`);
      if (response.data.deletedCount === 1) {
        setIsAdded(false);
        setInterestModal(true);
        setInterestStatus("delete");
      }
    } catch (err) {
      console.log(err);
    }
  }

  function dateFormat(date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}.${month}.${day}`;
  }

  useEffect(() => {
    (async function () {
      const response = await axios.get(`/interest/${store._id}`);
      if (response.data.length !== 0) {
        setIsAdded(true);
      } else {
        setIsAdded(false);
      }
    })();
  }, []);

  return (
    <div className="popupStore">
      <div className="popupStoreWrapper">
        {interestModal && (
          <div
            className="modalBackground"
            onClick={() => {
              window.document.body.style.overflowY = "scroll";
              setInterestModal(false);
            }}
          ></div>
        )}
        {interestModal && (
          <div className="addInterestModal">
            <FontAwesomeIcon className="smileIcon" icon={faFaceSmile} />
            {interestStatus === "add" ? (
              <div className="interestModalMessage">
                해당 팝업스토어가 <br />
                관심 리스트에 추가되었습니다!
              </div>
            ) : (
              <div className="interestModalMessage">
                해당 팝업스토어가 <br />
                관심 리스트에서 삭제되었습니다!
              </div>
            )}
            {interestStatus === "add" ? (
              <div className="subText">
                마이페이지에서 관심 리스트를 확인하실 수 있습니다.
              </div>
            ) : (
              <div className="subText">
                마이페이지에서 관심 리스트를 확인하실 수 있습니다.
              </div>
            )}
            <div className="modalBtnWrapper">
              <div
                className="listMoveBtn"
                onClick={() => {
                  window.document.body.style.overflowY = "scroll";
                  router.push("/mypage");
                }}
              >
                마이페이지 이동
              </div>
              <div
                className="okBtn"
                onClick={() => {
                  window.document.body.style.overflowY = "scroll";
                  setInterestModal(false);
                }}
              >
                확인
              </div>
            </div>
          </div>
        )}
        <div className="imageWrapper">
          <div
            className="popupStoreImg"
            style={{ backgroundImage: `url(${store.mainImage.url})` }}
            onClick={() => {
              router.push(`/popupList/all/${store._id}`);
            }}
          ></div>
          {!isAdded ? (
            <FontAwesomeIcon
              className="heartIcon"
              icon={regularHeart}
              onClick={() => {
                window.document.body.style.overflowY = "hidden";
                addInterestPopupStore(store._id);
              }}
            />
          ) : (
            <FontAwesomeIcon
              className="heartIcon"
              icon={solidHeart}
              onClick={() => {
                window.document.body.style.overflowY = "hidden";
                deleteInterestPopupStore(store._id);
              }}
            />
          )}
          {diff < 0 && <div className="closeImage">CLOSE</div>}
        </div>
        <div className="popupStoreInfoWrapper">
          <div className="infoTop">
            <div className="popupStoreBrand">{store.brand}</div>
            <div className="popupStoreName">{store.name}</div>
            <div className="popupStoreAddress">
              <FontAwesomeIcon className="addressIcon" icon={faLocationDot} />
              <div className="addressText">{store.address}</div>
            </div>
            <div className="popupStorePeriod">
              <FontAwesomeIcon className="periodIcon" icon={faCalendar} />
              <div className="periodText">
                {dateFormat(new Date(store.start_date))} -{" "}
                {dateFormat(new Date(store.end_date))}
              </div>
            </div>
          </div>

          <div className="infoBottom">
            {diff < 0 ? (
              <div className="done">종료</div>
            ) : (
              <div className="doing">현재 운영중</div>
            )}

            <div
              className="readMore"
              onClick={() => {
                router.push(`/popupList/all/${store._id}`);
              }}
            >
              {"자세히 보기 >"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
