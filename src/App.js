import React, { useEffect, useState } from 'react'
import SelectComponent from './component/SelectComponent'
import axios from 'axios'
import Result from './component/Result'


export default function App() {

  const [provinces,setProvinces] = useState([])
  const [districts,setDistricts] = useState([])
  const [communes,setCommunes] = useState([])
  const [villages,setVillages] = useState([])

  const [isSelectedProvince,setIsSelectedProvince] = useState('')
  const [isSelectedDistrict,setIsSelectedDistrict] = useState('')
  const [isSelectedCommune,setIsSelectedCommune] = useState('')
  const [isSelectedVillage,setIsSelectedVillage] = useState('')

  const [isResult,setIsResult] = useState(false)

  const fetchProvince =  async () => {
    try {
      const response = await axios.get('https://api.staging.goldenqueenhospital.com/v1/pumi')
      setProvinces(response.data.data)
    } catch (error) {
      console.error('Error Fetching Provinces')
    }
  }

  useEffect(() => {
    fetchProvince()
  },[])

  const handleProvinceSelected = async (provinceId) => {
    try { 
      const districts = await axios.get('https://api.staging.goldenqueenhospital.com/v1/pumi/districts?parent_id=' + provinceId)
      setDistricts(districts.data.data)
      setIsSelectedProvince(provinces.find(pro => pro.id === parseInt(provinceId)))
      setCommunes([])
      setVillages([])
      setIsSelectedDistrict('')
      setIsSelectedCommune('')
      setIsSelectedVillage('')
    } catch (error) {
      console.error('Error Fetching Districts',error)
    }
  }

  const handleDistrictSelected = async (districtId) => {
    try {  
      const communes = await axios.get('https://api.staging.goldenqueenhospital.com/v1/pumi/communes?parent_id=' + districtId)
      setCommunes(communes.data.data)
      setIsSelectedDistrict(districts.find(dis => dis.id === parseInt(districtId)))
      setVillages([])
      setIsSelectedCommune('')
      setIsSelectedVillage('')
    } catch (error) {
      console.error('Error Fetching Communes')
    }
  }

  const handleCommunesSelected = async (communeId) => {
    try {
      const village = await axios.get('https://api.staging.goldenqueenhospital.com/v1/pumi/villages?parent_id=' + communeId)
      setVillages(village.data.data)
      setIsSelectedCommune(communes.find(com => com.id === parseInt(communeId)))
      setIsSelectedVillage('')
    } catch (error) {
      console.error('Error Feching Villages',error)
    }
  }

  const handleVillageSelected = (villageId) => {
    setIsSelectedVillage(villages.find(village => village.id === parseInt(villageId)))
  };

  const onSubmit = (e) => {

    e.preventDefault()

    if(!isSelectedProvince || !isSelectedDistrict || !isSelectedCommune || !isSelectedVillage){
      alert('Make sure all the filed is selected !')
      return null
    }

    setIsResult(true)

    setProvinces([])
    setDistricts([])
    setCommunes([])
    setVillages([])
  }

  const onClear = async () => {

    setIsSelectedProvince('')
    setIsSelectedDistrict('')
    setIsSelectedCommune('')
    setIsSelectedVillage('')

    setProvinces([])
    setDistricts([])
    setCommunes([])
    setVillages([])

    setIsResult(false)
    const response = await axios.get('https://api.staging.goldenqueenhospital.com/v1/pumi')
    setProvinces(response.data.data)
  }

  return (  

    <div className='w-[1000px] m-auto mt-14'>

      <h1 className="text-center font-bold text-white">Selector</h1>

      <form  onSubmit={onSubmit}>

        <div className='flex justify-between'>

         <SelectComponent label='Provinces' data={provinces} onSelected={handleProvinceSelected}/>

         <SelectComponent label='Districts' data={districts} onSelected={handleDistrictSelected}/>

         <SelectComponent label='Communes' data={communes} onSelected={handleCommunesSelected}/>

         <SelectComponent label='Villages' data={villages} onSelected={handleVillageSelected}/>

        </div>


        <div className="flex">

        <div className='mt-4'>

          <button type='submit' className='bg-red-400 hover:bg-red-600 font-bold text-white p-2 rounded-lg'>Submit</button>
        
        </div>

        <div className='mt-4 ml-4'>

          <button type='button' onClick={onClear} className='bg-blue-400 hover:bg-blue-600 font-bold text-white p-2 rounded-lg'>Clear</button>
        
        </div>

        </div>

      </form>

      <Result provinces={isSelectedProvince} districts={isSelectedDistrict} communes={isSelectedCommune} villages={isSelectedVillage} isVisible={isResult}/>
     
    </div>
  )

}