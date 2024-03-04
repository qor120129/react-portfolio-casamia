import React, { useEffect, useState } from 'react'
import Map from 'components/Map'
import MapSearch from 'components/MapSearch'
import { toast } from 'react-toastify'
import spriteImg from '@/assets/img/marker.png'

const StorePage = ({ mobile }) => {
  const [search, setSearch] = useState('까사미아')


  var markers = []
  useEffect(() => {

    var container = document.getElementById('map'),
      option = {
        center: new kakao.maps.LatLng(33.450701, 126.570667),
        level: 3 // 지도의 중심좌표
      }
    var ps = new kakao.maps.services.Places();
    var map = new kakao.maps.Map(container, option);

    var infowindow = new kakao.maps.InfoWindow()

    searchPlaces()

    // 키워드 검색을 요청하는 함수
    function searchPlaces() {

      // var keyword = document.getElementById('searchKeyword').value;
      if (!search.replace(/^\s+|\s+$/g, '')) {
        toast.error('키워드를 입력해주세요!', {
          position: "top-center"
        })
      }
      ps.keywordSearch('까사미아 ' + search, placesSearchCB);
    }

    // 장소검색이 완료됐을 때 호출되는 콜백함수
    function placesSearchCB(data, status, pagination) {
      if (status === kakao.maps.services.Status.OK) {
        // 정상적으로 검색이 완료됐으면
        // 검색 목록과 마커를 표출합니다
        const filterData = data.filter(item => {
          return item.category_name.match('가구판매')
        })
        displayPlaces(filterData);

        // 페이지 번호를 표출합니다
        displayPagination(pagination);

      } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
        toast.error('검색 결과가 존재하지 않습니다.', {
          position: "top-center"
        })
        return;
      } else if (status === kakao.maps.services.Status.ERROR) {
        toast.error('검색 결과 중 오류가 발생했습니다.', {
          position: "top-center"
        })
        return;
      }
    }



    //검색 결과 목록과 마커를 표출하는 함수
    function displayPlaces(places) {
      var listEl = document.getElementById('mapList'),
        menuEl = document.getElementById('mapWrap'),
        fragment = document.createDocumentFragment(),
        bounds = new kakao.maps.LatLngBounds();
      // bounds.extend(position);
      console.log('bounds', bounds)

      // listStr = '';

      // 검색 결과 목록에 추가된 항목들을 제거합니다
      removeAllChildNods(listEl);
      // 지도에 표시되고 있는 마커를 제거합니다
      removeMarker();

      for (var i = 0; i < places.length; i++) {
        // 마커를 생성하고 지도에 표시합니
        var position = new kakao.maps.LatLng(places[i].y, places[i].x),
          marker = addMarker(position, i),
          itemEl = getListItem(i, places[i]); // 검색 결과 항목 Element를 생성합니다

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다
        bounds.extend(position);

        // 검색 결과 목록이나 마커를 클릭했을 때 장소명을 표출할 인포윈도우를 생성
        // 마커와 검색결과 항목에 mouseover 했을때
        // 해당 장소에 인포윈도우에 장소명을 표시합니다
        (function (marker, places) {
          kakao.maps.event.addListener(marker, 'mouseover', function () {
            infowindow.close();
            displayInfowindow(marker, places);
          })
          // kakao.maps.event.addListener(marker, 'mouseout', function () {
          //   infowindow.close();
          // })
          kakao.maps.event.addListener(marker, 'click', function () {
            infowindow.close();
            displayInfowindow(marker, places);
          })
          itemEl.onclick = function () {
            infowindow.close();
            map.setCenter(new kakao.maps.LatLng(places.y, places.x))
            displayInfowindow(marker, places, position);
          }
        })(marker, places[i])

        fragment.appendChild(itemEl);
      }

      // 검색결과 항목들을 검색결과 목록 Elemnet에 추가합니다
      listEl.appendChild(fragment);
      menuEl.scrollTop = 0;

      // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
      map.setBounds(bounds);
    }

    // 검색결과 항목을 Element로 반환하는 함수입니다
    function getListItem(index, places) {
      var el = document.createElement('li'),
        itemStr = '<span className=""></span>' +
          '<div class="info">' +
          '   <h5>' + places.place_name + '</h5>'

      if (places.road_address_name) {
        itemStr += '<span>' + places.road_address_name + '</span>' +
          '<span class="jibun gray">' + places.address_name + '</span>'
      } else {
        itemStr += '<span>' + places.address_name + '</span>'
      }
      itemStr += '<span class="phone">' + places.phone + '</span>' +
        '</div>'

      el.innerHTML = itemStr
      el.className = 'mapItem'

      return el
    }

    // 마커를 생성하고 지도 위에 마커를 표시하는 함수
    function addMarker(position) {
      console.log(position)
      var imageSrc = spriteImg, // 마커 이미지 url, 스프라이트 이미지를 씁니다
        imageSize = new kakao.maps.Size(30, 30),  // 마커 이미지의 크기
        imgOptions = {
          spriteSize: new kakao.maps.Size(30, 30), // 스프라이트 이미지의 크기
          // spriteOrigin : new kakao.maps.Point(0, (idx*46)+10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
          offset: new kakao.maps.Point(13, 37) // 마커 좌표에 일치시킬 이미지 내에서의 좌표
        },
        markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions),
        marker = new kakao.maps.Marker({
          position: position, // 마커의 위치
          image: markerImage,
        });
      marker.setMap(map, option); // 지도 위에 마커를 표출합니다
      markers.push(marker);  // 배열에 생성된 마커를 추가합니다

      return marker;
    }

    // 지도에 표시되고 있는 마커를 제거합니다
    function removeMarker() {
      for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
      }
      markers = [];
    }

    // 검색결과 페이지번호를 표시는 함수
    function displayPagination(pagination) {
      var paginationEl = document.getElementById('mapPagination'),
        fragment = document.createDocumentFragment(),
        i;

      // 기존에 추가된 페이지번호를 삭제합니다
      if (paginationEl) {
        while (paginationEl.hasChildNodes()) {
          paginationEl.removeChild(paginationEl.lastChild);
        }
      }

      for (i = 1; i <= pagination.last; i++) {
        var el = document.createElement('a');
        el.href = "#";
        el.innerHTML = i;

        if (i === pagination.current) {
          el.className = 'on';
        } else {
          el.onclick = (function (i) {
            return function () {
              pagination.gotoPage(i);
            }
          })(i);
        }

        fragment.appendChild(el);
      }
      paginationEl.appendChild(fragment);
    }

    // 검색결과 목록 또는 마커를 클릭했을 때 호출되는 함수 인포윈도우에 장소명을 표시
    function displayInfowindow(marker, places, position) {
      var content =
        '<div class="info_wrap">' +
        '<div class="info_tt">' + places.place_name + '</div>' +
        '<p>' + places.road_address_name + '</p>' +
        '<span class="tel">' + places.phone + '</span>' +
        '<div class="info_link"><a href="https://map.kakao.com/link/map/' + places.id + '"target="_blank" >지도보기</a></div>'
      '</div>';
      infowindow = new kakao.maps.InfoWindow({
        position: position,
        content: content,
      })
      // infowindow.setContent(content);
      infowindow.open(map, marker);
    }

    // 검색 결과 목록에 추가된 항목들을 제거
    function removeAllChildNods(el) {
      while (el.hasChildNodes()) {
        el.removeChild(el.lastChild);
      }
    }
  }, [search])

  const searchChange = (e) => {
    setSearch(e)
  }




  return (
    <div
      className={`flex max-sm:flex-col-reverse max-sm:h-[calc(100vh-110px)]  
    ${mobile ? 'h-[calc(100vh-60px)]' : 'h-[calc(100vh-120px)]'}`}
    >
      <MapSearch
        searchChange={searchChange}
        className={`overflow-y-scroll  max-sm:w-full p-6 pb-4 max-sm:h-[50%]
      ${mobile ? 'h-[40%]' : 'p-12 w-[500px] box-border '}`}
      />
      <Map className={`max-sm:w-full  ${mobile ? 'w-full h-full' : 'h-full w-[90%]'}`} />
    </div>
  )
}

export default StorePage