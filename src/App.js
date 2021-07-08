import { useState, useEffect } from "react";
import parcel_data from './data/properties.json';
import post_data from './data/postOffice.json';
import CustomMap from "./Components/Map/customMap";
import Selector from "./Components/Select/selector";
import ParcelsTable from "./Components/Table/parcelsTable";
import Loader from "./Components/Loader/loader";
import { Button, Table } from 'antd';



const columns = [
  {
    title: 'Код посылки',
    dataIndex: 'parcelno',
    width: '25%',
  },
  {
    title: 'Адрес посылки',
    dataIndex: 'propaddr',
    width: '25%',
  },
  {
    title: 'Долгота',
    dataIndex: 'latitude',
    width: '25%',
  },
  {
    title: 'Широта',
    dataIndex: 'longitude',
    width: '25%',
  }
];


function FormatWord(word){
  return word.split("").join('.');
}
const name = 'GIS';
parcel_data.map((item, index) => {item['visible']=false; item['id'] = index})
post_data.map((item, index) => {
  if (index===0){
    item['visible']=true;
  }
  else{
    item['visible']=false;
  } 
  item['id'] = index
})

function App() {
  const [ parcels, setData ] = useState(parcel_data);
  const [ posts, setPost ] = useState(post_data);
  const [loading, setLoading] = useState(true);
  const [ coordinates, setCoordinates ] = useState ([[42.3141419577, -83.1221815483],  []]);

// useEffect(() => {
//   data.map(item => setData(item), setLoading(false))
//   }, [])

//   data.map(item => {item['visible']=false})

  function changeProperties(value) {
    setCoordinates(
      coordinates.map((coordinate, index) =>{
        if (index === 1){
          parcels.map(item => {
            if (item.propaddr ===value){
              coordinate = [item.latitude, item.longitude]
            }
          })
        }
        return coordinate
      })
  )
  setData(
      parcels.map(item => {
        if (item.propaddr === value){
          item.visible = true;
        }
        else{
          item.visible = false
        }
        return item
      })
    )
  }

  function changePosts(value) {
    setCoordinates(
        coordinates.map((coordinate, index) =>{
          if (index === 0){
            posts.map(item => {
              if (item.propaddr ===value){
                coordinate = [item.latitude, item.longitude]
              }
            })
          }
          return coordinate
        })
    )
    setPost(
      posts.map(item => {
        if (item.propaddr === value){
          item.visible = true;
        }
        else{
          item.visible = false
        }
        return item
      })
    )
  }
  function clickButton (){
    console.log(coordinates)
  }
  
  return (
    <div className = 'backgroundContent'>
      <div className='wrapper'>
        <div className = 'top'>{FormatWord(name)} 
        <br/>
        </div>
          <CustomMap parcels = {parcels} posts = {posts} coordinatesRoute={coordinates}/>
          <div className = 'content'>
            <div>
              <Selector data = {posts} onChange = {changePosts}/>
              <Selector data = {parcels} onChange = {changeProperties} />
            </div>
            <div>
              <Button type="primary" onClick={() => clickButton()} style={{ margin: '20px' }}>Show route</Button>
              <Button type="primary" danger disabled={false}>Clear</Button>
            </div>
          </div>
          {/* <ParcelsTable data = {parcels} /> */}
          <Table columns={columns} dataSource={parcels} scroll={{ y: 240 }} />
      </div>
    </div>);
}


export default App;

