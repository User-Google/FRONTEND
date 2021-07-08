import React, { useState, useRef } from "react";
import { YMaps, Map } from 'react-yandex-maps';
import SetPlacemarks from './Placemark/setPlacemarks';
import SetPlacemarks_posts from './Placemark/setPlacemarks_posts';
import { Button, Modal } from 'antd';

const mapState = {
    center:  [42.3141419577, -83.1221815483],
    zoom: 10,
    controls: []
}

function CustomMap (props){
    const [ymaps, setYmaps] = useState(null);
    const routes = useRef(null);
    var ref

  const [isModalVisible, setIsModalVisible] = useState(false);

  function showModal() {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };


    function saveRef (value) {
        ref =value;
    }
    const getRoute = ref => {
        if (ymaps && props.coordinatesRoute[1].length != 0) {
          const multiRoute = new ymaps.multiRouter.MultiRoute(
            {
              // Описание опорных точек мультимаршрута.
              referencePoints: props.coordinatesRoute,
              // Параметры маршрутизации.
              params: {
                // Ограничение на максимальное количество маршрутов, возвращаемое маршрутизатором.
                results: 2
              }
            },
            {
              // Автоматически устанавливать границы карты так, чтобы маршрут был виден целиком.
              boundsAutoApply: true,
              wayPointVisible: false,
              // Внешний вид линии маршрута.
              routeActiveStrokeWidth: 6,
              routeActiveStrokeColor: "#1890ff"
            }
          );
    
         // Кладем полученный маршрут в переменную
          // routes.current = multiRoute;
          ref.geoObjects.add(multiRoute);
        }
        else
        {
         showModal();
        }
      };
    
    return(
      <>
        <YMaps query={{apikey: '413dad6e-973a-4e11-8762-9dc7c6a6fb64'}}>
            <Map 
            modules={["multiRouter.MultiRoute"]}
            onLoad={ymaps => setYmaps(ymaps)}
            state={mapState}
            instanceRef={ref => ref && saveRef(ref)}
            width = "100%" height='300px'>
                <SetPlacemarks_posts data={props.posts} />
                <SetPlacemarks data={props.parcels} />
                <Button type={"primary"} onClick={()=>getRoute(ref)}>Show route(test)</Button>
              {/* <Button type="primary" danger disabled={false}>Clear</Button> */}
            </Map>
        </YMaps>
        <Modal title="Введены не все данные!" visible={isModalVisible} onOk={handleOk} cancelButtonProps={{hidden: true}}>
        <p>Введите конечную точку для построения маршрута.</p>
      </Modal>
        </>
    )

}


export default CustomMap;