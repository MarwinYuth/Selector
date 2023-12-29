import React, {useState } from 'react'
import provincesJson from './Json/provinces.json'
import districtsJson from './Json/districts.json'
import communesJson from './Json/communes.json'
import villagesJson from './Json/villages.json'
import SelectComponent from './component/SelectComponent'
import Result from './component/Result'

const extrator = (data) => {
  return Object.keys(data).map(key => {
    return{
      id:key,
      name:data[key].name
    }
  })
}

const provinceData = extrator(provincesJson.provinces)
const districtData = extrator(districtsJson.districts)
const communesData = extrator(communesJson.communes)
const villageData = extrator(villagesJson.villages)

export default function App() {

  const [provinces,setProvinces] = useState(provinceData)
  const [districts,setDistricts] = useState([])
  const [communes,setCommunes] = useState([])
  const [villages,setVillage] = useState([])

  const [seletedProvince,setSeletedProvince] = useState()
  const [seletedDistrict,setSeletedDistrict] = useState()
  const [seletedCommune,setSeletedCommune] = useState()
  const [seletedVillage,setSeletedVillage] = useState()

  const [isresult,setIsResult] = useState(false)

  const handelProvineSelected = (provinceId) => {
    const province = provinces.find(obj => obj.id === provinceId)
    setDistricts(districtData.filter(dis => dis.id.startsWith(provinceId)))
    setSeletedProvince(province)
    setCommunes([])
    setVillage([])
  }

  const hanndleDistrictSelected = (districtId) => {
    const district = districts.find(obj => obj.id === districtId)
    setCommunes(communesData.filter(com => com.id.startsWith(districtId)))
    setSeletedDistrict(district)
    setVillage([])
  }

  const handdleCommuneSelected = (communeId) => {
    const commun = communes.find(obj => obj.id === communeId)
    setSeletedCommune(commun.name.latin)
    setVillage(villageData.filter(village => village.id.startsWith(communeId)))
    setSeletedCommune(commun)
  }

  const handdleVillageSelected = (villageId) => {
    const village = villages.find(obj => obj.id === villageId)
    setSeletedVillage(village)
  }

  const onSubmit = (e) => {

    e.preventDefault()

    if(!seletedProvince || !seletedDistrict || !seletedCommune || !seletedVillage){
      alert('Make sure to selected all the field')
      return
    }
    
    setIsResult(true)

    setProvinces([])
    setDistricts([])
    setCommunes([])
    setVillage([])
  }

  const onClear = () => {

    setSeletedProvince('')
    setSeletedDistrict('')
    setSeletedCommune('')
    setSeletedVillage('')

    setIsResult(false)
    setProvinces(provinceData)
  }

  return (  

    <div className='w-[1000px] m-auto mt-14'>

      <h1 className="text-center font-bold">Selector</h1>

      <form  onSubmit={onSubmit}>

        <div className='flex justify-between'>

          <SelectComponent label='Provinces' data={provinces} onSelected={handelProvineSelected}/>

          <SelectComponent label='Districts' data={districts} onSelected={hanndleDistrictSelected}/>
          
          <SelectComponent label='Communes' data={communes} onSelected={handdleCommuneSelected}/>

          <SelectComponent label='Village' data={villages} onSelected={handdleVillageSelected}/>

        </div>


        <div className="flex">

        <div className='mt-4'>

          <button type='submit' className='bg-red-400 hover:bg-red-600 font-bold text-white p-2 rounded-lg'>Submit</button>
        
        </div>

        <div className='mt-4 ml-4'>

          <button onClick={onClear} type='button' className='bg-blue-400 hover:bg-red-600 font-bold text-white p-2 rounded-lg'>Clear</button>
        
        </div>

        </div>

      </form>

      <Result provinces={seletedProvince} districts={seletedDistrict} communes={seletedCommune} villages={seletedVillage} isVisible={isresult}/>
     
    </div>
  )

}
